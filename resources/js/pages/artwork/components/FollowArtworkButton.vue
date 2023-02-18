<template>
    <button
        class="px-2"
        @click.stop="followOrUnfollow"
        :disabled="!canFollowArtwork || loadFollow"
    >
        <i
            class="fa-regular fa-bookmark"
            :class="{
                'text-zinc-900': isFollowingArtwork,
                'text-gray-400': !isFollowingArtwork,
                [classIcon]: classIcon,
            }"
        ></i>
    </button>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "FollowArtworkButton",
    mixins: [utilMixin],
    props: {
        artworkID: {
            type: Number,
            default: 0,
            description: "ID de la obra a seguir",
        },
        artistID: {
            type: Number,
            default: 0,
            description: "ID del artista de la obra",
        },
        classIcon: {
            type: String,
            default: "",
            description: "Clase del icono opcional",
        },
    },

    data() {
        return {
            loadFollow: false,
        };
    },

    computed: {
        /**
         * Comprueba si el usuario puede seguir la obra
         *
         * NO es posible auto seguir sus obras
         */
        canFollowArtwork() {
            return this.user?.id !== this.artistID;
        },

        /**
         * Comprueba si ya se sigue la obra seleccionada
         */
        isFollowingArtwork() {
            const id = this.artworkID;
            return this.followArtworks?.some((fav) => fav.id === id);
        },

        /**
         * Acceder a los getters necesarios
         */
        user() {
            return this.$store.getters.getProfile || {};
        },

        /**
         * Acceder a los getters necesarios
         */
        followArtworks() {
            return this.$store.getters.getFollowArtworks || [];
        },
    },

    methods: {
        /**
         * Seguir o dejar de seguir a una obra
         */
        followOrUnfollow() {
            if (this.isUserGuest) {
                return this.noty("Debes iniciar sesión", "warning");
            }

            if (!this.canFollowArtwork) {
                this.noty("No es posible auto seguir tus obras", "error");
                return;
            }

            this.loadFollow = true;
            const ep = this.isFollowingArtwork
                ? this.ep.user.removeArtworkToFav
                : this.ep.user.addArtworkToFav;

            this.axios
                .post(ep, { artwork_id: this.artworkID })
                .then((resp) => {
                    if (resp.status === 204) {
                        this.noty(resp.data, "error");
                        return;
                    }

                    if (this.isFollowingArtwork) {
                        this.noty("Obra eliminada de favoritos", "success");
                    } else {
                        this.noty("Obra agregada a favoritos", "success");
                    }

                    this.$store.dispatch("userFollowArtworks");
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loadFollow = false));
        },
    },
};
</script>
