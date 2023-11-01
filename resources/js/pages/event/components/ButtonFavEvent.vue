<template>
    <button @click.stop="addOrRemoveFav" :disabled="globalLoading">
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
            return this.$store.getters.getFollowEvents;
        },
    },

    methods: {
        hasFavorite() {
            this.isFav = this.favEvents?.some((e) => e.id === this.event.id);
        },

        addOrRemoveFav() {
            const data = {
                event_id: this.event.id,
                user_id: this.user.id,
            };

            const ep = this.isFav
                ? this.ep.events.removeFav
                : this.ep.events.addFav;

            this.globalLoading = true;
            this.axios
                .post(ep, data)
                .then((_) => {
                    if (this.isFav) {
                        this.isFav = false;
                        this.$noty("Evento eliminado de favoritos", "success");
                    } else {
                        this.$noty("Evento agregado a favoritos", "success");
                        this.isFav = true;
                    }

                    // this.$store.dispatch("userRequest");
                    this.$store.dispatch("userFavoriteEvents");
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
