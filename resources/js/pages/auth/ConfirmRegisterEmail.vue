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
                <div class="mb-96 sm:mb-auto">
                    <h3
                        class="text-2xl text-white font-medium pb-3"
                        v-if="!is_confirm && globalLoading"
                    >
                        Confirmando correo electrónico

                        <!-- icon pulse -->
                        <i class="fas fa-spinner fa-pulse"></i>
                    </h3>
                    <h3
                        class="text-2xl text-white font-medium pb-3"
                        v-else-if="!is_confirm"
                    >
                        El token ha expirado o no coincide con nuestros
                        registros.

                        <!-- icon pulse -->
                        <i class="fas fa-times text-red-600"></i>

                        <p class="mt-3">
                            <router-link
                                to="/login"
                                class="btn btn-primary text-white"
                            >
                                Volver al login
                            </router-link>
                        </p>
                    </h3>
                    <h3 class="text-2xl text-white font-medium pb-3" v-else>
                        Correo electrónico confirmado
                        <i class="fa fa-check text-green-700"></i>

                        <p class="mt-3">
                            Ya puede
                            <router-link to="/login">
                                iniciar sesión
                            </router-link>
                        </p>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmRegisterEmail",

    data() {
        return {
            token: "",
            is_confirm: false,
        };
    },

    mounted() {
        // recuperar token de la url
        this.token = this.$route.params.token;

        // verificar token
        this.verifyToken();
    },

    methods: {
        verifyToken() {
            this.globalLoading = true;
            const data = { token: this.token };
            this.axios
                .post(this.ep.confirmRegister.verifyToken, data)
                .then((resp) => {
                    if (resp.status === 204) {
                        this.notySwal({
                            icon: "info",
                            title: "Aviso",
                            text: "El token no coincide con nuestros registros",
                        });
                        return;
                    }

                    if (resp.status === 200) {
                        this.is_confirm = true;
                        this.notySwal({
                            icon: "success",
                            title: "Email confirmado",
                            text: "Ya puede iniciar sesión",
                        });

                        this.$router.push({ name: "login" });
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
