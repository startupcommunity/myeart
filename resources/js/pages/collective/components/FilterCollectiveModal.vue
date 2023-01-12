<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
                <v-card-text>
                    <div class="flex justify-end mt-10">
                        <v-btn
                            raised
                            text
                            outlined
                            small
                            @click="$emit('close-dialog')"
                        >
                            Aceptar
                        </v-btn>
                    </div>
                    <div class="w-full pb-10">
                        <!-- tipos -->
                        <div class="py-2">
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-lg"
                            >
                                Tipo de colectivo
                            </h3>
                            <div
                                class="my-4 w-full border-t border-gray-900"
                            ></div>
                            <div>
                                <v-chip-group
                                    v-model="options.type"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        filter
                                        outlined
                                        v-for="type in getTypes"
                                        :key="type.value"
                                        :value="type.value"
                                        :color="changeColor(type.value)"
                                        class="border-o"
                                    >
                                        <span
                                            class="font-medium text-xs tracking-tighter"
                                        >
                                            {{ type.text }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>
                        <!-- /tipos -->

                        <!-- categorías -->
                        <div>
                            <div>
                                <div class="flex justify-between">
                                    <h3
                                        class="text-primary font-bold tracking-wide uppercase text-lg"
                                    >
                                        Categorías
                                    </h3>
                                </div>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <CategoryTypeFilter
                                    :selected="options"
                                    :categories="cats"
                                    :subCategories="subs"
                                />
                            </div>
                        </div>
                        <!-- categorías -->

                        <div class="flex justify-end items-end mt-10">
                            <v-btn
                                raised
                                text
                                outlined
                                small
                                @click="$emit('close-dialog')"
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
import getDataMixin from "../../../mixins/getDataMixin";
import utilMixin from "../../../mixins/utilMixin";
import CategoryTypeFilter from "../../artwork/components/CategoryTypeFilter.vue";

export default {
    name: "FilterCollectiveModal",
    components: { CategoryTypeFilter },
    mixins: [getDataMixin],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Object,
            Default: {},
        },
        cats: {
            type: Array,
            default: [],
        },
        subs: {
            type: Array,
            default: [],
        },
    },

    computed: {
        getTypes() {
            return this.collectiveTypes.filter((t) => t.value !== "");
        },
    },

    methods: {
        /**
         * Cambia el color según el type seleccionado
         */
        changeColor(id) {
            return this.options.type === id ? "#B2794C" : "#a9afb9";
        },
    },
};
</script>
