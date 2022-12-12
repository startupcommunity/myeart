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
            @finalPurchase="finalPurchase"
            @changedMethod="changedMethod"
            @setAddress="changedAddress"
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
        OrderSection,
    },
    data() {
        return {
            loading: false,
            defaultAddress: 1,
            shipping: 0,
            tax: 0,
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
         * finalizar compras
         */
        finalPurchase() {
            // cargar datos de envió
            this.setShippingAddressInfo();

            // validar que exista una dirección
            if (!this.isShippingAddressInfo) {
                const msj = "Debes llenar la dirección de envío";
                this.noty(msj, "error");
                return;
            }

            this.loading = true;

            const data = {
                address: this.form.address,
                postal_code: this.form.postal_code,
                city: this.form.city,
                shipping_method: parseInt(this.typeMethod || 1),
                tax: this.tax,
                shipping: this.shipping,
            };

            this.axios
                .post(this.ep.carts.finish, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$store.dispatch("userRequest");

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
