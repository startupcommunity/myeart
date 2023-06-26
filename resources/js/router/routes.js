import Vue from "vue";
import VueRouter from "vue-router";
import guestRoute from "./guest";
import errorsRoute from "./errors";
import dashboardRoute from "./dashboard";
import profileRoute from "./profile";
import artworkRoute from "./artwork";
import artistRoute from "./artist";
import eventRoute from "./event";
import collectivesRoute from "./collectives";
import checkoutRoute from "./checkout";
import communityRoute from "./community";
import releasesRoute from "./releases";
import shoppingCartRoute from "./shoppingcart";
import orderRoute from "./order";

export const routes = [
    ...errorsRoute,
    ...guestRoute,
    ...dashboardRoute,
    ...profileRoute,
    ...artworkRoute,
    ...artistRoute,
    ...communityRoute,
    ...releasesRoute,
    ...shoppingCartRoute,
    ...checkoutRoute,
    ...eventRoute,
    ...collectivesRoute,
    ...orderRoute,
];

Vue.use(VueRouter);
const config = new VueRouter({
    mode: "history",
    routes: routes,
});

export default config;
