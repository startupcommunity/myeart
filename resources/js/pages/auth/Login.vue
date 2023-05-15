<template>
    <div class="home-login">
        <loading-overlay
            :active="apiStateFormLoading"
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
                    v-on:submit.prevent="login"
                >
                    <div class="login-icon">
                        <router-link
                            exact-active-class="active"
                            to="/"
                            style="color: #fff"
                        >
                            <i class="fas fa-arrow-left"></i>
                        </router-link>
                    </div>

                    <p
                        class="text-danger"
                        v-if="authErrors.has('invalid_credentials')"
                        v-text="authErrors.get('invalid_credentials')"
                    ></p>

                    <div
                        class="alert alert-danger mt-3"
                        role="alert"
                        v-if="
                            authErrors.has('email') ||
                            authErrors.has('password')
                        "
                    >
                        <div v-text="authErrors.get('email')"></div>
                        <div v-text="authErrors.get('password')"></div>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter username"
                    >
                        <input
                            v-model="user.email"
                            type="text"
                            placeholder="Nombre de usuario / Teléfono / Correo"
                            class="input100"
                        />
                        <span class="focus-input100 user-input"></span>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter password"
                    >
                        <input
                            v-model="user.password"
                            type="password"
                            placeholder="Contraseña"
                            class="input100"
                        />
                        <span class="focus-input100 password-input"></span>
                    </div>
                    <div class="">
                        <button
                            class="btn btn-primary login-form-btn"
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                    <div class="text-center py-3">
                        <router-link
                            exact-active-class="active"
                            :to="{
                                name: 'forgotPassword',
                            }"
                            class="text-white"
                        >
                            ¿Olvidaste tu contraseña?
                        </router-link>
                    </div>
                    <div class="container-login-form-btn">
                        <button class="btn btn-primary google-form-btn">
                            Entrar Con
                            <img
                                src="../../../../public/img/image 31.png"
                                width="70px"
                                style="margin-top: 4px"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

//computed
function authErrors() {
    return this.$store.getters.authErrors;
}
function apiStateFormLoading() {
    return this.status === "loading";
}
export default {
    name: "login",
    data() {
        return {
            user: {
                email: "",
                password: "",
                remember: false,
            },
        };
    },
    methods: {
        login() {
            const { email, password, remember } = this.user;
            this.$store
                .dispatch("authRequest", { email, password, remember })
                .then(async () => {
                    await this.$store.dispatch("userRequest");
                    this.$notify({
                        group: "container",
                        text: "Logueado con éxito",
                        type: "success",
                    });
                    this.$router.push("/dashboard");
                });
        },
    },
    beforeDestroy() {
        this.authErrors.clear();
    },
    computed: {
        authErrors,
        apiStateFormLoading,
        ...mapState({
            status: (state) => state.auth.status,
        }),
    },
};
</script>

<style scoped>
.user-input::after {
    content: "\f007";
}
.password-input::after {
    content: "\f023";
}
</style>
