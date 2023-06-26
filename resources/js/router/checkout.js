import { ifAuthenticated, importPage } from "./util";

// ----------- guest -----------
const checkoutRoute = [
    {
        name: "checkout",
        path: "/checkout",
        component: importPage("Checkout/Index"),
        beforeEnter: ifAuthenticated,
    },
    {
        name: "checkoutSuccess",
        path: "/checkout/success",
        component: importPage("Checkout/CheckoutSuccess"),
        beforeEnter: ifAuthenticated,
    },
];

export default checkoutRoute;
