import Vue from "vue";
import Vuex from "vuex";

// módulos
import user from "./modules/user";
import user_information from "./modules/user_information";
import auth from "./modules/auth";
import register from "./modules/register";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        user,
        auth,
        user_information,
        register,
    },
});

export default store;
