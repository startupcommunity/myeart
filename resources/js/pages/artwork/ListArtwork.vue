<template>
    <div class="dashboard">
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre y header -->
        <pre-header />
        <Header />
        <!-- /pre y header -->

        <!-- sección hero -->
        <HeroList :category="filters.category" :categories="categories" />
        <!-- /sección hero -->

        <!-- content -->
        <section class="bg-white">
            <div class="container py-20">
                <div class="flex flex-wrap justify-start items-start">
                    <!-- filtros -->
                    <div class="w-[30%] lg:pr-10">
                        <!-- categorías -->
                        <div>
                            <div>
                                <h3
                                    class="text-primary font-bold tracking-wide uppercase text-2xl"
                                >
                                    Categorías
                                </h3>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-chip-group
                                    v-model="filters.category"
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
                                v-if="filters.category"
                                class="animate-fade-in-down"
                            >
                                <h3
                                    class="text-primary font-bold tracking-wide uppercase text-2xl"
                                >
                                    SubCategorías
                                </h3>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-chip-group
                                    v-model="filters.subcategory"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        label
                                        filter
                                        outlined
                                        v-for="subcat in subCategories"
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
                                v-if="hasSubAndCategory"
                                class="animate-fade-in-down"
                            >
                                <h3
                                    class="text-primary font-bold tracking-wide uppercase text-2xl"
                                >
                                    Etiquetas
                                </h3>
                                <div
                                    class="my-4 w-full border-t border-gray-900"
                                ></div>
                                <v-select
                                    v-model="filters.label"
                                    :items="subLabels"
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
                                class="text-primary font-bold tracking-wide uppercase text-2xl"
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
                                    @change="filters.price = $event"
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
                                        @change="filters.width = $event"
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
                                        @change="filters.large = $event"
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
                                    @change="filters.weight = $event"
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
                    </div>
                    <!-- /filtros -->

                    <!-- resultados -->
                    <div class="w-[70%]">
                        <h3
                            class="text-primary font-bold tracking-wide uppercase text-2xl"
                        >
                            Resultados
                        </h3>
                        <div class="my-4 w-full border-t border-gray-900"></div>

                        <!-- ordenar por -->
                        <div class="flex justify-end">
                            <div class="inline-flex items-center">
                                <label
                                    class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                                >
                                    Ordenar por:
                                </label>
                                <v-select
                                    :items="sortBy"
                                    item-text="text"
                                    item-value="val"
                                    class="pl-2"
                                    v-model="filters.sortBy"
                                ></v-select>
                            </div>
                        </div>
                        <!-- /ordenar por -->

                        <!-- cards - obras -->
                        <div class="my-4">
                            <div class="flex flex-wrap h-full items-stretch">
                                <LoadingTailwind
                                    v-if="loadArtworkPublished"
                                    css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                                />
                                <CardArtwork
                                    v-for="(artwork, index) in artworkPublished"
                                    :artwork="artwork"
                                    :key="artwork.id"
                                    :class="index % 1 == 0 ? 'sm:px-4' : ''"
                                    v-else
                                />
                            </div>

                            <!-- mostrar mas resultados -->
                            <div
                                class="w-full text-center my-4"
                                v-if="artworkPublished.length"
                            >
                                <button
                                    class="w-auto px-6 py-3 bg-zinc-800 text-gray-50 border border-gray-800 hover:animate-shadow-and-color-app text-base font-light rounded-md uppercase"
                                    type="button"
                                    @click.stop=""
                                >
                                    Ver más
                                </button>
                            </div>
                            <!-- /mostrar mas resultados -->
                        </div>
                        <!-- /cards - obras -->
                    </div>
                    <!-- /resultados -->
                </div>
            </div>
        </section>
        <!-- /content -->
    </div>
</template>
<script>
import Header from "../landing/sections/Header.vue";
import PreHeader from "../landing/sections/PreHeader.vue";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import HeroList from "./sections/HeroList.vue";
import CardArtwork from "./sections/CardArtwork.vue";

// mixin
import getDataMixin from "../../mixins/getDataMixin";
import utilMixin from "../../mixins/utilMixin";
import listArtworkMixin from "./utils/listArtworkMixin";

export default {
    name: "ListArtwork",
    components: { PreHeader, Header, LoadingTailwind, HeroList, CardArtwork },
    mixins: [getDataMixin, utilMixin, listArtworkMixin],
    mounted() {
        // @getDataMixin
        this.getCategories();

        // @listArtworkMixin
        this.loadOneCategory();
        this.getArtworkPublished();
    },
    watch: {
        filters: {
            handler(filter) {
                // @getDataMixin
                if (filter.category) {
                    this.getSubCategories(filter.category);
                }

                // @getDataMixin
                if (this.hasSubAndCategory) {
                    this.getSubLabels(filter.category, filter.subcategory);
                }

                // @listArtworkMixin
                this.getFilterArtworkPublished();
            },
            deep: true,
        },

        // cuando la subcategoria cambia
        // se resetea el valor de la etiqueta
        "filters.subcategory"() {
            this.filters.label = 0;
        },
    },
    methods: {},
};
</script>
<style>
.v-slider--horizontal {
    margin-left: 0px;
    margin-right: 0px;
}
</style>
