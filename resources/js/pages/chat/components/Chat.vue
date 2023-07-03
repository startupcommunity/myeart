<template>
    <div class="bg-white animate-swing-in-top-fwd">
        <div
            class="flex flex-col items-center justify-center text-gray-800"
            :class="chat.isOpen ? 'h-[460px]' : 'h-10'"
        >
            <div
                class="flex flex-col flex-grow w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden"
            >
                <!-- header -->
                <div class="bg-app-brown-1">
                    <div
                        class="flex justify-between items-center py-2 px-5 gap-5"
                    >
                        <div>
                            <router-link
                                :to="routeArtist"
                                class="text-gray-50 no-underline hover:no-underline"
                            >
                                <h3 class="text-sm font-bold text-gray-50">
                                    {{ artist.name }}
                                </h3>
                            </router-link>
                        </div>
                        <div class="flex justify-end gap-5">
                            <!-- hide chat -->
                            <button
                                type="button"
                                class="inline-flex items-center text-gray-50 hover:text-blue-800 transition-all ease-out duration-200"
                                @click.stop="toggleChat"
                            >
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <!-- close chat -->
                            <button
                                type="button"
                                class="inline-flex items-center text-gray-50 hover:text-blue-800 transition-all ease-out duration-200"
                                @click.stop="closeChat"
                            >
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- /header -->

                <!-- mensajes -->
                <div
                    class="flex flex-col flex-grow h-0 p-3 overflow-auto max-w-[300px]"
                    v-if="chat.isOpen"
                >
                    <LoadingTailwind v-if="loading" />
                    <div
                        class="flex flex-col gap-5 pb-5"
                        v-for="(msj, index) in messages"
                        :key="index"
                    >
                        <div
                            class="flex flex-col gap-5"
                            :class="{
                                'items-end': isSameUser(msj.user_id),
                                'items-start': !isSameUser(msj.user_id),
                            }"
                        >
                            <div
                                class="flex gap-2"
                                :class="{
                                    'justify-end': isSameUser(msj.user_id),
                                    'justify-start': !isSameUser(msj.user_id),
                                }"
                            >
                                <div
                                    class="flex items-start justify-center w-10"
                                    :class="{
                                        'order-2': isSameUser(msj.user_id),
                                        'order-1': !isSameUser(msj.user_id),
                                    }"
                                >
                                    <Avatar
                                        :artist="msj.user"
                                        defaultClass="border h-8 w-8"
                                    />
                                </div>
                                <div
                                    class="flex flex-col gap-1 w-60"
                                    :class="{
                                        'order-1': isSameUser(msj.user_id),
                                        'order-2': !isSameUser(msj.user_id),
                                    }"
                                >
                                    <span
                                        class="text-sm text-gray-800 px-3 py-2 rounded-lg"
                                        :class="{
                                            'bg-gray-200': isSameUser(
                                                msj.user_id
                                            ),
                                            'bg-blue-600 text-white':
                                                !isSameUser(msj.user_id),
                                        }"
                                    >
                                        {{ msj.message }}
                                    </span>
                                    <span class="text-xs text-gray-500">
                                        {{ msj.created_at | formatDate }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /mensajes -->

                <!-- form -->
                <div
                    class="bg-white px-5 py-2 border-t pt-3"
                    v-if="chat.isOpen"
                >
                    <div class="flex justify-between items-center gap-3">
                        <input
                            class="flex items-center h-10 w-full rounded px-3 text-sm shadow"
                            type="text"
                            placeholder="Escribe tu mensaje…"
                            v-model="message"
                            :disabled="loading"
                            :class="{
                                'opacity-50 cursor-not-allowed': loading,
                            }"
                        />
                        <button
                            class="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white px-2 py-1"
                            :disabled="loading || !message"
                            :class="{
                                'opacity-50 cursor-not-allowed':
                                    loading || !message,
                            }"
                            @click.stop="sendMessage"
                        >
                            <i
                                class="fa-solid fa-paper-plane"
                                v-if="!loading"
                            ></i>
                            <i
                                class="fa-solid fa-spinner animate-spin"
                                v-else
                            ></i>
                        </button>
                    </div>
                </div>
                <!-- /form -->
            </div>
        </div>
    </div>
</template>

<script>
// import { init } from "events";
import Avatar from "../../../components/Avatar.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

export default {
    name: "Chat",
    components: { Avatar, LoadingTailwind },

    props: {
        chat: {
            type: Object,
            default: () => ({}),
            description: "Información del chat",
        },
    },

    data() {
        return {
            loading: false,
            autoUpdateMessages: false,
            globalSetInterval: null,
            message: "",
            chatID: "",
            messages: [],
        };
    },

    computed: {
        /**
         * artista con el que se chatea
         */
        artist() {
            return this.chat?.artist || {};
        },

        /**
         * usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * Si se debe actualizar el chat
         */
        shouldUpdate() {
            return this.$store.getters.updateChat || false;
        },

        /**
         * Ruta del artista
         */
        routeArtist() {
            return {
                name: "showArtist",
                params: { id: 1 },
            };
        },
    },

    created() {
        this.checkConversation();
    },

    filters: {
        /**
         * Formatear fecha
         * ejemplo: hace 2 min
         *
         * @param {String} date
         */
        formatDate(date) {
            const d = new Date(date);
            const now = new Date();
            const diff = now.getTime() - d.getTime();
            const minutes = Math.floor(diff / 1000 / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            if (days > 0) {
                return `${days} ${days > 1 ? "días" : "día"} atrás`;
            } else if (hours > 0) {
                return `${hours} ${hours > 1 ? "horas" : "hora"} atrás`;
            } else if (minutes > 0) {
                return `${minutes} ${minutes > 1 ? "minutos" : "minuto"} atrás`;
            } else {
                return "hace un momento";
            }
            return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        },
    },

    watch: {
        /**
         * Si se debe actualizar el chat
         */
        shouldUpdate(val) {
            if (val) {
                this.loadMessages();
                this.$store.commit("setUpdateChat", false);
            }
        },

        /**
         * Si se debe actualizar el chat
         *
         * hacerlo cada 30 segundos
         */
        autoUpdateMessages(val) {
            if (val) {
                this.initAutoUpdate();
            }
        },
    },

    methods: {
        /**
         * Abrir chat
         */
        toggleChat() {
            this.chat.isOpen = !this.chat.isOpen;
            this.$emit("toggleChat", this.chat);
        },

        /**
         * Cerrar chat
         */
        closeChat() {
            this.$emit("closeChat", this.chat.id);
            this.stopAutoUpdate();
        },

        /**
         * Verifica si el chat existe en BD
         * si no existe se crea desde cero
         */
        checkConversation() {
            this.loading = true;
            this.autoUpdateMessages = true;
            const data = {
                first_user_id: this.user.id,
                second_user_id: this.artist.id,
            };
            // verificar si ya existe un chat entre estos artistas
            this.axios
                .post(this.ep.conversations.check, data)
                .then((resp) => (this.chatID = resp.data.id))
                .then((_) => this.loadMessages())
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Carga los mensajes del chat
         *
         * @param {Boolean} indicateUpdate indica si se debe mostrar el loading
         */
        loadMessages(indicateUpdate = true) {
            if (!this.chatID) return;
            if (indicateUpdate) this.loading = true;

            const ep = `${this.ep.conversations.getMessages + this.chatID}`;
            this.axios
                .get(ep)
                .then((resp) => (this.messages = resp.data))
                .catch((error) => this.$manageError(error))
                .finally(() => {
                    if (indicateUpdate) this.loading = false;
                });
        },

        /**
         * enviar mensaje
         */
        sendMessage() {
            if (!this.chatID) return;
            this.loading = true;
            const data = {
                conversation_id: this.chatID,
                user_id: this.user.id,
                message: this.message,
            };
            this.axios
                .post(this.ep.conversations.sendMessage, data)
                .then((_) => {
                    this.message = "";
                    this.loadMessages();
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Si es el mismo usuario que envía el mensaje
         *
         * @param {Number} userID
         */
        isSameUser(userID) {
            return userID === this.user.id;
        },

        /**
         * Iniciar actualización automática
         */
        initAutoUpdate() {
            this.globalSetInterval = setInterval(() => {
                this.loadMessages(false);
            }, 30000);
        },

        /**
         * Detener actualización automática
         */
        stopAutoUpdate() {
            this.autoUpdateMessages = false;
            clearInterval(this.globalSetInterval);
        },
    },
};
</script>
