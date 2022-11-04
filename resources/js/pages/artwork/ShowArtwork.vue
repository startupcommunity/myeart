<template>
    <main-layout :showHeader="false" :loadingOverlay="globalLoading">
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección obra -->
        <section class="bg-white">
            <div class="container py-20">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-2/4">
                        <div v-if="previewFiles.length">
                            <div class="h-96 w-full">
                                <img
                                    :src="previewFiles[0].file"
                                    class="w-full object-cover object-center h-full rounded-sm"
                                    :alt="previewFiles[0]"
                                />
                            </div>
                            <div class="overflow-x-auto flex pt-4">
                                <div
                                    v-for="file in previewFiles.filter(
                                        (_, i) => i !== 0
                                    )"
                                    :key="file.id"
                                    class="flex-shrink-0 w-1/2 xl:w-1/4 h-32 lg:h-40 bg-gray-200 rounded-sm border border-gray-300 animate-swing-in-top-fwd"
                                >
                                    <div class="h-full w-full">
                                        <img
                                            :src="file.file"
                                            class="w-full object-cover object-center h-full rounded-sm"
                                            :alt="file"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-2/4 px-7">
                        <div class="flex flex-row justify-between items-center">
                            <div>
                                <h1
                                    class="text-xl lg:text-5xl font-bold leading-10 text-zinc-900"
                                >
                                    {{ artwork.title }}
                                </h1>
                            </div>
                            <div class="text-gray-400 flex justify-end">
                                <button
                                    class="pr-4 hover:text-gray-700"
                                    @click.stop=""
                                >
                                    <i class="fa-regular fa-bookmark fa-2x"></i>
                                </button>
                                <button
                                    class="pr-4 hover:text-gray-700"
                                    @click.stop="likeOrDislike()"
                                >
                                    <i
                                        class="fa-regular fa-heart fa-2x"
                                        :class="{ 'p-1 text-red-800': isLike }"
                                    ></i>
                                </button>
                                <button
                                    @click.stop="sharePublicArtwork(artwork)"
                                    class="hover:text-gray-700"
                                >
                                    <i
                                        class="fa-solid fa-share-nodes fa-2x"
                                    ></i>
                                </button>
                            </div>
                        </div>
                        <p
                            class="text-base leading-5 tracking-widest text-gray-400 pt-2"
                        >
                            {{ artwork.description }}
                        </p>
                        <p class="text-primary text-sm leading-4">
                            {{ allCategory }}
                        </p>
                        <div class="flex flex-row justify-between">
                            <p class="uppercase text-base leading-8 font-bold">
                                Medida: {{ measures }}
                            </p>
                            <p class="text-primary text-base leading-8">
                                0 views <i class="fa fa-eye text-primary"></i>
                            </p>
                        </div>
                        <p
                            class="uppercase text-base leading-8 font-bold -mt-4"
                        >
                            Peso: {{ weight }}
                        </p>

                        <div class="flex justify-start items-center py-5">
                            <img
                                :src="
                                    getProfilePhoto(artwork.user) ??
                                    getURLDefaultProfilePhoto
                                "
                                class="img-thumbnail border w-14 h-14 rounded-full"
                                alt="profile-picture"
                            />
                            <div class="flex flex-col pl-2">
                                <span class="py-0">
                                    {{ artwork.user?.name }}
                                </span>
                                <button
                                    class="btn btn-primary btn-sm text-xs px-4 uppercase w-20"
                                >
                                    Seguir
                                </button>
                            </div>
                        </div>
                        <div class="border-t border-zinc-800 w-full pb-5"></div>
                        <div>
                            <p class="uppercase">
                                <span
                                    class="text-base leading-8 font-bold tracking-wide"
                                >
                                    Precio
                                </span>
                                <br />
                                <span class="text-2xl font-bold">
                                    {{ artwork.price }} {{ euro }}
                                </span>
                            </p>
                        </div>
                        <div class="py-2">
                            <v-btn large color="grey darken-4">
                                <span class="uppercase text-white">
                                    comprar esta obra
                                </span>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /sección obra -->

        <!-- sobre la obra -->
        <section class="bg-white">
            <div class="container pb-20">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-[60%]">
                        <div class="border-b border-zinc-900 pb-5">
                            <h2
                                class="text-primary text-2xl leading-5 tracking-widest uppercase"
                            >
                                Sobre la obra
                            </h2>
                        </div>
                        <div class="mt-5">
                            <div
                                class="flex flex-wrap justify-center lg:justify-between w-full"
                            >
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Fecha de creación
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{ artwork.date_created }}
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Categoría
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{ allCategory }}
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Dimensiones y peso
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{ dimensionsAndWeight }}
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Ubicación
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{ artwork.location }}
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Envío
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{ artwork.shipping }}
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full lg:w-2/6 pb-8">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Otros detalles
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600"
                                        >
                                            -
                                        </span>
                                    </p>
                                </div>
                                <div class="w-full">
                                    <p>
                                        <span
                                            class="uppercase font-extra-bold text-base text-zinc-900"
                                        >
                                            Descripción
                                        </span>
                                        <br />
                                        <span
                                            class="font-medium text-base text-gray-600 text-justify"
                                        >
                                            {{ artwork.description }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full lg:w-[40%] px-7 lg:mt-10 h-80 lg:h-[30rem]"
                    >
                        <img
                            :src="randomImage?.file"
                            class="w-full h-full object-cover object-center rounded-sm"
                            :alt="randomImage?.file"
                        />
                    </div>
                </div>
            </div>
        </section>
        <!-- /sobre la obra -->

        <!-- sobre el artista -->
        <section class="bg-gray-100">
            <div class="container py-20">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-[60%]">
                        <div class="border-b border-zinc-900 pb-5">
                            <h2
                                class="text-primary text-2xl leading-5 tracking-widest uppercase"
                            >
                                Sobre el artista
                            </h2>
                        </div>
                        <div class="mt-5">
                            <div
                                class="flex flex-wrap justify-center lg:justify-between w-full"
                            >
                                <div
                                    class="w-full md:w-2/4 h-80 md:h-80 xl:h-80 2xl:h-[26rem] md:pr-10"
                                >
                                    <img
                                        :src="
                                            getProfilePhoto(artwork.user) ??
                                            getURLDefaultProfilePhoto
                                        "
                                        class="border w-full h-full rounded-full object-cover object-center"
                                        alt="profile-picture"
                                    />
                                </div>
                                <div
                                    class="md:w-2/4 h-full md:h-80 xl:h-80 2xl:h-[26rem] grid md:grid-cols-1 content-center md:content-between justify-items-center md:justify-items-start mx-auto"
                                >
                                    <div class="w-full">
                                        <h3
                                            class="font-bold text-2xl text-zinc-900 leading-7"
                                        >
                                            {{ userArtwork?.name }}
                                        </h3>
                                        <p
                                            class="font-medium text-base text-gray-600"
                                        >
                                            {{
                                                userArtwork?.profile?.bio ??
                                                "Sin biografía"
                                            }}
                                        </p>
                                    </div>
                                    <div class="w-full">
                                        <button
                                            class="btn btn-primary btn-sm text-sm px-4 uppercase w-2/4 flex justify-center md:justify-start"
                                        >
                                            Seguir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /sobre el artista -->

        <!-- mas obras del artista -->
        <section class="bg-white">
            <div class="container py-20">
                <div class="w-full">
                    <h2
                        class="text-primary text-2xl leading-5 tracking-widest uppercase text-center"
                    >
                        Mas obras de {{ userArtwork?.name }}
                    </h2>
                </div>
                <div class="py-10">
                    <LoadingTailwind
                        v-show="loadUserArtworks"
                        css="w-full animate-swing-in-top-fwd"
                    />
                    <div id="slider-user-artworks">
                        <CardArtwork
                            v-for="art in userArtworks"
                            :artwork="art"
                            :showProfile="false"
                            :key="art.id"
                        />
                    </div>
                </div>
            </div>
        </section>
        <!-- /mas obras del artista -->

        <!-- otras obras -->
        <section class="bg-gray-100">
            <div class="container py-20">
                <div class="w-full">
                    <h2
                        class="text-primary text-2xl leading-5 tracking-widest uppercase text-center"
                    >
                        Otras obras que te pueden interesar
                    </h2>
                </div>
                <div class="py-10">
                    <LoadingTailwind
                        v-show="loadOtherArtworks"
                        css="w-full animate-swing-in-top-fwd"
                    />
                    <div id="slider-other-artworks">
                        <CardArtwork
                            v-for="art in otherArtworks"
                            :artwork="art"
                            :showProfile="false"
                            :key="art.id"
                        />
                    </div>
                </div>
            </div>
        </section>
        <!-- /otras obras -->
    </main-layout>
</template>
<script>
import { tns } from "tiny-slider";
import { mapGetters } from "vuex";
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import utilMixin from "../../mixins/utilMixin";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CardArtwork from "./sections/CardArtwork.vue";

export default {
    name: "ShowArtwork",
    components: { MainLayout, Header, LoadingTailwind, CardArtwork },
    mixins: [utilMixin],
    data() {
        return {
            previewFiles: [],
            userArtworks: [],
            otherArtworks: [],
            artwork: {
                categories: [],
                subcategories: [],
                labels: [],
            },
            isLike: false,
            loadUserArtworks: false,
            loadOtherArtworks: false,
        };
    },
    mounted() {
        this.loadData();
        globalThis.scrollTo(0, 0);
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         * user profile
         */
        ...mapGetters({
            user: "getProfile",
        }),

        /**
         * Devuelve el usuario o artista de la obra a mostrar
         */
        userArtwork() {
            return this.artwork?.user;
        },

        /**
         * Obtiene el string completo para la categoría y derivados
         */
        allCategory() {
            const category = this.artwork.categories[0]?.name ?? "-";
            const subcat = this.artwork.subcategories[0]?.name ?? "-";
            const label = this.artwork.labels[0]?.name ?? "-";
            return `${category} ${subcat} ${label}`;
        },

        /**
         * Devuelve las medidas de la obra
         */
        measures() {
            const width = this.artwork.width ?? 0;
            const large = this.artwork.large ?? 0;
            return `${width} X ${large} ${this.artSize}`;
        },

        /**
         * Devuelve el peso de la obra
         */
        weight() {
            const weight = this.artwork.weight ?? 0;
            return `${weight} ${this.ArtWeight}`;
        },

        /**
         * Devuelve una imagen distinta a la de portada
         * en caso de no existir, devuelve la portada
         */
        randomImage() {
            const image = this.previewFiles[1];
            return image ? image : this.previewFiles[0];
        },

        /**
         * Devuelve las dimensiones y peso de la obra
         */
        dimensionsAndWeight() {
            const width = `Ancho ${this.artwork.width + this.artSize}`;
            const large = `Largo ${this.artwork.large + this.artSize}`;
            const weight = this.weight;
            return `${width} | ${large} | ${weight}`;
        },
    },
    methods: {
        loadData() {
            this.globalLoading = true;
            const id = this.$route.params.id;

            this.axios
                .get(this.ep.artworks.show + id)
                .then((resp) => {
                    if (resp.status === 200) {
                        // data
                        const { gallery } = resp.data;

                        // obra
                        this.artwork = resp.data;

                        // load galeria
                        this.loadGallery(gallery);

                        // si esta like por el usuario
                        this.isLiked();

                        return true;
                    }

                    return false;
                })

                // cargar o no las demás obras del usuario
                .then((resp) => {
                    if (resp) {
                        this.getUserArtworks();
                        this.getPublishForCategory();
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Obtener otras obras del autor de la obra seleccionada
         * ignorando la obra actual mostrada
         */
        getUserArtworks() {
            this.loadUserArtworks = true;
            const userPublish = this.ep.artworks.getUserPublish;
            const userID = this.userArtwork?.id;
            const endpoint = `${userPublish + userID}/${this.artwork.id}`;

            this.axios
                .get(endpoint)
                .then(async (resp) => {
                    if (resp.status === 200) {
                        return (this.userArtworks = await resp.data);
                    }

                    return false;
                })
                .then((resp) =>
                    resp ? this.showTNS("#slider-user-artworks") : false
                )
                .catch((error) => console.log(error))
                .finally(() => (this.loadUserArtworks = false));
        },

        /**
         * Obtener otras obras del autor de la obra seleccionada
         * ignorando la obra actual mostrada
         */
        getPublishForCategory() {
            this.loadOtherArtworks = true;
            const userPublish = this.ep.artworks.getPublishForCategory;
            const categoryID = this.artwork.categories[0]?.id;
            const userID = this.userArtwork?.id;
            const endpoint = `${userPublish + categoryID}/${userID}`;

            this.axios
                .get(endpoint)
                .then(async (resp) => {
                    if (resp.status !== 200) return false;

                    return (this.otherArtworks = await resp.data);
                })
                .then((resp) =>
                    resp ? this.showTNS("#slider-other-artworks") : false
                )
                .catch((error) => console.log(error))
                .finally(() => (this.loadOtherArtworks = false));
        },

        /**
         * Cargar la galeria de imagenes
         */
        loadGallery(data) {
            data.forEach((picture) => {
                const fullname = picture.picture;
                const path = `${this.pathArtworkGallery + fullname}`;
                const promise = this.getFileImage(path, picture);

                promise.then((resp) => {
                    // crear el preview
                    const objectUrl = URL.createObjectURL(resp.file);
                    this.previewFiles.push({
                        file: objectUrl,
                        front: resp.front,
                    });

                    // ordenar por foto de portada
                    this.previewFiles.sort((a, b) => b.front - a.front);
                });
            });
        },

        /**
         * Devuelve el path completo de la foto de perfil del usuario
         */
        getProfilePhoto(user = null) {
            if (!user || !user?.profile_photo) return null;

            return `${this.pathProfilePhoto + user.profile_photo}`;
        },

        /**
         * Agrega o elimina un me gusta por parte del usuario
         * a la obra seleccionada
         */
        likeOrDislike() {
            const id = this.artwork.id;
            this.globalLoading = true;
            const endpoint = this.isLike
                ? this.ep.artworks.disliked
                : this.ep.artworks.liked;

            this.axios
                .post(endpoint + id)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.isLike = !this.isLike;
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Si la obra ha sido likeada para el usuario logueado
         * se muestra en rojo el botón de me gusta
         */
        isLiked() {
            this.isLike = this.artwork.likes.some(
                (like) => like.user_id === this.user.id
            );
        },

        /**
         * Iniciar el carousel de obras del usuario
         */
        showTNS(id) {
            tns({
                container: id,
                mode: "carousel",
                speed: 800,
                gutter: 20,
                items: 5,
                autoplay: true,
                mouseDrag: true,
                autoplayButtonOutput: false,
                autoplayHoverPause: true,
                lazyload: true,
                controls: false,
                responsive: {
                    0: {
                        items: 1,
                        edgePadding: 50,
                    },
                    500: {
                        items: 2,
                        edgePadding: 30,
                    },
                    700: {
                        items: 3,
                        edgePadding: 30,
                    },
                    900: {
                        items: 4,
                        edgePadding: 30,
                    },
                    1200: {
                        items: 5,
                        edgePadding: 0,
                    },
                },
            });
        },
    },
};
</script>
