import Vue from "vue";
import endpoints from "../../api/endpoints";

export default {
    state: {
        status: "", // estado de la petición
        loadingFollowArtist: false,
        following_artists: [], // artistas seguidos
        following_artworks: [], // obras seguidas
        following_releases: [], // publicaciones seguidas
        following_events: [], // eventos seguidos
        following_collectives: [], // colectivos seguidos
        collective: {}, // datos del colectivo
        profile: {
            profile: {},
            social_network: {},
            shopping_cart: [],
            following_artists: [],
            favorite_releases: [],
            unread_notifications: [],
            notifications: [],
            conversations: [],
        },
    },
    getters: {
        getFollowArtists: (state) => state.following_artists,
        getFollowArtworks: (state) => state.following_artworks,
        getFollowReleases: (state) => state.following_releases,
        getFollowEvents: (state) => state.following_events,
        getFollowCollectives: (state) => state.following_collectives,
        getCollective: (state) => state.collective,
        getProfile: (state) => state.profile,
        isProfileLoaded: (state) => !!state.profile.name,
        loadingFollowArtist: (state) => state.loadingFollowArtist,
    },
    actions: {
        /**
         * Obtener el usuario y los datos de su perfil
         * @param {Commit, Dispatch} param
         */
        userRequest: ({ commit, dispatch }) => {
            commit("userRequest");
            Vue.axios
                .get("/api/user")
                .then(async (resp) => await commit("userSuccess", resp.data))
                .catch((err) => {
                    commit("userError");
                    // dispatch("authLogout");
                });
        },

        /**
         * Obtener los artistas seguidos por el usuario
         * @param {Commit} param
         */
        userFollowArtists: ({ commit }) => {
            commit("initLoadingFollowArtist");
            Vue.axios
                .get(endpoints.user.getFollowArtists)
                .then((resp) => commit("setFollowArtists", resp.data))
                .catch((err) => console.log(err))
                .finally((_) => commit("stopLoadingFollowArtist"));
        },

        /**
         * Obtener las obras seguidas por el usuario
         * @param {Commit} param
         */
        userFollowArtworks: ({ commit }) => {
            // commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowArtworks)
                .then((resp) => commit("setFollowArtworks", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtener las publicaciones seguidas por el usuario
         * @param {Commit} param
         */
        userFavoriteReleases: ({ commit }) => {
            // commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowReleases)
                .then((resp) => commit("setFollowReleases", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtener los eventos seguidos por el usuario
         * @param {Commit} param
         */
        userFavoriteEvents: ({ commit }) => {
            // commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowEvents)
                .then((resp) => commit("setFollowEvents", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtener los datos de un colectivo
         * @param {Commit} param
         */
        getUserCollective: ({ commit }, id) => {
            // commit("userRequest");
            Vue.axios
                .get(endpoints.collectives.getCollective + id)
                .then((resp) => commit("setCollective", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtener los colectivos seguidos por el usuario
         * @param {Commit} param
         */
        userFollowCollectives: ({ commit }) => {
            // commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowCollectives)
                .then((resp) => commit("setFollowCollectives", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Limpiar el state de profile
         * @param {Commit} param
         */
        userClearProfile: ({ commit }) => {
            commit("clearProfile");
        },
    },
    mutations: {
        userRequest: (state) => {
            state.status = "loading";
        },
        initLoadingFollowArtist: (state) => {
            state.initLoadingFollowArtist = true;
        },
        stopLoadingFollowArtist: (state) => {
            state.initLoadingFollowArtist = false;
        },
        userError: (state) => {
            state.status = "error";
        },
        userSuccess: async (state, resp) => {
            await Vue.set(state, "profile", resp);
            state.status = "success";
        },
        setFollowArtists: async (state, resp) => {
            await Vue.set(state, "following_artists", resp);
            state.status = "success";
        },
        setFollowArtworks: async (state, resp) => {
            await Vue.set(state, "following_artworks", resp);
            state.status = "success";
        },
        setFollowReleases: async (state, resp) => {
            await Vue.set(state, "following_releases", resp);
            state.status = "success";
        },
        setFollowEvents: async (state, resp) => {
            await Vue.set(state, "following_events", resp);
            state.status = "success";
        },
        setFollowCollectives: async (state, resp) => {
            await Vue.set(state, "following_collectives", resp);
            state.status = "success";
        },
        setCollective: async (state, resp) => {
            await Vue.set(state, "collective", resp);
            state.status = "success";
        },

        /**
         * Limpiar el state de profile
         */
        clearProfile: (state) => {
            state.profile = {
                profile: {},
                social_network: {},
                shopping_cart: [],
                following_artists: [],
                favorite_releases: [],
                unread_notifications: [],
            };
        },
    },
};
