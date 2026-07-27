import { Reference, ValidationContext } from "sanity";

const categoryAndTreatmentValidator =
  (fieldName: string) =>
  (value: Reference | undefined, context: ValidationContext) => {
    const other = context.document?.[fieldName];
    if (value && other) {
      return 'Proszę wypełnić tylko jedno pole - "Kategoria zabiegowa" lub "Zabieg", nie oba jednocześnie.';
    } else if (!value && !other) {
      return 'Proszę wypełnić jedno z pól - "Kategoria zabiegowa" lub "Zabieg"';
    }

    return true;
  };

const altValidator = (value: string | undefined) => {
  if (!value || value.trim() === "") {
    return "Proszę uzupełnić pole.";
  }

  if (!/\.\s*$/.test(value)) {
    return "Opis powinien kończyć się kropką.";
  }

  return true;
};

const lengthValidatorWithLength =
  (maxLength: number) => (value: string | undefined) => {
    if (!value || value.trim() === "") {
      return "Proszę uzupełnić pole.";
    }

    if (value.length > maxLength) {
      return `Maksymalna długość tekstu to ${maxLength} znaków. Aktualna długość to ${value.length} znaków.`;
    }
    return true;
  };

export {
  categoryAndTreatmentValidator,
  altValidator,
  lengthValidatorWithLength,
};
