<template>
    <main-layout :showHeader="false" :loadingOverlay="globalLoading">
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección obra -->
        <section class="bg-white">
            <div class="container py-20">
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-[60%] mb-4 lg:mb-0">
                        <div>
                            <div class="h-96 lg:h-[36rem] w-full relative">
                                <img
                                    :src="
                                        previewFiles[0]?.file ??
                                        getURLDefaultFrontArtwork
                                    "
                                    class="w-full object-cover object-center h-full rounded-sm"
                                    :alt="previewFiles[0]"
                                />
                                <div class="absolute bottom-6 right-7">
                                    <button
                                        @click="showFullImage(previewFiles[0])"
                                    >
                                        <i
                                            class="fas fa-search fa-2x text-white"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div
                                    class="overflow-x-auto flex pt-4 sm:w-full"
                                    :class="
                                        previewFiles.length > 3
                                            ? 'w-[80%]'
                                            : 'w-full'
                                    "
                                >
                                    <div
                                        v-for="file in previewFiles.filter(
                                            (_, i) => i !== 0
                                        )"
                                        :key="file.id"
                                        class="flex-shrink-0 w-1/2 xl:w-1/3 h-32 lg:h-52 bg-gray-200 rounded-sm border border-gray-300 animate-swing-in-top-fwd"
                                    >
                                        <div class="h-full w-full">
                                            <a @click="showFullImage(file)">
                                                <img
                                                    :src="file?.file"
                                                    class="w-full object-cover object-center h-full rounded-sm"
                                                    :alt="file"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="justify-center items-center w-[20%] flex sm:hidden"
                                    v-if="previewFiles.length > 3"
                                >
                                    <i
                                        class="fa-solid fa-chevron-right text-gray-400 fa-2x p-2 rounded-full border"
                                    ></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-[40%] md:px-7">
                        <div class="flex justify-between">
                            <div>
                                <h1
                                    class="text-xl lg:text-5xl font-bold text-zinc-900 lg:-mt-3"
                                >
                                    {{ artwork.title }}
                                </h1>
                            </div>
                            <div class="text-gray-400">
                                <div
                                    class="flex justify-end items-start space-x-3"
                                >
                                    <FollowArtworkButton
                                        :artistID="artUser?.id"
                                        :artworkID="artwork.id"
                                        class-icon="fa-2x"
                                    />
                                    <div class="flex flex-col items-center">
                                        <button
                                            class="hover:text-gray-700"
                                            @click.stop="likeOrDislike()"
                                        >
                                            <i
                                                class="fa-regular fa-heart fa-2x"
                                                :class="{
                                                    'text-red-800': isLike,
                                                }"
                                            ></i>
                                        </button>
                                        <div class="text-zinc-800">
                                            {{ likes }}
                                        </div>
                                    </div>
                                    <button
                                        @click.stop="
                                            sharePublicArtwork(artwork)
                                        "
                                        class="hover:text-gray-700"
                                    >
                                        <i
                                            class="fa-solid fa-share-nodes fa-2x"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p class="text-base text-gray-600 pt-2 font-normal">
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
                                {{ this.views }} views
                                <i class="fa fa-eye text-primary"></i>
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
                                <FollowArtistButton
                                    :artist="artwork.user"
                                    class="w-2/5 py-1"
                                />
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
                                    {{ artwork.total }} {{ euro }}
                                </span>
                            </p>
                        </div>
                        <div class="py-2" v-if="!hasOwner">
                            <v-btn
                                large
                                :color="
                                    insideCart
                                        ? 'green darken-4'
                                        : 'grey darken-4'
                                "
                                @click.stop="addToCart"
                                :disabled="!canAddToCart"
                                :loading="loading"
                            >
                                <span
                                    class="uppercase text-white"
                                    v-if="!insideCart"
                                >
                                    Agregar al carrito
                                </span>
                                <span class="uppercase text-white" v-else>
                                    Agregada al carrito
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
                        <div class="border-b border-zinc-900 pb-1 pb-md-4">
                            <h2
                                class="text-primary text-lg md:text-2xl font-bold leading-5 tracking-widest uppercase"
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
                                            {{ artwork.other_details ?? "---" }}
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
                                            {{
                                                artwork.large_description ??
                                                "---"
                                            }}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full lg:w-[40%] lg:px-7 lg:mt-10 h-80 lg:h-[30rem]"
                    >
                        <img
                            :src="
                                randomImage?.file ?? getURLDefaultFrontArtwork
                            "
                            class="w-full h-full object-cover object-center rounded-sm"
                            :alt="randomImage?.file ?? 'default-picture'"
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
                    <div class="w-full lg:w-[70%]">
                        <div class="border-b border-zinc-900 pb-1 pb-md-4">
                            <h2
                                class="text-primary text-lg md:text-2xl font-bold tracking-widest uppercase"
                            >
                                Sobre el artista
                            </h2>
                        </div>
                        <div class="mt-5">
                            <div
                                class="flex flex-wrap justify-center lg:justify-between"
                            >
                                <div
                                    class="w-full md:w-2/4 md:h-80 xl:h-96 2xl:h-[30rem] md:pr-10"
                                >
                                    <router-link :to="pathProfile">
                                        <img
                                            :src="
                                                getProfilePhoto(artwork.user) ??
                                                getURLDefaultProfilePhoto
                                            "
                                            class="border md:w-full md:h-full h-52 w-52 rounded-full object-cover object-center mx-auto"
                                            alt="profile-picture"
                                        />
                                    </router-link>
                                </div>
                                <div
                                    class="w-full md:w-2/4 h-full md:h-80 xl:h-80 2xl:h-[30rem] grid md:grid-cols-1 content-center md:content-between justify-items-center md:justify-items-start mx-auto pt-2 sm:pt-0"
                                >
                                    <div class="w-full">
                                        <h3
                                            class="font-bold text-2xl text-zinc-900 leading-7"
                                        >
                                            <span
                                                class="text-center block sm:hidden"
                                            >
                                                {{ bioTitle }}
                                            </span>
                                            <span
                                                class="text-left hidden sm:block"
                                            >
                                                {{ bioTitle }}
                                            </span>
                                        </h3>
                                        <p
                                            class="font-medium text-base text-gray-600 mt-2 text-center"
                                        >
                                            <span
                                                class="text-center block sm:hidden"
                                            >
                                                {{ bioContent }}
                                            </span>
                                            <span
                                                class="text-left hidden sm:block"
                                            >
                                                {{ bioContent }}
                                            </span>
                                        </p>
                                    </div>
                                    <div class="w-full">
                                        <div
                                            class="justify-center flex sm:hidden"
                                        >
                                            <FollowArtistButton
                                                :artist="artwork.user"
                                                class="w-2/4 py-3"
                                            />
                                        </div>
                                        <div
                                            class="justify-start hidden sm:flex"
                                        >
                                            <FollowArtistButton
                                                :artist="artwork.user"
                                                class="w-2/4 py-3"
                                            />
                                        </div>
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
        <ArtistArtworks :user="artwork.user" :ignoreArtworkID="artwork.id" />
        <!-- /mas obras del artista -->

        <!-- otras obras -->
        <OtherArtworks
            :categoryID="artwork.categories[0]?.id"
            :ignoreUser="artwork.user"
        />
        <!-- /otras obras -->

        <!-- comentarios -->
        <Comment :artwork="artwork" />

        <!-- modal full image -->
        <ShowImageDialog
            :show="showModalImage"
            :imageBlob="file"
            @close-full-image="showModalImage = false"
        />
    </main-layout>
</template>
<script>
import { mapGetters } from "vuex";

// componentes
import LoadingTailwind from "../../components/LoadingTailwind.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CardArtwork from "./sections/CardArtwork.vue";
import ArtistArtworks from "./sections/ArtistArtworks.vue";
import OtherArtworks from "./sections/OtherArtworks.vue";
import Comment from "./sections/Comment.vue";
import FollowArtistButton from "./components/FollowArtistButton.vue";
import ShowImageDialog from "./components/ShowImageDialog.vue";

// mixin
import utilMixin from "../../mixins/utilMixin";
import FollowArtworkButton from "./components/FollowArtworkButton.vue";
export default {
    name: "ShowArtwork",
    mixins: [utilMixin],
    components: {
        MainLayout,
        Header,
        LoadingTailwind,
        CardArtwork,
        ArtistArtworks,
        OtherArtworks,
        FollowArtistButton,
        ShowImageDialog,
        Comment,
        FollowArtworkButton,
    },
    data() {
        return {
            views: 0,
            likes: 0,
            isLike: false,
            showModalImage: false,
            loading: false,
            file: "",
            previewFiles: [],
            artwork: {
                categories: [],
                subcategories: [],
                labels: [],
                likes: [],
                user: {},
            },
        };
    },
    created() {
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
        artUser() {
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

        /**
         * Devuelve el titulo de la bio del usuario
         */
        bioTitle() {
            return this.artUser?.profile?.bio_title ?? "---";
        },

        /**
         * Devuelve el titulo de la bio del usuario
         */
        bioContent() {
            return this.artUser?.profile?.bio_content ?? "---";
        },

        /**
         * Verifica si es el dueño de la obra
         */
        hasOwner() {
            return this.artwork?.user?.id === this.user?.id;
        },

        /**
         * Devuelve el path del perfil de artista o usuario
         */
        pathProfile() {
            return {
                name: "showArtist",
                params: { id: this.artUser?.id },
            };
        },

        /**
         * Verifica si la obra ya fue agregada
         * al carrito de compras del usuario
         */
        insideCart() {
            const cart = this.user?.shopping_cart || [];
            return cart.some((item) => item.artwork_id === this.artwork.id);
        },

        /**
         * Verifica si la obra esta disponible
         */
        canAddToCart() {
            return !this.loading && !this.insideCart;
        },
    },
    methods: {
        /**
         * Carga todos los datos de la obra
         */
        loadData() {
            this.globalLoading = true;
            const id = this.$route.params.id;

            const ep = this.$isUserGuest
                ? this.ep.guest.showArtwork
                : this.ep.artworks.show;

            this.axios
                .get(ep + id)
                .then((resp) => {
                    if (resp.status !== 200) return false;
                    const { gallery, views } = resp.data; // data
                    this.artwork = resp.data; // cargar la obra
                    this.loadGallery(gallery); // cargar la galeria
                    this.loadView(views); // cargar las views

                    // si esta like por el usuario
                    if (!this.$isUserGuest) {
                        this.isLiked();
                    }

                    // agregar una visita
                    if (!this.$isUserGuest) {
                        this.addView();
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => (this.globalLoading = false));
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
                        this.isLike ? this.likes-- : this.likes++;
                        this.isLike = !this.isLike;
                    }
                })
                .catch((error) => this.$manageError(error))
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

            this.likes = this.artwork.likes.length;
        },

        /**
         * Agrega la cantidad de visitas
         */
        loadView(views) {
            this.views = views.length;
        },

        /**
         * Agrega una visita a la obra
         */
        addView() {
            const data = {
                artwork_id: this.artwork.id,
            };

            const url = this.$isUserGuest
                ? this.ep.guest.addVisit
                : this.ep.artworks.addVisit;

            this.axios
                .post(url, data)
                .then((_) => console.info("visita agregada con éxito"))
                .catch((error) => console.log(error));
        },

        /**
         * Muestra la imagen en pantalla completa
         */
        showFullImage(obj) {
            if (!obj?.file) return false;
            this.file = obj.file;
            this.showModalImage = true;
        },

        /**
         * Agrega la obra al carrito de compras
         */
        addToCart() {
            if (!this.canAddToCart) return false;

            this.loading = true;
            const data = {
                artwork_id: this.artwork.id,
                user_id: this.user.id,
            };

            this.axios
                .post(this.ep.carts.addItem, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$store.dispatch("userRequest");

                        const title = `La obra ${this.artwork.title} se agregó al carrito de compras`;
                        const dialog = {
                            title,
                            text: "Excelente!",
                            icon: "success",
                            confirmButtonText: "Ir al carrito de compras",
                            cancelButtonText: "Seguir comprando",
                        };

                        this.confirmedDialog(dialog).then((resp) => {
                            if (resp.isConfirmed) {
                                this.$router.push({ name: "shoppingCart" });
                            }
                        });
                    }

                    if (resp.status === 204) {
                        this.$noty(
                            "La obra no se encuentra disponible",
                            "warning"
                        );
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
