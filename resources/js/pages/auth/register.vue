<template>
    <div class="home-login">
        <div class="wrap-login p-2 ">
            <div class="container-login" style="background: rgba(255, 255, 255, 0.05);">
                <form class="login-form validate-form">
                    <div class="login-icon">
                        <router-link exact-active-class="active" to="/" style="color:#FFF">
                            <i class="fas fa-arrow-left"></i>
                        </router-link>
                    </div>

                    <div class="alert alert-danger mt-3" role="alert" v-if="authErrors.has('username') || authErrors.has('name') || authErrors.has('email') || authErrors.has('password')">
                        <div v-text="authErrors.get('username')"></div>
                        <div v-text="authErrors.get('name')"></div>
                        <div v-text="authErrors.get('email')"></div>
                        <div v-text="authErrors.get('password')"></div>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Enter username">
                        <input v-model="email" type="text" placeholder="Correo electronico" class="input100"/>
                        <span class="focus-input100 email-input"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Enter username">
                        <input v-model="name" type="text" placeholder="Nombre y apellido" class="input100"/>
                        <span class="focus-input100 user-input"></span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate = "Enter username">
                        <input v-model="username" type="text" placeholder="Nombre de usuario" class="input100"/>
                        <span class="focus-input100 user-input"></span>
                    </div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
                        <input v-model="password" type="password" placeholder="Contraseña" class="input100"/>
                        <span class="focus-input100 password-input"></span>
                    </div>
                    
                    <div class="wrap-input100 validate-input" data-validate="Enter confirm password">
                        <input v-model="password_confirmation" type="password" placeholder="Confirmar contraseña" class="input100"/>
                        <span class="focus-input100 password-input"></span>
                    </div>

                    <br/>

                    <div class="container-login-form-btn">
						<button class="btn btn-primary login-form-btn" type="button" v-on:click="register">
							Registrate
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
            action:'register',
            username:'',
            name:'',
            email:'',
            password:'',
            password_confirmation:'',
            accept: false
        }
    }
    //computed
    function authErrors(){
        return this.$store.getters.authErrors;
    }
    //methods
    function register  () {
        if(this.accept){
            const { action, username, name, email, password, password_confirmation } = this;
            this.$store.dispatch('authRequest', { action, username,name, email, password, password_confirmation })
            .then(() => {
                this.$router.push('/perfil')
            })
        }else{

        }
    }
    export default {
        name: 'register',
        data,
        methods:{
            register
        },
        computed:{
            authErrors
        }
    }
</script>

<style>
    .email-input::after {
        content: "\f0e0";
    }
    .user-input::after {
        content: "\f007";
    }
    .password-input::after {
        content: "\f023";
    }
</style>