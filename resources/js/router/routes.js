import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

const importPage = (page) => () => import(`../pages/${page}.vue`);

Vue.use(VueRouter);

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
        path: "*", // 404
        name: "NotFound",
        component: importPage("errors/404"),
    },
    {
        path: "/500", // 500
        name: "ServerError",
        component: importPage("errors/500"),
    },
    {
        name: "home",
        path: "/home",
        component: importPage("Home"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "login",
        path: "/login",
        component: importPage("auth/Login"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "register",
        path: "/register",
        component: importPage("auth/register"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "dashboard",
        path: "/",
        component: importPage("dashboard/dashboard"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "perfil",
        path: "/perfil",
        component: importPage("auth/perfil"),
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

    // ------------- Obras -------------
    {
        name: "createArtwork",
        path: "/obras/crear",
        component: importPage("artwork/CreateArtwork"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "editArtwork",
        path: "/obras/editar/:id",
        component: importPage("artwork/EditArtwork"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "listArtwork",
        path: "/obras",
        component: importPage("artwork/ListArtwork"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "showSlugArtwork",
        path: "/obras/slug/:slug",
        // component: importPage('artwork/ListArtwork'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "showArtwork",
        path: "/obras/:id",
        component: importPage("artwork/ShowArtwork"),
        beforeEnter: ifAuthenticated,
    },

    // ------------- Artistas -------------
    {
        name: "listArtist",
        path: "/artistas",
        component: importPage("artist/List"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "showArtist",
        path: "/artista/:id",
        component: importPage("artist/Show"),
        beforeEnter: ifAuthenticated,
    },

    // ------------- Comunidad -------------
    {
        name: "indexCommunity",
        path: "/comunidad",
        component: importPage("community/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "searchHashTag",
        path: "/buscar/:hashtag",
        // component: importPage("community/Index"),
        beforeEnter: ifAuthenticated,
    },

    // ------------- Publicaciones -------------
    {
        name: "showSlugRelease",
        path: "/publicaciones/slug/:slug",
        // component: importPage('artwork/ListArtwork'),
        beforeEnter: ifNotAuthenticated,
    },

    // ----------- carrito de compras ----------
    {
        name: "shoppingCart",
        path: "/carrito",
        component: importPage("shoppingcart/Index"),
        beforeEnter: ifAuthenticated,
    },
];

const config = new VueRouter({
    mode: "history",
    routes: routes,
});

export default config;
