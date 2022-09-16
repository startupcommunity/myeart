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

                    <div class="wrap-input100 validate-input" data-validate = "Enter username">
                        <input class="input100" type="text" name="username" placeholder='Nombre de usuario / Teléfono / Correo' />
                        <span class="focus-input100 user-input"></span>
                    </div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
                        <input class="input100" type="password" name="password" placeholder='Contraseña' />
                        <span class="focus-input100 password-input"></span>
                    </div>

                    <div class="container-login-form-btn">
						<button class="btn btn-primary login-form-btn">
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
    export default {
        name:'login'
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