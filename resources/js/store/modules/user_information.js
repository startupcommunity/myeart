import Vue from 'vue'

const state = {
    status: '',
    paises: []
}

const getters = {
    getProfile: state => state.paises,
}

const actions = {
    paisesRequest: ({commit, dispatch}) => {
        commit('paisesRequest')
        axios.get('/api/user')
            .then((resp) => {
                commit('paisesSuccess', resp.data);
            })
            .catch((err) => {
                commit('paisesError');
                // if resp is unauthorized, logout, to
                dispatch('authLogout')
            })
    },
    userInformationRequest: ({commit, dispatch}) => {
        commit('userInformationRequest')
        axios.get('/api/user')
            .then((resp) => {
                commit('userInformationSuccess', resp.data);
            })
            .catch((err) => {
                commit('userInformationError');
                // if resp is unauthorized, logout, to
                dispatch('authLogout')
            })
    },
}

const mutations = {
    paisesRequest: (state) => {
        state.status = 'loading';
    },
    paisesSuccess: (state, resp) => {
        state.status = 'success';
        Vue.set(state, 'paises', resp);
    },
    paisesError: (state) => {
        state.status = 'error';
    },
    userInformationRequest: (state) => {
        state.status = 'loading';
    },
    userInformationSuccess: (state, resp) => {
        state.status = 'success';
    },
    userInformationError: (state) => {
        state.status = 'error';
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}