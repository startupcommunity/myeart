<template>
    <div class="mb-6">
        <div class="flex flex-wrap">
            <div class="pr-2 w-3/6 lg:w-[30%]">
                <v-select
                    v-model="category.category_id"
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
                    v-model="category.sub_category_id"
                    :items="subCategories"
                    item-value="id"
                    item-text="name"
                    @change="loadLabels(category)"
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
                    v-model="category.sub_sub_category_id"
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
                    @click.stop="$emit('delete-category', index)"
                    raised
                    text
                    class="mt-4"
                >
                    <i class="fas fa-trash text-red-800"></i>
                </v-btn>
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
        index: {
            type: Number,
        },
        dataCategories: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    mounted() {
        if (this.category.category_id) {
            this.loadSubCat(this.category.category_id);
        }

        if (this.category.sub_category_id) {
            this.loadLabels(this.category);
        }
    },
    methods: {
        /**
         * Cargar las subcategorias
         */
        async loadSubCat(category_id) {
            this.loading = true;
            const ready = this.getSubCategories(category_id);
            ready.then(() => (this.loading = false));
        },

        /**
         * Cargar el tercer nivel, las etiquetas
         */
        async loadLabels(cat) {
            this.loading = true;
            const ready = this.getSubLabels(
                cat.category_id,
                cat.sub_category_id
            );
            ready.then(() => (this.loading = false));
        },
    },
};
</script>
