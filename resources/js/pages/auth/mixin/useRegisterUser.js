import getDataMixin from "../../../mixins/getDataMixin";

export default {
    mixins: [getDataMixin],
    data() {
        return {
            action: "register",
            username: "",
            name: "",
            email: "",
            password: "",
            pais_id: "",
            password_confirmation: "",
            accept: false,
            showTerms: false,
            showConfirmRegister: false,
            loading: false,
        };
    },

    created() {
        this.getCountries();
    },

    computed: {
        /**
         * Mostrar o colapsar modal de registro
         */
        showModalRegister: {
            get() {
                return this.$store.getters.showModalRegister;
            },
            set(value) {
                this.$store.dispatch("setShowModalRegister", value);
            },
        },

        /**
         * Errores de autenticación
         */
        authErrors() {
            return this.$store.getters.authErrors;
        },
    },

    methods: {
        /**
         * Registrar usuario
         *
         * @returns void
         */
        registerUser() {
            const obj = {
                action: this.action,
                username: this.username,
                name: this.name,
                email: this.email,
                pais_id: this.pais_id,
                password: this.password,
                password_confirmation: this.password_confirmation,
            };

            if (this.username === "") {
                return this.$noty(
                    "Por favor ingrese su nombre de usuario",
                    "error"
                );
            }

            if (this.name === "") {
                return this.$noty("Por favor ingrese su nombre", "error");
            }

            if (this.email === "") {
                return this.$noty("Por favor ingrese su correo", "error");
            }

            if (this.pais_id === "") {
                return this.$noty("Por favor ingrese su pais", "error");
            }

            if (this.password === "") {
                return this.$noty("Por favor ingrese su contraseña", "error");
            }

            if (this.password_confirmation === "") {
                return this.$noty(
                    "Por favor ingrese su confirmación de contraseña",
                    "error"
                );
            }

            if (!this.accept) {
                return this.$noty(
                    "Por favor acepte los términos y condiciones",
                    "error"
                );
            }

            this.loading = true;

            this.$store
                .dispatch("authRequest", obj)
                .then(() => {
                    this.$noty("Registro exitoso");

                    // limpiar campos
                    this.username = "";
                    this.name = "";
                    this.pais_id = "";
                    this.password = "";
                    this.password_confirmation = "";
                    this.accept = false;

                    // cerrar modal de registro
                    this.closeModalRegister();

                    // modal para confirmar el correo
                    this.showConfirmRegister = true;
                })
                .catch((error) => console.log(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Clear data
         */
        clearRegisterData() {
            this.username = "";
            this.name = "";
            this.email = "";
            this.pais_id = "";
            this.password = "";
            this.password_confirmation = "";
            this.accept = false;
            this.showTerms = false;
            this.showConfirmRegister = false;
            this.loading = false;
        },

        /**
         * Cerra modal de registro
         */
        closeModalRegister() {
            this.showModalRegister = false;
        },

        /**
         * Ir al login
         */
        goToLogin() {
            this.showModalRegister = false;
            this.$router.push({ name: "login" });
        },
    },
};
