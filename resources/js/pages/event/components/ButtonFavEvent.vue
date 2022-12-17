<template>
    <button @click.stop="addOrRemoveFav" :disabled="loading">
        <i
            class="fa-regular fa-bookmark"
            :class="{
                'text-blue-600': isFav,
                'text-gray-400': !isFav,
            }"
        ></i>
    </button>
</template>

<script>
export default {
    name: "ButtonFavEvent",

    props: {
        event: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            loading: false,
            isFav: false,
        };
    },

    mounted() {
        this.hasFavorite();
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },
        favEvents() {
            return this.$store.getters.getFollowEvents || [];
        },
    },

    methods: {
        hasFavorite() {
            this.isFav = this.favEvents?.some(
                (fav) => fav.event_id === this.event.id
            );
        },

        addOrRemoveFav() {
            const data = {
                event_id: this.event.id,
                user_id: this.user.id,
            };
        },
    },
};
</script>
