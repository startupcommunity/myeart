import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import initIncterceptor from './interceptor';
import JwtService from "../common/jwt.service";
import { API_URL } from "../common/config";

initIncterceptor();

const ApiService = {
    init(){
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader(){
        Vue.axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            "Authorization":`Bearer ${JwtService.getToken()}`
        };
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },
};

export default ApiService;