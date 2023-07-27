<template>
    <div class="mt-3">
        <button
            @click.stop="addLikeOrDislike"
            :disabled="loading || isTheCreator"
        >
            <i
                class="fa-regular fa-heart text-base"
                :class="{
                    'text-red-600': liked,
                    'text-gray-500': !liked,
                    'cursor-not-allowed': isTheCreator,
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
    name: "LikeButtonCollective",
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
    },
    mounted() {
        this.isLiked();
        this.getLikes();
    },
    computed: {
        user() {
            return this.$store.getters.getProfile;
        },

        creator() {
            return this.collective?.user || {};
        },

        isTheCreator() {
            return this.user.id === this.creator?.id;
        },
    },
    methods: {
        /**
         * Add like or dislike
         */
        addLikeOrDislike() {
            // si es el admin del colectivo no puede dar like
            if (this.isTheCreator) {
                this.$noty("No puede dar like a su propio colectivo", "error");
                return;
            }

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
