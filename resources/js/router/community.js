import { importPage } from "./util";

// ----------- guest -----------
const communityRoute = [
    {
        name: "indexCommunity",
        path: "/comunidad/:hashtag?",
        component: importPage("community/Index"),
        // beforeEnter: ifAuthenticated,
    },
];

export default communityRoute;
