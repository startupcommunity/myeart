<template>
    <section class="fixed right-1 bottom-3 z-[999] hidden sm:flex">
        <div class="w-80">
            <div
                class="flex flex-col items-end justify-end rounded-md border-2 border-app-brown-1 bg-white"
                :class="sidebarChats ? 'h-[600px]' : 'h-10'"
            >
                <div class="bg-app-brown-2 w-full">
                    <div class="flex justify-start items-center py-2 px-5">
                        <div class="flex justify-start gap-3">
                            <button
                                type="button"
                                class="inline-flex items-center text-gray-50 hover:text-blue-800 transition-all ease-out duration-200"
                                @click.stop="toggleSection"
                                v-if="followArtists.length"
                            >
                                <i
                                    class="fa-solid fa-chevron-up"
                                    v-if="!sidebarChats"
                                ></i>
                                <i class="fa-solid fa-chevron-down" v-else></i>
                            </button>
                            <div class="inline-flex items-center">
                                <i
                                    class="fa-solid fa-comments text-white mr-1"
                                ></i>
                                <h3 class="text-lg text-zinc-50 font-medium">
                                    Chats
                                </h3>
                                <span
                                    class="px-2 py-1.5 text-white bg-red-600 -mt-5 rounded-full text-xs"
                                    v-if="unreadChats"
                                >
                                    {{ unreadChats }}
                                </span>
                                <i
                                    class="fa-solid fa-spinner fa-spin-pulse ml-2 text-white"
                                    v-show="loadingFollowArtist"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="followArtists.length"
                    v-show="sidebarChats"
                    class="flex flex-col gap-3 p-3 overflow-y-auto h-0 w-full"
                    :class="{
                        'animate-fade-in-down': sidebarChats || !sidebarChats,
                    }"
                >
                    <MiniCardArtist
                        v-for="artist in followArtists"
                        :key="artist.id"
                        :artist="artist"
                        :show-btn-chat="true"
                        :show-qualified="false"
                        :show-unread-badge="false"
                        :counter-unread-messages="0"
                        @openChat="initChat"
                        class="max-h-16"
                    />
                </div>
                <div v-else class="bg-white p-3">
                    <span class="text-zinc-900 text-sm">
                        No hay artistas agregados
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import MiniCardArtist from "../community/components/MiniCardArtist.vue";
import Chat from "./components/Chat.vue";
import useChat from "./mixins/useChat";
export default {
    name: "SectionChatsBetweenFriend",
    components: { MiniCardArtist, Chat },
    mixins: [useChat],

    created() {
        this.$store.dispatch("userFollowArtists");
    },

    computed: {
        /**
         * Artistas seguidos por el usuario
         */
        followArtists() {
            const data = this.$store.getters.getFollowArtists || [];
            return data.map((item) => item.following);
        },

        /**
         * Loading de artistas seguidos
         */
        loadingFollowArtist() {
            return this.$store.getters.loadingFollowArtist;
        },

        /**
         * Devuelve la cantidad de chats no Leidos
         */
        unreadChats() {
            return this.$store.getters.unreadChats;
        },
    },

    watch: {
        /**
         * Si no hay artistas seguidos cerrar el sidebar de chats
         */
        followArtists(val) {
            if (!val.length) {
                this.$store.dispatch("closeSidebarChats");
            }
        },
    },

    methods: {
        /**
         * Abrir o cerrar el menu de chats
         */
        toggleSection() {
            if (this.sidebarChats) {
                this.$store.dispatch("closeSidebarChats");
                return;
            }

            this.$store.dispatch("openSidebarChats");
        },
    },
};
</script>
