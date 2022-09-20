const Home = () => import('../pages/Home.vue')
const Register = () => import('../pages/auth/register.vue')
const Login = () => import('../pages/auth/Login.vue')
const Perfil = () => import('../pages/auth/perfil.vue')

const Dashboard = () => import('../pages/dashboard/dashboard.vue')

import {store} from '../store/store'
const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/dashboard')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
}

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        beforeEnter: ifNotAuthenticated,
    },
    {
        name: 'perfil',
        path: '/perfil',
        component: Perfil,
    },

    {
        name: 'dashboard',
        path: '/',
        component: Dashboard,
        beforeEnter: ifAuthenticated,
    },
]