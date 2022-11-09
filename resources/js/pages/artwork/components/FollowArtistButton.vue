<template>
    <button
        class="btn btn-primary btn-sm text-xs px-4 uppercase"
        @click.stop="followArtist()"
        :disabled="!canFollowArtist || isFollowingArtist || loadFollow"
        :class="{ 'btn-dark': isFollowingArtist }"
    >
        <span v-if="isFollowingArtist">Siguiendo</span>
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
            return this.user.id !== this.artist.id;
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
         * Seguir a un artista
         */
        followArtist() {
            if (!this.canFollowArtist) {
                this.noty("No es posible autoseguirte", "error");
                return;
            }

            if (this.isFollowingArtist) {
                this.noty("Ya se sigue a este artista", "error");
                return;
            }

            const data = { following_id: this.artist?.id };
            this.loadFollow = true;

            this.axios
                .post(this.ep.user.followArtist, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.noty("Artista seguido");
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => console.error(error))
                .finally(() => (this.loadFollow = false));
        },
    },
};
</script>
