import { describe, it, expect } from "vitest";

import postSchema from "@/schemaTypes/post";
import { getValidator } from "@/utils/testUtils";

describe("Post Schema Validation", () => {
  describe("treatmentGroup field", () => {
    const validateTreatmentGroup = getValidator(postSchema, "treatmentGroup");

    it("should return an error if both treatmentGroup and treatment are selected", () => {
      const mockValue = { _type: "reference", _ref: "group-123" };
      const mockContext = {
        document: {
          treatment: { _type: "reference", _ref: "treatment-456" },
        },
      };

      expect(validateTreatmentGroup(mockValue, mockContext)).toBe(
        'Proszę wypełnić tylko jedno pole - "Grupa zabiegowa" lub "Zabieg", nie oba jednocześnie.',
      );
    });

    it("should return true if only treatmentGroup is selected", () => {
      const mockValue = { _type: "reference", _ref: "group-123" };
      const mockContext = {
        document: {
          treatment: undefined,
        },
      };

      expect(validateTreatmentGroup(mockValue, mockContext)).toBe(true);
    });

    it("should return true if treatment is selected", () => {
      const mockContext = {
        document: {
          treatment: { _type: "reference", _ref: "treatment-456" },
        },
      };

      expect(validateTreatmentGroup(undefined, mockContext)).toBe(true);
    });

    it("should return an error if neither treatmentGroup nor treatment is selected", () => {
      const mockContext = {
        document: {
          treatment: undefined,
        },
      };

      expect(validateTreatmentGroup(undefined, mockContext)).toBe(
        'Proszę wypełnić jedno z pól - "Grupa zabiegowa" lub "Zabieg"',
      );
    });
  });

  describe("altForMainImage field", () => {
    const validateAlt = getValidator(postSchema, "altForMainImage");

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
