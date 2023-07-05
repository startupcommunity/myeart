<template>
    <div
        class="bg-white animate-swing-in-top-fwd border-zinc-200 border rounded-lg"
    >
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
                        <div class="relative">
                            <router-link
                                :to="routeArtist"
                                class="text-gray-50 no-underline hover:no-underline"
                            >
                                <h3 class="text-sm font-bold text-gray-50">
                                    {{ artist.name }}
                                </h3>
                            </router-link>
                            <span
                                class="fixed top-0 left-0 -mt-3 -mr-5"
                                v-if="totalMessageUnread > 0"
                            >
                                <span
                                    class="bg-[#e41e3f] rounded-full block py-1 px-2 text-xs text-center text-white font-bold"
                                >
                                    {{ totalMessages }}
                                </span>
                            </span>
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
                    ref="chatContainer"
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
                    ref="chatSendMessage"
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
import Avatar from "../../../components/Avatar.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

const UPDATE_SEG = 30000;

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
            loading: false, // cargando
            setInterval: null, // intervalo de tiempo
            message: "", // mensaje a enviar
            chatID: "", // id del chat
            messages: [], // mensajes del chat
        };
    },

    created() {
        this.checkConversation();
    },

    computed: {
        /**
         * artista con el que se chatea
         */
        artist() {
            return this.chat?.artist || {};
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

        /**
         * Chats sin leer
         */
        totalMessageUnread() {
            // seleccionar los mensajes sin leer del usuario activo
            const msjs = this.messages.filter(
                (msj) => msj.user_id !== this.$userAuth.id && !msj.is_read
            );

            // contar los mensajes sin leer
            return msjs.length;
        },

        /**
         * validar la cantidad de mensajes a mostrar en el globo
         */
        totalMessages() {
            const total = this.totalMessageUnread;
            return total > 99 ? "99+" : total;
        },
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
        },
    },

    watch: {
        /**
         * Si se debe actualizar el chat
         * hacerlo cada UPDATE_SEG
         */
        "chat.autoUpdate"(val) {
            if (val) {
                this.initAutoUpdate();
            }

            if (!val) {
                this.stopAutoUpdate();
            }
        },

        /**
         * Verificar si el chat esta abierto
         */
        "chat.isOpen"(val) {
            if (val && this.totalMessageUnread) {
                this.markAllAsRead(false);
            }

            if (!val) {
                this.stopAutoUpdate();
            }
        },
    },

    methods: {
        /**
         * Abrir chat
         */
        toggleChat() {
            this.chat.isOpen = !this.chat.isOpen;
            this.$store.commit("toggleChat", this.chat);
            this.$emit("toggleChat", this.chat);
        },

        /**
         * Cerrar chat
         */
        closeChat() {
            this.$store.commit("closeChat", this.chat);
            this.$emit("closeChat", this.chat);
            this.stopAutoUpdate();
        },

        /**
         * Verifica si el chat existe en BD
         * si no existe se crea desde cero
         */
        checkConversation() {
            const data = {
                first_user_id: this.$userAuth.id,
                second_user_id: this.artist.id,
            };

            this.loading = true;
            this.$store.dispatch("initAutoUpdateChat", this.chat).then((_) => {
                this.axios
                    .post(this.ep.conversations.check, data)
                    .then((resp) => (this.chatID = resp.data.id))
                    .then((_) => this.markAllAsRead())
                    .catch((error) => console.log(error))
                    .finally(() => (this.loading = false));
            });
        },

        /**
         * Marcar todos los mensajes como leídos
         */
        markAllAsRead(loading = false) {
            if (!this.chatID) return;
            const ep = `${this.ep.conversations.markAllAsRead}`;
            const data = {
                user_id: this.$userAuth.id,
                conversation_id: this.chatID,
            };

            this.axios
                .post(ep, data)
                .then((_) => this.loadMessages(loading))
                .catch((error) => this.$manageError(error));
        },

        /**
         * Carga los mensajes del chat
         *
         * @param {Boolean} load indica si se debe mostrar el loading
         */
        loadMessages(load = true) {
            if (!this.chatID) return;
            if (load) this.loading = true;
            this.messages = [];

            const ep = `${this.ep.conversations.getMessages + this.chatID}`;
            this.axios
                .get(ep)
                .then((resp) => {
                    this.messages = resp.data;

                    setTimeout(() => this.scrollToEnd(), 100);
                })
                .catch((error) => this.$manageError(error))
                .finally(() => {
                    if (load) this.loading = false;
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
                user_id: this.$userAuth.id,
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
            return userID === this.$userAuth.id;
        },

        /**
         * Iniciar actualización automática
         */
        initAutoUpdate() {
            this.setInterval = setInterval(() => {
                if (this.chat.isOpen) {
                    this.markAllAsRead(false);
                } else {
                    this.loadMessages(false);
                }
            }, UPDATE_SEG);
        },

        /**
         * Detener actualización automática
         */
        stopAutoUpdate() {
            clearInterval(this.setInterval);
        },

        /**
         * Scroll al final del chat
         */
        scrollToEnd() {
            const chatContainer = this.$refs.chatContainer;
            if (!chatContainer) return;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
    },
};
</script>
