import vue from 'vue'
import VueRouter from 'vue-router'
window.Vue = vue;

import { routes } from './router/routes';
import VueEvents from 'vue-events';
import 'vue-loading-overlay/dist/vue-loading.css';

import ApiService from './api/api.service';
import Vuelidate from 'vuelidate';

import App from './App.vue';

import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import vuetify  from './plugins/vuetify'


Vue.use(Vuelidate);
Vue.use(VueEvents);
Vue.use(VueRouter);
Vue.use(VueFormWizard);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

ApiService.init();

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