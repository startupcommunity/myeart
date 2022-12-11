<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección cesta -->
        <section class="bg-white">
            <div class="container pt-12">
                <button
                    @click.stop="$router.go(-1)"
                    text
                    class="flex items-center text-zinc-800 hover:text-zinc-900 py-1 rounded-md mb-4"
                >
                    <v-icon class="mr-2">mdi-arrow-left</v-icon>
                    Atrás
                </button>
                <h1 class="uppercase text-3xl text-zinc-900 font-bold">
                    Tu cesta
                </h1>
                <div v-if="items.length" class="animate-fade-in-down">
                    <div class="py-5 border-b border-zinc-900 pb-5">
                        <CardRowCart
                            :artwork="item.artwork"
                            v-for="item in items"
                            :key="item.id"
                            class="mb-8"
                            @deleteItemSuccess="deleteItemSuccess"
                        />
                    </div>
                    <div class="py-5 flex flex-col items-center md:items-end">
                        <h4 class="text-2xl font-bold text-gray-900 uppercase">
                            total
                            <span class="font-light">
                                {{ total }}
                            </span>
                        </h4>
                        <p class="uppercase text-base font-light">
                            + impuestos incluidos
                        </p>
                        <div class="mt-8 flex flex-col gap-3">
                            <v-btn
                                x-large
                                color="grey darken-4"
                                @click.stop="checkout"
                                :loading="loading"
                                :disabled="!allPublished"
                            >
                                <span class="uppercase text-white">
                                    Continuar
                                </span>
                            </v-btn>
                            <div v-if="!allPublished">
                                <p class="text-red-500 text-sm">
                                    <i class="fa fa-warning"></i>
                                    Hay artículos que no se encuentran
                                    disponibles
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-5 border-b border-zinc-900 pb-3" v-else>
                    <div
                        class="flex flex-wrap justify-between items-start pb-3"
                    >
                        <div class="w-full">
                            <h2 class="text-xl text-zinc-900 font-medium">
                                <i class="fas fa-info-circle text-gray-400"></i>
                                No tienes obras en tu cesta
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- /sección cesta -->

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
import CardRowCart from "../artwork/components/CardRowCart.vue";
import OtherArtworks from "../artwork/sections/OtherArtworks.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";

export default {
    name: "IndexShoppingCart",
    components: { MainLayout, Header, CardRowCart, OtherArtworks },
    data() {
        return {
            loading: false,
            items: [],
        };
    },
    computed: {
        /**
         * Obtener el monto total de todos
         * los artículos en la cesta
         */
        total() {
            const total = this.items.reduce((total, item) => {
                const one = parseFloat(total);
                const two = parseFloat(item.artwork?.price);
                const result = one + two;
                return parseFloat(result).toFixed(2);
            }, 0);

            // si el numero es miles, se le agrega un punto
            // para indicar que es miles
            return new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
            }).format(total);
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
         * Devuelve el usuario logueado
         */
        user() {
            return this.$store.getters.getProfile || {};
        },

        /**
         * Verifica si todas las obras están disponibles
         * state = 1  => publicada
         */
        allPublished() {
            return this.items.every((item) => item.artwork?.state === 1);
        },
    },
    created() {
        this.getItems();
    },
    methods: {
        getItems() {
            this.loading = true;
            this.axios
                .get(this.ep.carts.getItems)
                .then((response) => (this.items = response.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Cuando un item se ha eliminado
         */
        deleteItemSuccess() {
            this.getItems();
            this.$store.dispatch("userRequest");
        },

        /**
         * continuar con el proceso de compra
         */
        checkout() {
            this.$router.push({ name: "checkout" });
        },
    },
};
</script>
