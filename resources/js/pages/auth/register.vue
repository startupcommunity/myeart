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
                <form class="login-form validate-form">
                    <div class="login-icon">
                        <router-link
                            exact-active-class="active"
                            to="/"
                            style="color: #fff"
                        >
                            <i class="fas fa-arrow-left"></i>
                        </router-link>
                    </div>

                    <div
                        class="alert alert-danger mt-3"
                        role="alert"
                        v-if="
                            authErrors.has('username') ||
                            authErrors.has('name') ||
                            authErrors.has('email') ||
                            authErrors.has('password')
                        "
                    >
                        <div v-text="authErrors.get('username')"></div>
                        <div v-text="authErrors.get('name')"></div>
                        <div v-text="authErrors.get('email')"></div>
                        <div v-text="authErrors.get('password')"></div>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter username"
                    >
                        <input
                            v-model="email"
                            type="text"
                            placeholder="Correo electrónico"
                            class="input100"
                        />
                        <span class="focus-input100 email-input"></span>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter username"
                    >
                        <input
                            v-model="name"
                            type="text"
                            placeholder="Nombre y apellido"
                            class="input100"
                        />
                        <span class="focus-input100 user-input"></span>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter username"
                    >
                        <input
                            v-model="username"
                            type="text"
                            placeholder="Nombre de usuario"
                            class="input100"
                        />
                        <span class="focus-input100 user-input"></span>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter password"
                    >
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Contraseña"
                            class="input100"
                        />
                        <span class="focus-input100 password-input"></span>
                    </div>

                    <div
                        class="wrap-input100 validate-input"
                        data-validate="Enter confirm password"
                    >
                        <input
                            v-model="password_confirmation"
                            type="password"
                            placeholder="Confirmar contraseña"
                            class="input100"
                        />
                        <span class="focus-input100 password-input"></span>
                    </div>

                    <div class="flex items-center">
                        <input
                            id="default-checkbox-one"
                            type="checkbox"
                            class="w-4 h-4 text-app-brown-1 focus:bg-app-brown-1 bg-app-brown-1 rounded border-app-brown-1 focus:ring-app-brown-1 focus:ring-2"
                            v-model="accept"
                        />
                        <label
                            for="default-checkbox-one"
                            class="ml-2 mt-2 text-base font-light text-gray-100"
                        >
                            <span>Acepto los</span>
                        </label>
                        <button
                            class="font-bold hover:underline"
                            type="button"
                            @click.stop="showTermsAndCondition"
                        >
                            Términos y Condiciones
                        </button>
                        <Terms
                            :show="showTerms"
                            :fullScreen="true"
                            @close="showTerms = false"
                        />
                    </div>

                    <br />

                    <div class="container-login-form-btn">
                        <button
                            class="btn btn-primary login-form-btn"
                            type="button"
                            v-on:click="register"
                        >
                            Regístrate
                        </button>
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
import Terms from "./components/Terms.vue";

export default {
    name: "register",
    components: { Terms },
    data() {
        return {
            action: "register",
            username: "",
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            accept: false,
            showTerms: false,
        };
    },
    beforeDestroy() {
        this.authErrors.clear();
    },
    computed: {
        apiStateFormLoading() {
            return this.status === "loading";
        },
        ...mapState({
            status: (state) => state.auth.status,
        }),
        authErrors() {
            return this.$store.getters.authErrors;
        },
    },
    watch: {
        statusEvents() {
            if (this.status === "success") {
                this.$router.push("/perfil");
            }
        },
    },
    methods: {
        register() {
            if (this.accept) {
                const {
                    action,
                    username,
                    name,
                    email,
                    password,
                    password_confirmation,
                } = this;
                this.$store
                    .dispatch("authRequest", {
                        action,
                        username,
                        name,
                        email,
                        password,
                        password_confirmation,
                    })
                    .then(() => {
                        this.$notify({
                            group: "container",
                            text: "Usuario registrado",
                            type: "success",
                        });
                        this.$router.push("/perfil");
                    });

                return;
            }

            this.$notify({
                group: "container",
                title: "¡Error!",
                text: "Por favor aceptar los términos y condiciones",
                type: "error",
            });
        },

        showTermsAndCondition() {
            this.showTerms = true;
            console.log(this.showTerms);
        },
    },
};
</script>

<style scoped>
.email-input::after {
    content: "\f0e0";
}
.user-input::after {
    content: "\f007";
}
.password-input::after {
    content: "\f023";
}
.v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
    padding-bottom: 0px;
    margin-bottom: 0px;
}
</style>
