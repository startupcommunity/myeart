<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección cesta -->
        <OrderSection
            :loading="loading"
            :items="items"
            :address="address"
            :shipping="shipping"
            :tax="tax"
            :form="form"
            :client-secret="client_secret"
            @changedMethod="changedMethod"
            @setAddress="changedAddress"
            @processPayment="processPayment"
            v-if="showCart"
        />
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
import OrderSection from "./sections/OrderSection.vue";
import utilMixin from "../../mixins/utilMixin";

export default {
    name: "IndexShoppingCart",
    mixins: [utilMixin],
    components: {
        MainLayout,
        Header,
        OtherArtworks,
        CardItemCheckout,
        UseDefaultAddress,
        UseFormAddress,
        UseShippingMethod,
        OrderSection,
    },
    data() {
        return {
            loading: false,
            showCart: false,
            defaultAddress: 1,
            client_secret: null,
            shipping: 0,
            tax: 15,
            typeMethod: 1,
            items: [],
            address: {},
            form: {
                address: "",
                postal_code: "",
                city: "",
            },
        };
    },

    created() {
        this.getItems();
        this.getIntent();
        this.getShippingAddress();
        window.scrollTo(0, 0);
    },

    computed: {
        /**
         * Devuelve una de las obras al azar
         * dentro de los items
         */
        artwork() {
            const defaultObj = { categories: [{ id: 1 }] };
            const calc = Math.floor(Math.random() * this.items.length);
            const item = this.items[calc];
            return item?.artwork || defaultObj;
        },

        /**
         * Devuelve el usuario logueado
         */
        user() {
            return this.$store.getters.getProfile || {};
        },

        /**
         * Verificar si hay datos agregados al formulario
         * de dirección de envío
         */
        isShippingAddressInfo() {
            const { address, postal_code, city } = this.form;
            return address && postal_code && city;
        },
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
         * Genera el intento de pago
         */
        getIntent() {
            this.axios
                .get(this.ep.carts.intent)
                .then((resp) => {
                    this.client_secret = resp.data;
                    this.showCart = true;
                })
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
            this.typeMethod = type;
        },

        /**
         * Dirección de envío
         */
        changedAddress(val) {
            this.defaultAddress = val;
        },

        /**
         * Cargar los datos según la dirección seleccionada
         */
        setShippingAddressInfo() {
            if (this.address?.id) {
                // verificar si selecciono la dirección por defecto
                // o la dirección del formulario
                if (this.defaultAddress == 1) {
                    // cargar los datos de la dirección por defecto
                    this.form.address = this.address.direction;
                    this.form.postal_code = this.address.postal_code;
                    this.form.city = this.address.city;
                }
            }
        },

        /**
         * Procesar el pago
         */
        async processPayment(stripe, elements) {
            // cargar datos de envió
            this.setShippingAddressInfo();

            if (!this.isShippingAddressInfo) {
                const msj = "Debes llenar la dirección de envío";
                this.noty(msj, "error");
                return;
            }

            // shippingAddress from user state
            this.$store.dispatch("dataShippingAddress", this.form);

            this.loading = true;

            const url = this.secureUrl + "/checkout/success";
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: url,
                    shipping: {
                        name: this.user.name,
                        address: {
                            line1: this.form.address,
                            postal_code: this.form.postal_code,
                            city: this.form.city,
                        },
                    },
                },
            });

            if (error) {
                this.noty(error.message, "error");
                this.loading = false;
            } else {
                console.info("Pago procesado correctamente");
                this.loading = false;
            }
        },
    },
};
</script>
