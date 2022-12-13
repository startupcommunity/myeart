<template>
    <button @click.stop="addOrRemoveFav">
        <i
            class="fa-regular fa-bookmark text-base"
            :class="{
                'text-blue-600': isFav,
                'text-gray-500': !isFav,
            }"
        ></i>
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
    </button>
</template>

<script>
export default {
    name: "FavButtonRelease",
    props: {
        release: {
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
    },
    methods: {
        addOrRemoveFav() {
            const data = {
                release_id: this.release.id,
                user_id: this.user.id,
            };

            const ep = this.isFav
                ? this.ep.releases.removeFav
                : this.ep.releases.addFav;

            this.loading = true;
            this.axios
                .post(ep, data)
                .then((resp) => {
                    if (this.isFav) {
                        this.$emit("fav-removed", true);
                        this.isFav = false;
                    } else {
                        this.$emit("fav-added");
                        this.isFav = true;
                    }

                    this.$store.dispatch("userRequest");
                    this.$store.dispatch("userFavoriteReleases");
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },

        hasFavorite() {
            const favs = this.user?.favorite_releases;
            const release = this.release;
            this.isFav = favs.some((fav) => fav.release_id === release.id);
        },
    },
};
</script>
