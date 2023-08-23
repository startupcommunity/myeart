<template>
    <table class="min-w-full text-center text-sm font-light border">
        <thead class="border-b font-medium">
            <tr>
                <th scope="col" class="px-6 py-4 border-r">#</th>
                <th scope="col" class="px-6 py-4 border-r">Fecha</th>
                <th scope="col" class="px-6 py-4 border-r">Moneda</th>
                <th scope="col" class="px-6 py-4 border-r">Monto</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loadingPayout">
                <td colspan="3" class="px-6 py-4">
                    <LoadingTailwind />
                </td>
            </tr>
            <tr class="border-b" v-else v-for="pay in copyPayouts">
                <td class="whitespace-nowrap border-r px-6 py-4 font-medium">
                    <a
                        class="text-blue-500 hover:text-blue-700"
                        @click.prevent="showModal(pay)"
                    >
                        {{ pay.number_transaction }}
                    </a>
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4 font-medium">
                    {{ pay.created_at | formatBasicDate }}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4">
                    {{ pay.currency }}
                </td>
                <td class="whitespace-nowrap border-r px-6 py-4">
                    {{ euro }}
                    {{ pay.amount | stripeAmountToEuro }}
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="px-6 py-4 font-medium">Total</td>
                <td class="px-6 py-4 font-medium">
                    {{ euro }}
                    {{ total | stripeAmountToEuro }}
                </td>
            </tr>
            <tr v-if="showButton">
                <td colspan="4" class="px-6 py-4 font-medium">
                    <v-btn @click.stop="loadMorePayouts"> Ver mas </v-btn>
                </td>
            </tr>
        </tfoot>

        <ShowDetailsPayoutModal
            :payout="payout"
            :show="showDetails"
            @close="showDetails = false"
        />
    </table>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import filtersMixin from "./../../../mixins/filtersMixin";
import { NUMBER_OF_PAYOUT } from "./../../../util/const";
import ShowDetailsPayoutModal from "./ShowDetailsPayoutModal.vue";

export default {
    components: { LoadingTailwind, ShowDetailsPayoutModal },
    mixins: [filtersMixin],
    props: {
        // payouts: {
        //     type: Array,
        //     default: () => [],
        //     description: "Listado de pagos",
        // },
        // loadingPayout: {
        //     type: Boolean,
        //     default: false,
        //     description: "Cargando pagos",
        // },
    },

    data() {
        return {
            copyPayouts: [],
            showDetails: false,
            payout: {},
            payouts: [],
            loadingPayout: false,
        };
    },

    mounted() {
        this.getPayouts();
    },

    computed: {
        total() {
            return this.copyPayouts.reduce((acc, pay) => {
                const pAcc = parseFloat(acc);
                const pPay = parseFloat(pay.amount);
                return pAcc + pPay;
            }, 0);
        },
        showButton() {
            return this.copyPayouts.length < this.payouts.length;
        },
    },

    methods: {
        /**
         * carga un máximo de pagos iniciales
         * NUMBER_OF_PAYOUT = 5
         */
        loadInitPayouts() {
            // copiar de los payouts originales
            this.copyPayouts = JSON.parse(JSON.stringify(this.payouts));

            // limitar el numero de registros iniciales
            this.copyPayouts.splice(NUMBER_OF_PAYOUT, this.copyPayouts.length);

            // ordenar por fecha de creación
            this.copyPayouts.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
        },

        /**
         * Cargar mas pagos
         * según la constante NUMBER_OF_PAYOUT
         */
        loadMorePayouts() {
            // obtener el numero de registros a mostrar
            const number = this.copyPayouts.length + NUMBER_OF_PAYOUT;

            // copiar de los payouts originales
            this.copyPayouts = JSON.parse(JSON.stringify(this.payouts));

            // limitar el numero de registros iniciales
            this.copyPayouts.splice(number, this.copyPayouts.length);
        },

        /**
         * Ver todos los datos del pago
         */
        showModal(pay) {
            this.payout = pay;
            this.showDetails = true;
        },

        /**
         * Obtiene los pagos realizados al banco del usuario
         */
        getPayouts() {
            this.payouts = [];
            this.loadingPayout = true;
            this.axios
                .get(this.ep.user.getUserPayouts + this.$userAuth.id)
                .then((resp) => {
                    this.payouts = resp.data;
                    this.loadInitPayouts();
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loadingPayout = false));
        },
    },
};
</script>
