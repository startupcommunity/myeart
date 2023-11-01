import { importPage, ifAuthenticated } from "./util";

// ----------- guest -----------
const profileRoute = [
    {
        name: "userProfile",
        path: "/usuario/perfil/:id?/:section?",
        component: importPage("profile/ProfileUser"),
        beforeEnter: ifAuthenticated,
    },

    // pasos para terminar de crear un usuario (en desuso)
    // {
    //     name: "perfil",
    //     path: "/perfil",
    //     component: importPage("auth/perfil"),
    //     beforeEnter: ifAuthenticated,
    //     meta: { title: "perfil" },
    // },
];

export default profileRoute;
