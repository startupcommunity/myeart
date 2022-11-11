<template>
    <div>
        <div>
            <v-chip-group
                v-model="selected.category"
                column
                show-arrows
                center-active
                class="mx-auto my-4"
            >
                <v-chip
                    filter
                    outlined
                    v-for="cat in categories"
                    :color="changeColor(cat.id, 'cat')"
                    :key="cat.id"
                    :value="cat.id"
                    class="border-o"
                >
                    <span
                        class="font-medium text-xs tracking-tighter"
                        :class="changeColor(cat.id, 'cat')"
                    >
                        <i class="text-gray-400" :class="setIcon(cat.name)"></i>
                        {{ cat.name }}
                    </span>
                </v-chip>
            </v-chip-group>
        </div>
        <div v-if="showSub">
            <div class="w-full" v-for="sub in subCategories" :key="sub.id">
                <div class="border-b border-zinc-900 py-4 mb-4 w-full">
                    <h4
                        class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                    >
                        {{ sub.name }}
                    </h4>
                </div>

                <v-chip-group column v-model="selected.label">
                    <v-chip
                        filter
                        outlined
                        v-for="label in sub.labels"
                        :color="changeColor(label.id, 'label')"
                        :key="label.id"
                        :value="label.id"
                    >
                        <span
                            class="font-medium text-xs tracking-tighter"
                            :class="changeColor(label.id, 'label')"
                        >
                            {{ label.name }}
                        </span>
                    </v-chip>
                </v-chip-group>
            </div>
        </div>
    </div>
</template>
<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "CategoryTypeFilter",
    mixins: [utilMixin],
    props: {
        selected: {
            type: Object,
            default: {
                category: 0,
                label: 0,
            },
        },
        categories: {
            type: Array,
            default: [],
        },
        subCategories: {
            type: Array,
            default: [],
        },
    },
    methods: {
        /**
         * Cambia el color según el type seleccionado
         */
        changeColor(id, type) {
            if (type === "cat") {
                return this.selected.category === id ? "#B2794C" : "#a9afb9";
            }

            if (type === "label") {
                return this.selected.label === id ? "#B2794C" : "#a9afb9";
            }
        },
    },

    computed: {
        /**
         * Verifica si hay una categoría seleccionada
         *
         * @returns
         */
        showSub() {
            return this.selected.category ? true : false;
        },
    },
};
</script>
