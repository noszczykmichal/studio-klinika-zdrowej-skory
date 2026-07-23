import { describe, it, expect } from "vitest";
import trainingCategorySchema from "@/schemaTypes/treatmentGroup";

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

const getValidator = (fieldName: string) => {
  const field = trainingCategorySchema.fields.find(
    (f: any) => f.name === fieldName,
  );
  if (!field || !field.validation)
    throw new Error(`Field ${fieldName} not found or has no validation`);

  if (typeof field.validation === "function") {
    return field.validation(mockRule as any) as unknown as (
      value: string | undefined,
    ) => true | string;
  }

  throw new Error(`Validation for ${fieldName} is not a function`);
};

describe("Training category Schema Validation", () => {
  describe("summary field", () => {
    const validateSummary = getValidator("summary");

    it("should return an error if the value is empty or only whitespace", () => {
      expect(validateSummary("")).toBe("Proszę uzupełnić pole.");
      expect(validateSummary("   ")).toBe("Proszę uzupełnić pole.");
      expect(validateSummary(undefined)).toBe("Proszę uzupełnić pole.");
    });

    it("should return an error if the text exceeds 290 characters", () => {
      const longText = "a".repeat(300);
      expect(validateSummary(longText)).toBe(
        "Maksymalna długość tekstu to 290 znaków. Aktualna długość to 300 znaków.",
      );
    });

    it("should return true if the text is valid and under 290 characters", () => {
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
