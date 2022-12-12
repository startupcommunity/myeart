import Vue from "vue";

import endpoints from "../../api/endpoints";

const state = {
    status: "",
    following_artworks: [],
    profile: {
        profile: {},
        social_network: {},
        shopping_cart: [],
        following_artists: [],
        favorite_releases: [],
    },
};

const getters = {
    getProfile: (state) => state.profile,
    getFollowArtworks: (state) => state.following_artworks,
    isProfileLoaded: (state) => !!state.profile.name,
};

const actions = {
    userRequest: ({ commit, dispatch }) => {
        commit("userRequest");
        Vue.axios
            .get("/api/user")
            .then(async (resp) => {
                await commit("userSuccess", resp.data);
            })
            .catch((err) => {
                commit("userError");
                dispatch("authLogout");
            });
    },

    userFollowArtworks: ({ commit, dispatch }) => {
        commit("userRequest");

        // acceder al global mixin para obtener el endpoint
        const ep = endpoints.user.getFollowArtworks;

        Vue.axios
            .get(ep)
            .then(async (resp) => {
                await commit("setFollowArtworks", resp.data);
            })
            .catch((err) => console.log(err));
    },
};

const mutations = {
    userRequest: (state) => {
        state.status = "loading";
    },
    userSuccess: async (state, resp) => {
        await Vue.set(state, "profile", resp);
        state.status = "success";
    },
    setFollowArtworks: async (state, resp) => {
        await Vue.set(state, "following_artworks", resp);
        state.status = "success";
    },
    userError: (state) => {
        state.status = "error";
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
