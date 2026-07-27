// scripts/rename-treatment-group-to-category.ts
import "dotenv/config";
import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "ddh0mvo4",
  dataset: "production",
  apiVersion: "2025-08-15",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const oldType = "treatmentGroup";
const newType = "treatmentCategory";

// Recursively walk a document and replace any {_ref: oldId} with {_ref: newId}
function replaceRefs(value: any, oldId: string, newId: string): any {
  if (Array.isArray(value)) {
    return value.map((item) => replaceRefs(item, oldId, newId));
  }
  if (value && typeof value === "object") {
    if (value._ref === oldId) {
      return { ...value, _ref: newId };
    }
    const result: any = {};
    for (const key of Object.keys(value)) {
      result[key] = replaceRefs(value[key], oldId, newId);
    }
    return result;
  }
  return value;
}

async function run() {
  const docs = await client.fetch(`*[_type == $oldType]`, { oldType });
  console.log(`Found ${docs.length} documents to migrate`);

  for (const doc of docs) {
    const oldId = doc._id;
    const newId = randomUUID();

    console.log(`\nMigrating ${oldId} (${doc.title}) -> ${newId}`);

    // 1. Create the new document FIRST (so references can safely point to it)
    const { _rev, ...docWithoutRev } = doc;
    await client.create({
      ...docWithoutRev,
      _id: newId,
      _type: newType,
    });
    console.log(`  Created ${newId} as ${newType}`);

    // 2. Find every document referencing the old id, and repoint it
    const referencingDocs = await client.fetch(`*[references($oldId)]`, {
      oldId,
    });
    console.log(`  Found ${referencingDocs.length} referencing document(s)`);

    for (const refDoc of referencingDocs) {
      const patched = replaceRefs(refDoc, oldId, newId);
      await client.createOrReplace(patched);
      console.log(`  Updated reference in ${refDoc._id} (${refDoc._type})`);
    }

    // 3. Now safe to delete the old document
    await client.delete(oldId);
    console.log(`  Deleted old document ${oldId}`);
  }

  console.log("\nDone.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
