<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="sale"
        v-show="showSection"
    >
        <div class="sm:px-5" v-if="!showDetails">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Mis Ventas </span>
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
                                @click.stop="
                                    filterToState(ITEM_STATES.shipped.val)
                                "
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
                                    filterToState(ITEM_STATES.delivered.val)
                                "
                            >
                                Finalizadas
                            </v-btn>
                        </div>
                        <!-- <div
                            class="w-full lg:w-auto lg:px-4 border-b border-b-gray-300 lg:border-b-0"
                        >
                            <v-btn
                                text
                                depressed
                                block
                                class="uppercase tracking-wide"
                                @click.stop=""
                            >
                                Canceladas
                            </v-btn>
                        </div> -->
                    </div>
                </div>
            </div>

            <!-- pedidos -->
            <div class="py-6 w-full">
                <div class="flex flex-wrap h-full items-stretch">
                    <LoadingTailwind v-if="loading" />
                    <CardSale
                        v-for="art in sales"
                        :key="art.id"
                        :item="art"
                        class="w-full"
                        @see-purchase="seePurchase"
                    />
                </div>
            </div>
            <!-- /obras -->
        </div>

        <!-- ver compra -->
        <PurchaseDetail
            class="sm:px-5 animate-fade-in-down"
            v-if="showDetails"
            :item="item"
            :title="setTitle"
            @back-to-orders="goToInit"
            @cancel-order="goToInit"
        />
        <!-- /ver compra -->
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import getDataMixin from "../../../mixins/getDataMixin";
import CardSale from "../components/CardSale.vue";
import PurchaseDetail from "../components/PurchaseDetail.vue";

export default {
    name: "SaleSection",
    components: { LoadingTailwind, CardSale, PurchaseDetail },
    mixins: [getDataMixin],

    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showDetails: false,
            showConfirmItems: false,
            sales: [],
            original: [],
            item: {},
            status: {
                shipped: false,
                delivered: false,
                canceled: false,
            },
        };
    },

    watch: {
        showSection(val) {
            if (val) {
                this.status.shipped = true;
                this.showDetails = false;
                this.getSales();
            }
        },
    },

    computed: {
        setTitle() {
            return this.item?.status === this.ITEM_STATES.canceled
                ? "Detalle de la venta/cancelado"
                : "Detalle de la venta";
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
            this.status.shipped = state === this.ITEM_STATES.shipped.val;
            this.status.delivered = state === this.ITEM_STATES.delivered.val;
            this.status.canceled = state === this.ITEM_STATES.canceled.val;
            this.filterOrders();
        },

        /**
         * Filtrar las ordenes según el estado seleccionado
         */
        filterOrders() {
            // pendientes - en curso
            if (this.status.shipped) {
                this.sales = this.original.filter(
                    (i) => i.status === this.ITEM_STATES.shipped.val
                );
            }

            // finalizadas - delivered
            if (this.status.delivered) {
                this.sales = this.original.filter(
                    (i) => i.status === this.ITEM_STATES.delivered
                );
            }
        },

        /**
         * Ver detalle de la compra
         */
        seePurchase(item) {
            this.showConfirmItems = false;
            this.showDetails = true;
            this.item = item;
        },

        /**
         * Confirmar  articulo(s)
         */
        // seeConfirmItems(item) {
        //     this.showDetails = false;
        //     this.showConfirmItems = true;
        //     this.item = item;
        // },

        /**
         * Ir al principio
         */
        goToInit() {
            this.showConfirmItems = false;
            this.showDetails = false;
            this.getSales();
        },

        /**
         * Obtiene las ventas del usuario
         *
         * artículos(obras) vendidos, estatus y orden generada
         */
        getSales() {
            this.loading = true;
            this.axios
                .get(this.ep.sales.getUserSales)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.sales = resp.data;
                        this.original = JSON.parse(JSON.stringify(this.sales));
                        return;
                    }

                    this.noty("Error al obtener las ventas", "error");
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
