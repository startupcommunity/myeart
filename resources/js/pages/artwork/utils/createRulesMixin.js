/**
 * Gestiona las validaciones para el formulario de creación
 * de las obras de los usuarios
 */

const ONLY_POSITIVE =
    /^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;

export default {
    data() {
        return {
            titleRules: [
                (v) => !!v || "El título es requerido",
                (v) =>
                    v.length <= 100 ||
                    "El título no debe tener mas de 100 caracteres",
            ],
            descriptionRules: [
                (v) => !!v || "La descripción es requerido",
                (v) =>
                    v.length <= 230 ||
                    "La descripción no debe tener mas de 200 caracteres",
            ],
            dimensionRules: [
                (v) => !!v || "Las dimensiones son requeridas",
                (v) =>
                    v.length <= 100 ||
                    "Las dimensiones no deben tener mas de 100 caracteres",
            ],
            priceRules: [
                (v) => !!v || "El precio es requerido",
                (v) =>
                    v.length <= 12 ||
                    "El precio no debe tener mas de 10 caracteres",
                // (v) =>
                //     v.match(ONLY_POSITIVE) ||
                //     "El precio debe ser un valor positivo",
            ],
            dateRules: [
                (v) => !!v || "La fecha es requerida",
            ],
        };
    },
};
