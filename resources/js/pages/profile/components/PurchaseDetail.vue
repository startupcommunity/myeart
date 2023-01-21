<template>
    <div>
        <v-btn
            text
            depressed
            large
            class="uppercase tracking-wide font-bold"
            @click.stop="$emit('back-to-orders')"
        >
            <v-icon class="mr-2"> mdi-arrow-left </v-icon>
            Volver atrás
        </v-btn>
        <div class="mt-4 py-4 border-t border-gray-900"></div>

        <!-- detalles de la compra -->
        <div class="w.full">
            <h3
                class="text-3xl uppercase font-bold text-zinc-900 tracking-wider"
            >
                {{ title }}
            </h3>
            <p class="uppercase text-2xl font-medium">Nº {{ orderNumber }}</p>
            <p class="text-base font-medium">{{ orderDate }}</p>
        </div>
        <!-- /detalles de la compra -->

        <!-- mas detalles -->
        <div class="w-full pb-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-3">
                <div>
                    <div
                        v-for="art in items"
                        :key="art.id"
                        class="animate-fade-in-both"
                    >
                        <div class="flex justify-start gap-5 mb-3">
                            <img
                                :src="getImage(art)"
                                alt="obra-de-arte"
                                class="w-28 h-28 object-cover object-center aspect-square"
                            />
                            <div>
                                <p class="text-xl font-bold text-zinc-900">
                                    {{ art.artwork?.title }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="font-bold text-gray-900">
                        Enviado por: <br />
                        <span class="font-light">
                            {{ sellerMethod.text }}
                        </span>
                    </p>
                    <p class="font-bold text-gray-900">
                        Dirección: <br />
                        <span class="font-light">
                            {{ address }}
                        </span>
                    </p>
                    <p class="font-bold text-gray-900">
                        Total: {{ total }} {{ euro }}
                        <br />
                        <span class="font-light uppercase">
                            + Impuestos incluidos
                        </span>
                    </p>
                    <div
                        class="flex gap-3 items-center mt-3"
                        v-if="isVisibleButtons"
                    >
                        <v-btn
                            color="gray darken-1"
                            small
                            outlined
                            class="text-zinc-900"
                            @click.stop="cancelOrder"
                            :disabled="loading"
                            :loading="loading"
                            v-if="!isDelivered"
                        >
                            Cancelar pedido
                        </v-btn>
                        <v-btn
                            color="gray darken-1"
                            small
                            outlined
                            class="text-zinc-900"
                            @click.stop="$emit('confirm-order', order)"
                            :disabled="loading"
                            v-if="!isDelivered"
                        >
                            Confirmar pedido
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <!-- /mas detalles -->
    </div>
</template>

<script>
import getDataMixin from "../../../mixins/getDataMixin";

export default {
    name: "PurchaseDetail",
    mixins: [getDataMixin],

    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
        title: {
            type: String,
            default: "Detalle de la compra",
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        /**
         * Numero de orden
         */
        orderNumber() {
            return "000" + this.order.id;
        },

        /**
         * Formato: 7 de enero de 2023
         */
        orderDate() {
            const date = new Date(this.order.created_at);

            // const day = date.toLocaleString("es-ES", { weekday: "long" });
            const dayNumber = date.toLocaleString("es-ES", { day: "numeric" });
            const month = date.toLocaleString("es-ES", { month: "long" });
            const year = date.toLocaleString("es-ES", { year: "numeric" });

            // nombre de dia y meses en PascalCase
            const monthPascal = month.charAt(0).toUpperCase() + month.slice(1);

            // imprimir el formato, ejemplo: 7 de enero de 2023
            return `${dayNumber} de ${monthPascal} de ${year}`;
        },

        /**
         * Artículos de la orden
         */
        items() {
            return this.order.items || [];
        },

        /**
         * Tipo de envío
         */
        shippingMethod() {
            return this.order.shipping_method || {};
        },

        /**
         * Tipo de envío en texto
         * acordar con el vendedor
         */
        sellerMethod() {
            return this.SHIPPING_TYPE.seller.val === this.shippingMethod.type
                ? this.SHIPPING_TYPE.seller
                : "";
        },

        /**
         * Dirección de entrega
         */
        shippingAddress() {
            return this.order.shipping_address || {};
        },

        /**
         * Dirección de entrega en texto completa
         */
        address() {
            const address = this.shippingAddress;
            const city = address?.city || "";
            const state = address?.state || "";
            const code = address?.postal_code || "";
            return `${address?.address}, ${code} ${(city, state)}`;
        },

        /**
         * Total de la orden
         */
        total() {
            return this.order.total || 0;
        },

        /**
         * Si los botones de acción son visibles
         */
        isVisibleButtons() {
            return this.order.status !== this.ORDER_STATES.canceled.val;
        },

        /**
         * Esta la orden entregada
         */
        isDelivered() {
            return this.order.status === this.ORDER_STATES.delivered.val;
        },
    },

    methods: {
        getImage(art) {
            const artwork = art.artwork || {};
            const gallery = artwork?.gallery || [];

            if (!gallery.length) return this.getURLDefaultFrontArtwork;

            const front_page = gallery.filter((pic) => pic.front_page === 1);

            return `${this.pathArtworkGallery + front_page[0]?.picture}`;
        },

        /**
         * Cancela la orden
         */
        cancelOrder() {
            const alert = this.confirmedDialog({
                title: "¿Desea cancelar su pedido?",
                text: "Su pedido se visualizará en el panel de cancelados y podrá volver a comprarlo.",
                confirmButtonText: "Sí, cancelar",
                cancelButtonText: "No, volver",
            });

            alert.then((resp) => {
                if (resp.isConfirmed) {
                    this.loading = true;
                    const data = { _method: "PUT" };
                    this.axios
                        .post(this.ep.orders.cancel + this.order.id, data)
                        .then((resp) => {
                            if (resp.status === 200) {
                                this.notySwal({
                                    title: "Pedido cancelado",
                                    text: "Su pedido se ha cancelado correctamente.",
                                });

                                this.$emit("cancel-order");
                            }
                        })
                        .catch((error) => this.manageError(error))
                        .finally(() => (this.loading = false));
                }
            });
        },
    },
};
</script>
