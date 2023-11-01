<template>
    <MainLayout :showHeader="false" :loadingOverlay="loading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>

        <!-- sección pedido -->
        <section class="bg-white" v-if="orderItem.id">
            <div class="container pt-12">
                <button
                    @click.stop="$router.go(-1)"
                    text
                    class="flex items-center text-zinc-800 hover:text-zinc-900 py-1 rounded-md mb-4"
                >
                    <v-icon class="mr-2">mdi-arrow-left</v-icon>
                    Atrás
                </button>
                <h1 class="uppercase text-3xl text-zinc-900 font-bold">
                    Pedido {{ orderItem.number }}
                </h1>
            </div>
        </section>
        <!-- /sección pedido -->

        <!-- sección chat y obra -->
        <section class="bg-white">
            <div class="container py-12">
                <div class="flex flex-wrap justify-center md:justify-between">
                    <!-- chat -->
                    <div class="w-full md:w-3/5">
                        <div class="md:pr-6">
                            <div
                                class="flex flex-col space-x-6 overflow-hidden rounded-lg shadow-md"
                            >
                                <div class="flex py-3 bg-gray-100 px-2">
                                    <Avatar
                                        :artist="artist"
                                        custom="w-14 h-14"
                                    />
                                    <div
                                        class="flex flex-col space-y-1 pl-2 justify-center"
                                    >
                                        <span class="text-sm font-semibold">
                                            {{ artist.name || artist.username }}
                                        </span>
                                        <FollowArtistButton
                                            :artist="artist"
                                            class="max-w-[100px]"
                                        />
                                    </div>
                                </div>
                                <div class="overflow-y-auto h-[460px]">
                                    <div
                                        class="flex flex-col py-5 gap-5"
                                    >
                                        <div
                                            v-for="message in messages"
                                            :key="message.id"
                                            class="flex flex-col px-3"
                                        >
                                            <div
                                                v-if="
                                                    message.user_id === user.id
                                                "
                                                class="flex flex-row-reverse"
                                            >
                                                <div
                                                    class="justify-self-end flex-shrink-0"
                                                >
                                                    <Avatar
                                                        :artist="message.user"
                                                        defaultClass="w-10 h-10 aspect-square"
                                                    />
                                                </div>
                                                <div
                                                    class="flex flex-col space-y-2 py-2 px-4 bg-blue-50 rounded-lg"
                                                >
                                                    <div
                                                        class="flex items-center flex-row-reverse text-gray-800"
                                                    >
                                                        <span class="text-sm">
                                                            {{
                                                                message.message
                                                            }}
                                                        </span>
                                                    </div>
                                                    <span
                                                        class="text-xs text-gray-500 text-right"
                                                    >
                                                        {{
                                                            message.created_at
                                                                | formatDate
                                                        }}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                v-else
                                                class="flex flex-row py-3"
                                            >
                                                <div
                                                    class="justify-self-start flex-shrink-0"
                                                >
                                                    <Avatar
                                                        :artist="message.user"
                                                        defaultClass="w-10 h-10 aspect-square"
                                                    />
                                                </div>
                                                <div
                                                    class="flex flex-col space-y-2"
                                                >
                                                    <div
                                                        class="flex flex-col gap-1 justify-start items-start px-4 py-2 rounded-lg bg-gray-100"
                                                    >
                                                        <span class="text-sm">
                                                            {{
                                                                message.message
                                                            }}
                                                        </span>
                                                        <span
                                                            class="text-xs text-gray-500"
                                                        >
                                                            {{
                                                                message.created_at
                                                                    | formatDate
                                                            }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="py-3 md:pr-6">
                            <div class="flex flex-row space-x-2">
                                <div class="flex-grow">
                                    <v-textarea
                                        v-model="message"
                                        label="Escribe un mensaje"
                                        outlined
                                        class="w-full"
                                        color="#B2794C"
                                        no-resize
                                        rows="1"
                                    />
                                </div>
                                <div class="flex-shrink-0">
                                    <button
                                        @click.stop="sendMessage"
                                        class="text-white bg-app-brown-1 py-4 px-5 inline-flex items-center rounded-md hover:bg-amber-700 transition-all ease-in-out duration-300"
                                        type="button"
                                        :disabled="!message || loading"
                                        :class="{
                                            'opacity-50 cursor-not-allowed':
                                                !message || loading,
                                        }"
                                    >
                                        <v-icon class="text-white">
                                            mdi-send
                                        </v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /chat -->

                    <!-- obras -->
                    <div class="w-full md:w-2/5">
                        <div class="cursor-pointer" @click.stop="goToArtwork">
                            <h3 class="text-xl text-zinc-900 font-bold">
                                {{ orderItem.title }}
                            </h3>
                            <div class="flex flex-row py-3 justify-between">
                                <img
                                    :src="getImage"
                                    alt="obra-de-arte"
                                    class="w-28 h-28 object-cover object-center aspect-square"
                                />
                                <div>
                                    <p class="text-zinc-900 font-bold text-sm">
                                        {{ orderItem.created_at | formatDate }}
                                    </p>
                                    <p class="text-zinc-900 font-bold text-sm">
                                        {{ orderItem.price }} {{ euro }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /obras -->
                </div>
            </div>
        </section>
        <!-- /sección chat y obra -->
    </MainLayout>
</template>

<script>
import Avatar from "../../components/Avatar.vue";
import FollowArtistButton from "../artwork/components/FollowArtistButton.vue";
import Header from "../landing/sections/Header.vue";
import MainLayout from "../layouts/MainLayout.vue";

export default {
    name: "IndexShoppingCart",
    components: { MainLayout, Header, Avatar, FollowArtistButton },
    data() {
        return {
            loading: false,
            orderItemID: null,
            orderItem: {},
            messages: [],
            message: "",
        };
    },
    computed: {
        /**
         * Devuelve el usuario logueado
         */
        user() {
            return this.$store.getters.getProfile || {};
        },

        /**
         * Artista de la obra
         */
        artist() {
            return this.orderItem.user || {};
        },

        /**
         * Foto de portada de la obra
         */
        getImage() {
            const photo = this.orderItem.photo;
            if (!photo) return this.getURLDefaultFrontArtwork;
            return `${this.pathArtworkGallery + photo}`;
        },
    },

    created() {
        // parámetro por url router vue
        this.orderItemID = this.$route.params.id;

        // carga los datos de la orden
        this.loadOrder();
    },

    filters: {
        /**
         * Formatea la fecha en formato dd/mm/yyyy
         * @param {string} date
         */
        formatDate(date) {
            if (!date) return "";
            const d = new Date(date);
            const day = d.getDate();
            const month = d.getMonth() + 1;
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        },
    },

    methods: {
        /**
         * Carga los datos de la orden
         */
        loadOrder() {
            this.loading = true;
            this.axios
                .get(this.ep.orders.getItem + this.orderItemID)
                .then((resp) => (this.orderItem = resp.data))
                .then((_) => this.loadMessages())
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Carga los mensajes entre el comprador y el vendedor
         */
        loadMessages() {
            console.log(this.orderItem);
            this.loading = true;
            this.axios
                .get(this.ep.orders.getMessages + this.orderItemID)
                .then((resp) => {
                    this.messages = resp.data;
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Ir a la obra en cuestión
         */
        goToArtwork() {
            this.$router.push({
                name: "showArtwork",
                params: { id: this.orderItem.artwork_id },
            });
        },

        /**
         * Enviar mensaje
         */
        sendMessage() {
            if (!this.message) {
                this.$noty("El mensaje no puede estar vacío", "error");
                return;
            }

            this.loading = true;
            this.axios
                .post(this.ep.orders.sendContactMessage, {
                    order_item_id: this.orderItemID,
                    message: this.message,
                    user_id: this.user.id,
                })
                .then((resp) => {
                    if (resp.status === 200) {
                        this.message = "";
                        this.loadMessages();
                        this.$noty("Mensaje enviado correctamente", "success");
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
