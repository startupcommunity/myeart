<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="order"
        v-show="showSection"
    >
        <div class="sm:px-5" v-if="!showPurchase && !showConfirmOrder">
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
                                    status.pending ? 'font-bold' : 'font-light'
                                "
                                @click.stop="filterToState(statusEnum.pending)"
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
                                    filterToState(statusEnum.delivered)
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
                                @click.stop="filterToState(statusEnum.canceled)"
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
                    <CardOrder
                        v-for="order in orders"
                        :key="order.id"
                        :order="order"
                        class="animate-fade-in-down w-full"
                        @see-purchase="seePurchase"
                        @confirm-order="seeConfirmOrder"
                    />
                </div>
            </div>
            <!-- /obras -->
        </div>

        <!-- ver compra -->
        <PurchaseDetail
            v-if="showPurchase"
            class="sm:px-5 animate-fade-in-down"
            :order="order"
            @back-to-orders="goToInit"
            @cancel-order="goToInit"
            @confirm-order="seeConfirmOrder"
        />
        <!-- /ver compra -->

        <!-- confirmar compra -->
        <ConfirmPurchase
            v-if="showConfirmOrder"
            :order="order"
            @back-to-orders="goToInit"
            @confirmed-order="goToInit"
        />
        <!-- /confirmar compra -->
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import utilMixin from "../../../mixins/utilMixin";
import CardOrder from "../components/CardOrder.vue";
import PurchaseDetail from "../components/PurchaseDetail.vue";
import ConfirmPurchase from "../components/ConfirmPurchase.vue";

export default {
    name: "OrderSection",
    components: { LoadingTailwind, CardOrder, PurchaseDetail, ConfirmPurchase },
    mixins: [utilMixin],
    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showPurchase: false,
            showConfirmOrder: false,
            selectedOption: 1,
            orders: [],
            original: [],
            order: {},
            status: {
                pending: false,
                delivered: false,
                canceled: false,
            },
            statusEnum: {
                pending: 1,
                delivered: 5,
                canceled: 3,
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

    watch: {
        showSection(val) {
            if (val) {
                this.status.pending = true;
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
                pending: false,
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
            this.status.pending = state === this.statusEnum.pending;
            this.status.delivered = state === this.statusEnum.delivered;
            this.status.canceled = state === this.statusEnum.canceled;
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
                        this.orders = resp.data;
                        this.original = JSON.parse(JSON.stringify(this.orders));
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
            const params = {
                option: this.selectedOption,
            };

            this.getOrders(params);
        },

        /**
         * Filtrar las ordenes según el estado seleccionado
         */
        filterOrders() {
            // pendientes - en curso
            if (this.status.pending) {
                this.orders = this.original.filter(
                    (or) => or.status === this.statusEnum.pending
                );
            }

            // finalizadas - delivered
            if (this.status.delivered) {
                this.orders = this.original.filter(
                    (order) => order.status === this.statusEnum.delivered
                );
            }

            // canceladas
            if (this.status.canceled) {
                this.orders = this.original.filter(
                    (order) => order.status === this.statusEnum.canceled
                );
            }
        },

        /**
         * Ver detalle de la compra
         */
        seePurchase(order) {
            this.showConfirmOrder = false;
            this.showPurchase = true;
            this.order = order;
        },

        /**
         * Confirmar orden
         */
        seeConfirmOrder(order) {
            this.showPurchase = false;
            this.showConfirmOrder = true;
            this.order = order;
        },

        /**
         * Ir al principio
         */
        goToInit() {
            this.showConfirmOrder = false;
            this.showPurchase = false;
            this.getOrders();
        },
    },
};
</script>
