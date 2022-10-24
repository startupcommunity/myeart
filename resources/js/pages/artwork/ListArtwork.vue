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
        <HeroList />
        <!-- /sección hero -->

        <!-- content -->
        <section class="bg-white">
            <div class="container py-20">
                <div class="flex flex-wrap justify-start items-start">
                    <!-- filtros -->
                    <div class="w-[30%] pr-10">
                        <h3
                            class="text-primary font-bold tracking-wide uppercase text-2xl"
                        >
                            Categorías
                        </h3>
                        <div class="my-4 w-full border-t border-gray-900"></div>

                        <!-- categorías -->
                        <div class="my-4">
                            <v-chip-group
                                v-model="filters.categories"
                                column
                                multiple
                                show-arrows
                                center-active
                                class="mx-auto"
                            >
                                <v-chip
                                    label
                                    filter
                                    outlined
                                    v-for="cat in categories"
                                    :key="cat.id"
                                    :value="cat.id"
                                    class="border-o"
                                    small
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

                        <!-- estilo -->
                        <div class="my-4">
                            <label
                                class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                            >
                                Estilo
                            </label>
                            <div>
                                <v-chip-group
                                    v-model="filters.styles"
                                    column
                                    multiple
                                    show-arrows
                                    center-active
                                    class="mx-auto"
                                >
                                    <v-chip
                                        filter
                                        outlined
                                        v-for="style in styles"
                                        :key="style.id"
                                        :value="style.id"
                                        class="border-o"
                                        small
                                    >
                                        <span
                                            class="font-medium text-gray-900 text-xs tracking-tighter"
                                        >
                                            {{ style.name }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>

                        <!-- técnica -->
                        <div class="my-4">
                            <label
                                class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                            >
                                Técnica
                            </label>
                            <div>
                                <v-chip-group
                                    v-model="filters.techniques"
                                    column
                                    multiple
                                    show-arrows
                                    center-active
                                    class="mx-auto"
                                >
                                    <v-chip
                                        filter
                                        outlined
                                        v-for="tech in techniques"
                                        :key="tech.id"
                                        :value="tech.id"
                                        class="border-o"
                                        small
                                    >
                                        <span
                                            class="font-medium text-gray-900 text-xs tracking-tighter"
                                        >
                                            {{ tech.name }}
                                        </span>
                                    </v-chip>
                                </v-chip-group>
                            </div>
                        </div>

                        <!-- filtros numéricos -->
                        <div>
                            <h3
                                class="text-primary font-bold tracking-wide uppercase text-2xl"
                            >
                                Filtros
                            </h3>
                            <div
                                class="my-4 w-full border-t border-gray-900"
                            ></div>
                        </div>

                        <!-- precios -->
                        <div class="my-4">
                            <label
                                class="uppercase text-zinc-900 tracking-widest text-xs font-bold"
                            >
                                Rango de precio
                            </label>
                            <v-slider
                                v-model="filters.price"
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
                                    v-model="filters.width"
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
                                    v-model="filters.large"
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
                                v-model="filters.weight"
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
                            <div class="w-full text-center my-4">
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
import { mapGetters } from "vuex";
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
    components: { PreHeader, Header, LoadingTailwind, HeroList, CardArtwork },
    mixins: [getDataMixin, utilMixin, listArtworkMixin],
    name: "ListArtwork",
    data() {
        return {
            filters: {
                categories: [],
                techniques: [],
                styles: [],
                price: 5000,
                width: 250,
                large: 250,
                weight: 50,
                sortBy: "",
            },

            sortBy: [
                {
                    val: 1,
                    text: "MAS RECIENTE",
                },
                {
                    val: 2,
                    text: "DESTACADA",
                },
                {
                    val: 3,
                    text: "PRECIO",
                },
            ],
        };
    },
    mounted() {
        // mixin
        this.getCategories();
        this.getStyles();
        this.getTechniques();
        this.getArtworkPublished();
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),
    },
    watch: {
        filters: {
            handler(val) {
                this.getFilterArtworkPublished();
            },
            deep: true,
        },
    },
    methods: {
        getFilterArtworkPublished() {
            this.loadArtworkPublished = true;
            this.axios
                .post(this.ep.artworks.filterPublished, this.filters)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.artworkPublished = resp.data;
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loadArtworkPublished = false));
        },
    },
};
</script>
<style>
.v-slider--horizontal {
    margin-left: 0px;
    margin-right: 0px;
}
</style>
