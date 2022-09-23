<template>
    <div class="home-login">
        <loading-overlay :active="apiStateFormLoading" :is-full-page="true" loader="bars"/>
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

                    <v-checkbox
                        v-model="accept"
                        hide-details
                    >
                        <template slot="label">
                            <label style="margin-bottom:0px;padding-bottom:0px;">Acepto los <b style="border-bottom: 2px solid #FFF">Términos y Condiciones</b></label>
                        </template>
                    </v-checkbox>

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
    import { mapState } from 'vuex';
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
                this.$notify({
                    group: 'container',
                    text: 'Usuario registrado',
                    type: "success"
                });
                this.$router.push('/perfil')
            })
        }else{
            this.$notify({
                group: 'container',
                title: '¡Error!',
                text: "Porfavor aceptar los terminos y condiciones",
                type: "error"
            })
        }
    }
    //computed
    function apiStateFormLoading(){
        return this.status === 'loading';
    }
    //watch
    function statusEvents(){
        if(this.status === 'success'){
            this.$router.push('/perfil')
        }
    }
    export default {
        name: 'register',
        data,
        methods:{
            register
        },
        beforeDestroy(){
            this.authErrors.clear();
        },
        computed:{
            authErrors,
            apiStateFormLoading,
            ...mapState({
                status: state=> state.auth.status,
            })
        },
        watch:{
            statusEvents
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
    .v-input--selection-controls .v-input__slot>.v-label, .v-input--selection-controls .v-radio>.v-label {
        padding-bottom:0px;
        margin-bottom: 0px;
    }
</style>