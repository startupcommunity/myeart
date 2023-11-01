import { ifAuthenticated, importPage } from "./util";

// ----------- guest -----------
const orderRoute = [
    {
        name: "contactSeller",
        path: "/pedidos/contactar/:id",
        component: importPage("order/ContactSeller"),
        beforeEnter: ifAuthenticated,
    },
];

export default orderRoute;
