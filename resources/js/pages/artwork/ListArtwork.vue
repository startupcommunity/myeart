<template>
    <main-layout :showHeader="false">
        <!-- visible: md+ -->
        <Header class="hidden md:block" />

        <!-- visible mobile -->
        <div class="bg-zinc-900 pb-32 block md:hidden" v-if="!showOptionModal">
            <Header class="mt-5" />
        </div>

        <!-- sección hero -->
        <!-- visible: md + -->
        <HeroList
            :category="filters.category"
            :categories="categories"
            class="hidden md:block"
        />
        <!-- /sección hero -->

        <!-- content -->
        <section class="bg-white" id="results">
            <div class="container py-20">
                <div class="flex flex-wrap justify-start items-start">
                    <!-- filtros -->
                    <div class="w-[30%] md:pr-10 hidden md:block">
                        <!-- categorías -->
                        <h3
                            class="text-primary font-bold tracking-wide uppercase text-2xl"
                        >
                            Categorías
                        </h3>
                        <div class="my-4 w-full border-t border-gray-900"></div>
                        <CategoryTypeFilter
                            :selected="filters"
                            :categories="categories"
                            :subCategories="subCategories"
                        />
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
                                    track-color="grey lighten-2"
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
                                        track-color="grey lighten-2"
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
                                        track-color="grey lighten-2"
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
                                    track-color="grey lighten-2"
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
                    <div class="w-full md:w-[70%]">
                        <div class="flex justify-between">
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-2xl"
                            >
                                Resultados
                            </h3>
                            <div class="block md:hidden">
                                <v-btn
                                    raised
                                    text
                                    @click="showOptionModal = !showOptionModal"
                                >
                                    Filtrar
                                    <i class="fa-solid fa-list-check"></i>
                                </v-btn>
                            </div>
                        </div>
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
                                    color="#B2794C"
                                    item-color="brown darken-2"
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
                                    classCard="min-h-[34rem] bg-gray-50"
                                    v-else
                                />
                            </div>

                            <!-- paginación -->
                            <Paginator
                                class="w-full text-center my-4"
                                :counter="totalPages"
                                @load-page="loadPage"
                                v-if="this.artworkPublished.length"
                            />
                            <!-- /paginación -->
                        </div>
                        <!-- /cards - obras -->
                    </div>
                    <!-- /resultados -->
                </div>
            </div>
        </section>
        <!-- /content -->

        <!-- modal de filtros para version mobile -->
        <OptionsFilterModal
            @close-dialog-options-filter="showOptionModal = !showOptionModal"
            :show="showOptionModal"
            :options="filters"
            :categories="categories"
            :subcategories="subCategories"
            :labels="subLabels"
        />
    </main-layout>
</template>
<script>
import MainLayout from "../layouts/MainLayout.vue";
import Header from "../landing/sections/Header.vue";
import HeroList from "./sections/HeroList.vue";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import CardArtwork from "./sections/CardArtwork.vue";
import OptionsFilterModal from "./sections/OptionsFilterModal.vue";
import Paginator from "../../components/Paginator.vue";
import CategoryTypeFilter from "./components/CategoryTypeFilter.vue";

// mixin
import getDataMixin from "../../mixins/getDataMixin";
import utilMixin from "../../mixins/utilMixin";
import listArtworkMixin from "./utils/listArtworkMixin";

export default {
    name: "ListArtwork",
    components: {
        MainLayout,
        Header,
        HeroList,
        LoadingTailwind,
        CardArtwork,
        OptionsFilterModal,
        Paginator,
        CategoryTypeFilter,
    },
    mixins: [getDataMixin, utilMixin, listArtworkMixin],
    mounted() {
        // @getDataMixin
        this.getCategories();

        // @listArtworkMixin
        this.initArtworks();
    },
};
</script>
<style>
.v-slider--horizontal {
    margin-left: 0px;
    margin-right: 0px;
}
</style>
