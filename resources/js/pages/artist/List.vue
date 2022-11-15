<template>
    <main-layout :showHeader="false">
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
                        <h3
                            class="text-primary font-bold tracking-wide uppercase text-2xl"
                        >
                            Categorías
                        </h3>
                        <div class="my-4 w-full border-t border-gray-900"></div>
                        <!-- categorías -->
                        <CategoryTypeFilter
                            :selected="filters"
                            :categories="categories"
                            :subCategories="subCategories"
                        />
                    </div>
                    <!-- /filtros -->

                    <!-- resultados -->
                    <div class="w-full md:w-[70%]">
                        <div class="flex justify-end">
                            <div
                                class="flex flex-wrap items-center justify-end"
                            >
                                <button
                                    @click.prevent="reloadCard(modeCard.col)"
                                    class="me-5"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-layout-grid"
                                        width="50"
                                        height="50"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        :stroke="
                                            mode.col ? '#18181b' : '#cccccc'
                                        "
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
                                <button
                                    @click.prevent="reloadCard(modeCard.row)"
                                >
                                    <i
                                        class="fas fa-bars fa-3x"
                                        :class="
                                            mode.row
                                                ? 'text-zinc-900'
                                                : 'text-gray-300'
                                        "
                                    ></i>
                                </button>
                            </div>
                            <!-- <div class="block md:hidden">
                                <v-btn
                                    raised
                                    text
                                    @click="showFilterModal = !showFilterModal"
                                >
                                    Filtrar
                                    <i class="fa-solid fa-list-check"></i>
                                </v-btn>
                            </div> -->
                        </div>

                        <!-- cards - obras -->
                        <div class="my-4">
                            <div class="flex flex-wrap">
                                <LoadingTailwind
                                    v-if="loadingArtist"
                                    css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                                />
                                <div
                                    v-else
                                    class="flex flex-wrap items-stretch"
                                >
                                    <div
                                        v-for="(artist, index) in artists"
                                        :key="artist.id"
                                        :class="{
                                            'sm:px-4': index % 1 == 0,
                                            'md:w-1/2 lg:w-1/3 xl:w-1/4':
                                                mode.col,
                                            'w-full flex flex-wrap': mode.row,
                                        }"
                                    >
                                        <CardArtist
                                            :showButtonFollow="true"
                                            :routerLink="true"
                                            :artist="artist"
                                            :class="{ 'md:w-3/12': mode.row }"
                                        />
                                        <div v-if="mode.row" class="md:w-9/12 md:pl-8">
                                            <h3>
                                                algunas obras de
                                                {{ artist.name }}
                                            </h3>
                                            <div class="md:pt-3">
                                                <!-- cards -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- paginación -->
                            <Paginator
                                class="w-full text-center my-4"
                                :counter="totalPages"
                                @load-page="loadPage"
                                v-if="this.artists.length"
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
import CategoryTypeFilter from "../artwork/components/CategoryTypeFilter.vue";

export default {
    name: "ListArtist",
    components: {
        MainLayout,
        Header,
        LoadingTailwind,
        CardArtist,
        Paginator,
        CategoryTypeFilter,
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
