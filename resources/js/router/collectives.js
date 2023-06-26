import { importPage, ifAuthenticated } from "./util";

// ----------- guest -----------
const collectivesRoute = [
    {
        name: "indexCollective",
        path: "/colectivos",
        component: importPage("collective/Index"),
        // beforeEnter: ifAuthenticated,
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

export default collectivesRoute;
