// imports
const Home = () => import("../pages/Home.vue");
const Register = () => import("../pages/auth/register.vue");
const Login = () => import("../pages/auth/Login.vue");
const Perfil = () => import("../pages/auth/perfil.vue");
const Dashboard = () => import("../pages/dashboard/dashboard.vue");
import ProfileUser from "../pages/profile/ProfileUser.vue";

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
        path: "/usuario/perfil/:id",
        component: ProfileUser,
        beforeEnter: ifAuthenticated,
    },
];
