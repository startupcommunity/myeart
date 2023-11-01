export default {
    state: {
        showModalRegister: false,
    },

    actions: {
        setShowModalRegister({ commit }, payload) {
            commit("changeShowModalRegister", payload);
        },
    },

    mutations: {
        changeShowModalRegister(state, payload) {
            state.showModalRegister = payload;
        },
    },

    getters: {
        showModalRegister(state) {
            return state.showModalRegister;
        },
    },
};
