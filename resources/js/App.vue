<template>
    <v-app>
        <!-- notificaciones globales -->
        <notifications
            group="container"
            position="top right"
            :duration="3000"
            :max="5"
            :ignoreDuplicates="true"
            :closeOnClick="true"
            class="mt-3 mr-3"
        />

        <!-- modal de registro global -->
        <RegisterModal />

        <!-- chat entre usuarios -->
        <section class="fixed right-0 bottom-0 z-[999]">
            <div class="container">
                <div class="flex flex-row-reverse gap-3 items-end">
                    <Chat
                        v-for="(chat, index) in globalChats"
                        :key="index"
                        :chat="chat"
                        @toggleChat="$store.commit('toggleChat', chat)"
                        @closeChat="$store.commit('closeChat', chat)"
                    />
                </div>
            </div>
        </section>

        <!-- vistas -->
        <router-view :key="$route.path"></router-view>
    </v-app>
</template>

<script>
import RegisterModal from "./components/RegisterModal.vue";
import Chat from "./pages/chat/components/Chat.vue";
import useChat from "./pages/chat/mixins/useChat";

export default {
    name: "App",
    mixins: [useChat],
    components: { RegisterModal, Chat },

    // cada vez que se cargue una ruta, se va a ejecutar este método
    created() {
        this.$router.beforeEach((to, from, next) => {
            this.scrollOnTop();
            next();
        });
    },

    methods: {
        /**
         * Siempre desde el inicio de la página
         */
        scrollOnTop() {
            globalThis.scrollTo(0, 0);
        },
    },
};
</script>
