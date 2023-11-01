<template>
    <v-form ref="commentForm" v-model="validForm" lazy-validation>
        <div class="flex flex-wrap items-center mt-5">
            <div class="w-full md:w-4/5">
                <h4>
                    <span class="text-xl font-medium">
                        ¿Tienes una pregunta?
                    </span>
                </h4>
                <v-textarea
                    class="mx-2"
                    label="Escribe tu pregunta..."
                    rows="1"
                    counter
                    :rules="commentRule"
                    v-model="form.comment"
                    color="#B2794C"
                ></v-textarea>
            </div>
            <div class="w-full md:w-1/5">
                <v-btn
                    large
                    class="mt-4"
                    color="#B2794C"
                    :disabled="!validForm || loading"
                    @click="addComment"
                >
                    <span class="text-white">Preguntar</span>
                </v-btn>
            </div>
        </div>
    </v-form>
</template>
<script>
// vuex
import { mapGetters } from "vuex";

// palabras no permitidas
import badWords from "./../utils/listDisallowedWords";

export default {
    props: {
        artwork: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            validForm: false,
            loading: false,
            form: {
                comment: "",
            },

            // rules
            commentRule: [
                (v) => !!v || "Debe escribir una pregunta",
                (v) =>
                    v.length <= 500 ||
                    "El comentario no puede ser mayor a 500 caracteres",

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
    computed: {
        ...mapGetters({
            user: "getProfile",
        }),
    },
    methods: {
        /**
         * Agrega una nueva pregunta o comentario
         */
        addComment() {
            if (!this.$refs.commentForm.validate()) {
                return;
            }

            this.loading = true;
            const data = {
                artwork_id: this.artwork?.id,
                user_id: this.user?.id,
                comment: this.form.comment,
            };

            this.axios
                .post(this.ep.comments.artworkSave, data)
                .then((resp) => {
                    this.form.comment = "";
                    this.$refs.commentForm.resetValidation();
                    this.$noty("Pregunta agregada correctamente");

                    // emit
                    this.$emit("saveComment", resp.data);
                })
                .catch((err) => this.$manageError(err))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
