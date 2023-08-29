<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="balance"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Mi Balance </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="pt-2 pb-12">
                <LoadingTailwind v-if="loading" />
                <article v-else>
                    <div class="flex flex-col sm:flex-row justify-between">
                        <div class="">
                            <h4 class="font-bold text-gray-900 text-lg">
                                Disponible para retiro
                            </h4>
                            <p class="text-gray-900 text-2xl font-light">
                                <span v-if="showBalance">
                                    {{ amount | stripeAmountToEuro }}
                                    {{ euro }}
                                </span>
                                <span v-else>******</span>
                                <v-btn @click.stop="showOrNotBalance" text>
                                    <i class="fa fa-eye" v-if="showBalance"></i>
                                    <i class="fa fa-eye-slash" v-else></i>
                                </v-btn>
                            </p>
                            <div v-if="amount">
                                <v-btn
                                    large
                                    outlined
                                    v-if="checkUserChargingMethod"
                                    @click.stop="openConfirmWithdrawModal"
                                >
                                    Retirar fondos
                                </v-btn>
                                <div v-else>
                                    <p class="text-gray-900 text-sm font-light">
                                        <i class="fa fa-warning"></i>
                                        Para retirar fondos debe agregar un
                                        método de cobro
                                    </p>
                                    <v-btn
                                        large
                                        outlined
                                        @click.stop="goTochargingMethod"
                                        color="#B2794C"
                                    >
                                        Agregar método de cobro
                                    </v-btn>
                                </div>
                            </div>
                            <div v-else>
                                <p class="text-gray-900 text-sm font-light">
                                    <i class="fa fa-info-circle"></i>
                                    No posee fondos disponibles para retirar
                                </p>
                            </div>
                        </div>
                        <!-- <div class="">
                            <h4 class="font-bold text-gray-900 text-lg">
                                Pendiente
                            </h4>
                            <p class="text-gray-900 text-2xl font-light">
                                {{ euro }}
                                {{ pending.amount | stripeAmountToEuro }}
                            </p>
                        </div> -->
                    </div>
                </article>

                <article>
                    <div class="flex flex-col sm:flex-row justify-between">
                        <div class="mt-8 sm:mt-0">
                            <h4 class="font-bold text-gray-900 text-lg">
                                Historial de pagos
                            </h4>
                            <hr />
                            <div class="flex flex-col overflow-x-auto">
                                <div class="">
                                    <div class="inline-block min-w-full py-2">
                                        <div class="overflow-x-auto">
                                            <TablePayout
                                                v-if="reloadTablePayout"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import useChargingMethod from "../../../mixins/useChargingMethod";
import TablePayout from "../components/TablePayout.vue";
import filtersMixin from "./../../../mixins/filtersMixin";
import {
    INFO_TITLE_NOTY,
    SUCCESS_TITLE_NOTY,
    SUCCESS_STRIPE_PAYOUT,
    NO_CHARGING_METHOD,
    ADD_CHARGING_METHOD,
    BACK,
    WITHDRAW_STRIPE_FUNDS,
    SEND_FUNDS_TO_BANK_ACCOUNT,
} from "./../../../util/text";

export default {
    name: "BalanceSection",
    components: { LoadingTailwind, TablePayout },
    mixins: [useChargingMethod, filtersMixin],

    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            loadingPayout: false,
            checkUserChargingMethod: false,
            openConfirm: false,
            reloadTablePayout: true,
            showBalance: false,
            balance: {
                available: 0,
                pending: 0,
            },
        };
    },

    computed: {
        available() {
            return this.balance.available[0] || { amount: 0 };
        },

        pending() {
            return this.balance.pending[0] || { amount: 0 };
        },

        amount() {
            // si es mayor a cero y con signo negativo se elimina el signo
            const pending = this.pending.amount;
            const amount = pending > 0 ? pending * -1 : pending;
            return this.available.amount + amount;
        },

        firstFourNumbers() {
            return this.defaultChargingMethod.account_number.slice(0, 4);
        },

        lastFourNumbers() {
            return this.defaultChargingMethod.account_number.slice(-4);
        },
    },

    watch: {
        showSection(val) {
            if (val) {
                this.showModal = false;
                this.getBalance();
                this.checkChargingMethod();
            }
        },

        loading(val) {
            this.reloadTablePayout = !val;
        },
    },

    methods: {
        /**
         * Obtiene la info del balance del usuario
         */
        getBalance() {
            this.loading = true;
            this.axios
                .get(this.ep.user.getUserBalance + this.$userAuth.id)
                .then((resp) => {
                    this.balance = resp.data;
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Ir a la sección métodos de cobro
         */
        goTochargingMethod() {
            // verificar si ya esta en la url charging
            if (this.$route.name === "userProfile") {
                // si esta en la url charging
                if (this.$route.params.section === "charging") {
                    // cerrar el modal
                    this.$emit("goToSectionChargingMethod", "charging");
                    return;
                }
            }

            // ir a la url charging
            this.$router.push({
                name: "userProfile",
                params: {
                    id: this.$userAuth.id,
                    section: "charging",
                },
            });
        },

        /**
         * Verifica si el usuario tiene un método de cobro agregado
         */
        async checkChargingMethod() {
            const check = await this.haveAChargingMethod();
            this.checkUserChargingMethod = check.length > 0;
        },

        /**
         * Abre el modal de confirmación para retirar fondos
         */
        openConfirmWithdrawModal() {
            const charging = this.defaultChargingMethod;
            // si no tiene un método de cobro agregado
            if (!charging) {
                return this.confirmedDialog({
                    title: INFO_TITLE_NOTY,
                    text: NO_CHARGING_METHOD,
                    icon: "warning",
                    confirmButtonText: ADD_CHARGING_METHOD,
                    cancelButtonText: BACK,
                }).then((resp) => {
                    if (resp.isConfirmed) {
                        this.goTochargingMethod();
                    }
                });
            }

            // cuenta bancaria ****
            const text = SEND_FUNDS_TO_BANK_ACCOUNT(
                this.firstFourNumbers,
                this.lastFourNumbers
            );
            // abrir modal de confirmación
            const confirm = this.confirmedDialog({
                title: WITHDRAW_STRIPE_FUNDS,
                text,
                icon: "info",
                showDenyButton: true,
                confirmButtonText: WITHDRAW_STRIPE_FUNDS,
                denyButtonText: ADD_CHARGING_METHOD,
                cancelButtonText: BACK,
            });
            // respuesta promesa
            confirm.then((resp) => {
                if (resp.isConfirmed) {
                    this.createPayout();
                } else if (resp.isDenied) {
                    this.goTochargingMethod();
                }
            });
        },

        /**
         * Crear el pago de stripe
         * para retirar fondos de la cuenta conectada
         * hacia el banco del usuario
         */
        createPayout() {
            this.loading = true;

            const data = { user_id: this.$userAuth.id };

            this.axios
                .post(this.ep.user.createPayout, data)
                .then((resp) => {
                    // si ocurrió algún problema al procesar el pago
                    if (resp.status !== 200) {
                        return this.notySwal({
                            title: INFO_TITLE_NOTY,
                            text: resp.data.message,
                            icon: "warning",
                        });
                    }
                    // pago procesado
                    this.notySwal({
                        title: SUCCESS_TITLE_NOTY,
                        text: SUCCESS_STRIPE_PAYOUT,
                        icon: "success",
                    });
                    // actualizar saldo disponible
                    this.getBalance();
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Ver/ocultar balance
         */
        showOrNotBalance() {
            this.showBalance = !this.showBalance;
        },
    },
};
</script>
