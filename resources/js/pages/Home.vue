<template>
    <div class="home-login">
        <div class="wrap-login p-2 ">
            <div class="container-login">
                <form class="login-form validate-form">
					<div class="login-form-logo">
						<div class="img-logo"></div>
                    </div>

                    <div class="container-login-form-btn">
                        <router-link exact-active-class="active" to="/login" class="btn btn-secundary register-form-btn">Iniciar sesión</router-link>
					</div>

                    <div class="container-login-form-btn">
						<router-link to="/register"  class="btn btn-primary login-form-btn">
							Registrate
                        </router-link>
					</div>
                </form>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name:'home'
    }
</script>