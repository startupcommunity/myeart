<template>
    <MainLayout>
        <!-- Hero -->
        <Hero :artist="artist" />

        <!-- post hero -->
        <PostHero :artist="artist" :profile="profile" :social="social" />
    </MainLayout>
</template>
<script>
// mixins
import getDataMixin from "../../mixins/getDataMixin";

// components
import MainLayout from "../layouts/MainLayout.vue";
import Hero from "./sections/Hero.vue";
import PostHero from "./sections/PostHero.vue";

export default {
    components: { MainLayout, Hero, PostHero },
    name: "Show",
    mixins: [getDataMixin],
    data() {
        return {
            artist: {
                profile: {},
                social_network: {},
            },
        };
    },
    created() {
        this.getArtist();
    },
    computed: {
        /**
         * Devuelve los datos de las redes sociales
         */
        social() {
            return this.artist?.social_network;
        },

        /**
         * Devuelve los datos de perfil
         */
        profile() {
            return this.artist?.profile;
        },
    },
    methods: {
        /**
         * Obtiene el artista
         */
        getArtist() {
            const id = this.$route.params.id;
            this.globalLoading = true;

            this.axios
                .get(this.ep.user.getArtist + id)
                .then((response) => {
                    this.artist = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
