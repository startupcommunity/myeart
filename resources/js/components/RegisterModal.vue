<template>
    <v-row justify="center">
        <v-dialog
            v-model="showModalRegister"
            persistent
            max-width="600"
            content-class="mt-20"
        >
            <loading-overlay
                :active="loading"
                :is-full-page="true"
                loader="bars"
            />
            <v-card class="p-3 rounded">
                <v-card-text class="text-left pt-6">
                    <div class="flex justify-between items-center">
                        <h3
                            class="text-left text-gray-900 font-medium text-2xl"
                        >
                            <i class="fa fa-users text-primary"></i>
                            ¡Unete a la comunidad ahora!
                        </h3>
                        <v-btn
                            icon
                            large
                            @click="closeModalRegister"
                            class="text-gray-900"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-text>
                    <div>
                        <form class="text-lg font-medium flex flex-col gap-5">
                            <SectionRequestError :authErrors="authErrors" />

                            <div>
                                <label
                                    for="email"
                                    class="text-base font-light text-zinc-500"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    v-model="email"
                                    type="text"
                                    placeholder="example@myeart.com"
                                    class="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 text-base font-light text-zinc-600"
                                    id="email"
                                />
                            </div>

                            <div>
                                <label
                                    for="fullname"
                                    class="text-base font-light text-zinc-500"
                                >
                                    Nombre y apellido
                                </label>
                                <input
                                    v-model="name"
                                    type="text"
                                    placeholder="Andrés Pérez"
                                    class="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 text-base font-light text-zinc-600"
                                    id="fullname"
                                />
                            </div>

                            <div>
                                <label
                                    for="username"
                                    class="text-base font-light text-zinc-500"
                                >
                                    Nombre de usuario
                                </label>
                                <input
                                    v-model="username"
                                    type="text"
                                    placeholder="andres_perez"
                                    class="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 text-base font-light text-zinc-600"
                                    id="username"
                                />
                            </div>

                            <div>
                                <label
                                    for="country"
                                    class="text-base font-light text-zinc-500"
                                >
                                    País
                                </label>
                                <CountryAutoComplete
                                    :isEditable="true"
                                    :modelID="pais_id"
                                    name="pais_id"
                                    label="Seleccione un país"
                                    textColor="#9ca3af"
                                    icon="mdi-earth"
                                    :isDarkMode="false"
                                    :countries="countries.data"
                                    :sizeImg="25"
                                    @change-value="pais_id = $event"
                                    class="-mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    for="pass"
                                    class="text-base font-light text-zinc-500"
                                >
                                    Contraseña
                                </label>
                                <input
                                    v-model="password"
                                    type="password"
                                    placeholder="********"
                                    class="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 text-base font-light text-zinc-600"
                                    id="pass"
                                />
                            </div>

                            <div>
                                <label
                                    for="pass_confirm"
                                    class="text-base font-light text-zinc-500"
                                >
                                    Confirmar contraseña
                                </label>
                                <input
                                    v-model="password_confirmation"
                                    type="password"
                                    placeholder="********"
                                    class="w-full border border-zinc-300 px-3 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-1 text-base font-light text-zinc-600"
                                    id="pass_confirm"
                                />
                            </div>

                            <div class="flex items-center justify-start">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    class="w-6 h-6 text-app-brown-1 focus:bg-app-brown-1 bg-app-brown-1 rounded border-app-brown-1 focus:ring-app-brown-1 focus:ring-2"
                                    v-model="accept"
                                />
                                <label
                                    for="terms"
                                    class="text-base font-light text-zinc-400 inline-flex items-center cursor-pointer ml-2 mt-2"
                                >
                                    <span>Acepto los</span>
                                </label>
                                <button
                                    class="font-normal hover:underline text-base text-app-brown-1"
                                    type="button"
                                    @click.stop="showTerms = true"
                                >
                                    Términos y Condiciones
                                </button>
                            </div>

                            <hr class="border-zinc-400" />

                            <div
                                class="flex justify-between flex-col md:flex-row items-center gap-5"
                            >
                                <h5
                                    class="text-base font-light text-zinc-400 text-center text-md-left order-1 md:order-2"
                                >
                                    ¿Ya tienes una cuenta?
                                    <button
                                        class="font-normal hover:underline text-base text-app-brown-1"
                                        type="button"
                                        @click="goToLogin"
                                    >
                                        Inicia sesión
                                    </button>
                                </h5>
                                <v-btn
                                    class="text-white font-semibold order-2 md:order-1 w-full md:w-auto"
                                    color="#B2794C"
                                    @click.stop="registerUser"
                                >
                                    Registrarme
                                </v-btn>
                            </div>

                            <ConfirmRegister
                                :show="showConfirmRegister"
                                :email="email"
                                @close="showConfirmRegister = false"
                            />
                            <Terms
                                :show="showTerms"
                                :fullScreen="true"
                                @close="showTerms = false"
                            />
                        </form>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import Terms from "./../pages/auth/components/Terms.vue";
import ConfirmRegister from "./../pages/auth/components/ConfirmRegister.vue";
import userRegisterUser from "./../pages/auth/mixin/useRegisterUser";
import CountryAutoComplete from "./CountryAutoComplete.vue";
import SectionRequestError from "./SectionRequestError.vue";

export default {
    name: "RegisterModal",
    mixins: [userRegisterUser],
    components: { Terms, ConfirmRegister, CountryAutoComplete, SectionRequestError },

    beforeDestroy() {
        this.authErrors.clear();
    },
};
</script>
