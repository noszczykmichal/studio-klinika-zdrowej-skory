import { DocumentDefinition } from "sanity";

const mockRule = {
  required: function () {
    return this;
  },
  error: function () {
    return this;
  },

  custom: function (fn: any) {
    return fn;
  },
};

//Helper to find a field by name and extract its validation logic
const getValidator = (schema: DocumentDefinition, fieldName: string) => {
  const field = schema.fields.find((f: any) => f.name === fieldName);
  if (!field || !field.validation)
    throw new Error(`Field ${fieldName} not found or has no validation`);

  // Tell TypeScript to only call it if it is actually a function
  if (typeof field.validation === "function") {
    // Add the "as (...)" cast right here at the end
    return field.validation(mockRule as any) as unknown as (
      value: any,
      context?: any,
    ) => true | string;
  }

  throw new Error(`Validation for ${fieldName} is not a function`);
};

export { getValidator };
