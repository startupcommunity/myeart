<template>
    <button
        class="btn btn-primary btn-sm text-xs px-4 uppercase"
        @click.stop="followArtist()"
        :disabled="!canFollowArtist || loadFollow"
        :class="{ 'btn-dark': isFollowingArtist }"
    >
        <span v-if="isFollowingArtist">Dejar de seguir</span>
        <span v-else>Seguir</span>
    </button>
    <!-- <loading-overlay
            :active="loadFollow"
            :is-full-page="true"
            loader="bars"
        /> -->
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "FollowArtistButton",
    props: {
        artist: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            loadFollow: false,
        };
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
         * Comprueba si el usuario puede seguir al artista
         *
         * NO es posible autoseguirse
         */
        canFollowArtist() {
            return this.user?.id !== this.artist?.id;
        },

        /**
         * Comprueba si ya se sigue al artista seleccionado
         */
        isFollowingArtist() {
            return this.user?.following_artists?.some(
                (follow) => follow.following_id === this.artist.id
            );
        },
    },
    methods: {
        /**
         * Seguir o dejar de seguir a un artista
         */
        followArtist() {
            if (!this.canFollowArtist) {
                this.noty("No es posible autoseguirte", "error");
                return;
            }

            // if (this.isFollowingArtist) {
            //     this.noty("Ya se sigue a este artista", "error");
            //     return;
            // }

            const data = { following_id: this.artist?.id };
            this.loadFollow = true;

            const ep = this.isFollowingArtist
                ? this.ep.user.unfollowArtist
                : this.ep.user.followArtist;

            this.axios
                .post(ep, data)
                .then((resp) => {
                    if (resp.status !== 200) return false;

                    const mjs = this.isFollowingArtist
                        ? "Dejaste de seguir a este artista"
                        : "Ahora sigues a este artista";

                    this.noty(mjs);

                    this.$store.dispatch("userRequest");
                })
                .catch((error) => console.error(error))
                .finally(() => (this.loadFollow = false));
        },
    },
};
</script>
