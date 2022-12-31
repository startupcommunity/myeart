<template>
    <div class="w-full mb-10 animate-swing-in-top-fwd">
        <div
            class="rounded-md w-full h-full hover:animate-shadow-drop-center shadow-[10px_10px_15px_-2px_rgba(0,0,0,0.1)] px-6 py-6 relative"
        >
            <div class="w-full flex justify-center">
                <div class="w-28 h-28">
                    <Avatar
                        :artist="artist"
                        v-if="routerLink"
                        custom="object-cover object-center w-full h-full rounded-full border"
                    />
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
                        class="text-xl md:text-sm font-semibold tracking-wide text-gray-900 pt-3"
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
                    <div class="py-8" v-if="showButtonDeleteCollective">
                        <div class="absolute bottom-5 inset-x-0 px-6">
                            <v-btn
                                outlined
                                block
                                color="grey darken-4"
                                @click.stop="$emit('remove-from-collective', artist)"
                            >
                                eliminar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Avatar from "../../../components/Avatar.vue";
import FollowArtistButton from "./../../artwork/components/FollowArtistButton";

export default {
    components: { FollowArtistButton, Avatar },
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
        showButtonDeleteCollective: {
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
         * devuelve los calificativos del artista
         * según las categorías de sus obras
         */
        getNameCategory() {
            const artworks = this.artist.artworks;
            const categories = artworks.map((artwork) => {
                return artwork.categories.map((category) => {
                    return category.qualified;
                });
            });

            // eliminar las redundancias
            const categoriesUnique = categories
                .flat()
                .filter((v, i, a) => a.indexOf(v) === i);

            return categoriesUnique.join(", ");
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
