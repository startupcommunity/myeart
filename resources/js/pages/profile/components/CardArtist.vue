<template>
    <div class="w-full mb-10 animate-swing-in-top-fwd">
        <div
            class="rounded-md w-full h-full hover:animate-shadow-drop-center shadow-[10px_10px_15px_-2px_rgba(0,0,0,0.1)] px-6 py-6 relative"
        >
            <div class="w-full flex justify-center">
                <div class="w-28 h-28">
                    <router-link
                        v-if="routerLink"
                        :to="{
                            name: 'showArtist',
                            params: {
                                id: artist.id,
                            },
                        }"
                    >
                        <img
                            :src="getPathProfilePhoto"
                            :alt="artist.name"
                            class="object-cover object-center w-full h-full rounded-full"
                        />
                    </router-link>
                    <img
                        :src="getPathProfilePhoto"
                        :alt="artist.name"
                        class="object-cover object-center w-full h-full rounded-full border"
                        v-else
                    />
                </div>
            </div>
            <div class="flex flex-col justify-between space-y-8">
                <div class="space-y-2 text-center">
                    <h3
                        class="text-xl md:text-base xl:text-xl font-semibold tracking-wide text-gray-900 pt-3"
                    >
                        {{ artist.name }}
                    </h3>
                    <p class="text-primary text-xs">
                        {{ getNameCategory }}
                    </p>
                    <p class="text-gray-800 text-xs italic py-5">
                        "{{ getBioTitle }}"
                    </p>
                    <div class="py-8" v-if="showButtonFollow">
                        <div class="absolute bottom-5 inset-x-0 px-6">
                            <FollowArtistButton
                                :artist="artist"
                                class="btn-block py-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <loading-overlay
            :active="loadLiked"
            :is-full-page="true"
            loader="bars"
        /> -->
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import FollowArtistButton from "./../../artwork/components/FollowArtistButton";

export default {
    components: { FollowArtistButton },
    name: "CardArtist",
    data() {
        return {
            loadLiked: false,
            isLike: false,
        };
    },
    props: {
        artist: {
            type: Object,
            default: {},
        },
        showButtonFollow: {
            type: Boolean,
            default: false,
        },
        routerLink: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        /**
         * Acceder a los getters necesarios
         * user profile
         */
        ...mapGetters({
            user: "getProfile",
        }),

        /**
         * devuelve una de las actividades del artista
         * o técnica/especialidad
         */
        getNameCategory() {
            const artistic = this.artist.user_artistic;
            return artistic.length ? artistic[0].nombre : "---";
        },

        /**
         * devuelve la frase o titulo de la bio del artista
         */
        getBioTitle() {
            const profile = this.artist.profile;

            return profile.bio_title ? profile.bio_title : "----";
        },

        /**
         * Path completo de la foto de perfil
         */
        getPathProfilePhoto() {
            const artist = this.artist;
            if (!artist.profile_photo) return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + artist.profile_photo}`;
        },
    },
};
</script>
