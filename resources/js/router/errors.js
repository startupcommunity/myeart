import { importPage } from "./util";

// ----------- guest -----------
const errorsRoute = [
    {
        path: "*", // 404
        name: "NotFound",
        component: importPage("errors/404"),
    },
    {
        path: "/500", // 500
        name: "ServerError",
        component: importPage("errors/500"),
    },
];

export default errorsRoute;
