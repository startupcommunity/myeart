import Vue from "vue";

// utils
function showRequestValidations(request) {
    if (request.response.data.errors) {
        const errors = request.response.data.errors;
        let mjsErrors = "";
        for (const error in errors) {
            mjsErrors += errors[error][0] + "\n";
        }

        this.$notify({
            title: 'Aviso!',
            text: mjsErrors,
            group: "container",
            type: "warning",
            duration: 6000
        });
    }
};

const state = {
    status: "",
    paises: [],
    artistic: [],
};

const getters = {
    getPaises: (state) => {
        let list = [{ state: "Seleccione país", abbr: "" }];
        state.paises.map((item) => {
            list.push({ state: item.nombre, abbr: item.id });
        });

        return list;
    },
};

const actions = {
    artisticRequest: ({ commit, dispatch }) => {
        commit("paisesRequest");
        Vue.axios
            .get("/api/artistics")
            .then((resp) => {
                commit("artisticSuccess", resp.data);
            })
            .catch((err) => {
                commit("paisesError");
                // if resp is unauthorized, logout, to
                dispatch("authLogout");
            });
    },
    paisesRequest: ({ commit, dispatch }) => {
        commit("paisesRequest");
        Vue.axios
            .get("/api/paises")
            .then((resp) => {
                commit("paisesSuccess", resp.data);
                dispatch("artisticRequest");
            })
            .catch((err) => {
                commit("paisesError");
                // if resp is unauthorized, logout, to
                dispatch("authLogout");
            });
    },
    registerPerfil: ({ commit, dispatch }, payload) => {
        let actionUrl = "/api/registerPerfil";
        let formData = new FormData();
        formData.append("imagen", payload.image ? payload.image : "");
        formData.append("perfil", payload.perfil);
        formData.append("date", payload.date);
        formData.append("asociacion_arte", payload.asociacion_arte);
        formData.append(
            "consejeria_ayuntamiento",
            payload.consejeria_ayuntamiento
        );
        formData.append("galeria", payload.galeria);
        formData.append("asociacion_turismo", payload.asociacion_turismo);
        formData.append("sexo", payload.sexo);
        formData.append("pais", payload.pais);
        formData.append("idioma", payload.idioma);
        for (let index = 0; index < payload.artistic_list.length; index++) {
            formData.append("artistic_list[]", payload.artistic_list[index]);
        }

        formData.append("_method", "PUT");

        return new Promise((resolve, reject) => {
            commit("userInformationRequest");
            Vue.axios
                .post(actionUrl, formData)
                .then((resp) => {
                    commit("userInformationSuccess", resp);
                    dispatch("userRequest");
                    resolve(resp);
                })
                .catch((err) => {
                    console.log(err);
                    commit("userInformationError", err);
                });
        });
    },
};

const mutations = {
    paisesRequest: (state) => {
        state.status = "loading";
    },
    paisesSuccess: (state, resp) => {
        state.status = "success";
        Vue.set(state, "paises", resp.data);
    },
    artisticSuccess: (state, resp) => {
        state.status = "success";
        Vue.set(state, "artistic", resp.data);
    },
    paisesError: (state) => {
        state.status = "error";
    },
    userInformationRequest: (state) => {
        state.status = "loading";
    },
    userInformationSuccess: (state, resp) => {
        state.status = "success";
    },
    userInformationError: (state, resp = null) => {
        state.status = "error";
        showRequestValidations(resp);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
