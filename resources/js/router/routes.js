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
        path: "/obras/crear/:type?/:collectiveID?",
        component: importPage("artwork/CreateArtwork"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "editArtwork",
        path: "/obras/editar/:id/:type?/:collectiveID?",
        component: importPage("artwork/EditArtwork"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "listArtwork",
        path: "/obras/:keyword?",
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
        path: "/comunidad/:hashtag?",
        component: importPage("community/Index"),
        beforeEnter: ifAuthenticated,
    },

    // ------------- Publicaciones -------------
    {
        name: "showSlugRelease",
        path: "/publicaciones/slug/:slug",
        component: importPage("release/Show"),
    },

    // ----------- carrito de compras ----------
    {
        name: "shoppingCart",
        path: "/carrito",
        component: importPage("shoppingcart/Index"),
        beforeEnter: ifAuthenticated,
    },

    // ---------- checkout --------------------
    {
        name: "checkout",
        path: "/checkout",
        component: importPage("Checkout/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "checkoutSuccess",
        path: "/checkout/success/:id",
        component: importPage("Checkout/CheckoutSuccess"),
        beforeEnter: ifAuthenticated,
    },

    // ---------- eventos --------------------
    {
        name: "eventList",
        path: "/eventos",
        component: importPage("event/List"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "eventShow",
        path: "/eventos/show/:id",
        component: importPage("event/Show"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "eventSlug",
        path: "/eventos/public/:slug",
        component: importPage("event/ShowPublic"),
    },
    {
        name: "eventCreate",
        path: "/eventos/crear",
        component: importPage("event/Create"),
        beforeEnter: ifAuthenticated,
    },

    // ---------- colectivos --------------------
    {
        name: "indexCollective",
        path: "/colectivos",
        component: importPage("collective/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "collectiveCreate",
        path: "/colectivos/crear",
        component: importPage("collective/Create"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "collectiveShow",
        path: "/colectivos/ver/:id",
        component: importPage("collective/Show"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "collectiveSlug",
        path: "/colectivos/publico/:slug",
        component: importPage("collective/Show"),
    },
    {
        name: "collectiveProfile",
        path: "/colectivos/perfil/:id/:section?",
        component: importPage("collective/Profile"),
        beforeEnter: ifAuthenticated,
    },
];

const config = new VueRouter({
    mode: "history",
    routes: routes,
});

export default config;
