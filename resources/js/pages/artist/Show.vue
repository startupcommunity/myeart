<template>
    <MainLayout>
        <!-- Hero -->
        <Hero :artist="artist" />

        <!-- post hero -->
        <PostHero :artist="artist" :profile="profile" :social="social" />

        <!-- about me -->
        <AboutMe :profile="profile" />

        <!-- my artworks -->
        <ArtistArtworks
            :user="artist"
            :ignoreArtworkID="0"
            fluid="container"
            title="Obras del artista"
        />

        <!-- blog -->
        <!-- <Blog :artist="artist" title="Mis blog" /> -->

        <!-- events -->
        <EventSection
            :artist="artist"
            title="Eventos del artista"
            v-if="artist?.id"
        />

        <!-- publications -->
        <Release :artist="artist" title="Publicaciones del artista" />
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
// import Blog from "./sections/Blog.vue";
import EventSection from "./sections/Event.vue";
import Release from "./sections/Release.vue";

export default {
    components: {
        MainLayout,
        Hero,
        PostHero,
        AboutMe,
        ArtistArtworks,
        EventSection,
        Release,
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
    mounted() {
        // ir a la parte superior de la página
        window.scrollTo(0, 0);
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
                .then((res) => {
                    if (res.status !== 200) return false;
                    this.artist = res.data;
                })
                .catch((resp) => this.manageError(resp))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
