<template>
    <div class="mb-6">
        <label class="font-black tracking-wide uppercase text-gray-900">
            Tipo de obra
        </label>
        <div class="flex flex-wrap">
            <div class="w-full pb-5">
                <v-chip-group
                    v-model.lazy="category.category_id"
                    column
                    @change="loadSubCat($event)"
                >
                    <v-chip
                        filter
                        outlined
                        large
                        color="#B2794C"
                        v-for="item in dataCategories"
                        :key="item.id"
                        :value="item.id"
                        @change="changeCat = true"
                    >
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            <i
                                class="text-primary"
                                :class="setIcon(item.name)"
                            ></i>
                            {{ item.name }}
                        </span>
                    </v-chip>
                </v-chip-group>
            </div>
            <div
                class="w-full lg:w-1/3"
                v-for="sub in subCategories"
                :key="sub.id"
            >
                <div class="border-b border-zinc-900 py-4 mb-4 w-full md:w-4/5">
                    <h4
                        class="font-black tracking-wide uppercase text-gray-900"
                    >
                        {{ sub.name }}
                    </h4>
                </div>

                <!-- para el editar -->
                <v-chip-group
                    v-if="edit && !changeCat"
                    multiple
                    column
                    @change="addSubCategoryAndLabel($event, sub.id)"
                    v-model="category.sub_category[getSubIndex(sub.id)].labels"
                >
                    <v-chip
                        filter
                        outlined
                        color="#B2794C"
                        v-for="label in sub.labels"
                        :key="label.id"
                        :value="label.id"
                        small
                    >
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            {{ label.name }}
                        </span>
                    </v-chip>
                </v-chip-group>

                <!-- para el crear -->
                <v-chip-group
                    v-else
                    multiple
                    column
                    @change="addSubCategoryAndLabel($event, sub.id)"
                >
                    <v-chip
                        filter
                        outlined
                        color="#B2794C"
                        v-for="label in sub.labels"
                        :key="label.id"
                        :value="label.id"
                        small
                    >
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            {{ label.name }}
                        </span>
                    </v-chip>
                </v-chip-group>
            </div>
        </div>
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    </div>
</template>
<script>
import getDataMixin from "../../../mixins/getDataMixin";
import utilMixin from "../../../mixins/utilMixin";
export default {
    mixins: [getDataMixin, utilMixin],
    props: {
        category: {
            type: Object,
        },
        dataCategories: {
            type: Array,
            default: [],
        },
        edit: {
            type: Boolean,
            default: false,
            description: "",
        },
    },
    data() {
        return {
            loading: false,
            changeCat: false,
        };
    },
    // mounted() {
    //     if (this.category.category_id) {
    //         console.log('cargo algo');
    //         this.loadSubCat(this.category.category_id, false);
    //     }
    // },
    watch: {
        category(val) {
            if (val.category_id) {
                this.loadSubCat(this.category.category_id, false);
            }
        },
    },
    methods: {
        /**
         * Cargar las subcategorias y los labels
         */
        loadSubCat(category_id, reset = true) {
            if (reset) this.resetSubCategory();

            if (!category_id) {
                this.category.category_id = "";

                // @getDataMixin
                this.subCategories = [];
                return;
            }

            this.loading = true;
            const ready = this.getSubCategories(category_id);
            ready.then(() => (this.loading = false));
        },

        /**
         * Agrega la sub categoría y etiquetas seleccionadas
         *  a la propiedad del formulario principal
         */
        addSubCategoryAndLabel(arrLabelIDs, sub_id) {
            const subCategory = this.category.sub_category;
            const find = subCategory.find((sc) => sc.id === sub_id);

            // eliminar la sub categoría de no existir etiquetas
            if (!arrLabelIDs.length) {
                const index = subCategory.findIndex((sub) => sub.id === sub_id);
                subCategory.splice(index, 1);
                return;
            }

            // de existir la sub categoría, agregar las etiquetas
            if (find) {
                find.labels = arrLabelIDs;
                return;
            }

            // de no existir nada, se crea
            // un nuevo obj con los datos
            subCategory.push({
                id: sub_id,
                labels: arrLabelIDs,
            });
        },

        /**
         * Reset de sub categorías
         */
        resetSubCategory() {
            this.category.sub_category = [];
        },

        /**
         * Carga el v-model con los labels correspondientes
         * encontrando por medio del id de ambos arrays
         *
         * PD: esto solo funciona para la version editar
         */
        getSubIndex(subID) {
            // intenta encontrar el index si fue seleccionado la etiqueta
            // en dicha sub categoría
            const index = this.category.sub_category.findIndex(
                (sub) => sub.id == subID
            );

            const defaultIndex = this.category.sub_category.length - 1;

            // en caso de no existir se retorna el
            // index por default creado al momento de cargar
            // el array de etiquetas
            return index === -1 ? defaultIndex : index;
        },
    },
};
</script>
