<template>
    <div class="flex justify-between items-center">
        <div class="flex flex-row justify-start items-center">
            <Avatar :artist="artist" custom="w-14 h-14 border" />
            <div class="ml-2">
                <div class="font-semibold text-gray-900 text-xs">
                    <div class="pb-1">{{ artist?.name }}</div>
                    <FollowArtistButton :artist="artist" />
                </div>
            </div>
        </div>
        <div>
            <span class="text-primary text-xs">
                {{ getNameQualified }}
            </span>
        </div>
    </div>
</template>
<script>
import Avatar from "../../../components/Avatar.vue";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";

export default {
    name: "MiniCardArtist",
    components: { Avatar, FollowArtistButton },
    props: {
        artist: {
            type: Object,
            default: {},
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
    },
};
</script>
