<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="order"
        v-show="showSection"
    >
        <div class="sm:px-5" v-if="!showPurchase && !showConfirmItem">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Mis Pedidos </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="flex flex-wrap justify-between">
                <div class="w-full lg:w-3/4">
                    <div
                        class="flex flex-wrap justify-start items-center mt-3 mt-md-0"
                    >
                        <div
                            class="w-full lg:w-auto lg:border-r-2 lg:border-gray-800 lg:pr-4 border-b border-b-gray-300 lg:border-b-0"
                        >
                            <v-btn
                                text
                                depressed
                                block
                                class="uppercase tracking-wide"
                                :class="
                                    status.shipped ? 'font-bold' : 'font-light'
                                "
                                @click.stop="filterToState(ITEM_STATES.shipped)"
                            >
                                En curso
                            </v-btn>
                        </div>
                        <div
                            class="w-full lg:w-auto lg:border-r-2 lg:border-gray-800 lg:px-4 border-b border-b-gray-300 lg:border-b-0"
                        >
                            <v-btn
                                text
                                depressed
                                block
                                class="uppercase tracking-wide"
                                :class="
                                    status.delivered
                                        ? 'font-bold'
                                        : 'font-light'
                                "
                                @click.stop="
                                    filterToState(ITEM_STATES.delivered)
                                "
                            >
                                Finalizadas
                            </v-btn>
                        </div>
                        <div
                            class="w-full lg:w-auto lg:px-4 border-b border-b-gray-300 lg:border-b-0"
                        >
                            <v-btn
                                text
                                depressed
                                block
                                class="uppercase tracking-wide"
                                :class="
                                    status.canceled ? 'font-bold' : 'font-light'
                                "
                                @click.stop="
                                    filterToState(ITEM_STATES.canceled)
                                "
                            >
                                Canceladas
                            </v-btn>
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-1/4">
                    <v-select
                        :items="sortBy"
                        item-text="text"
                        item-value="val"
                        item-color="brown darken-2"
                        color="#B2794C"
                        class="lg:-mt-4"
                        v-model="selectedOption"
                    ></v-select>
                </div>
            </div>

            <!-- pedidos -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind v-if="loading" />
                    <CardItem
                        v-for="art in items"
                        :key="art.id"
                        :item="art"
                        :shippingAddress="art.order?.shipping_address"
                        class="w-full"
                        @see-purchase="seePurchase"
                        @confirm-order="seeConfirmOrder"
                        @contact-seller="contactSeller"
                    />
                </div>
            </div>
            <!-- /obras -->
        </div>

        <!-- ver compra -->
        <PurchaseDetail
            class="sm:px-5 animate-fade-in-down"
            v-if="showPurchase"
            :item="item"
            :title="setTitle"
            @back-to-orders="goToInit"
            @cancel-order="goToInit"
            @confirm-order="seeConfirmOrder"
        />
        <!-- /ver compra -->

        <!-- confirmar compra -->
        <ConfirmPurchase
            v-if="showConfirmItem"
            :item="item"
            @back-to-orders="goToInit"
            @confirmed-order="goToInit"
        />
        <!-- /confirmar compra -->
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import utilMixin from "../../../mixins/utilMixin";
import CardItem from "../components/CardItem.vue";
import PurchaseDetail from "../components/PurchaseDetail.vue";
import ConfirmPurchase from "../components/ConfirmPurchase.vue";
import getDataMixin from "../../../mixins/getDataMixin";

export default {
    name: "OrderSection",
    components: { LoadingTailwind, CardItem, PurchaseDetail, ConfirmPurchase },
    mixins: [utilMixin, getDataMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showPurchase: false,
            showConfirmItem: false,
            selectedOption: 1,
            // orders: [],
            items: [],
            original: [],
            item: {},
            // order: {},
            status: {
                shipped: false,
                delivered: false,
                canceled: false,
            },
            sortBy: [
                { text: "Ver todos", val: 1 },
                { text: "Esta semana", val: 2 },
                { text: "Este mes", val: 3 },
                { text: "Mes pasado", val: 4 },
                { text: "Ultimo año", val: 5 },
            ],
        };
    },

    computed: {
        setTitle() {
            return this.item?.status === this.ITEM_STATES.canceled
                ? "Detalle del pedido/cancelado"
                : "Detalle de la compra";
        },
    },

    watch: {
        showSection(val) {
            if (val) {
                this.status.shipped = true;
                this.showPurchase = false;
                this.getOrders();
            }
        },

        selectedOption(_) {
            this.getFilterOrders();
        },
    },

    methods: {
        /**
         * Reset estados
         */
        resetStatus() {
            this.status = {
                shipped: false,
                delivered: false,
                canceled: false,
            };
        },

        /**
         * Mostrar sección según estados
         *
         * @param {Number} state
         */
        filterToState(state) {
            this.resetStatus();
            this.status.shipped = state === this.ITEM_STATES.shipped;
            this.status.delivered = state === this.ITEM_STATES.delivered;
            this.status.canceled = state === this.ITEM_STATES.canceled;
            this.filterOrders();
        },

        /**
         * Obtener ordenes del usuario logueado
         */
        getOrders(params = {}) {
            this.loading = true;
            this.axios
                .get(this.ep.orders.getUserOrders, { params })
                .then((resp) => {
                    if (resp.status === 200) {
                        // obtener  ordenes
                        // guardar ordenes originales
                        // this.original = JSON.parse(JSON.stringify(this.orders));

                        // obtener solo los items de todas las ordenes
                        // this.orders = resp.data;
                        const mapItems = resp.data.map((order) => order.items);
                        const concatItems = [].concat.apply([], mapItems);
                        this.items = concatItems;
                        this.original = JSON.parse(JSON.stringify(concatItems));
                        this.filterOrders();
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Obtener ordenes del usuario logueado
         * filtradas según la opción seleccionada
         */
        getFilterOrders() {
            const params = { option: this.selectedOption };

            this.getOrders(params);
        },

        /**
         * Filtrar las ordenes según el estado seleccionado
         */
        filterOrders() {
            // pendientes - enviadas
            if (this.status.shipped) {
                this.items = this.original.filter(
                    (i) => i.status === this.ITEM_STATES.shipped.val
                );
            }

            // finalizadas - delivered
            if (this.status.delivered) {
                this.items = this.original.filter(
                    (i) => i.status === this.ITEM_STATES.delivered.val
                );
            }

            // canceladas
            if (this.status.canceled) {
                this.items = this.original.filter(
                    (i) => i.status === this.ITEM_STATES.canceled.val
                );
            }
        },

        /**
         * Ver detalle de la compra
         *
         * @param {Object} item     item de la orden
         */
        seePurchase(item) {
            this.showConfirmItem = false;
            this.showPurchase = true;
            this.item = item;
        },

        /**
         * Confirmar orden
         *
         * @param {Object} item     item de la orden
         */
        seeConfirmOrder(item) {
            this.showPurchase = false;
            this.showConfirmItem = true;
            this.item = item;
        },

        /**
         * Ir al principio
         */
        goToInit() {
            this.showConfirmItem = false;
            this.showPurchase = false;
            this.getOrders();
        },

        /**
         * Contactar al vendedor
         *
         * @param {Object} item     item de la orden
         */
        contactSeller(item) {
            this.$router.push({
                name: "contactSeller",
                params: { id: item.id },
            });
        },
    },
};
</script>
