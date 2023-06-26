import { importPage, ifAuthenticated } from "./util";

// ----------- guest -----------
const eventRoute = [
    {
        name: "eventList",
        path: "/eventos",
        component: importPage("event/List"),
        // beforeEnter: ifNotAuthenticated
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
];

export default eventRoute;
