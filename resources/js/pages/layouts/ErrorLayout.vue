<template>
    <section class="dashboard">
        <!-- loading full page -->
        <loading-overlay
            :active="loadingOverlay"
            :is-full-page="true"
            loader="bars"
        />
        <!-- /loading full page -->

        <!-- content -->
        <div
            class="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
        >
            <div class="container mx-auto sm:px-6 lg:px-8">
                <div class="flex items-center justify-center flex-wrap">
                    <div class="mb-5 w-full">
                        <h1
                            class="text-3xl text-gray-500 tracking-wider text-center"
                        >
                            Ooops! ha ocurrido un error
                        </h1>
                    </div>
                    <div
                        class="text-xl text-gray-500 tracking-wider w-full text-center mb-2"
                    >
                        {{ code }}
                    </div>
                    <div
                        class="text-xl text-gray-500 uppercase tracking-wider w-full text-center mb-5"
                    >
                        {{ message }}
                        <main>
                            <slot></slot>
                        </main>
                    </div>
                    <div class="w-full flex justify-center">
                        <v-btn
                            plain
                            class="bg-app-brown-1 hover:animate-shadow-and-color-app py-2 px-4 rounded no-underline text-gray-50"
                            :to="{ name: 'dashboard' }"
                        >
                            Volver al inicio
                        </v-btn>
                    </div>
                </div>
            </div>
        </div>
        <!-- /content -->

        <!-- footer -->
        <Footer />
        <!-- /Footer -->
    </section>
</template>
<script>
import Footer from "../landing/sections/Footer.vue";
export default {
    name: "ErrorLayout",
    components: {
        Footer,
    },
    props: {
        code: {
            type: Number,
            default: 404,
        },

        message: {
            type: String,
            default: "Página no encontrada",
        },

        loadingOverlay: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
