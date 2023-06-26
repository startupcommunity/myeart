import { importPage, ifAuthenticated } from "./util";

// ----------- guest -----------
const artistRoute = [
    {
        name: "listArtist",
        path: "/artistas",
        component: importPage("artist/List"),
        // beforeEnter: ifNotAuthenticated,
    },
    {
        name: "showArtist",
        path: "/artista/:id",
        component: importPage("artist/Show"),
        beforeEnter: ifAuthenticated,
    },
];

export default artistRoute;
