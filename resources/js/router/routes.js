const importPage = (page) => () => import(`../pages/${page}.vue`);

// store
import { store } from "../store/store";

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/home");
};

export const routes = [
    {
        name: "home",
        path: "/home",
        component: importPage('Home'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "login",
        path: "/login",
        component: importPage('auth/Login'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "register",
        path: "/register",
        component: importPage('auth/register'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "dashboard",
        path: "/",
        component: importPage('dashboard/dashboard'),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "perfil",
        path: "/perfil",
        component: importPage('auth/perfil'),
        beforeEnter: ifAuthenticated,
        meta: {
            title: "perfil",
        },
    },
    {
        name: "userProfile",
        path: "/usuario/perfil/:id/:section?",
        component: importPage("profile/ProfileUser"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "createArtwork",
        path: "/obras/crear",
        component: importPage('artwork/CreateArtwork'),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "editArtwork",
        path: "/obras/editar/:id",
        component: importPage('artwork/EditArtwork'),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "listArtwork",
        path: "/obras",
        component: importPage('artwork/ListArtwork'),
        beforeEnter: ifAuthenticated,
    },
    // {
    //     name: "showSlugArtwork",
    //     path: "/obras/slug/:slug",
    //     // component: importPage('artwork/ListArtwork'),
    //     beforeEnter: ifNotAuthenticated,
    // },
    {
        name: "showArtwork",
        path: "/obras/:id",
        component: importPage('artwork/ShowArtwork'),
        beforeEnter: ifAuthenticated,
    },
];
