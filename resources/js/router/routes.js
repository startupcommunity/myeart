// imports
const Home = () => import("../pages/Home.vue");
const Dashboard = () => import("../pages/dashboard/dashboard.vue");

// registro
const Register = () => import("../pages/auth/register.vue");
const Perfil = () => import("../pages/auth/perfil.vue");
const Login = () => import("../pages/auth/Login.vue");

// perfil usuario
import ProfileUser from "../pages/profile/ProfileUser.vue";

// obras
import CreateArtwork from "../pages/artwork/CreateArtwork.vue";
import EditArtwork from "../pages/artwork/EditArtwork.vue";

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
        component: Home,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "dashboard",
        path: "/",
        component: Dashboard,
        beforeEnter: ifAuthenticated,
    },
    {
        name: "perfil",
        path: "/perfil",
        component: Perfil,
        beforeEnter: ifAuthenticated,
        meta: {
            title: "perfil",
        },
    },
    {
        name: "userProfile",
        path: "/usuario/perfil/:id/:section?",
        component: ProfileUser,
        beforeEnter: ifAuthenticated,
    },
    {
        name: "createArtwork",
        path: "/obras/crear",
        component: CreateArtwork,
        beforeEnter: ifAuthenticated,
    },
    {
        name: "editArtwork",
        path: "/obras/editar/:id",
        component: EditArtwork,
        beforeEnter: ifAuthenticated,
    },
];
