// listDisallowedWords utils
import badWords from "../../artwork/utils/listDisallowedWords";

export default {
    data() {
        return {
            isFormValid: true,
            rulesComment: [
                (v) => !!v || "No hay texto escrito",
                (v) =>
                    v.length <= 1000 ||
                    "El texto no debe superar los 1000 caracteres",

                // validar palabras no permitidas
                (v) => {
                    // array de palabras no permitidas
                    let badWordsFound = [];
                    badWords.forEach((word) => {
                        if (v.toLowerCase().includes(word)) {
                            badWordsFound.push(word);
                        }
                    });

                    // mensaje error, resaltar las palabras no permitidas
                    const mjs_error = `Las siguientes palabras no están permitidas:
              ${badWordsFound.join(
                  ", "
              )}, tenga cuidado al ingresar malas palabras`;

                    // validar si hay palabras no permitidas
                    if (badWordsFound.length > 0) {
                        return mjs_error;
                    }

                    return true;
                },
            ],
        };
    },
};
