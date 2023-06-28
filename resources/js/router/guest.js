import { ifNotAuthenticated, importPage } from "./util";

// ----------- guest -----------
const guestRoutes = [
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
        name: "confirmRegisterEmail",
        path: "/confirm-register-email/:token",
        component: importPage("auth/ConfirmRegisterEmail"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "guestHome",
        path: "/", // guest home
        component: importPage("landing/guest/Index"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "forgotPassword",
        path: "/forgot-password",
        component: importPage("auth/ForgotPassword"),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "enterToken",
        path: "/enter-token/:email",
        component: importPage("auth/EnterToken"),
        beforeEnter: ifNotAuthenticated,
    },

    // ---------- contacto --------------------
    {
        name: "contact",
        path: "/contacto",
        component: importPage("contact/Index"),
    },
];

export default guestRoutes;
