<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- formulario de contacto -->
        <section class="bg-white">
            <div class="container mx-auto px-4 py-10">
                <div class="flex flex-wrap">
                    <div class="w-full px-4">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-zinc-100"
                        >
                            <div class="flex-auto p-5 lg:p-10">
                                <h4 class="text-2xl font-semibold">
                                    ¡Contáctanos!
                                </h4>
                                <p
                                    class="leading-relaxed mt-1 mb-4 text-gray-600"
                                >
                                    Completa el siguiente formulario y nos
                                    pondremos en contacto contigo.
                                </p>
                                <v-form
                                    ref="contactForm"
                                    v-model="formIsValid"
                                    lazy-validation
                                    @submit.prevent="sendContactForm"
                                >
                                    <div class="relative w-full mb-3 mt-8">
                                        <label
                                            class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            for="full-name"
                                        >
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Nombre completo"
                                            v-model="form.fullname"
                                            required
                                        />
                                    </div>

                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            for="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Email"
                                            v-model="form.email"
                                            required
                                        />
                                    </div>

                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-gray-700 text-xs font-bold mb-2"
                                            for="message"
                                        >
                                            Mensaje
                                        </label>
                                        <textarea
                                            rows="4"
                                            cols="80"
                                            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                            placeholder="Escribe tu mensaje"
                                            v-model="form.message"
                                            required
                                        ></textarea>
                                    </div>
                                    <div class="text-center mt-6">
                                        <button
                                            class="bg-zinc-800 text-white active:bg-zinc-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </v-form>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="w-full lg:w-6/12 px-4">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-zinc-100"
                        >
                            <div class="flex-auto p-5 lg:p-10">
                                <h4 class="text-2xl font-semibold">
                                    ¡Visítanos!
                                </h4>
                                <p
                                    class="leading-relaxed mt-1 mb-4 text-gray-600"
                                >
                                    Estamos ubicados en la ciudad de Córdoba,
                                    Argentina.
                                </p>
                                <div class="relative w-full mb-3 mt-8">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.792592105554!2d-64.1821146847701!3d-31.41320198136577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3a5e8f4b9b2c7%3A0x1b2b2b2b2b2b2b2b2!2sC%C3%B3rdoba%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1605191000000!5m2!1ses-419!2sus"
                                        width="100%"
                                        height="350"
                                        frameborder="0"
                                        style="border: 0"
                                        allowfullscreen=""
                                        aria-hidden="false"
                                        tabindex="0"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script>
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";

export default {
    name: "ContactIndex",
    components: { MainLayout, Header },
    data() {
        return {
            loading: false,
            formIsValid: true,
            form: {
                fullname: "",
                email: "",
                message: "",
            },
        };
    },

    mounted() {
        globalThis.scrollTo(0, 0);
    },

    methods: {
        sendContactForm() {
            if (!this.$refs.contactForm.validate()) {
                return this.notySwal({
                    icon: "error",
                    title: "Error",
                    text: "Por favor, completa todos los campos.",
                });
            }

            this.loading = true;
            this.axios
                .post(this.ep.contact.send, this.form)
                .then((_) => {
                    this.notySwal({
                        title: "Mensaje enviado",
                        text: "Hemos recibido tu mensaje, nos pondremos en contacto contigo a la brevedad.",
                    });
                    this.$refs.contactForm.reset();
                    this.$refs.contactForm.resetValidation();

                    // limpiar campos
                    this.form.fullname = "";
                    this.form.email = "";
                    this.form.message = "";
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
