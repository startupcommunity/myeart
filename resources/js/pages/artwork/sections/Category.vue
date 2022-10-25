<template>
    <div class="mb-6">
        <div class="flex flex-wrap">
            <div class="pr-2 w-3/6 lg:w-[30%]">
                <v-select
                    v-model="cat.category"
                    :items="dataCategories"
                    item-value="id"
                    item-text="name"
                    @change="loadSubCat($event)"
                >
                    <template slot="label">
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            Categorías
                        </span>
                    </template>
                    <template v-slot:selection="{ item }">
                        <span
                            class="font-medium text-gray-900 text-xl tracking-tighter"
                        >
                            <i
                                class="text-primary"
                                :class="setIcon(item.name)"
                            ></i>
                            {{ item.name }}
                        </span>
                    </template>
                    <template v-slot:item="{ item }">
                        <span
                            class="font-medium text-gray-900 text-xl tracking-tighter"
                        >
                            <i
                                class="text-primary"
                                :class="setIcon(item.name)"
                            ></i>
                            {{ item.name }}
                        </span>
                    </template>
                </v-select>
            </div>
            <div class="pr-2 w-3/6 lg:w-[30%]">
                <v-select
                    v-model="cat.sub_category"
                    :items="subCategories"
                    item-value="id"
                    item-text="name"
                    @change="loadLabels(index)"
                >
                    <template slot="label">
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            Subcategorias
                        </span>
                    </template>
                </v-select>
            </div>
            <div class="w-3/6 lg:w-[30%] pr-2">
                <v-select
                    v-model="cat.labels"
                    :items="subLabels"
                    item-value="id"
                    item-text="name"
                    multiple
                >
                    <template slot="label">
                        <span
                            class="font-black tracking-wide uppercase text-gray-900"
                        >
                            Etiquetas
                        </span>
                    </template>
                </v-select>
            </div>
            <div class="w-3/6 lg:w-[10%]">
                <v-btn
                    @click.stop="deleteCategory(index)"
                    raised
                    text
                    class="mt-4"
                >
                    <i class="fas fa-trash text-red-800"></i>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import getDataMixin from "../../../mixins/getDataMixin";
import utilMixin from "../../../mixins/utilMixin";
export default {
    mixins: [getDataMixin, utilMixin],
    props: {
        cat: {
            type: Object,
        },
        form: {
            type: Object,
        },
        index: {
            type: Number,
        },
        dataCategories: {
            type: Array,
            default: [],
        },
    },
    methods: {
        /**
         * Cargar las subcategorias
         */
        loadSubCat(category_id) {
            this.getSubCategories(category_id);
        },

        /**
         * Cargar el tercer nivel, las etiquetas
         */
        loadLabels(index) {
            const data = this.form.categories[index];
            this.getSubLabels(data.category, data.sub_category);
        },

        /**
         * Elimina un objecto del array de categorías
         */
        deleteCategory(index) {
            this.form.categories.splice(index, 1);
        },
    },
};
</script>
