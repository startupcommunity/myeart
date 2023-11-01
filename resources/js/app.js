//require('./bootstrap');
import vue from "vue";
import App from "./App.vue";
window.Vue = vue;

// config
import router from "./router/routes";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/lang";
import globalMixin from "./mixins/globalMixin";

// events
import VueEvents from "vue-events";

// api + token
import ApiService from "./api/api.service";
import jwtService from "./common/jwt.service";

// validate
import Vuelidate from "vuelidate";

// wizard
import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

// loadings
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import loadingOverlayComponent from "./components/loadingOverlay";

// register and login modal
// import RegisterModal from "./components/RegisterModal.vue";

// noty
import Notifications from "vue-notification";

// swalert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// maps
import * as VueGoogleMaps from "vue2-google-maps";

//echo
import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
});

Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyCoEZAiDQOxmweKf1caokAcGqkOjlXxa04",
        // This is required if you use the Autocomplete plugin
        libraries: "places",
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // v: '3.26',
    },
    installComponents: false,
});

Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.use(VueEvents);
Vue.use(VueFormWizard);
Vue.use(VueSweetalert2);
Vue.component("loading-overlay-original", Loading);
Vue.component("loading-overlay", loadingOverlayComponent);
Vue.component("vgm-places", VueGoogleMaps.Autocomplete);
// Vue.component("register-modal", RegisterModal);
Vue.mixin(globalMixin);

// init API
ApiService.init();

if (jwtService.getUser()) {
    ApiService.setHeader();
}

new Vue({
    router,
    store,
    vuetify,
    i18n,
    async beforeCreate() {
        if (this.$store.getters.isAuthenticated) {
            await this.$store.dispatch("userRequest");
            await this.$store.dispatch("userFollowArtists");
            await this.$store.dispatch("userFollowArtworks");
            await this.$store.dispatch("userFavoriteReleases");
            await this.$store.dispatch("userFavoriteEvents");
            // await this.$store.dispatch("userFollowCollectives");
        }
    },
    render: (h) => h(App),
}).$mount("#app");
