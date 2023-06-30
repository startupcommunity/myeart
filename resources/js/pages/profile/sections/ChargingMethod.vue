<template>
    <section
        class="w-full sm:w-3/5 bg-white px-5 sm:px-12 sm:py-20 h-full animate-fade-in-down"
        id="charging"
        v-show="showSection"
    >
        <div class="sm:px-5">
            <h3
                class="font-black text-xl sm:text-lg md:text-3xl tracking-tight uppercase text-gray-900"
            >
                <span class="text-md-left text-center"> Métodos de cobro </span>
            </h3>
            <div
                class="mt-4 py-4 border-t border-gray-900 hidden sm:block"
            ></div>
            <div class="flex flex-wrap pt-2 pb-12 justify-start">
                <div
                    class="w-full lg:w-1/2 h-72 pb-8"
                    :class="hasChargings ? 'sm:pr-8' : ''"
                >
                    <v-btn
                        outlined
                        text
                        x-large
                        block
                        rounded
                        height="100%"
                        @click.stop="createPayment"
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
                    v-for="(pay, index) in chargings"
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
                                <span class="font-semibold">
                                    Número de cuenta:
                                    <v-btn
                                        @click.stop="
                                            changeVisibilityNumber(pay.id)
                                        "
                                        small
                                        icon
                                    >
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </span>
                            </p>
                            <p class="text-base font-light leading-5">
                                <span :id="'show_account_' + pay.id">
                                    {{ pay.account_number }}
                                </span>
                                <span :id="'hide_account_' + pay.id">
                                    {{ pay.account_number | secretNumber }}
                                </span>
                            </p>
                            <p class="text-base font-light leading-5">
                                <span class="font-semibold">Titular:</span>
                                {{ pay.account_holder_name }}
                            </p>
                        </div>
                        <div class="flex justify-start items-end">
                            <!-- <v-btn
                                depressed
                                text
                                @click.stop="editPayment(pay.id)"
                            >
                                Editar
                            </v-btn> -->
                            <!-- <div
                                class="border-r border-gray-600 h-8 my-0"
                            ></div> -->
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

        <!-- crear método de cobro -->
        <AddBankAccountModal
            :show="showModal"
            :charging="charging"
            :isUpdate="editCharging"
            @close="showModal = false"
            @created="getChargings"
            @updated="getChargings"
        />
    </section>
</template>

<script>
import AddBankAccountModal from "../components/AddBankAccountModal.vue";

export default {
    name: "ChargingMethod",
    components: { AddBankAccountModal },
    props: {
        showSection: {
            type: Boolean,
        },
    },

    data() {
        return {
            loading: false,
            showModal: false,
            editCharging: false,
            chargings: [],
            showAccounts: [],
            charging: {},
        };
    },

    computed: {
        hasChargings() {
            return this.chargings.length > 0;
        },
        user() {
            return this.$store.getters.getProfile;
        },
    },

    watch: {
        showSection(val) {
            if (val) {
                this.showModal = false;
                this.getChargings();
            }
        },
    },

    filters: {
        /**
         * Aplicar slice a los números de cuenta bancaria
         *
         * @param {String} value        Número de cuenta bancaria
         */
        secretNumber(value) {
            return (
                value.slice(0, 4) + " **** **** **** **** " + value.slice(-4)
            );
        },
    },

    methods: {
        /**
         * Obtiene los métodos de cobro del usuario
         */
        getChargings() {
            this.globalLoading = true;
            this.axios
                .get(this.ep.user.getUserChargeMethods + this.user.id)
                .then((resp) => (this.chargings = resp.data))
                .then((_) => {
                    if (this.chargings.length > 0) {
                        this.chargings.forEach((pay) => {
                            const invisible = document.getElementById(
                                "hide_account_" + pay.id
                            );
                            const visible = document.getElementById(
                                "show_account_" + pay.id
                            );
                            invisible.style.display = "block";
                            visible.style.display = "none";
                        });
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Cambia la visibilidad del número de cuenta
         *
         * @param {Object} id
         */
        changeVisibilityNumber(id) {
            const visible = document.getElementById("show_account_" + id);
            const invisible = document.getElementById("hide_account_" + id);

            if (visible.style.display === "none") {
                visible.style.display = "block";
                invisible.style.display = "none";
            } else {
                visible.style.display = "none";
                invisible.style.display = "block";
            }
        },

        /**
         * Editar un método de cobro
         *
         * @param {Number} id     id del método de cobro
         */
        editPayment(id) {
            this.charging = this.chargings.find((pay) => pay.id === id);
            this.editCharging = true;
            this.showModal = true;
        },

        /**
         * Crear un nuevo método de cobro
         */
        createPayment() {
            this.editCharging = false;
            this.showModal = true;
        },

        /**
         * Eliminar un método de cobro
         *
         * @param {Number} id    id del método de cobro
         */
        deletePayment(id) {
            this.confirmedDialog().then((resp) => {
                if (resp.isConfirmed) {
                    const endpoint = this.ep.chargingMethods.delete + id;
                    const params = { _method: "DELETE" };
                    this.globalLoading = true;
                    this.axios
                        .post(endpoint, params)
                        .then((resp) => {
                            if (resp.status === 200) {
                                this.getChargings();
                                this.notySwal({
                                    title: "¡Método de cobro Eliminado!",
                                    text: "El método de cobro se ha eliminado correctamente",
                                });

                                return;
                            }

                            console.log(resp);

                            if (resp.status === 201) {
                                this.notySwal({
                                    title: "¡No se pudo eliminar!",
                                    text: resp.data,
                                    icon: "warning",
                                });

                                return;
                            }
                        })
                        .catch((error) => this.$manageError(error))
                        .finally(() => (this.globalLoading = false));
                }
            });
        },
    },
};
</script>
