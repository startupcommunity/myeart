import vue from "vue";
import VueRouter from "vue-router";
window.Vue = vue;

import { routes } from "./router/routes";
import { store } from "./store/store";
import VueEvents from "vue-events";
import "vue-loading-overlay/dist/vue-loading.css";

import ApiService from "./api/api.service";
import Vuelidate from "vuelidate";
import jwtService from "./common/jwt.service";

import App from "./App.vue";

import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import vuetify from "./plugins/vuetify";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import loadingOverlayComponent from "./components/loadingOverlay";
import Notifications from "vue-notification";

import VueI18n from "vue-i18n";
import { en } from "./lang/en";
import { es } from "./lang/es";

// swalert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// global mixin
import "./mixins/globalMixin";

Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.use(VueEvents);
Vue.use(VueRouter);
Vue.use(VueFormWizard);
Vue.use(VueSweetalert2);
Vue.component("loading-overlay-original", Loading);
Vue.component("loading-overlay", loadingOverlayComponent);

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: "es",
    fallbackLocale: "es",
    messages: {
        en,
        es,
    },
});

const router = new VueRouter({
    mode: "history",
    routes: routes,
});

ApiService.init();

if (jwtService.getUser()) {
    ApiService.setHeader();
}

const app = new Vue({
    el: "#app",
    router: router,
    async beforeCreate() {
        if (this.$store.getters.isAuthenticated) {
            await this.$store.dispatch("userRequest");
        }
    },
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
});
