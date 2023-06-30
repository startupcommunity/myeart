<template>
    <v-app>
        <notifications
            group="container"
            position="top right"
            :duration="3000"
            :max="5"
            :ignoreDuplicates="true"
            :closeOnClick="true"
            class="mt-3 mr-3"
        />
        <RegisterModal />
        <router-view :key="$route.path"></router-view>
    </v-app>
</template>

<script>
import RegisterModal from "./components/RegisterModal.vue";

export default {
    name: "App",
    components: { RegisterModal },
    methods: {
        /**
         * Siempre desde el inicio de la página
         */
        scrollOnTop() {
            globalThis.scrollTo(0, 0);
        },
    },

    // cada vez que se cargue una ruta, se va a ejecutar este método
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.scrollOnTop();
            next();
        });
    },
};
</script>
