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

const orderAvailabilityValidator =
  (categoryName: "trainingCategory" | "treatmentCategory") =>
  async (order: number | undefined, context: ValidationContext) => {
    if (order === undefined) {
      return "Proszę uzupełnić pole.";
    } else if (!Number.isInteger(order)) {
      return "Liczba musi być całkowita.";
    } else if (order <= 0) {
      return "Liczba musi być większa od zera.";
    }

    const { document, getClient } = context;
    const client = getClient({ apiVersion: "2024-01-01" });

    const id = document?._id?.replace(/^drafts\./, "");

    const duplicate = await client.fetch(
      `count(*[
            _type == $categoryName &&
            order == $order &&
            !(_id in [$id, "drafts." + $id])
          ])`,
      { categoryName, order, id },
    );

    return duplicate > 0
      ? "Ta pozycja jest już zajęta przez inną kategorię."
      : true;
  };

export {
  categoryAndTreatmentValidator,
  altValidator,
  lengthValidatorWithLength,
  orderAvailabilityValidator,
};
