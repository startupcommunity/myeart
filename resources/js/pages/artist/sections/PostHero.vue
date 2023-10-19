<template>
    <section
        class="bg-white border-gray-900 rounded-t-3xl -mt-10 sm:rounded-t-none relative"
    >
        <div class="container pt-16 pb-10">
            <div class="flex flex-wrap justify-center items-start">
                <div class="w-full md:w-1/3 order-3 order-md-1">
                    <div class="flex gap-4 justify-between px-10 px-md-0">
                        <div class="border-b pb-2 border-gray-400 text-center" @click="openDialogFollowers">
                            <div class="text-2xl font-bold">
                                {{ artist.followers_count | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Seguidores
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center" @click="openDialogFollowing">
                            <div class="text-2xl font-bold">
                                {{ artist.following_artists_count | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Seguidos
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-2xl font-bold">
                                {{ artist.artworks_count | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Obras
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex justify-center px-10 px-md-0 mt-5 md:mt-7"
                        v-if="isUserLogged"
                    >
                        <!-- <div class="w-1/2">
                            <v-btn
                                outlined
                                block
                                color="#B2794C"
                                class="rounded-md hidden md:block"
                            >
                                Ir a mi blog
                            </v-btn>
                            <v-btn
                                outlined
                                small
                                color="#B2794C"
                                class="rounded-md block md:hidden"
                            >
                                Ir a mi blog
                            </v-btn>
                        </div> -->
                        <div class="w-full">
                            <v-btn
                                outlined
                                block
                                color="#B2794C"
                                class="rounded-md hover:no-underline hidden md:flex"
                                :to="getPathProfile"
                            >
                                Editar mi perfil
                            </v-btn>
                            <v-btn
                                outlined
                                small
                                color="#B2794C"
                                class="rounded-md hover:no-underline flex md:hidden"
                                :to="getPathProfile"
                            >
                                Editar mi perfil
                            </v-btn>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full md:w-1/3 order-1 order-md-2 -mt-48 md:-mt-60"
                >
                    <div class="flex flex-col justify-center">
                        <div class="flex justify-center pb-3">
                            <img
                                :src="profilePhoto"
                                :alt="'profile-photo-' + artist.name"
                                class="rounded-full w-40 h-40 md:w-56 md:h-56"
                            />
                        </div>
                        <h3
                            class="text-2xl font-black tracking-wide text-center"
                        >
                            {{ artist.name }}
                        </h3>
                        <div
                            class="hover:cursor-pointer flex justify-center items-center"
                            @click.stop="showRating = true"
                        >
                            <v-icon
                                v-for="i in 5"
                                :key="i"
                                :color="i <= averageRating ? 'yellow' : 'gray'"
                            >
                                mdi-star
                            </v-icon>
                            <span class="text-gray-600 text-xs">
                                ({{ ratings }})
                            </span>
                        </div>
                        <p
                            class="uppercase text-lg font-medium text-center"
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
                
                <div class="w-full md:w-1/3 order-2 order-md-3 md:px-0 mb-5">
                    <div
                        class="flex gap-3 justify-center px-10"
                        v-if="!isUserLogged"
                    >
                        <div class="w-40 md:w-1/2 mb-3 md:mb-0">
                            <FollowArtistButton
                                :artist="artist"
                                class="md:text-xs w-full h-6 md:h-full rounded-xl md:rounded-md md:py-2"
                            />
                        </div>
                        <!-- <div class="w-40 md:w-1/2 mb-3 md:mb-0">
                            <button
                                class="btn btn-primary btn-sm uppercase rounded-xl md:rounded-md w-full h-6 md:h-full md:py-2 text-xxs md:text-xs text-white"
                            >
                                <span> enviar mensaje </span>
                            </button>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- modal ratings -->
        <RatingModal
            :id="artist.id"
            :show="showRating"
            @close="showRating = false"
        />
        <FollowersModal
            :show="dialogFollowing"
            @close-modal="closeDialogFollowing"
            :followers="artist.following_artists"
            title="Seguidos"
        />
        <FollowersModal
            :show="dialogFollowers"
            @close-modal="closeDialogFollowers"
            :followers="artist.followers"
            title="Seguidores"
        />
    </section>
</template>
<script>
import getDataMixin from "../../../mixins/getDataMixin";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";
import RatingModal from "../components/RatingModal.vue";
import FollowersModal from "../../collective/components/FollowersModal.vue";

export default {
    components: { FollowArtistButton, RatingModal, FollowersModal},
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

    data() {
        return {
            showRating: false,
            dialogFollowing: false,
            dialogFollowers: false,
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },

        isUserLogged() {
            return this.user?.id === this.artist?.id;
        },

        /**
         * devuelve la Foto de perfil o la default
         * @pathProfilePhoto: globalMixin
         */
        profilePhoto() {
            if (!this.artist?.profile_photo)
                return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + this.artist?.profile_photo}`;
        },

        /**
         * devuelve el path del perfil del usuario
         */
        getPathProfile() {
            return {
                name: "userProfile",
                params: {
                    id: this.artist.id,
                },
            };
        },

        /**
         * promediar el rating del usuario por ventas
         *
         * @returns {Number}
         */
        averageRating() {
            const ratings = this.artist.ratings || [];

            if (ratings.length === 0) return 0;
            const sum = ratings.reduce((a, b) => a + b.rating, 0);
            const total = sum / ratings.length;

            // redondear el resultado, ejemplo 4.6 => 5, 4.4 => 4
            return Math.round(total * 2) / 2;
        },

        /**
         * calificaciones
         */
        ratings() {
            return this.artist.ratings?.length || 0;
        },
    },

    filters: {
        /**
         * Si el numero pasa de 1000, se convierte a K
         */
        numberK(value) {
            if (value > 1000) {
                return `${(value / 1000).toFixed(1)}K`;
            }
            return value;
        },
    },
    methods: {        
        openDialogFollowing() {
            this.dialogFollowing = true;
            this.$emit("dialog-Following-opened");
        },

        closeDialogFollowing() {
            this.dialogFollowing = false;
            this.$emit("dialog-Following-closed");
        },
        openDialogFollowers() {
            this.dialogFollowers = true;
            this.$emit("dialog-Followers-opened");
        },

        closeDialogFollowers() {
            this.dialogFollowers = false;
            this.$emit("dialog-Followers-closed");
        },
    
    }
};
</script>
