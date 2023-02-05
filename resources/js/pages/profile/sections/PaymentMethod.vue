<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="payment"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Métodos de pago </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="flex flex-wrap pt-2 pb-12 justify-start">
                <div
                    class="w-full lg:w-1/2 h-72 pb-8"
                    :class="hasPayments ? 'sm:pr-8' : ''"
                >
                    <v-btn
                        outlined
                        text
                        x-large
                        block
                        rounded
                        height="100%"
                        @click.stop="showModal = true"
                    >
                        <div class="flex flex-col space-y-4">
                            <i class="fas fa-plus text-gray-300 fa-4x"></i>
                            <span class="font-black">
                                Añadir Cuenta bancaria
                            </span>
                        </div>
                    </v-btn>
                </div>
                <div
                    v-for="(pay, index) in payments"
                    :key="pay.id"
                    class="w-full lg:w-1/2 h-72 pb-8 animate-fade-in-down"
                    :class="index % 1 == 0 ? 'sm:pr-8' : ''"
                >
                    <div
                        class="rounded-3xl border border-gray-100 p-6 h-full hover:animate-shadow-drop-center flex flex-col justify-between"
                    >
                        <h3
                            class="text-lg text-primary uppercase font-semibold"
                            v-if="pay.default === 1"
                        >
                            Predeterminada
                        </h3>
                        <div class="py-4">
                            <p class="text-base font-light leading-5">
                                <span class="font-semibold">Banco:</span>
                                {{ pay.bank_name }}
                            </p>
                            <!-- <p class="text-base font-light leading-5">
                                <span class="font-semibold">Tipo de cuenta:</span>
                                {{ pay.type }}
                            </p> -->
                            <p class="text-base font-light leading-5">
                                <span class="font-semibold"
                                    >Número de cuenta:</span
                                >
                                {{ pay.account_number }}
                            </p>
                            <p class="text-base font-light leading-5">
                                <span class="font-semibold">Titular:</span>
                                {{ pay.fullname }}
                            </p>
                        </div>
                        <div class="flex justify-start items-end">
                            <v-btn
                                depressed
                                text
                                @click.stop="editPayment(pay.id)"
                            >
                                Editar
                            </v-btn>
                            <div
                                class="border-r border-gray-600 h-8 my-0"
                            ></div>
                            <v-btn
                                depressed
                                text
                                @click.stop="deletePayment(pay.id)"
                            >
                                Descartar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- crear método de pago -->
        <CreatePaymentMethodModal
            :show="showModal"
            @close="showModal = false"
            @created="getPayments"
        />
    </section>
</template>

<script>
import CreatePaymentMethodModal from "./../components/CreatePaymentMethodModal.vue";

export default {
    name: "PaymentMethod",
    components: { CreatePaymentMethodModal },

    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showModal: false,
            payments: [],
        };
    },

    computed: {
        hasPayments() {
            return this.payments.length > 0;
        },
        user() {
            return this.$store.getters.getProfile;
        },
    },

    watch: {
        showSection(val) {
            if (val) {
                this.showModal = false;
                this.getPayments();
            }
        },
    },

    methods: {
        getPayments() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.user.getUserPaymentMethods + this.user.id)
                .then((resp) => (this.payments = resp.data))
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        editPayment(id) {
            const payments = this.payments;
            const pay = payments.find((pay) => pay.id === id);
        },

        deletePayment(id) {
            this.confirmedDialog().then((resp) => {
                if (resp.isConfirmed) {
                    const endpoint = this.ep.paymentMethods.delete + id;
                    const params = { _method: "DELETE" };
                    this.globalLoading = true;
                    this.axios
                        .post(endpoint, params)
                        .then((resp) => {
                            if (resp.status === 200) {
                                this.getPayments();
                                this.notySwal({
                                    title: "¡Método de pago Eliminado!",
                                    text: "El método de pago se ha eliminado correctamente",
                                });
                            }
                        })
                        .catch((error) => this.manageError(error))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },
    },
};
</script>
