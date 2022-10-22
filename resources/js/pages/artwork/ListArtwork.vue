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
        <div
            class="relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center"
            :class="'bg-hero-profile-bg'"
        >
            <div class="absolute bottom-[40%] left-[35%] sm:left-[46%]">
                <h1
                    class="font-black tracking-widest text-white text-3xl uppercase"
                >
                    Pintura
                </h1>
            </div>
            <div
                class="absolute top-0 bottom-auto pb-24 md:pb-20 lg:pb-24 inset-x-0 bg-gray-900 bg-opacity-60"
            ></div>
        </div>
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

                        <!-- categorías seleccionadas -->
                        <div>
                            <i class="fas fa-palette">
                                <span
                                    class="uppercase text-zinc-900 tracking-widest text-xs"
                                >
                                    pinturas
                                </span>
                            </i>
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
                                    v-model="filters.leength"
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
                                    v-if="loadingArtwork"
                                    css="w-full md:w-1/2 mb-10 sm:px-4 animate-swing-in-top-fwd"
                                />
                                <div
                                    v-for="(art, index) in artworks"
                                    :key="art.id"
                                    class="w-full md:w-1/2 lg:w-1/3 mb-10 animate-swing-in-top-fwd"
                                    :class="index % 1 == 0 ? 'sm:px-4' : ''"
                                    v-else
                                >
                                    <div
                                        class="rounded-md w-full hover:animate-shadow-drop-center"
                                    >
                                        <img
                                            :src="setPathGallery(art)"
                                            :alt="art.title"
                                            class="object-cover object-center w-full h-72"
                                        />
                                        <div
                                            class="flex flex-col justify-between space-y-8 bg-gray-50"
                                        >
                                            <div class="space-y-2">
                                                <h3
                                                    class="text-xl md:text-base xl:text-xl font-semibold tracking-wide text-gray-900 pt-3"
                                                >
                                                    {{ art.title }}
                                                </h3>
                                                <p class="text-primary">
                                                    {{ art.dimension }}
                                                    {{
                                                        setCategoryName(
                                                            art.categories
                                                        )
                                                    }}
                                                    {{
                                                        setTechniqueName(
                                                            art.techniques
                                                        )
                                                    }}
                                                </p>
                                                <div
                                                    class="flex justify-start items-center"
                                                >
                                                    <img
                                                        :src="
                                                            getProfilePhoto(
                                                                art.user
                                                            ) ??
                                                            '/img/avatar.png'
                                                        "
                                                        class="img-thumbnail border w-14 h-14 rounded-full"
                                                        alt="profile-picture"
                                                    />
                                                    <div
                                                        class="flex flex-col pl-2"
                                                    >
                                                        <span class="py-0">
                                                            {{ art.user?.name }}
                                                        </span>
                                                        <button
                                                            class="btn btn-primary btn-sm text-xs px-4 uppercase w-20"
                                                        >
                                                            Seguir
                                                        </button>
                                                    </div>
                                                </div>
                                                <div
                                                    class="w-full border-t border-gray-800 my-4"
                                                ></div>
                                                <div
                                                    class="flex justify-between items-center pb-4 px-2"
                                                >
                                                    <div
                                                        class="text-gray-900 font-black"
                                                    >
                                                        {{ art.price }}
                                                        {{ euro }}
                                                    </div>
                                                    <div class="text-gray-400">
                                                        <button class="px-2">
                                                            <i
                                                                class="fa-regular fa-bookmark"
                                                            ></i>
                                                        </button>
                                                        <button>
                                                            <i
                                                                class="fa-regular fa-heart text-red-800"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

// mixin
import getDataMixin from "../../mixins/getDataMixin";
import utilMixin from "../../mixins/utilMixin";

// cantidad de obras en aumento
let countShowArt = 12;

export default {
    components: { PreHeader, Header, LoadingTailwind },
    mixins: [getDataMixin, utilMixin],
    name: "ListArtwork",
    data() {
        return {
            artworks: [],
            originalArtworks: [],
            remainingArtworks: [],
            filters: {
                categories: [],
                techniques: [],
                styles: [],
                price: 5000,
                width: 250,
                leength: 250,
                weight: 50,
                sortBy: "",
            },

            sortBy: ["MAS RECIENTE", "DESTACADA", "PRECIO"],

            loadingArtwork: false,
        };
    },
    mounted() {
        // mixin
        this.getCategories();
        this.getStyles();
        this.getTechniques();

        this.getArtworks();
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         */
        ...mapGetters({
            userProfile: "getProfile",
        }),
    },
    methods: {
        /**
         * Path completo de la foto de portada
         */
        setPathGallery(artwork) {
            if (!artwork.gallery.length) return "/";

            const front_page = artwork.gallery.filter(
                (pic) => pic.front_page === 1
            );

            return `${this.pathArtworkGallery + front_page[0].picture}`;
        },

        /**
         * Setear el nombre de una categoría de una obra
         */
        setCategoryName(categories) {
            return categories.length ? categories[0].name : "";
        },

        /**
         * Setear el nombre de una técnica de una obra
         */
        setTechniqueName(techniques) {
            return techniques.length ? techniques[0].name : "";
        },

        /**
         * Devuelve el path completo de la foto de perfil del usuario
         */
        getProfilePhoto(user = null) {
            if (!user || !user?.profile_photo) return null;

            return `${this.pathProfilePhoto + user.profile_photo}`;
        },

        /**
         * devuelve las obras de todos los usuarios
         */
        getArtworks() {
            this.loadingArtwork = true;
            this.axios
                .get(this.ep.artworks.getPublish)
                .then(async (resp) => {
                    if (resp.status === 200) {
                        // obras originales
                        this.originalArtworks = await JSON.parse(
                            JSON.stringify(resp.data)
                        );

                        // obras mostradas
                        this.artworks = await resp.data;

                        // guardar las restantes
                        // solo mostrar countShowArt
                        this.remainingArtworks =
                            this.artworks.splice(countShowArt);

                        // obras restantes
                        // this.loadRemainingArtworks(remaining);
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loadingArtwork = false));
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
