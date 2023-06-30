<template>
    <WomanLayout :loading="globalLoading">
        <section class="w-full">
            <div class="py-10">
                <div class="flex justify-md-end justify-center">
                    <div
                        class="bg-gradient-to-t from-[#272727]/20 bg-white/20 rounded-t-[2rem] md:bg-[#0d0d0d] px-8 px-md-16 py-8 md:rounded md:w-[600px] w-full -mb-10 md:-mb-0"
                    >
                        <div class="flex flex-col gap-1 md:gap-6">
                            <BackButton
                                class="text-white"
                                class-icon="text-white"
                            />
                            <h1
                                class="text-3xl font-light text-white py-7 py-md-0 text-center text-md-left"
                            >
                                Crear colectivo
                            </h1>
                            <v-form
                                ref="formCollective"
                                v-model="isValid"
                                lazy-validation
                                @submit.prevent="createCollective"
                            >
                                <!-- nombre -->
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

                                <!-- tipo -->
                                <label
                                    for="type"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Tipo de colectivo
                                </label>
                                <v-autocomplete
                                    v-model="form.type"
                                    :items="collectiveTypes"
                                    outlined
                                    dense
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    id="type"
                                    height="56"
                                    :rules="typeRules"
                                ></v-autocomplete>

                                <!-- ubicacion -->
                                <label
                                    for="location"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Ubicación
                                </label>
                                <v-text-field
                                    outlined
                                    placeholder="ejemplo: Avenida 12, Madrid, España"
                                    id="location"
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    class="text-gray-400"
                                    v-model="form.location"
                                    :rules="nameRules"
                                ></v-text-field>

                                <!-- Categoria -->
                                <label
                                    for="categories"
                                    class="text-[#f0f0f0] font-thin"
                                >
                                    Categorías
                                </label>
                                <v-autocomplete
                                    v-model="form.categories"
                                    :items="categories"
                                    color="#eeeeee"
                                    background-color="#5f5f5f"
                                    id="categories"
                                    item-value="id"
                                    item-text="name"
                                    filled
                                    outlined
                                    dense
                                    multiple
                                    small-chips
                                    height="56"
                                    :rules="categoriesRules"
                                >
                                    <template v-slot:selection="data">
                                        <v-chip
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            close
                                            @click="data.select"
                                            @click:close="remove(data.item)"
                                            color="#B2794C"
                                            small
                                        >
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                </v-autocomplete>

                                <!-- descripcion -->
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
                                    rows="3"
                                ></v-textarea>

                                <!-- botones -->
                                <div
                                    class="flex flex-col justify-center items-center gap-3"
                                >
                                    <v-btn
                                        color="#B2794C"
                                        class="uppercase tracking-widest text-white"
                                        block
                                        type="submit"
                                        large
                                        :disabled="!isValid || globalLoading"
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
import getDataMixin from "../../mixins/getDataMixin";
import WomanLayout from "../layouts/WomanLayout.vue";

export default {
    name: "Create",
    mixins: [getDataMixin],
    components: { WomanLayout, BackButton },

    data() {
        return {
            isValid: true,
            form: {
                name: "",
                categories: [],
                description: "",
                type: "",
                location: "",
            },
            nameRules: [
                (v) => !!v || "El campo es requerido",
                (v) =>
                    (v && v.length <= 100) ||
                    "El campo debe tener menos de 100 caracteres",
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
            categoriesRules: [
                (v) => !!v || "Debe seleccionar al menos una categoría",
            ],
            typeRules: [(v) => !!v || "Debe seleccionar un tipo de colectivo"],
        };
    },

    created() {
        this.getCategories();
    },

    mounted() {
        // cambiar el theme por el claro
        this.$vuetify.theme.dark = true;
    },

    methods: {
        remove(item) {
            const index = this.form.categories.indexOf(item.id);
            if (index >= 0) this.form.categories.splice(index, 1);
        },

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
                        // vaciar formulario
                        this.$refs.formCollective.reset();

                        // mostrar alert
                        this.notySwal({
                            title: "Colectivo creado",
                            text: "El colectivo se ha creado correctamente",
                        });

                        this.$vuetify.theme.dark = false;

                        setTimeout(() => {
                            this.$router.push({
                                name: "collectiveProfile",
                                params: { id: resp.data.id },
                            });
                        }, 500);
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
