<template>
    <section class="bg-white">
        <div class="container py-16">
            <div class="flex flex-wrap justify-center items-start">
                <div class="w-full md:w-1/3 order-2 order-md-1">
                    <div class="flex gap-4 justify-center">
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-4xl font-bold">0 K</div>
                            <span
                                class="font-bold text-base text-primary uppercase"
                            >
                                Seguidores
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-4xl font-bold">0 K</div>
                            <span
                                class="font-bold text-base text-primary uppercase"
                            >
                                Seguidos
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-4xl font-bold">0 K</div>
                            <span
                                class="font-bold text-base text-primary uppercase"
                            >
                                Obras
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-wrap mt-5">
                        <div class="w-full md:w-1/2 mb-3 md:mb-0 md:pr-3">
                            <v-btn outlined block color="#B2794C" class="rounded-md">
                                Ir a mi blog
                            </v-btn>
                        </div>
                        <div class="w-full md:w-1/2 mb-3 md:mb-0 md:pl-3">
                            <v-btn outlined block color="#B2794C" class="rounded-md">
                                Ir a mi post
                            </v-btn>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 order-1 order-md-2">
                    <div class="flex flex-col justify-center">
                        <h3
                            class="text-4xl font-bold tracking-wide text-center"
                        >
                            {{ artist.name }}
                        </h3>
                        <p
                            class="uppercase text-xl font-semibold text-center"
                            v-if="profile?.web_url"
                        >
                            <i class="fa-solid fa-link text-zinc-700"></i>
                            <a
                                :href="profile?.web_url"
                                target="_blank"
                                class="text-primary hover:no-underline"
                            >
                                {{ profile?.web_url }}
                            </a>
                        </p>
                        <p class="text-center flex gap-3 justify-center">
                            <a
                                :href="`${
                                    SOCIALNETWORK.IG + social?.instagram
                                }`"
                                target="_blank"
                                rel="noopener"
                                v-if="social?.instagram"
                            >
                                <i
                                    class="fa-brands fa-square-instagram text-zinc-300 fa-2x hover:text-zinc-500"
                                ></i>
                            </a>
                            <a
                                :href="`${SOCIALNETWORK.BH + social?.behance}`"
                                target="_blank"
                                rel="noopener"
                                v-if="social?.behance"
                            >
                                <i
                                    class="fa-brands fa-square-behance text-zinc-300 fa-2x hover:text-zinc-500"
                                ></i>
                            </a>
                            <a
                                :href="`${SOCIALNETWORK.LK + social?.linkedin}`"
                                target="_blank"
                                rel="noopener"
                                v-if="social?.linkedin"
                            >
                                <i
                                    class="fa-brands fa-linkedin text-zinc-300 fa-2x hover:text-zinc-500"
                                ></i>
                            </a>
                            <a
                                :href="`${SOCIALNETWORK.FB + social?.facebook}`"
                                target="_blank"
                                rel="noopener"
                                v-if="social?.facebook"
                            >
                                <i
                                    class="fa-brands fa-square-facebook text-zinc-300 fa-2x hover:text-zinc-500"
                                ></i>
                            </a>
                        </p>
                    </div>
                </div>
                <div class="w-full md:w-1/3 order-3">
                    <div class="flex flex-wrap">
                        <div class="w-full md:w-1/2 mb-3 md:mb-0 md:pr-3">
                            <FollowArtistButton
                                :artist="artist"
                                class="w-full h-9 md:h-full rounded-md"
                            />
                        </div>
                        <div class="w-full md:w-1/2 mb-3 md:mb-0 md:pl-3">
                            <v-btn block color="grey lighten-1" class="rounded-md">
                                enviar mensaje
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from "vuex";
import getDataMixin from "../../../mixins/getDataMixin";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";

export default {
    components: { FollowArtistButton },
    name: "PostHero",
    mixins: [getDataMixin],
    props: {
        artist: {
            type: Object,
            default: () => {},
        },
        profile: {
            type: Object,
            default: () => {},
        },
        social: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        ...mapGetters({
            user: "getProfile",
        }),

        isUserLogged() {
            return this.user?.id === this.artist?.id;
        },
    },
};
</script>
