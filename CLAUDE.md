# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Sanity Studio (v6, React 19, TypeScript) acting as the headless CMS for the "Klinika Zdrowej Skóry" website. The frontend lives in a separate repo (`noszczykmichal/nextjs-klinika-zdrowej-skory`) and reads this content via Sanity's content API, so **schema field names are a contract with that frontend** — renaming a field or `_type` breaks queries there and requires a data migration here.

Sanity project `ddh0mvo4`, dataset `production` (hardcoded in [sanity.config.ts](sanity.config.ts) and [sanity.cli.ts](sanity.cli.ts)); studio host `klinika-zdrowej-skory`.

## Commands

- `npm run dev` — local Studio
- `npm run build` — production build (also used in CI as a type/config check)
- `npm test` — Vitest in watch mode; `npm test -- --run` for a single run (what CI uses)
- Single file / single test: `npx vitest run tests/schemaTypes/treatment.test.ts` or `npx vitest run -t "altForMainImage"`
- `npm run lint` — ESLint (`@sanity/eslint-config-studio`)
- `npm run typecheck` — `tsc --noEmit`
- Install: CI uses plain `npm ci` (no `--legacy-peer-deps`). If a dependency bump causes an `ERESOLVE` peer conflict, resolve it (upgrade/`overrides`) rather than re-adding the flag.

CI ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) runs lint → typecheck → tests → build on pushes to any branch and on PRs to `dev`/`main`; only pushes to `main` run `sanity deploy`. Feature branches merge into `dev`, which goes to `main` via PR.

## Pull requests

When writing a PR summary/description, always output it as raw Markdown inside a fenced ```` ```markdown ```` code block, so it can be copied straight into GitHub with formatting intact.

## Architecture

- **Path alias `@/` → repo root.** Configured twice: in the Vite config inside [sanity.cli.ts](sanity.cli.ts) (for the Studio) and in [vitest.config.mts](vitest.config.mts) (for tests). Keep both in sync.
- **Schemas** live in [schemaTypes/](schemaTypes/) and must be registered in [schemaTypes/index.ts](schemaTypes/index.ts). Content is modeled as two parallel hierarchies: `treatment` → `treatmentCategory` and `training` → `trainingCategory`, plus blog (`post`, `author`, `category`), `gallery`, and reusable object types (`blockContent`, `blockContentImage`, `tableWithCaption`).
- **Singletons**: [structure.ts](structure.ts) exports `SINGLETON_TYPES` (currently `privacyPolicy`). The custom desk structure pins it to a fixed document ID and hides it from the generic type lists; [sanity.config.ts](sanity.config.ts) strips `duplicate`/`delete` actions for those types. Adding a new singleton means updating `SINGLETON_TYPES` and adding a list item in `structure.ts`.
- **Validation** is centralized in [utils/validators.ts](utils/validators.ts) as factory functions passed to `Rule.custom(...)`:
  - `altValidator` — image alt text required and must end with a period.
  - `lengthValidatorWithLength(n)` — required + max length.
  - `orderAvailabilityValidator(type)` — async; queries the dataset via `context.getClient` to ensure category `order` (navigation position) is a unique positive integer, ignoring the doc's own draft/published IDs.
  - `categoryAndTreatmentValidator(otherField)` — used on `post` to require exactly one of `treatment` / `treatmentCategory`.
- **All user-facing strings (titles, descriptions, validation messages) are in Polish.** Tests assert on exact message strings, so changing a message requires updating tests.

## Testing

Tests in [tests/schemaTypes/](tests/schemaTypes/) unit-test field validators by pulling them out of schema definitions with `getValidator(schema, fieldName)` from [utils/testUtils.ts](utils/testUtils.ts). It calls the field's `validation` with a mock `Rule` whose `custom(fn)` returns `fn` itself, so it only works for fields whose validation is `Rule => Rule.custom(fn)` (optionally after `.required()/.error()`). Fields returning an array of rules (e.g. `metaDescription`) or using built-in rules like `max`/`min` aren't testable this way. Async validators need a mocked `context` (with `document` and `getClient`).

## Data migrations

Sanity can't change a document's `_type` via patch or delete+create in one transaction. The established pattern (see [scripts/rename-treatment-group-to-category.ts](scripts/rename-treatment-group-to-category.ts) and [migrations/archieve/](migrations/archieve/)) is: create a copy under a new ID with the new type → rewrite all references (`*[references($oldId)]`) to the new ID → delete the old doc. Scripts use `@sanity/client` with `SANITY_WRITE_TOKEN` from `.env` (loaded via `dotenv`) and write directly to `production`.
