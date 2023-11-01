import { importPage } from "./util";

// ----------- guest -----------
const releasesRoute = [
    {
        name: "showSlugRelease",
        path: "/publicaciones/slug/:slug",
        component: importPage("release/Show"),
    },
];

export default releasesRoute;
