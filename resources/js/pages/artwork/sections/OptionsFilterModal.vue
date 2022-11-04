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
                                            $emit('close-dialog-options-filter')
                                        "
                                    >
                                        Aceptar
                                    </v-btn>
                                </div>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-chip-group
                                    v-model="options.category"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        label
                                        filter
                                        outlined
                                        v-for="cat in categories"
                                        :key="cat.id"
                                        :value="cat.id"
                                        class="border-o"
                                    >
                                        <span
                                            class="font-medium text-gray-900 text-xs tracking-tighter"
                                        >
                                            <i
                                                class="text-primary"
                                                :class="setIcon(cat.name)"
                                            ></i>
                                            {{ cat.name }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                            <div
                                v-if="options.category"
                                class="animate-fade-in-down"
                            >
                                <h3
                                    class="text-primary font-bold tracking-wide uppercase text-lg"
                                >
                                    SubCategorías
                                </h3>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-chip-group
                                    v-model="options.subcategory"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        label
                                        filter
                                        outlined
                                        v-for="subcat in subcategories"
                                        :key="subcat.id"
                                        :value="subcat.id"
                                        class="border-o"
                                    >
                                        <span
                                            class="font-medium text-gray-900 text-xs tracking-tighter"
                                        >
                                            {{ subcat.name }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                            <div
                                v-if="options.category && options.subcategory"
                                class="animate-fade-in-down"
                            >
                                <h3
                                    class="text-primary font-bold tracking-wide uppercase text-lg"
                                >
                                    Etiquetas
                                </h3>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-select
                                    v-model="options.label"
                                    :items="sublabels"
                                    item-value="id"
                                    item-text="name"
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
                        </div>
                        <!-- categorías -->

                        <!-- numéricos -->
                        <div class="py-2">
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-lg"
                            >
                                Filtros
                            </h3>
                            <div
                                class="my-4 w-full border-t border-gray-900"
                            ></div>

                            <!-- precios -->
                            <div class="my-4">
                                <label
                                    class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                                >
                                    Rango de precio
                                </label>
                                <v-slider
                                    @change="options.price = $event"
                                    min="0"
                                    max="10000"
                                    color="#b2794c"
                                    thumb-color="#b2794c"
                                    thumb-label
                                    hide-details
                                    class="w-full"
                                >
                                </v-slider>
                                <div
                                    class="flex flex-row justify-between -mt-2 text-xs"
                                >
                                    <p>0 {{ euro }}</p>
                                    <p>+10,000 {{ euro }}</p>
                                </div>
                            </div>

                            <!-- tamaño - dimensiones -->
                            <div class="my-4">
                                <label
                                    class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                                >
                                    Tamaño
                                </label>

                                <!-- ancho -->
                                <div>
                                    <label
                                        class="text-zinc-900 tracking-widest text-xs font-normal"
                                    >
                                        Ancho
                                    </label>
                                    <v-slider
                                        @change="options.width = $event"
                                        min="0"
                                        max="500"
                                        color="#b2794c"
                                        thumb-color="#b2794c"
                                        thumb-label
                                        hide-details
                                        class="w-full"
                                    >
                                    </v-slider>
                                    <div
                                        class="flex flex-row justify-between -mt-2 text-xs"
                                    >
                                        <p>0 cm</p>
                                        <p>+500 cm</p>
                                    </div>
                                </div>

                                <!-- largo -->
                                <div class="my-4">
                                    <label
                                        class="text-zinc-900 tracking-widest text-xs font-normal"
                                    >
                                        Largo
                                    </label>
                                    <v-slider
                                        @change="options.large = $event"
                                        min="0"
                                        max="500"
                                        color="#b2794c"
                                        thumb-color="#b2794c"
                                        thumb-label
                                        hide-details
                                        class="w-full"
                                    >
                                    </v-slider>
                                    <div
                                        class="flex flex-row justify-between -mt-2 text-xs"
                                    >
                                        <p>0 cm</p>
                                        <p>+500 cm</p>
                                    </div>
                                </div>
                            </div>

                            <!-- peso -->
                            <div class="my-4">
                                <label
                                    class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                                >
                                    Peso
                                </label>
                                <v-slider
                                    @change="options.weight = $event"
                                    min="0"
                                    max="100"
                                    color="#b2794c"
                                    thumb-color="#b2794c"
                                    thumb-label
                                    hide-details
                                    class="w-full"
                                >
                                </v-slider>
                                <div
                                    class="flex flex-row justify-between -mt-2 text-xs"
                                >
                                    <p>0 kg</p>
                                    <p>100 kg</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <v-btn
                                raised
                                text
                                outlined
                                @click="$emit('close-dialog-options-filter')"
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
import utilMixin from "../../../mixins/utilMixin";
export default {
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
        },
        subcategories: {
            type: Array,
        },
        sublabels: {
            type: Array,
        },
    },
    mixins: [utilMixin],
};
</script>
