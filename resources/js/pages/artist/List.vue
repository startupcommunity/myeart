<template>
    <main-layout :showHeader="false">
        <!-- header -->
        <div class="bg-zinc-900 pb-32" v-if="!showFilterModal">
            <Header class="mt-5" />
        </div>

        <!-- content -->
        <section class="bg-white" id="list-artist">
            <div class="py-20 container">
                <!-- title -->
                <div class="flex flex-wrap justify-start items-start">
                    <div
                        class="hidden md:block"
                        :class="{
                            'md:w-[30%]': mode.col,
                            'md:w-[24%]': mode.row,
                        }"
                    >
                        <div class="w-full pb-4 border-b border-gray-900">
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-2xl"
                            >
                                Categorías
                            </h3>
                        </div>
                    </div>
                    <div
                        class="w-full"
                        :class="{
                            'md:w-[70%]': mode.col,
                            'md:w-[76%]': mode.row,
                        }"
                    >
                        <div class="flex justify-end items-center">
                            <div class="block md:hidden">
                                <v-btn
                                    raised
                                    text
                                    @click="showFilterModal = !showFilterModal"
                                >
                                    <span class="text-xl"> Filtrar </span>
                                    <i class="fa-solid fa-list-check fa-2x"></i>
                                </v-btn>
                            </div>
                            <div
                                class="flex-wrap items-center justify-end hidden md:flex"
                            >
                                <button
                                    @click.prevent="loadMode(modeCard.col)"
                                    class="md:pr-5"
                                    :disabled="!hasArtists"
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
                                    @click.prevent="loadMode(modeCard.row)"
                                    :disabled="!hasArtists"
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
                        </div>
                    </div>
                </div>

                <!-- content -->
                <div :class="{ 'md:-mr-60': mode.row }">
                    <div class="flex flex-wrap justify-start items-start">
                        <!-- filtros -->
                        <div
                            class="hidden md:flex"
                            :class="{
                                'md:w-[30%]': mode.col,
                                'md:w-[20%]': mode.row,
                            }"
                        >
                            <CategoryTypeFilter
                                :selected="filters"
                                :categories="categories"
                                :subCategories="subCategories"
                            />
                        </div>
                        <!-- /filtros -->

                        <!-- resultados -->
                        <div
                            class="w-full"
                            :class="{
                                'md:w-[70%]': mode.col,
                                'md:w-[80%]': mode.row,
                            }"
                        >
                            <!-- cards - obras -->
                            <div class="my-4">
                                <div class="w-full">
                                    <LoadingTailwind
                                        v-if="loadingArtist"
                                        css="w-full md:w-1/2 mb-10 md:px-4 animate-swing-in-top-fwd"
                                    />
                                    <div
                                        v-else
                                        class="flex flex-wrap items-stretch"
                                    >
                                        <div
                                            v-for="(artist, index) in artists"
                                            :key="artist.id"
                                            :class="{
                                                'sm:px-4':
                                                    index % 1 == 0 && mode.col,
                                                'w-full md:w-1/2 lg:w-1/3 xl:w-1/4':
                                                    mode.col,
                                                'w-full flex flex-wrap ml-4':
                                                    mode.row,
                                            }"
                                        >
                                            <CardArtist
                                                :showButtonFollow="true"
                                                :routerLink="true"
                                                :artist="artist"
                                                :class="{
                                                    'w-full md:w-3/12':
                                                        mode.row,
                                                    'w-full h-full': mode.col,
                                                }"
                                            />

                                            <!-- slider tns -->
                                            <div
                                                v-show="mode.row"
                                                class="md:w-9/12 md:pl-8 hidden md:block"
                                            >
                                                <h3
                                                    class="text-base text-zinc-900 font-extra-bold uppercase"
                                                >
                                                    algunas obras de
                                                    {{ artist.name }}
                                                </h3>
                                                <div
                                                    :id="
                                                        'row-artist-' +
                                                        artist.id
                                                    "
                                                    class="mt-3 w-full"
                                                >
                                                    <RowArtwork
                                                        v-for="artwork in artist.artworks"
                                                        :key="artwork.id"
                                                        :artwork="artwork"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- paginación -->
                                <Paginator
                                    class="w-full text-center my-10"
                                    :counter="totalPages"
                                    @load-page="loadPage"
                                    v-if="hasArtists"
                                />
                                <!-- /paginación -->
                            </div>
                            <!-- /cards - obras -->
                        </div>
                        <!-- /resultados -->
                    </div>
                </div>
            </div>
        </section>
        <!-- /content -->

        <!-- modal filter mobile -->
        <FilterArtistModal
            :show="showFilterModal"
            :options="filters"
            :categories="categories"
            :subcategories="subCategories"
            @close-filter-dialog-artist="showFilterModal = false"
        />
    </main-layout>
</template>
<script>
// componentes
import MainLayout from "../layouts/MainLayout.vue";
import Header from "../landing/sections/Header.vue";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import Paginator from "../../components/Paginator.vue";
import CardArtist from "./../profile/components/CardArtist.vue";
import RowArtwork from "./components/RowArtwork.vue";
import FilterArtistModal from "./components/FilterArtistModal.vue";

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
        RowArtwork,
        FilterArtistModal,
    },
    mixins: [getDataMixin, utilMixin, listArtistMixin],
    created() {
        // @getDataMixin
        this.getCategories();

        // @listArtistMixin
        this.initData();
    },
};
</script>
