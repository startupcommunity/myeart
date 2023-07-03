export default {
    state: {
        chats: [],
    },

    getters: {
        chats(state) {
            return state.chats;
        },
    },

    actions: {
        addChat({ commit }, payload) {
            commit("addChat", payload);
        },

        closeChat({ commit }, payload) {
            commit("closeChat", payload);
        },

        toggleChat({ commit }, payload) {
            commit("toggleChat", payload);
        },

        reduceChats({ commit }, payload) {
            commit("reduceChats", payload);
        },
    },

    mutations: {
        addChat(state, payload) {
            state.chats.push(payload);
        },

        closeChat(state, payload) {
            state.chats = state.chats.filter((chat) => chat.id !== payload.id);
        },

        toggleChat(state, payload) {
            // console.log(payload);
        },

        reduceChats(state, payload) {
            state.chats = state.chats.slice(-payload);
        },
    },
};
