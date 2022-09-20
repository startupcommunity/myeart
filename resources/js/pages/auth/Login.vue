<template>
    <div class="home-login">
        <div class="wrap-login p-2 ">
            <div class="container-login" style="background: rgba(255, 255, 255, 0.05);">
                <form class="login-form validate-form" method="POST" v-on:submit.prevent="login">
                    <div class="login-icon">
                        <router-link exact-active-class="active" to="/" style="color:#FFF">
                            <i class="fas fa-arrow-left"></i>
                        </router-link>
                    </div>

                    <p class="text-danger" v-if="authErrors.has('invalid_credentials')" v-text="authErrors.get('invalid_credentials')"></p>

                    <div class="alert alert-danger mt-3" role="alert" v-if="authErrors.has('email') || authErrors.has('password')">
                        <div v-text="authErrors.get('email')"></div>
                        <div v-text="authErrors.get('password')"></div>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Enter username">
                        <b-form-input v-model="user.email" type="text" placeholder="Nombre de usuario / Teléfono / Correo" class="input100"></b-form-input>
                        <span class="focus-input100 user-input"></span>
                    </div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
                        <b-form-input v-model="user.password" type="password" placeholder="Contraseña" class="input100"></b-form-input>
                        <span class="focus-input100 password-input"></span>
                    </div>

                    <div class="container-login-form-btn">
						<button :to="{ name: 'register' }" class="btn btn-primary login-form-btn" type="submit">
							Iniciar sesión
						</button>
					</div>

                    <div class="container-login-form-btn">
						<button class="btn btn-primary google-form-btn">
							Entrar Con <img src="../../../../public/img/image 31.png" width="70px" style="margin-top:4px"/>
						</button>
					</div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    //data
    function data(){
        return {
            user: {
                email:'',
                password:'',
                remember:false,
            }
        }
    }
    //methods
    function login () {
        const { email, password, remember } = this.user;
        this.$store.dispatch('authRequest', { email, password, remember })
            .then(() => {
                this.$router.push('/dashboard')
            })
    }
    //computed
    function authErrors(){
        return this.$store.getters.authErrors;
    }
    export default {
        name:'login',
        data,
        methods: {
            login
        },
        computed:{
            authErrors
        }
    }
</script>

<style>
    .user-input::after {
        content: "\f007";
    }
    .password-input::after {
        content: "\f023";
    }
</style>