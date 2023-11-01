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
        <SectionChat />

        <!-- sección para chats de amigos -->
        <SectionChatsBetweenFriend v-if="!$isUserGuest" />

        <!-- vistas -->
        <router-view :key="$route.path"></router-view>
    </v-app>
</template>

<script>
import RegisterModal from "./components/RegisterModal.vue";
import SectionChat from "./pages/chat/SectionChat.vue";
import SectionChatsBetweenFriend from "./pages/chat/SectionChatsBetweenFriend.vue";

export default {
    name: "App",
    components: { RegisterModal, SectionChat, SectionChatsBetweenFriend },

    created() {
        // cada vez que se cargue una ruta, se va a ejecutar este método
        this.$router.beforeEach((to, from, next) => {
            globalThis.scrollTo(0, 0);
            next();
        });
    },
};
</script>
