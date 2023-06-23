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
                    <div
                        class="hover:cursor-pointer flex justify-center items-center"
                        @click.stop="openRatings"
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
                                @click.stop="
                                    $emit('remove-from-collective', artist)
                                "
                            >
                                eliminar
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal ratings -->
        <RatingModal
            :id="artist.id"
            :show="showRating"
            @close="showRating = false"
            v-if="!isUserGuest"
        />
    </div>
</template>
<script>
import Avatar from "../../../components/Avatar.vue";
import utilMixin from "../../../mixins/utilMixin";
import RatingModal from "../../artist/components/RatingModal.vue";
import FollowArtistButton from "./../../artwork/components/FollowArtistButton";

export default {
    name: "CardArtist",
    mixins: [utilMixin],
    components: { FollowArtistButton, Avatar, RatingModal },
    data() {
        return {
            loadLiked: false,
            isLike: false,
            showRating: false,
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
        user() {
            return this.$store.getters.getProfile;
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

    methods: {
        /**
         * Abrir la modal de calificaciones
         */
        openRatings() {
            if (this.isUserGuest) {
                return this.messageGuest;
            }

            this.showRating = true;
        },
    },
};
</script>

<style scoped>
.v-icon.v-icon {
    font-size: 16px !important;
}
</style>
