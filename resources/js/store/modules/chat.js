/**
 * Modulo para manejar los chats
 *
 * @type {Object}   store
 * @author luisandev - https://luisan.dev
 */

export default {
    state: {
        chats: [], // chats iniciados
        sidebarChats: false, // si la barra de amigos esta abierta o cerrada
    },

    getters: {
        chats(state) {
            return state.chats;
        },

        sidebarChats(state) {
            return state.sidebarChats;
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

        /**
         * Abrir el sidebar de chats
         */
        openSidebarChats({ commit }) {
            commit("openSidebarChats", true);
        },

        /**
         * cerrar el sidebar de chats
         */
        closeSidebarChats({ commit }) {
            commit("closeSidebarChats", false);
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
            // index
            const index = state.chats.findIndex(
                (chat) => chat.id === payload.id
            );
            // eliminar si existe
            if (index !== -1) {
                state.chats.splice(index, 1);
            }
        },

        toggleChat(state, payload) {},

        reduceChats(state, payload) {
            state.chats = state.chats.slice(-payload);
        },

        clearChats(state) {
            state.chats.forEach((chat) => {
                chat.autoUpdate = false;
            });

            // esperar 0.1 segundo para limpiar los chats
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

        openSidebarChats(state, payload) {
            state.sidebarChats = payload;
        },

        closeSidebarChats(state, payload) {
            state.sidebarChats = payload;
        },
    },
};
