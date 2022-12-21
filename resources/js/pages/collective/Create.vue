<template>
    <WomanLayout :loading="globalLoading">
        <section class="w-full">
            <div class="py-10">
                <div class="flex justify-md-end justify-center">
                    <div
                        class="bg-[#0d0d0d] px-5 px-md-16 py-5 rounded md:w-[600px] w-full"
                    >
                        <div class="flex flex-col gap-6">
                            <BackButton
                                class="text-white"
                                class-icon="text-white"
                            />
                            <h1 class="text-3xl font-light text-white">
                                Crear colectivo
                            </h1>
                            <v-form
                                ref="formCollective"
                                v-model="isValid"
                                lazy-validation
                                @submit.prevent="createCollective"
                            >
                                <label
                                    for="name"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Nombre del colectivo
                                </label>
                                <v-text-field
                                    outlined
                                    placeholder="ejemplo: Art. colectivo"
                                    id="name"
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    class="text-gray-400"
                                    v-model="form.name"
                                    :rules="nameRules"
                                ></v-text-field>
                                <label
                                    for="category"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Categoría
                                </label>
                                <v-text-field
                                    outlined
                                    placeholder="ejemplo: Empresa, galeria de arte, adm. pública"
                                    id="category"
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    class="text-gray-400"
                                    v-model="form.category"
                                    :rules="categoryRules"
                                ></v-text-field>
                                <label
                                    for="description"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Descripción
                                </label>
                                <v-textarea
                                    outlined
                                    placeholder="Describe tu colectivo (max: 200 caracteres)"
                                    id="description"
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    class="text-gray-400"
                                    v-model="form.description"
                                    :rules="descriptionRules"
                                ></v-textarea>

                                <div
                                    class="flex flex-col justify-center items-center gap-3"
                                >
                                    <v-btn
                                        color="#B2794C"
                                        class="uppercase tracking-widest text-white"
                                        block
                                        type="submit"
                                        large
                                    >
                                        <span class="font-bold">
                                            Crear colectivo
                                        </span>
                                    </v-btn>
                                    <v-btn
                                        class="uppercase tracking-widest text-white"
                                        block
                                        type="button"
                                        text
                                        @click.stop="$router.go(-1)"
                                    >
                                        <span class="font-bold">
                                            Volver atrás
                                        </span>
                                    </v-btn>
                                </div>
                            </v-form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </WomanLayout>
</template>

<script>
import BackButton from "../../components/BackButton.vue";
import WomanLayout from "../layouts/WomanLayout.vue";

export default {
    name: "Create",
    components: { WomanLayout, BackButton },

    data() {
        return {
            isValid: true,
            form: {
                name: "",
                category: "",
                description: "",
            },
            nameRules: [
                (v) => !!v || "Nombre es requerido",
                (v) =>
                    (v && v.length <= 100) ||
                    "El nombre debe tener menos de 100 caracteres",
            ],
            categoryRules: [
                (v) => !!v || "Categoría es requerido",
                (v) =>
                    (v && v.length <= 100) ||
                    "La categoría debe tener menos de 100 caracteres",
            ],
            descriptionRules: [
                (v) => !!v || "Descripción es requerido",
                (v) =>
                    (v && v.length <= 200) ||
                    "La descripción debe tener menos de 200 caracteres",
            ],
        };
    },

    mounted() {
        // cambiar el theme por el claro
        this.$vuetify.theme.dark = true;
    },

    methods: {
        createCollective() {
            // validar
            if (!this.$refs.formCollective.validate()) {
                return;
            }

            // enviar datos
            this.globalLoading = true;
            this.axios
                .post(this.ep.collectives.store, this.form)
                .then((resp) => {
                    if (resp.status === 201) {
                        this.noty("Colectivo creado con éxito");

                        // vaciar formulario
                        this.$refs.formCollective.reset();

                        // cambiar tema 
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
