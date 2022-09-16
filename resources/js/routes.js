const Home = () => import('./pages/Home.vue')
const Register = () => import('./pages/auth/Register.vue')
const Login = () => import('./pages/auth/Login.vue')

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'home',
        path: '/login',
        component: Login
    },
    {
        name: 'home',
        path: '/register',
        component: Register
    },
]