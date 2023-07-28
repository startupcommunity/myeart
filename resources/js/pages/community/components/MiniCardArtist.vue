<template>
    <div class="flex justify-between items-center">
        <div class="flex flex-row justify-start items-center">
            <Avatar :artist="artist" custom="w-14 h-14 border" />
            <div class="ml-2">
                <div class="font-semibold text-gray-900 text-xs">
                    <div class="pb-1">{{ artist?.name }}</div>
                    <FollowArtistButton :artist="artist" />
                    <button
                        v-if="showBtnChat && !isUserGuest && isFollowing"
                        @click.stop="$emit('openChat', artist)"
                        class="inline-flex items-center text-zinc-900 border text-xs px-3 py-1 font-light hover:bg-gray-100 transition-all duration-200 ease-in-out"
                        :disabled="isUserGuest"
                        :class="{
                            'cursor-not-allowed': isUserGuest,
                        }"
                    >
                        chat
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showQualified">
            <span class="text-primary text-xs">
                {{ getNameQualified }}
            </span>
        </div>
    </div>
</template>
<script>
import Avatar from "../../../components/Avatar.vue";
import utilMixin from "../../../mixins/utilMixin";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";

export default {
    name: "MiniCardArtist",
    mixins: [utilMixin],
    components: { Avatar, FollowArtistButton },
    props: {
        artist: {
            type: Object,
            default: {},
        },
        showBtnChat: {
            type: Boolean,
            default: false,
        },
        showQualified: {
            type: Boolean,
            default: true,
            description: "Muestra o no eel calificativo del artista",
        },
    },
    computed: {
        /**
         * devuelve los calificativos del artista
         * según las categorías de sus obras
         *
         * limitar solo a 1
         */
        getNameQualified() {
            const artworks = this.artist?.artworks || [];
            const categories = artworks.map((artwork) => {
                return artwork?.categories.map((category) => {
                    return category.qualified;
                });
            });

            // eliminar las redundancias
            const categoriesUnique = categories
                .flat()
                .filter((v, i, a) => a.indexOf(v) === i);

            // devolver solo 1
            return categoriesUnique[0];
        },

        /**
         * Comprueba si ya se sigue al artista seleccionado
         */
        isFollowing() {
            return this.$userAuth?.following_artists?.some(
                (follow) => follow.following_id === this.artist.id
            );
        },
    },
};
</script>
