<template>
    <div class="home-login">
        <loading-overlay
            :active="globalLoading"
            :is-full-page="true"
            loader="bars"
        />
        <div class="wrap-login p-2">
            <div
                class="container-login"
                style="background: rgba(255, 255, 255, 0.05)"
            >
                <!-- form verificar token -->
                <form
                    class="login-form validate-form"
                    method="POST"
                    @submit.prevent="verifyToken"
                    v-if="!successfulVerification"
                >
                    <div class="text-white">
                        <h3 class="text-2xl text-white font-semibold pb-3">
                            Introduzca el código de verificación enviado al
                            correo electrónico indicado
                        </h3>
                        <p v-if="tokenTime >= 0">
                            El código vence en {{ tokenTime }} minutos
                        </p>
                        <p v-else>
                            El código ha vencido, por favor
                            <router-link
                                exact-active-class="active"
                                :to="{ name: 'forgotPassword' }"
                                style="color: #fff"
                            >
                                <strong>solicite uno nuevo</strong>
                            </router-link>
                        </p>

                        <v-text-field
                            label="Código de verificación"
                            prepend-icon="mdi-number"
                            type="text"
                            name="token"
                            v-model="user.token"
                            required
                            :disabled="tokenTime <= 0"
                        ></v-text-field>
                    </div>

                    <div>
                        <v-btn
                            color="primary"
                            class="mt-3"
                            type="submit"
                            block
                            large
                            :disabled="tokenTime <= 0"
                        >
                            Enviar
                        </v-btn>
                    </div>
                </form>

                <!-- form cambiar clave -->
                <form
                    class="login-form validate-form animate-fade-in-down"
                    method="POST"
                    @submit.prevent="changePassword"
                    v-else
                >
                    <div class="text-white">
                        <h3 class="text-2xl text-white font-semibold pb-3">
                            Ingrese su nueva contraseña
                        </h3>
                        <p>Ingrese una contraseña segura</p>

                        <v-text-field
                            label="Nueva contraseña"
                            prepend-icon="mdi-lock"
                            type="password"
                            name="pass"
                            v-model="user.pass"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Repetir contraseña"
                            prepend-icon="mdi-lock"
                            type="password"
                            name="confirm-pass"
                            v-model="user.confirmPass"
                            required
                        ></v-text-field>
                    </div>

                    <div>
                        <v-btn
                            color="primary"
                            class="mt-3"
                            type="submit"
                            block
                            large
                        >
                            Enviar
                        </v-btn>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EnterToken",

    data() {
        return {
            user: {
                token: "",
                email: "",
                pass: "",
                confirmPass: "",
            },

            tokenTime: 0,
            successfulVerification: false,
        };
    },

    mounted() {
        this.$vuetify.theme.dark = true;

        // saber el tiempo restante del token
        this.tokenRemainingTime();
    },

    methods: {
        /**
         * Verifica el token ingresado en la bd
         */
        verifyToken() {
            this.globalLoading = true;
            this.axios
                .post(this.ep.passwordResets.verifyToken, this.user)
                .then((resp) => {
                    if (resp.status === 204) {
                        this.notySwal({
                            icon: "info",
                            title: "Aviso",
                            text: "El token no coincide con el enviado al correo electrónico",
                        });
                        return;
                    }

                    this.successfulVerification = true;
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Cambiar el password
         */
        changePassword() {
            // verificar que las contraseñas coincidan
            if (this.user.pass !== this.user.confirmPass) {
                this.notySwal({
                    icon: "info",
                    title: "Aviso",
                    text: "Las contraseñas no coinciden, verifique e intente nuevamente",
                });
                return;
            }

            this.globalLoading = true;
            this.axios
                .post(this.ep.passwordResets.changePassword, this.user)
                .then((resp) => {
                    if (resp.status !== 200) return;
                    this.notySwal({
                        icon: "success",
                        title: "Éxito",
                        text: "Contraseña cambiada correctamente",
                    });

                    this.$router.push({ name: "login" });
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Calcular el tiempo restante del token
         */
        tokenRemainingTime() {
            // tomar email de la url
            this.user.email = this.$route.params?.email || "";

            // validar
            if (!this.user.email) {
                return;
            }

            // axios
            this.axios
                .get(this.ep.passwordResets.tokenRemainingTime, {
                    params: {
                        email: this.user.email,
                    },
                })
                .then((resp) => {
                    if (resp.status === 204) {
                        this.notySwal({
                            icon: "info",
                            title: "Aviso",
                            text: "El código no se encuentra",
                        });
                        return;
                    }

                    this.tokenTime = resp.data;
                })
                .catch((error) => this.$manageError(error));
        },
    },
};
</script>
