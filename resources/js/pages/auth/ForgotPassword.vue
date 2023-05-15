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
                <form
                    class="login-form validate-form"
                    method="POST"
                    @submit.prevent="forgotPassword"
                >
                    <div class="text-white">
                        <h3 class="text-2xl text-white font-semibold pb-3">
                            ¿Olvido su contraseña?
                        </h3>
                        <p>
                            Ingrese su correo electrónico y espere las
                            instrucciones para recuperar su contraseña
                        </p>
                        <v-text-field
                            label="Correo electrónico"
                            prepend-icon="mdi-email"
                            type="email"
                            name="email"
                            v-model="user.email"
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

                        <div class="text-center mt-3">
                            <router-link
                                exact-active-class="active"
                                :to="{ name: 'login' }"
                                style="color: #fff"
                            >
                                <i class="fas fa-arrow-left"></i> Volver al
                                login
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ForgotPassword",

    data() {
        return {
            user: {
                email: "",
            },
        };
    },

    mounted() {
        this.$vuetify.theme.dark = true;
    },

    methods: {
        forgotPassword() {
            this.globalLoading = true;
            this.axios
                .post(this.ep.passwordResets.sendToken, this.user)
                .then((resp) => {
                    if (resp.status === 204) {
                        this.notySwal({
                            icon: "info",
                            title: "Aviso",
                            text: "No se encontró un usuario con ese correo",
                        });
                        return;
                    }

                    if (resp.status === 200) {
                        this.$router.push({
                            name: "enterToken",
                            params: { email: this.user.email },
                        });
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
