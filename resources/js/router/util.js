// store
import store from "../store/store";

// import dinámico de componentes
export const importPage = (page) => () => import(`../pages/${page}.vue`);

// store dinámico no autenticado
export const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/dashboard");
};

// store dinámico autenticado
export const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};
