import Vue from "vue";

const state = {
    status: "",
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
                // if resp is unauthorized, logout, to
                dispatch("authLogout");
            });
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
