<template>
    <v-row justify="center">
        <v-dialog v-model="show" persistent max-width="800">
            <v-card class="bg-white">
                <div class="flex flex-col justify-center p-3">
                    <div>
                        <h3 class="text-lg font-bold">
                            Detalles de la transacción
                        </h3>
                        <hr class="py-2" />
                    </div>
                    <div>
                        <p>
                            <span class="font-bold">Fecha: </span>
                            {{ payout.created_at | formatBasicDate }}
                        </p>
                        <p>
                            <span class="font-bold">Monto: </span>
                            {{ payout.amount | stripeAmountToEuro }}
                            {{ euro }}
                        </p>
                        <p>
                            <span class="font-bold">Moneda: </span>
                            {{ payout.currency | formatCurrency }}
                        </p>
                        <p>
                            <span class="font-bold"
                                >Número de transacción:
                            </span>
                            {{ payout.number_transaction }}
                        </p>
                        <p>
                            <span class="font-bold">Estado: </span>
                            {{ payout.status | formatStatusPayout }}
                        </p>
                        <p>
                            <span class="font-bold">Tipo de pago: </span>
                            {{ payout.type | formatTypePayout }}
                        </p>
                        <p>
                            <span class="font-bold">Descripción: </span>
                            {{ payout.description }}
                        </p>
                    </div>
                    <div class="flex justify-center items-center">
                        <v-btn @click="$emit('close')" outlined> Cerrar </v-btn>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import filtersMixin from "../../../mixins/filtersMixin";

export default {
    name: "ShowDetailsPayoutModal",
    mixins: [filtersMixin],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        payout: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    watch: {
        show(val) {
            if (val) {
                this.getPayoutDetails();
            }
        },
    },

    methods: {
        getPayoutDetails() {
            this.loading = true;
            this.axios
                .get(this.ep.payouts.getDetails + this.payout.stripe_payout_id)
                .then((resp) => console.log(resp.data))
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
