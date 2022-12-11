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
                <h1 class="uppercase text-3xl text-zinc-900 font-bold mb-8">
                    ¿Donde quieres recibir tu pedido?
                </h1>
                <div v-if="items.length">
                    <div
                        class="flex flex-wrap justify-start animate-fade-in-down"
                    >
                        <div class="w-full md:w-1/2">
                            <div v-if="address?.id">
                                <div class="flex flex-col">
                                    <v-radio-group
                                        v-model="defaultAddress"
                                        mandatory
                                    >
                                        <v-radio value="1" color="#B2794C">
                                            <template #label>
                                                <span
                                                    class="font-bold text-zinc-900 mt-2"
                                                >
                                                    Utilizar dirección por
                                                    defecto
                                                </span>
                                            </template>
                                        </v-radio>
                                        <v-radio value="2" color="#B2794C">
                                            <template #label>
                                                <span
                                                    class="font-bold text-zinc-900 mt-2"
                                                >
                                                    Utilizar otra dirección
                                                </span>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>

                                    <UseDefaultAddress
                                        :addr="address"
                                        v-if="isDefAddr"
                                    />
                                    <UseFormAddress :form="form" v-else />
                                </div>
                            </div>
                            <div v-else>
                                <UseFormAddress :form="form" />
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 md:px-7">
                            <div
                                class="py-5 border-b border-zinc-900 space-y-5"
                            >
                                <CardItemCheckout
                                    :artwork="item.artwork"
                                    v-for="item in items"
                                    :key="item.id"
                                />
                            </div>
                            <div
                                class="flex flex-row justify-between items-start py-5"
                            >
                                <p class="uppercase text-base font-light">
                                    + impuestos incluidos
                                </p>
                                <div class="flex flex-col items-end">
                                    <p
                                        class="text-lg font-bold text-gray-900 uppercase"
                                    >
                                        {{ availableItems }} Artículo(s)
                                        <span class="font-light">
                                            {{ subtotal }}
                                        </span>
                                    </p>
                                    <p
                                        class="text-lg font-bold text-gray-900 uppercase"
                                    >
                                        Envío
                                        <span class="font-light">
                                            {{ shipping }} {{ euro }}
                                        </span>
                                    </p>
                                    <p
                                        class="text-lg font-bold text-gray-900 uppercase"
                                    >
                                        total {{ total }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-full md:w-1/2">
                            <UseShippingMethod @changedMethod="changedMethod" />
                        </div>
                        <div class="w-full md:w-1/2 mb-5">
                            <div
                                class="flex justify-center justify-md-end md:pr-4"
                            >
                                <v-btn
                                    x-large
                                    color="grey darken-4"
                                    @click.stop="finalPurchase"
                                    :loading="loading"
                                    :disabled="!allPublished"
                                >
                                    <span class="uppercase text-white">
                                        Continuar
                                    </span>
                                </v-btn>
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
import OtherArtworks from "../artwork/sections/OtherArtworks.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CardItemCheckout from "./components/CardItemCheckout.vue";
import UseDefaultAddress from "./components/UseDefaultAddress.vue";
import UseFormAddress from "./components/UseFormAddress.vue";
import UseShippingMethod from "./components/UseShippingMethod.vue";

export default {
    name: "IndexShoppingCart",
    components: {
        MainLayout,
        Header,
        OtherArtworks,
        CardItemCheckout,
        UseDefaultAddress,
        UseFormAddress,
        UseShippingMethod,
    },
    data() {
        return {
            loading: false,
            defaultAddress: 1,
            type: 1,
            items: [],
            address: {},
            form: {
                address: "",
                postal_code: "",
                city: "",
            },
        };
    },
    computed: {
        /**
         * Obtener el monto subtotal de todos
         * los artículos en la cesta
         */
        subtotal() {
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
         * devuelve el total
         * subtotal + envío
         */
        total() {
            const total = parseFloat(this.subtotal) + parseFloat(this.shipping);
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

        /**
         * Devuelve el precio de envío
         */
        shipping() {
            return 0;
        },

        /**
         * Devuelve el tax
         */
        tax() {
            return 0;
        },

        /**
         * Cantidad de items disponibles
         */
        availableItems() {
            const items = this.items;
            const filter = items.filter((item) => item.artwork?.state === 1);
            return filter.length;
        },

        /**
         * Si se ha seleccionad la dirección por defecto
         */
        isDefAddr() {
            return this.defaultAddress == 1;
        },

        /**
         * Verificar si hay datos agregados al formulario
         * de dirección de envío
         */
        isShippingAddressInfo() {
            // verificar si todo el form esta lleno
            const { address, postal_code, city } = this.form;
            return address && postal_code && city;
        },
    },
    created() {
        this.getItems();
        this.getShippingAddress();
        window.scrollTo(0, 0);
    },
    methods: {
        /**
         * productos del carrito
         */
        getItems() {
            this.loading = true;
            this.axios
                .get(this.ep.carts.getItems)
                .then((response) => (this.items = response.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Direcciones de envío
         */
        getShippingAddress() {
            this.loading = true;
            this.axios
                .get(this.ep.shippingAddress.getShippingAddress)
                .then((response) => {
                    // devolver la dirección por defecto
                    this.address = response.data.find((a) => a.default === 1);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Método de envío
         */
        changedMethod(type) {
            this.type = type;
        },

        /**
         * Cargar los datos según la dirección seleccionada
         */
        setShippingAddressInfo() {
            if (this.address?.id) {
                // verificar si selecciono la dirección por defecto
                // o la dirección del formulario
                if (this.isDefAddr) {
                    // cargar los datos de la dirección por defecto
                    this.form.address = this.address.direction;
                    this.form.postal_code = this.address.postal_code;
                    this.form.city = this.address.city;
                }
            }
        },

        /**
         * finalizar compras
         */
        finalPurchase() {
            // cargar datos de envió
            this.setShippingAddressInfo();

            // validar que exista una dirección
            if (!this.isShippingAddressInfo) {
                const msj =
                    "Debes llenar todos los campos de la dirección de envío";
                this.noty(msj, "error");
                return;
            }

            this.loading = true;

            const data = {
                address: this.form.address,
                postal_code: this.form.postal_code,
                city: this.form.city,
                shipping_method: parseInt(this.type),
                tax: this.tax,
                shipping: this.shipping,
            };

            this.axios
                .post(this.ep.carts.finish, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$router.push({
                            name: "checkoutSuccess",
                            params: { id: resp.data.id },
                        });

                        return;
                    }

                    this.noty(
                        "Hubo un problema para finalizar su pedido",
                        "error"
                    );
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
