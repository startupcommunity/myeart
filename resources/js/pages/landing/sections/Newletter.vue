<template>
    <div
        class="lg:py-28 bg-mobile-newsletter md:bg-newsletter bg-cover bg-no-repeat bg-center"
    >
        <div class="container py-6 sm:py-0">
            <h2
                class="font-black text-xl lg:text-3xl leading-10 text-white text-center"
            >
                El newsletter para grandes artistas
            </h2>
            <div class="flex justify-center items-center">
                <v-form
                    ref="newForm"
                    lazy-validation
                    v-model="isValid"
                    @submit.prevent="sendNewLetter"
                    class="w-full lg:w-1/2 py-8"
                >
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control h-14"
                            aria-label="Text input with dropdown button"
                            v-model="email"
                        />
                        <div class="input-group-append">
                            <button
                                class="btn btn-dark px-5 text-gray-200"
                                :disabled="loading"
                            >
                                SUSCRÍBETE
                            </button>
                        </div>
                    </div>
                </v-form>
            </div>
            <h5
                class="text-white font-light tracking-wider text-sm text-center uppercase"
            >
                100% arte, 0% spam, lo prometemos.
            </h5>
        </div>

        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    </div>
</template>
<script>
export default {
    name: "NewLetter",

    data() {
        return {
            loading: false,
            isValid: true,
            email: "",
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile || {};
        },
    },

    methods: {
        sendNewLetter() {
            if (!this.email) {
                return this.notySwal({
                    icon: "error",
                    title: "Error",
                    text: "Por favor, debe indicar un email válido",
                });
            }

            this.loading = true;
            this.axios
                .post(this.ep.newsletter.suscribe, {
                    email: this.email,
                    user_id: this.user?.id || null,
                })
                .then((_) => {
                    this.notySwal({
                        title: "¡Gracias!",
                        text: "Ahora estás suscrito a nuestro newsletter, recibirás información sobre nuestros próximos eventos y novedades.",
                    });

                    // limpiar campos
                    this.email = "";
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
