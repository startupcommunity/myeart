import Vue from "vue";
import endpoints from "../../api/endpoints";

export default {
    state: {
        status: "",
        following_artists: [],
        following_artworks: [],
        following_releases: [],
        profile: {
            profile: {},
            social_network: {},
            shopping_cart: [],
            following_artists: [],
            favorite_releases: [],
        },
    },
    getters: {
        getProfile: (state) => state.profile,
        getFollowArtists: (state) => state.following_artists,
        getFollowArtworks: (state) => state.following_artworks,
        getFollowReleases: (state) => state.following_releases,
        isProfileLoaded: (state) => !!state.profile.name,
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
                    dispatch("authLogout");
                });
        },

        /**
         * Obtener los artistas seguidos por el usuario
         * @param {Commit} param
         */
        userFollowArtists: ({ commit }) => {
            commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowArtists)
                .then((resp) => commit("setFollowArtists", resp.data))
                .catch((err) => console.log(err));
        },

        /**
         * Obtener las obras seguidas por el usuario
         * @param {Commit} param
         */
        userFollowArtworks: ({ commit }) => {
            commit("userRequest");
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
            commit("userRequest");
            Vue.axios
                .get(endpoints.user.getFollowReleases)
                .then((resp) => commit("setFollowReleases", resp.data))
                .catch((err) => console.log(err));
        },
    },
    mutations: {
        userRequest: (state) => {
            state.status = "loading";
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
        userError: (state) => {
            state.status = "error";
        },
    },
};
