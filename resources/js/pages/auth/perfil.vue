<template>
    <div class="home-login">
        <div class="wrap-login p-2 ">
            <div class="row" style="margin:0px;padding:0px;">
                <div class="col-12 d-none d-lg-flex justify-content-md-end">
                    <div class="login-form-logo d-flex justify-content-center" style="width: 544px;margin-right: 12rem;">
                        <img src="../../../../public/img/Logo_Myeart.svg" style="width: 50%;height: 180px;" alt="">
                    </div>
                </div>
                <div class="col-12 d-flex justify-content-md-end  justify-content-xs-center" style="margin:0px;padding:0px;"> 
                    <div class="container-login"  style="background: rgba(255, 255, 255, 0.05);">
                        <form class="login-form validate-form">
                            <div class="login-icon">
                                <router-link exact-active-class="active" to="/" style="color:#FFF">
                                    <i class="fas fa-arrow-left"></i>
                                </router-link>
                            </div>

                            <div class="login-form-logo">
                                <h1>Define tu usuario <b class="text-primary">Myeart</b></h1>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <label for="">Cual es tu perfil de usuario:</label>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div class="container-login-form-btn">
                                        <button class="btn btn-secundary register-form-btn">
                                            Usuario
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <div class="container-login-form-btn">
                                        <button class="btn btn-secundary register-form-btn">
                                            Artista
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12" style="text-align: end;">
                                    <label for="" style="border-bottom: 2px solid #FFF;">Definir en otro momento</label>
                                </div>
                            </div>
                            
                        </form>
                    </div> 
                    
                </div>
            </div>
           

            
           
            
        </div>
    </div>
</template>

<script>
    export default {
        name:'perfil'
    }
</script>