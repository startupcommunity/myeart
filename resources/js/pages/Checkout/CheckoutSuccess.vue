<template>
    <MainLayout :showHeader="false" :loading-overlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección cesta -->
        <section class="bg-white">
            <div class="container pt-12">
                <h1 class="uppercase text-3xl text-zinc-900 font-bold mb-8">
                    <i class="far fa-check-circle"></i>
                    Pago realizado <span class="text-green-600">con éxito</span>
                </h1>
                <div class="mb-5">
                    <div
                        class="flex flex-wrap justify-start animate-fade-in-down"
                    >
                        <div
                            class="py-5 border-b border-zinc-900 space-y-5 w-full"
                        >
                            <CardItemCheckout
                                v-for="item in items"
                                :artwork="item.artwork"
                                :key="item.id"
                                :showAlert="false"
                                title="Ya esta de camino a tu dirección"
                            />
                        </div>
                        <div class="w-full py-5">
                            <h3
                                class="text-3xl text-green-600 font-bold uppercase"
                            >
                                ¡Gracias por tu compra!
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /sección cesta -->

        <!-- conoce mas al artista -->
        <section class="bg-[#B2794C]">
            <div class="container py-20">
                <div class="flex justify-center w-full">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full md:w-1/2 flex justify-center justify-md-end">
                            <Avatar
                                :artist="artist"
                                custom="w-32 h-32 md:w-52 md:h-52 border"
                            />
                        </div>
                        <div class="w-full md:w-1/2 flex justify-center">
                            <div class="flex flex-col md:pl-4 justify-center items-center md:items-start">
                                <span class="py-0 text-white text-lg md:text-2xl mb-3 text-center text-md-left">
                                    Conoce mas al artista
                                    <span class="font-bold">
                                        {{ artist?.name }}
                                    </span>
                                </span>
                                <v-btn
                                    :to="pathProfile"
                                    class="hover:no-underline w-32"
                                >
                                    ver perfil
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- conoce mas al artista -->

        <!-- otras obras -->
        <OtherArtworks
            :categoryID="artwork?.categories[0]?.id"
            :ignoreUser="user"
            :center="true"
            :borderBottom="true"
            title="+ obras que te pueden interesar"
        />
        <!-- /otras obras -->
    </MainLayout>
</template>

<script>
import Avatar from "../../components/Avatar.vue";
import OtherArtworks from "../artwork/sections/OtherArtworks.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CardItemCheckout from "./components/CardItemCheckout.vue";

export default {
    name: "CheckoutSuccess",
    components: { OtherArtworks, MainLayout, Header, CardItemCheckout, Avatar },
    computed: {
        /**
         * Devuelve el usuario logueado
         */
        user() {
            return this.$store.getters.getProfile || {};
        },

        /**
         * Devuelve una de las obras al azar
         * dentro de los items
         */
        artwork() {
            const item =
                this.items[Math.floor(Math.random() * this.items.length)];

            const random = item?.artwork || {
                categories: [{ id: 1 }],
            };

            return random;
        },

        /**
         * Devuelve los items del carrito
         */
        items() {
            return this.order.items || [];
        },

        /**
         * Seleccionar cualquiera de los artistas
         * de las obras vendidas
         */
        artist() {
            const item =
                this.items[Math.floor(Math.random() * this.items.length)];

            return item?.artwork?.user || {};
        },

        /**
         * Devuelve el path del perfil del artista
         */
        pathProfile() {
            return {
                name: "showArtist",
                params: {
                    id: this.artist?.id,
                },
            };
        },
    },
    data() {
        return {
            order: {
                items: [],
            },
            loading: false,
        };
    },

    created() {
        this.getItems();
    },

    methods: {
        /**
         * productos del carrito
         */
        getItems() {
            this.loading = true;
            this.axios
                .get(this.ep.orders.getItems + this.$route.params.id)
                .then((response) => (this.order = response.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
