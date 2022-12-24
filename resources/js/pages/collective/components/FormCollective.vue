<template>
    <v-form
        ref="form"
        v-model="isValid"
        lazy-validation
        @submit.prevent="updateCollective"
    >
        <!-- nombre -->
        <label for="name" class="text-gray-500 font-thin">
            Nombre del colectivo
        </label>
        <v-text-field
            outlined
            placeholder="ejemplo: Art. colectivo"
            id="name"
            color="#B2794C"
            v-model="form.name"
            :rules="nameRules"
        ></v-text-field>

        <!-- tipo -->
        <label for="type" class="text-gray-500 font-thin">
            Tipo de colectivo
        </label>
        <v-autocomplete
            v-model="form.type"
            :items="collectiveTypes"
            outlined
            dense
            color="#B2794C"
            id="type"
            height="56"
            :rules="typeRules"
        ></v-autocomplete>

        <!-- ubicacion -->
        <label for="location" class="text-gray-500 font-thin">
            Ubicación
        </label>
        <v-text-field
            outlined
            placeholder="ejemplo: Avenida 12, Madrid, España"
            id="location"
            color="#B2794C"
            class="text-gray-400"
            v-model="form.location"
            :rules="nameRules"
        ></v-text-field>

        <!-- Categoria -->
        <label for="categories" class="text-gray-500 font-thin">
            Categorías
        </label>
        <v-autocomplete
            v-model="form.categories"
            :items="categories"
            color="#B2794C"
            item-color="#B2794C"
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
                    <span class="text-white">
                        {{ data.item.name }}
                    </span>
                </v-chip>
            </template>
        </v-autocomplete>

        <!-- descripcion -->
        <label for="description" class="text-gray-500 font-thin">
            Descripción
        </label>
        <v-textarea
            outlined
            placeholder="Describe tu colectivo (max: 200 caracteres)"
            id="description"
            color="#B2794C"
            class="text-gray-400"
            v-model="form.description"
            :rules="descriptionRules"
            rows="3"
        ></v-textarea>

        <!-- botones -->
        <div class="flex flex-col justify-center items-center gap-3">
            <v-btn
                color="#B2794C"
                class="uppercase tracking-widest text-white rounded-md"
                type="submit"
                large
                :disabled="!isValid || globalLoading"
            >
                <span class="font-bold"> Guardar cambios </span>
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import getDataMixin from "../../../mixins/getDataMixin";
import profileMixin from "../modules/profile-mixin";

export default {
    name: "FormCollective",
    mixins: [getDataMixin, profileMixin],
    props: {
        data: {
            type: Object,
            default: () => ({}),
        },
    },

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
        this.loadData();
    },

    methods: {
        loadData() {
            this.form = JSON.parse(JSON.stringify(this.data));
            this.form.categories = [];

            // cargar categorias
            this.data.categories.forEach((category) => {
                this.form.categories.push(category.category_id);
            });
        },

        remove(item) {
            const index = this.form.categories.indexOf(item.id);
            if (index >= 0) this.form.categories.splice(index, 1);
        },

        updateCollective() {
            // validar
            if (!this.$refs.form.validate()) return;

            const data = {
                name: this.form.name,
                description: this.form.description,
                type: this.form.type,
                location: this.form.location,
                categories: this.form.categories,
                _method: "PUT",
            };

            this.globalLoading = true;

            // enviar datos
            this.axios
                .post(this.ep.collectives.update + this.form.id, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.notySwal({
                            title: "¡Éxito!",
                            text: "Colectivo actualizado correctamente",
                        });

                        this.$store.dispatch("getUserCollective", this.form.id);
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
