<template>
    <v-row justify="center">
        <v-dialog
            v-model="showDialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card class="px-8">
                <v-container>
                    <!-- title -->
                    <v-card-title>
                        <div class="flex justify-between">
                            <h3>
                                <span class="text-2xl font-bold">
                                    Responder a {{ comment.user?.name }}
                                </span>
                            </h3>
                            <div class="flex justify-end">
                                <v-btn
                                    icon
                                    @click="$emit('closeResponseDialog')"
                                    :disabled="globalLoading"
                                >
                                    <i class="fas fa-times text-gray-800"></i>
                                </v-btn>
                            </div>
                        </div>
                    </v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <h4 class="mb-4">
                            <span class="text-xl font-medium text-gray-400">
                                {{ comment.comment }}
                            </span>
                        </h4>
                        <!-- form -->
                        <v-form
                            ref="formAnswer"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-textarea
                                v-model="answer"
                                :rules="rules"
                                label="Respuesta"
                                outlined
                                rows="3"
                                color="#B2794C"
                                counter="1000"
                            ></v-textarea>

                            <v-btn
                                class="mr-4"
                                @click="saveResponse"
                                :disabled="!valid || globalLoading"
                                color="#B2794C"
                            >
                                <span class="text-white"> Guardar </span>
                            </v-btn>
                            <v-btn
                                @click="$emit('closeResponseDialog')"
                                color="red"
                                :disabled="globalLoading"
                            >
                                <span class="text-white"> Cancelar </span>
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-container>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import { mapGetters } from "vuex";

import badWords from "./../utils/listDisallowedWords";

export default {
    props: {
        comment: {
            type: Object,
            default: () => {},
        },
        showDialog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            valid: false,
            answer: "",
            rules: [
                (v) => !!v || "Debe escribir una respuesta",
                (v) =>
                    v.length <= 1000 ||
                    "La respuesta no debe superar los 1000 caracteres",

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
    watch: {
        showDialog(val) {
            if (val) {
                this.answer = "";
                this.$refs.formAnswer?.resetValidation();
            }
        },
    },
    methods: {
        saveResponse() {
            // validate formAnswer
            if (!this.$refs.formAnswer.validate()) {
                return;
            }

            this.globalLoading = true;

            // axios
            this.axios
                .post(this.ep.comments.artworkAnswerSave, {
                    answer: this.answer,
                    comment_id: this.comment?.id,
                    user_id: this.user?.id,
                })
                .then(() => this.$emit("saveAnswer"))
                .catch((err) => this.manageError(err))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
