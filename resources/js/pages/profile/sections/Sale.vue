<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="sale"
        v-show="showSection"
    >
        <div class="sm:px-5">
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
                    <CardItem
                        v-for="order in sales"
                        :key="order.id"
                        :order="order"
                        class="w-full"
                        @see-purchase="seePurchase"
                        @confirm-order="seeConfirmItems"
                    />
                </div>
            </div>
            <!-- /obras -->
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardItem from "../components/CardItem.vue";

export default {
    name: "SaleSection",
    components: { LoadingTailwind, CardItem },
    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showPurchase: false,
            showConfirmItems: false,
            sales: [],
            original: [],
            sale: {},
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
        };
    },

    watch: {
        showSection(val) {
            if (val) {
                this.getSales();
            }
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
         * Filtrar las ordenes según el estado seleccionado
         */
        filterOrders() {
            // pendientes - en curso
            if (this.status.pending) {
                this.sales = this.original.filter(
                    (or) => or.status === this.statusEnum.pending
                );
            }

            // finalizadas - delivered
            if (this.status.delivered) {
                this.sales = this.original.filter(
                    (or) => or.status === this.statusEnum.delivered
                );
            }
        },

        /**
         * Ver detalle de la compra
         */
        seePurchase(order) {
            this.showConfirmItems = false;
            this.showPurchase = true;
            this.order = order;
        },

        /**
         * Confirmar  articulo(s)
         */
        seeConfirmItems(order) {
            this.showPurchase = false;
            this.showConfirmItems = true;
            this.order = order;
        },

        /**
         * Ir al principio
         */
        goToInit() {
            this.showConfirmItems = false;
            this.showPurchase = false;
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
                        // this.sales = resp.data;
                        this.sales = resp.data.map((item) => {
                            item.order.items = item.artworks.map((artwork) => {
                                return artwork.artwork;
                            });
                            delete item.artworks;
                            return item.order;
                        });

                        this.original = JSON.parse(JSON.stringify(this.sales));
                        console.log(this.sales);
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
