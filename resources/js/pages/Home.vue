<template>
    <div class="home-login">
        <div class="wrap-login p-2">
            <div class="container-login">
                <form class="login-form validate-form">
                    <div class="w-100 d-flex justify-content-center">
                        <img
                            src="./../../img/Logo_Myeart.svg"
                            class="img-fluid mb-12"
                            alt="Responsive image"
                        />
                    </div>
                    <div class="container-login-form-btn">
                        <router-link
                            exact-active-class="active"
                            to="/login"
                            class="btn btn-secundary register-form-btn"
                        >
                            Iniciar sesión
                        </router-link>
                    </div>

                    <div class="container-login-form-btn">
                        <router-link
                            to="/register"
                            class="btn btn-primary btn-block text-white btn-lg"
                        >
                            Regístrate
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
};
window.onload = function () {
    if(localStorage.getItem('act.x') == "1")
    sessionStorage.clear();
    localStorage.clear();
    localStorage.setItem('act.x',"1")
};
</script>
