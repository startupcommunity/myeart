import ApiService from "../../api/api.service";
import JwtService from "../../common/jwt.service";
import Errors from "./../../modules/errors";
// import user from "./modules/user";

const state = {
    access_token: JwtService.getUser()
        ? JSON.parse(JwtService.getUser()).access_token
        : "",
    perfil_info: JwtService.getUser() ? JSON.parse(JwtService.getUser()) : {},
    status: "",
    hasLoadedOnce: false,
    errors: new Errors(),
};

const getters = {
    isAuthenticated: (state) => !!state.access_token,
    isPerfilCreated: (state) => !!state.perfil_info,
    authStatus: (state) => state.status,
    authErrors: (state) => state.errors,
};

const actions = {
    authRequest: ({ commit, dispatch }, payload) => {
        // default action -> login
        let actionUrl = "/api/login";
        let data = {
            email: payload.email,
            password: payload.password,
        };

        if (payload.action == "register") {
            actionUrl = "/api/register";
            data = {
                username: payload.username,
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation,
            };
        }

        return new Promise((resolve, reject) => {
            commit("authRequest");
            Vue.axios
                .post(actionUrl, data)
                .then((resp) => {
                    let access_token = "Bearer " + resp.data.access_token;

                    // registro
                    if (payload.action == "register") {
                        commit("registerSuccess", resp.data);
                        resolve(access_token);
                        return;
                    }

                    // login
                    JwtService.setUser(resp.data);
                    ApiService.setHeader();
                    commit("authSuccess", access_token);
                    resolve(access_token);
                })
                .catch((err) => {
                    console.log(err.response);
                    commit("authError", err.response.data);
                    commit("authLogout");
                    reject(err);
                });
        });
    },
    authLogout: ({ commit, dispatch }) => {
        JwtService.unsetUser();
        ApiService.init();
        return new Promise((resolve, reject) => {
            Vue.axios
                .post("/api/logout")
                .then((resp) => {
                    commit("authLogout");
                    dispatch("userClearProfile");
                    resolve();
                })
                .catch((err) => {
                    commit("authError", err.response.data);
                    reject(err);
                });
        });
    },
};

const mutations = {
    authRequest: (state) => {
        state.status = "loading";
    },
    authSuccess: (state, access_token) => {
        state.status = "success";
        state.access_token = access_token;
        state.hasLoadedOnce = true;
    },
    authError: (state, err) => {
        let errors = err.errors ? err.errors : {};

        if (err.error == "invalid_grant") {
            errors.invalid_credentials = ["Usuario o contraseña incorrectos."];
        }

        state.status = "error";
        state.hasLoadedOnce = true;
        state.errors.record(errors);
    },
    authLogout: (state) => {
        state.access_token = "";
        JwtService.unsetUser();
        ApiService.init();
    },

    registerSuccess(state) {
        state.status = "success";
        state.hasLoadedOnce = true;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
