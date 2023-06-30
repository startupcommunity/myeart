<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="show"
                persistent
                max-width="600"
                content-class="mt-0"
            >
                <v-card color="grey lighten-3">
                    <v-card-title>
                        <div class="flex justify-between md:px-10">
                            <h2 class="font-semibold tracking-wide text-2xl">
                                Añadir una dirección
                            </h2>
                            <button
                                type="button"
                                @click="$emit('close-modal-create-address')"
                            >
                                <i class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div class="flex flex-wrap md:px-8">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label
                                        for="direction"
                                        class="leading-7 text-sm text-gray-800 font-semibold"
                                    >
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        id="direction"
                                        name="direction"
                                        v-model="form.direction"
                                        placeholder="Dirección de envío/ Calle, carretera..."
                                        class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-full md:w-1/2">
                                <div class="relative">
                                    <label
                                        for="Código"
                                        class="leading-7 text-sm text-gray-800 font-semibold"
                                    >
                                        Código
                                    </label>
                                    <input
                                        type="text"
                                        id="Código"
                                        name="Código"
                                        v-model="form.postal_code"
                                        placeholder="Código postal"
                                        class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-full md:w-1/2">
                                <div class="relative">
                                    <label
                                        for="ciudad"
                                        class="leading-7 text-sm text-gray-800 font-semibold"
                                    >
                                        Ciudad / Provincia
                                    </label>
                                    <input
                                        type="text"
                                        id="Ciudad"
                                        name="ciudad"
                                        v-model="form.city"
                                        placeholder="Ciudad"
                                        class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label
                                        for="phone"
                                        class="leading-7 text-sm text-gray-800 font-semibold"
                                    >
                                        Número Telefónico
                                    </label>
                                    <div class="flex flex-wrap">
                                        <div class="w-1/4 pr-4">
                                            <input
                                                type="text"
                                                id="phone"
                                                name="code"
                                                v-model="form.phone_code"
                                                placeholder="Código"
                                                class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                        <div class="w-3/4">
                                            <input
                                                type="number"
                                                id="phone"
                                                name="number"
                                                v-model="form.phone_number"
                                                placeholder="Teléfono"
                                                class="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-gray-600 focus:ring-2 focus:ring-gray-200 text-base outline-none text-primary py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
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
                                    @click.stop="saveDirection"
                                >
                                    Aceptar
                                </v-btn>
                            </div>
                            <div class="w-full md:w-3/6">
                                <v-btn
                                    class="text-dark"
                                    block
                                    large
                                    depressed
                                    text
                                    @click="$emit('close-modal-create-address')"
                                >
                                    Cancelar
                                </v-btn>
                            </div>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import requestErrorsMixin from "../../../mixins/requestErrorsMixin";
export default {
    name: "CreateAddressModal",
    mixins: [requestErrorsMixin],
    props: {
        show: {
            type: Boolean,
        },
    },
    data() {
        return {
            form: {
                direction: "",
                postal_code: "",
                city: "",
                phone_code: "",
                phone_number: "",
                default: 1,
            },
        };
    },
    computed: {
        isFormValidate() {
            const form = this.form;
            const validate =
                form.direction &&
                form.postal_code &&
                form.city &&
                form.phone_code &&
                form.default &&
                form.phone_number;

            return validate;
        },
    },
    methods: {
        /**
         * Guardar la dirección de envió
         */
        saveDirection() {
            if (!this.isFormValidate) {
                return this.$noty("Todos los campos son requeridos", "warning");
            }

            this.globalLoading = true;

            this.axios
                .post(this.ep.shippingAddress.save, this.form)
                .then((resp) => {
                    if (resp.status === 201) {
                        this.resetForm();

                        this.$emit("close-modal-create-address");
                        this.$emit("reload-address");

                        this.$noty("Dirección agregada con éxito");
                    }
                })
                .catch((error) => this.showRequestErrors(error))
                .finally(() => (this.globalLoading = false));
        },

        resetForm() {
            const form = this.form;
            form.direction = "";
            form.postal_code = "";
            form.city = "";
            form.phone_code = "";
            form.phone_number = "";
            form.default = 1;
        },
    },
};
</script>
