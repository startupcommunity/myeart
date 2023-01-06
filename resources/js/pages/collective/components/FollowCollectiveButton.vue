<template>
    <v-btn
        :color="isFollowing ? 'grey darken-3' : '#B2794C'"
        x-small
        class="text-white"
        @click.stop="followOrUnfollow"
        :loading="loading"
        :disabled="loading || isCreator"
    >
        <span v-if="!isFollowing">Seguir</span>
        <span v-else>Dejar de seguir</span>
    </v-btn>
</template>

<script>
export default {
    name: "FollowCollectiveButton",
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        isCreator: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            loading: false,
        };
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },

        followedCollectives() {
            return this.$store.getters.getFollowCollectives;
        },

        isFollowing() {
            return this.followedCollectives.some(
                (item) =>
                    item.user_id === this.user.id &&
                    item.collective_id === this.collective.id
            );
        },
    },

    methods: {
        followOrUnfollow() {
            if (this.isCreator) {
                this.noty("No puedes seguir tu propio colectivo", "warning");
                return;
            }

            const data = {
                collective_id: this.collective.id,
                user_id: this.user.id,
            };

            const ep = this.isFollowing
                ? this.ep.collectives.unfollow
                : this.ep.collectives.follow;

            this.loading = true;
            this.axios
                .post(ep, data)
                .then((resp) => {
                    if (resp.status === 201 || resp.status === 200) {
                        if (this.isFollowing) {
                            this.noty("Has dejado de seguir este colectivo");
                            this.$emit("unfollow");
                        } else {
                            this.noty("Has seguido este colectivo");
                            this.$emit("follow");
                        }

                        // actualizar los colectivos seguidos por el user
                        this.$store.dispatch("userFollowCollectives");

                        // actualizar el colectivo en cuestión
                        // this.$store.dispatch(
                        //     "getUserCollective",
                        //     this.collective.id
                        // );
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
