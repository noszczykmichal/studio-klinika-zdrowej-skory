import { describe, it, expect } from "vitest";

import trainingSchema from "@/schemaTypes/training";
import { getValidator } from "@/utils/testUtils";

describe("Training Schema Validation", () => {
  describe("summary field", () => {
    const validateSummary = getValidator(trainingSchema, "summary");

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
    const validateAlt = getValidator(trainingSchema, "altForMainImage");

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
