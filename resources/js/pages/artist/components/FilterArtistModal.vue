<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            content-class=""
        >
            <v-card>
                <v-card-text>
                    <div class="w-full pt-20 pb-10">
                        <!-- categorías -->
                        <div>
                            <div>
                                <div class="flex justify-between">
                                    <h3
                                        class="text-primary font-bold tracking-wide uppercase text-lg"
                                    >
                                        Categorías
                                    </h3>
                                    <v-btn
                                        raised
                                        text
                                        outlined
                                        small
                                        @click="
                                            $emit('close-filter-dialog-artist')
                                        "
                                    >
                                        Aceptar
                                    </v-btn>
                                </div>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <CategoryTypeFilter
                                    :selected="options"
                                    :categories="categories"
                                    :subCategories="subcategories"
                                />
                            </div>
                        </div>
                        <!-- categorías -->

                        <div class="flex justify-end">
                            <v-btn
                                raised
                                text
                                outlined
                                @click="$emit('close-filter-dialog-artist')"
                            >
                                Aceptar
                            </v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
import CategoryTypeFilter from "../../artwork/components/CategoryTypeFilter.vue";
export default {
    components: { CategoryTypeFilter },
    name: "OptionsFilterModal",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Object,
            Default: {},
        },
        categories: {
            type: Array,
            default: [],
        },
        subcategories: {
            type: Array,
            default: [],
        },
    },
};
</script>
