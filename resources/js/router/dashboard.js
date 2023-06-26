import { importPage, ifAuthenticated } from "./util";

// ----------- guest -----------
const dashboardRoute = [
    {
        name: "dashboard",
        path: "/dashboard",
        component: importPage("dashboard/dashboard"),
        beforeEnter: ifAuthenticated,
    },
];

export default dashboardRoute;
