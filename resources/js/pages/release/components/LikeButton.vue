<template>
    <div>
        <button @click.stop="addLikeOrDislike">
            <i
                class="fa-regular fa-heart text-base"
                :class="{
                    'text-red-600': liked,
                    'text-gray-500': !liked,
                }"
            ></i>
        </button>
        <div
            class="text-xs text-gray-500 font-medium flex justify-center -mt-1"
        >
            <span>{{ likes }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "LikeButton",
    data() {
        return {
            loading: false,
            liked: false,
            likes: 0,
        };
    },
    props: {
        release: {
            type: Object,
            default: () => {},
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
                release_id: this.release.id,
                user_id: this.user.id,
            };

            const ep = this.liked
                ? this.ep.releases.dislike
                : this.ep.releases.like;

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
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        /**
         * Chequear si el usuario ya dio like
         */
        isLiked() {
            const liked = this.release?.likes?.some(
                (like) => like.user_id === this.user?.id
            );

            this.liked = liked;
        },

        /**
         * Obtener la cantidad de likes
         */
        getLikes() {
            this.likes = this.release?.likes?.length || 0;
        },
    },
};
</script>
