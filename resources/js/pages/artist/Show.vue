<template>
    <MainLayout>
        <!-- Hero -->
        <Hero :artist="artist" />

        <!-- post hero -->
        <PostHero :artist="artist" :profile="profile" :social="social" />

        <!-- about me -->
        <AboutMe :profile="profile" />

        <!-- my artworks -->
        <ArtistArtworks :user="artist" :ignoreArtworkID="0" title="Mis Obras" />

        <!-- blog -->
        <Blog :artist="artist" title="Mis blog" />

        <!-- events -->
        <EventSection :artist="artist" title="Mis eventos" />

        <!-- publications -->
        <Release :artist="artist" title="Mis publicaciones" />
    </MainLayout>
</template>
<script>
// mixins
import getDataMixin from "../../mixins/getDataMixin";

// components
import MainLayout from "../layouts/MainLayout.vue";
import Hero from "./sections/Hero.vue";
import PostHero from "./sections/PostHero.vue";
import AboutMe from "./sections/AboutMe.vue";
import ArtistArtworks from "../artwork/sections/ArtistArtworks.vue";
import Blog from "./sections/Blog.vue";
import EventSection from "./sections/Event.vue";
import Release from "./sections/Release.vue";

export default {
    components: {
        MainLayout,
        Hero,
        PostHero,
        AboutMe,
        ArtistArtworks,
        Blog,
        EventSection,
        Release
    },
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
