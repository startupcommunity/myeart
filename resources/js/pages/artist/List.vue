<template>
    <main-layout :showHeader="false">
        <!-- visible: md+ -->
        <!-- <Header class="hidden md:block" /> -->

        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- content -->
        <section class="bg-white" id="list-artist">
            <div class="container py-20">
                <div class="flex flex-wrap justify-start items-start">
                    <!-- filtros -->
                    <div class="w-[30%] md:pr-10 hidden md:block">
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
                                        filter
                                        outlined
                                        color="#B2794C"
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
                                        filter
                                        outlined
                                        color="#B2794C"
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
                                <v-chip-group
                                    v-model="filters.label"
                                    column
                                    show-arrows
                                    center-active
                                    class="mx-auto my-4"
                                >
                                    <v-chip
                                        filter
                                        outlined
                                        color="#B2794C"
                                        v-for="label in subLabels"
                                        :key="label.id"
                                        :value="label.id"
                                        class="border-o"
                                    >
                                        <span
                                            class="font-medium text-gray-900 text-xs tracking-tighter"
                                        >
                                            {{ label.name }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>
                        <!-- categorías -->
                    </div>
                    <!-- /filtros -->

                    <!-- resultados -->
                    <div class="w-full md:w-[70%]">
                        <div class="flex justify-end">
                            <div
                                class="flex flex-wrap items-center justify-end"
                            >
                                <button @click.prevent="" class="me-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-layout-grid"
                                        width="50"
                                        height="50"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#cccccc"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <rect
                                            x="4"
                                            y="4"
                                            width="6"
                                            height="6"
                                            rx="1"
                                        />
                                        <rect
                                            x="14"
                                            y="4"
                                            width="6"
                                            height="6"
                                            rx="1"
                                        />
                                        <rect
                                            x="4"
                                            y="14"
                                            width="6"
                                            height="6"
                                            rx="1"
                                        />
                                        <rect
                                            x="14"
                                            y="14"
                                            width="6"
                                            height="6"
                                            rx="1"
                                        />
                                    </svg>
                                </button>
                                <button @click.prevent="">
                                    <i
                                        class="fas fa-bars fa-3x text-gray-900"
                                    ></i>
                                </button>
                            </div>
                            <div class="block md:hidden">
                                <v-btn
                                    raised
                                    text
                                    @click="showFilterModal = !showFilterModal"
                                >
                                    Filtrar
                                    <i class="fa-solid fa-list-check"></i>
                                </v-btn>
                            </div>
                        </div>

                        <!-- ordenar por -->
                        <!-- <div class="flex justify-end">
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
                        </div> -->
                        <!-- /ordenar por -->

                        <!-- cards - obras -->
                        <div class="my-4">
                            <div class="flex flex-wrap h-full items-stretch">
                                <LoadingTailwind
                                    v-if="loadingArtist"
                                    css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                                />
                                <!-- <CardArtist
                                    v-for="(artwork, index) in artworkPublished"
                                    :artwork="artwork"
                                    :key="artwork.id"
                                    :class="index % 1 == 0 ? 'sm:px-4' : ''"
                                    v-else
                                /> -->
                            </div>

                            <!-- paginación -->
                            <!-- <Paginator
                                class="w-full text-center my-4"
                                :counter="totalPages"
                                @load-page="loadPage"
                                v-if="this.artworkPublished.length"
                            /> -->
                            <!-- /paginación -->
                        </div>
                        <!-- /cards - obras -->
                    </div>
                    <!-- /resultados -->
                </div>
            </div>
        </section>
        <!-- /content -->
    </main-layout>
</template>
<script>
import MainLayout from "../layouts/MainLayout.vue";
import Header from "../landing/sections/Header.vue";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import Paginator from "../../components/Paginator.vue";
import CardArtist from "./../profile/components/CardArtist.vue";

// mixin
import getDataMixin from "../../mixins/getDataMixin";
import utilMixin from "../../mixins/utilMixin";
import listArtistMixin from "./utils/listArtistMixin";

export default {
    name: "ListArtist",
    components: {
        MainLayout,
        Header,
        LoadingTailwind,
        CardArtist,
        Paginator,
    },
    mixins: [getDataMixin, utilMixin, listArtistMixin],
    mounted() {
        // @getDataMixin
        this.getCategories();

        // @listArtistMixin
        // this.initArtworks();
    },
};
</script>
