import vue from 'vue'
import VueRouter from 'vue-router'
window.Vue = vue;

import { routes } from './router/routes';
import VueEvents from 'vue-events';
import 'vue-loading-overlay/dist/vue-loading.css';

import ApiService from './api/api.service';
import Vuelidate from 'vuelidate';

import jwtService from './common/jwt.service';

import App from './App.vue';

import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import vuetify  from './plugins/vuetify'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import loadingOverlayComponent from './components/loadingOverlay';
import Notifications from 'vue-notification'

Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.use(VueEvents);
Vue.use(VueRouter);
Vue.use(VueFormWizard);
Vue.component('loading-overlay-original', Loading);
Vue.component('loading-overlay', loadingOverlayComponent);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

ApiService.init();

if(jwtService.getUser()){
    ApiService.setHeader();
}

import { store } from './store/store';

const app = new Vue({
    el: '#app',
    router: router,
    created(){
        if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch('userRequest');
        }
    },
    store,
    vuetify,
    render: h => h(App),
});