<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            persistent
            max-width="600"
            content-class="mt-0"
        >
            <v-card>
                <v-form
                    v-model="isValid"
                    ref="formBank"
                    @submit.prevent="addAccount"
                >
                    <v-card-title>
                        <div class="flex justify-between">
                            <h2 class="font-semibold tracking-wide text-2xl">
                                <span v-if="isUpdate">
                                    <i class="fas fa-edit text-primary"></i>
                                    Editar método de cobro
                                </span>
                                <span v-else>
                                    <i class="fas fa-plus text-primary"></i>
                                    Añadir nuevo método de cobro
                                </span>
                            </h2>
                            <button
                                type="button"
                                @click="$emit('close')"
                                :disabled="loading"
                            >
                                <i class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div class="flex flex-wrap">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label
                                        for="account_number"
                                        class="leading-7 text-sm text-gray-800 font-semibold"
                                    >
                                        Nº de cuenta bancaria
                                    </label>
                                    <v-text-field
                                        v-model="form.account_number"
                                        placeholder="ejemplo: ES0700120345030000067890"
                                        color="#B2794C"
                                        :disabled="loading"
                                        counter
                                        maxlength="24"
                                        :rules:="[
                                            (v) =>
                                                !!v ||
                                                'El número de cuenta es requerido',
                                            (v) =>
                                                v.length >= 24 ||
                                                'El número de cuenta debe tener al menos 24 caracteres',
                                        ]"
                                    >
                                    </v-text-field>
                                    <div>
                                        <span class="text-gray-500 text-sm">
                                            <i class="fas fa-info-circle"></i>
                                            Tenga presente que debe ser una
                                            cuenta corriente
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions class="bg-gray-100">
                        <div class="flex flex-wrap w-full">
                            <div class="w-full md:w-3/6">
                                <v-btn
                                    class="text-primary"
                                    depressed
                                    block
                                    large
                                    text
                                    :loading="loading"
                                    :disabled="loading"
                                    type="submit"
                                >
                                    <span v-if="!isUpdate">Agregar cuenta</span>
                                    <span v-else>Actualizar cuenta</span>
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
                </v-form>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "AddBankAccountModal",

    props: {
        show: {
            type: Boolean,
            default: false,
        },
        isUpdate: {
            type: Boolean,
            default: false,
        },
        charging: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            loading: false,
            isValid: false,
            form: {
                account_number: "",
                user_id: "",
            },
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
    },

    watch: {
        show(val) {
            if (val) {
                this.form = {
                    account_number: "",
                    user_id: "",
                };
            }

            if (this.isUpdate) {
                this.form = this.charging;
            }
        },
    },

    methods: {
        /**
         * Agregar una cuenta bancaria
         */
        addAccount() {
            this.loading = true;
            this.form.user_id = this.user.id;
            let ep = this.ep.chargingMethods.store;

            if (this.isUpdate) {
                ep = this.ep.chargingMethods.update + this.charging.id;
                this.form._method = "PUT";
            }

            this.axios
                .post(ep, this.form)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.$emit("close");

                        if (this.isUpdate) {
                            this.notySwal({
                                title: "Datos bancarios actualizados",
                                text: "Los datos bancarios se actualizaron correctamente",
                            });

                            this.$emit("updated");
                            return;
                        }

                        this.$emit("created");
                        this.notySwal({
                            title: "Datos bancarios agregados",
                            text: "Los datos bancarios se agregaron correctamente",
                        });
                        return;
                    }

                    this.$noty(
                        "No se pudo agregar los datos bancarios",
                        "error"
                    );
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
