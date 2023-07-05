/**
 * Modulo para manejar los chats
 *
 * @type {Object}   store
 * @author luisandev - https://luisan.dev
 */

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
        /**
         * Agregar chat al store
         */
        addChat({ commit }, payload) {
            commit("addChat", payload);
        },

        /**
         * Abrir chat de conversación
         */
        openChat({ commit }, payload) {
            commit("openChat", payload);
        },

        /**
         * Cerrar chat de conversación
         */
        closeChat({ commit }, payload) {
            commit("stopAutoUpdateChat", payload);
            commit("closeChat", payload);
        },

        /**
         * Toggle chat de conversación
         */
        toggleChat({ commit }, payload) {
            commit("toggleChat", payload);
        },

        /**
         * Reducir la cantidad de chats a mostrar
         * según el payload
         */
        reduceChats({ commit }, payload) {
            commit("reduceChats", payload);
        },

        /**
         * Limpiar chats
         */
        clearChats({ commit }) {
            commit("clearChats");
        },

        /**
         * Iniciar auto actualizar chat
         */
        initAutoUpdateChat({ commit }, payload) {
            commit("initAutoUpdateChat", payload);
        },

        /**
         * Detener auto actualizar chat
         */
        stopAutoUpdateChat({ commit }, payload) {
            commit("stopAutoUpdateChat", payload);
        },
    },

    mutations: {
        addChat(state, payload) {
            state.chats.push(payload);
        },

        openChat(state, payload) {
            state.chats = state.chats.map((chat) => {
                if (chat.id === payload.id) {
                    chat.isOpen = true;
                }
                return chat;
            });
        },

        closeChat(state, payload) {
            state.chats = state.chats.filter((chat) => chat.id !== payload.id);
        },

        toggleChat(state, payload) {},

        reduceChats(state, payload) {
            state.chats = state.chats.slice(-payload);
        },

        clearChats(state) {
            state.chats.forEach((chat) => {
                chat.autoUpdate = false;
            });

            // esperar 1 segundo para limpiar los chats
            setTimeout(() => {
                state.chats = [];
            }, 100);
        },

        initAutoUpdateChat(state, payload) {
            const chat = state.chats.find((chat) => chat.id === payload.id);
            chat.autoUpdate = true;
        },

        stopAutoUpdateChat(state, payload) {
            const chat = state.chats.find((chat) => chat.id === payload.id);
            chat.autoUpdate = false;
            return chat;
        },
    },
};
