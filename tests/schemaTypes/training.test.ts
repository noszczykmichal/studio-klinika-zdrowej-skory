import { describe, it, expect } from "vitest";
import trainingSchema from "@/schemaTypes/training";

// 1. Create a mock Rule object to extract the custom validation functions
const mockRule = {
  required: function () {
    return this;
  },
  error: function () {
    return this;
  },
  // When Rule.custom is called, we just return the function passed to it so we can execute it
  custom: function (fn: any) {
    return fn;
  },
};

// 2. Helper to find a field by name and extract its validation logic
const getValidator = (fieldName: string) => {
  const field = trainingSchema.fields.find((f: any) => f.name === fieldName);
  if (!field || !field.validation)
    throw new Error(`Field ${fieldName} not found or has no validation`);

  // Tell TypeScript to only call it if it is actually a function
  if (typeof field.validation === "function") {
    // Add the "as (...)" cast right here at the end
    return field.validation(mockRule as any) as unknown as (
      value: string | undefined,
    ) => true | string;
  }

  throw new Error(`Validation for ${fieldName} is not a function`);
};

describe("Training Schema Validation", () => {
  describe("summary field", () => {
    const validateSummary = getValidator("summary");

    it("should return an error if the value is empty or only whitespace", () => {
      expect(validateSummary("")).toBe("Proszę uzupełnić pole.");
      expect(validateSummary("   ")).toBe("Proszę uzupełnić pole.");
      expect(validateSummary(undefined)).toBe("Proszę uzupełnić pole.");
    });

    it("should return an error if the text exceeds 550 characters", () => {
      const longText = "a".repeat(551);
      expect(validateSummary(longText)).toBe(
        "Maksymalna długość tekstu to 550 znaków. Aktualna długość to 551 znaków.",
      );
    });

    it("should return true if the text is valid and under 550 characters", () => {
      const validText = "To jest prawidłowe podsumowanie szkolenia.";
      expect(validateSummary(validText)).toBe(true);
    });
  });

  describe("altForMainImage field", () => {
    const validateAlt = getValidator("altForMainImage");

    it("should return an error if the value is empty or only whitespace", () => {
      expect(validateAlt("")).toBe("Proszę uzupełnić pole.");
      expect(validateAlt("   ")).toBe("Proszę uzupełnić pole.");
    });

    it("should return an error if the description does not end with a period", () => {
      expect(validateAlt("Zdjęcie przedstawiające grupę ludzi")).toBe(
        "Opis powinien kończyć się kropką.",
      );
      expect(validateAlt("Zdjęcie z wykrzyknikiem!")).toBe(
        "Opis powinien kończyć się kropką.",
      );
    });

    it("should return true if the description ends with a period", () => {
      expect(validateAlt("Zdjęcie przedstawiające grupę ludzi.")).toBe(true);
      expect(validateAlt("Zdjęcie przedstawiające grupę ludzi.  ")).toBe(true);
    });
  });
});
