<template>
    <div>
        <button @click.stop="addLikeOrDislike" :disabled="loading">
            <i
                class="fa-regular fa-heart"
                :class="{
                    'text-red-600': liked,
                    'text-gray-400': !liked,
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
    name: "ButtonLikeEvent",
    props: {
        event: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            loading: false,
            liked: false,
            likes: 0,
        };
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
        isLiked() {
            const fn = (like) => like.user_id === this.user?.id;
            this.liked = this.event?.likes?.some(fn);
        },

        getLikes() {
            this.likes = this.event?.likes?.length || 0;
        },
        addLikeOrDislike() {
            const data = {
                release_id: this.event.id,
                user_id: this.user.id,
            };

            const ep = this.liked
                ? this.ep.releases.dislike
                : this.ep.releases.like;

            // this.loading = true;
            // this.axios
            //     .post(ep, data)
            //     .then((resp) => {
            //         if (this.liked) {
            //             this.$emit("disliked-added");
            //             this.liked = false;
            //             this.likes--;
            //         } else {
            //             this.$emit("liked-added", resp.data);
            //             this.liked = true;
            //             this.likes++;
            //         }
            //     })
            //     .catch((error) => this.manageError(error))
            //     .finally(() => (this.loading = false));
        },
    },
};
</script>
