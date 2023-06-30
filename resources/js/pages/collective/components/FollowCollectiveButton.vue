<template>
    <v-btn
        :color="isFollowing ? 'grey darken-3' : '#B2794C'"
        :x-small="small || isMobileMode"
        :small="isSmall"
        :class="custom"
        :loading="loading"
        :disabled="loading || isCreator"
        :outlined="outlined"
        @click.stop="followOrUnfollow"
    >
        <i class="fa-brands fa-nfc-symbol" v-if="icon"></i>
        <span v-if="!isFollowing">Seguir</span>
        <span v-else>Dejar de seguir</span>
    </v-btn>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "FollowCollectiveButton",
    mixins: [utilMixin],
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        isCreator: {
            type: Boolean,
            default: false,
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: true,
        },
        icon: {
            type: Boolean,
            default: false,
        },
        custom: {
            type: String,
            default: "text-white",
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
            if (this.isUserGuest) {
                return this.messageGuest;
            }

            if (this.isCreator) {
                this.$noty("No puedes seguir tu propio colectivo", "warning");
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
                            this.$noty("Has dejado de seguir este colectivo");
                            this.$emit("unfollow");
                        } else {
                            this.$noty("Has seguido este colectivo");
                            this.$emit("follow");
                        }

                        // actualizar los colectivos seguidos por el user
                        this.$store.dispatch("userFollowCollectives");
                    }
                })
                .catch((error) => this.$manageError(error))
                .finally(() => (this.loading = false));
        },
    },
};
</script>
