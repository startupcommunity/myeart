<template>
    <v-btn
        outlined
        :color="liked ? 'grey darken-3' : '#B2794C'"
        :disabled="loading"
        :x-small="small || isMobileMode"
        :small="isSmall"
        @click.stop="addLikeOrDislike"
    >
        <i class="fa-regular fa-thumbs-up"></i>
        <span v-if="liked"> No me gusta </span>
        <span v-else> Me gusta </span>
    </v-btn>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "LikeButtonOutlinedCollective",
    mixins: [utilMixin],
    data() {
        return {
            loading: false,
            liked: false,
            likes: 0,
        };
    },
    props: {
        collective: {
            type: Object,
            default: () => {},
        },
        small: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        this.isLiked();
        this.getLikes();
    },
    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
    },
    methods: {
        /**
         * Add like or dislike
         */
        addLikeOrDislike() {
            const data = {
                collective_id: this.collective.id,
                user_id: this.user.id,
            };

            const ep = this.liked
                ? this.ep.collectives.dislike
                : this.ep.collectives.like;

            this.loading = true;
            this.axios
                .post(ep, data)
                .then((resp) => {
                    if (this.liked) {
                        this.$emit("disliked-added");
                        this.liked = false;
                        this.likes--;
                    } else {
                        this.$emit("liked-added", resp.data);
                        this.liked = true;
                        this.likes++;
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Chequear si el usuario ya dio like
         */
        isLiked() {
            const liked = this.collective?.likes?.some(
                (like) => like.user_id === this.user?.id
            );

            this.liked = liked;
        },

        /**
         * Obtener la cantidad de likes
         */
        getLikes() {
            this.likes = this.collective?.likes?.length || 0;
        },
    },
};
</script>
