import { importPage, ifAuthenticated, ifNotAuthenticated } from "./util";

// ----------- guest -----------
const artworkRoute = [
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
        // beforeEnter: ifNotAuthenticated,
    },
    {
        name: "showSlugArtwork",
        path: "/obras/slug/:slug",
        // component: importPage('artwork/ListArtwork'),
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: "showArtwork",
        path: "/obras/:id/:title",
        component: importPage("artwork/ShowArtwork"),
        // beforeEnter: ifAuthenticated,
    },
];

export default artworkRoute;
