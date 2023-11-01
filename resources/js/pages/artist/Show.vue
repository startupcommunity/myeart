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

        <!-- events -->
        <EventSection
            :artist="artist"
            title="Eventos del artista"
            v-if="artist?.id"
        />

        <!-- publications -->
        <Release
            :artist="artist"
            title="Publicaciones del artista"
            v-if="artist?.id"
        />

        <!-- calificaciones -->
        <RatingUserSection
            :artist="artist"
            title="Calificaciones del artista"
            v-if="artist?.id"
        />
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
import EventSection from "./sections/Event.vue";
import Release from "./sections/Release.vue";
import RatingUserSection from "./sections/RatingSection.vue";

export default {
    name: "Show",
    components: {
        MainLayout,
        Hero,
        PostHero,
        AboutMe,
        ArtistArtworks,
        EventSection,
        Release,
        RatingUserSection,
    },
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
            const ep = this.$isUserGuest
                ? this.ep.guest.getArtist
                : this.ep.user.getArtist;
            this.globalLoading = true;

            this.axios
                .get(`${ep + id}`)
                .then((res) => {
                    if (res.status !== 200) return false;
                    this.artist = res.data;
                })
                .catch((resp) => this.$manageError(resp))
                .finally(() => (this.globalLoading = false));
        },
    },
};
</script>
