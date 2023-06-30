<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            max-width="600"
            content-class="mt-0"
        >
            <v-card color="grey lighten-3">
                <v-card-title>
                    <div class="flex justify-between">
                        <h2 class="font-semibold tracking-wide text-2xl">
                            Añadir una nuevo método de pago
                        </h2>
                        <button type="button" @click="$emit('close')">
                            <i class="fa fa-times text-primary"></i>
                        </button>
                    </div>
                </v-card-title>
                <v-card-text>
                    <div class="flex flex-wrap">
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label
                                    for="bank_name"
                                    class="leading-7 text-sm text-gray-800 font-semibold"
                                >
                                    Nombre del banco
                                </label>
                                <input
                                    type="text"
                                    id="bank_name"
                                    name="bank_name"
                                    v-model="form.bank_name"
                                    placeholder="banco Santander, BBVA, etc."
                                    class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label
                                    for="account_number"
                                    class="leading-7 text-sm text-gray-800 font-semibold"
                                >
                                    Nº de cuenta
                                </label>
                                <input
                                    type="text"
                                    id="account_number"
                                    name="account_number"
                                    v-model="form.account_number"
                                    placeholder="ejemplo: 12345678901234567890"
                                    class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label
                                    for="fullname"
                                    class="leading-7 text-sm text-gray-800 font-semibold"
                                >
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    v-model="form.fullname"
                                    placeholder="ejemplo: Juan Pérez"
                                    class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="bg-white">
                    <div class="flex flex-wrap w-full">
                        <div class="w-full md:w-3/6">
                            <v-btn
                                class="text-primary"
                                depressed
                                block
                                large
                                text
                                @click.stop="createPaymentMethod"
                                :loading="loading"
                                :disabled="loading"
                            >
                                Agregar
                            </v-btn>
                        </div>
                        <div class="w-full md:w-3/6">
                            <v-btn
                                class="text-dark"
                                block
                                large
                                depressed
                                text
                                @click="$emit('close')"
                                :disabled="loading"
                            >
                                Cancelar
                            </v-btn>
                        </div>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "CreatePaymentMethodModal",

    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            loading: false,
            form: {
                account_number: "",
                fullname: "",
                bank_name: "",
                user_id: "",
            },
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
    },

    methods: {
        isDataValid() {
            return (
                this.form.account_number.length > 0 &&
                this.form.fullname.length > 0 &&
                this.form.bank_name.length > 0
            );
        },

        createPaymentMethod() {
            if (!this.isDataValid()) {
                this.$noty("Por favor, rellena todos los campos", "error");
                return;
            }

            this.loading = true;
            this.form.user_id = this.user.id;

            this.axios
                .post(this.ep.paymentMethods.store, this.form)
                .then((resp) => {
                    if (resp.status !== 200) {
                        this.$noty(
                            "Hubo un error al crear el método de pago",
                            "error"
                        );
                        return;
                    }

                    this.notySwal({
                        title: "¡Método de pago creado!",
                        text: "El método de pago se ha creado correctamente",
                    });
                    this.$emit("created");
                    this.$emit("close");
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
