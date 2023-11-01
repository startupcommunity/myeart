import { ifAuthenticated, importPage } from "./util";

// ----------- guest -----------
const shoppingCartRoute = [
    {
        name: "shoppingCart",
        path: "/carrito",
        component: importPage("shoppingcart/Index"),
        beforeEnter: ifAuthenticated,
    },
];

export default shoppingCartRoute;
