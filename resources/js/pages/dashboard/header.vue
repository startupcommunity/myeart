<template>
    <div>
        <div class="d-flex align-items-center header-info">
            <div class="flex-grow-1 text-center text-dark">
                <img src="img/shipping.png" alt="" style="width: 42px;height: 42px;"/> <b>ENVÍOS GRATIS A TODO EL MUNDO</b>
            </div>
            <div class="text-end text-primary">
                <b style="padding-right:5px">ESPAÑOL</b>
            </div>
        </div>
        <!-- header -->
        <div class="top-header-area" id="sticker">
            <div id="mySidenav" class="sidenav">
                <div class="sidenav_header">
                    <button href="#" class="closebtn" v-on:click="closeNav()"><i class="fa-solid fa-arrow-left"></i></button>
                </div>
                <div class="sidenav_body">
                    <div class="w-100 d-flex justify-content-center">
                        <label style="border: 2px solid #B2794C;padding: 5px;border-radius: 50%;">
                            <v-avatar size="120">
                                <v-img
                                    :src="'./img/avatar.png'"
                                    :lazy-src="'./img/avatar.png'"
                                    @error="'URL ON ERROR'"
                                    width="118px"
                                    height="118px"
                                >
                                    <!-- ALSO, YOU CAN USE A LOADING ANIMATION -->
                                    <template v-slot:placeholder>  
                                        <v-progress-circular
                                            style="margin-top:40px"
                                            indeterminate
                                            color="custm_theme_6"
                                        ></v-progress-circular> 
                                    </template>
                                </v-img>
                            </v-avatar>
                        </label>
                    </div>
                    <span>Artista/Fotografia</span>
                    <a href="#">SUBIR OBRA <i class="fa-solid fa-arrow-up-from-bracket"></i></a>
                    <a href="#">OBRAS</a>
                    <a href="#">ARTISTAS</a>
                    <a href="#">EVENTOS</a>
                    <a href="#">MI COMUNIDAD</a>
                </div>
                <div class="sidenav_footer">
                    <a href="#" @click.prevent="logout">CERRAR SESIÓN</a>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-sm-12 text-center">
                        <div class="main-menu-wrap">
                            <div class="d-flex">
                                <div class="flex-fill d-block d-md-none d-lg-none">
                                    <div class="w-100 d-flex justify-content-center" style="height:100%;font-size: 20px;padding-top:10px;">
                                        <i class="fa-solid fa-bars" v-on:click="openNav()"></i>
                                    </div>
                                </div>
                                <div class="flex-fill d-flex justify-content-center">
                                    <!-- logo -->
                                    <div class="site-logo">
                                        <a href="index.html">
                                            <img src="/images/Logo_Myeart.svg" alt=""  >
                                        </a>
                                    </div>
                                </div>
                                <div class="flex-fill d-none d-md-block d-lg-block">
                                    <!-- menu start -->
                                    <nav class="main-menu">
                                        <ul style="text-align:left">
                                            <li class="current-list-item"><a href="#">OBRAS</a></li>
                                            <li><a href="about.html">ARTISTAS</a></li>
                                            <li><a href="news.html">EVENTOS</a></li>
                                            <li><a href="contact.html">MI COMUNIDAD</a>
                                                
                                            </li>
                                            <li>
                                                <ul>
                                                    <li class="menu-items-sub">
                                                        <div class="header-icons">
                                                            <a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-user" style="margin-right:5px;"></i> {{ perfilUsers.username }}</a>
                                                        </div>
                                                        <ul class="sub-menu">
                                                            <li><a href="#">Ver perfil</a></li>
                                                            <li><a href="#" @click.prevent="logout">Cerrar sesión</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <div class="header-icons">
                                                            <a class="shopping-cart" href="cart.html"><i class="fas fa-shopping-cart" style="margin-right:5px;"></i> 00.00</a>
                                                            <button class="btn btn-primary text-white" style="margin-right: 32px;">SUBIR OBRA</button>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="flex-fill d-block d-md-none d-lg-none">
                                    <div class="w-100 d-flex justify-content-center" style="height:100%;font-size: 20px;padding-top:10px;">
                                        <div class="flex-fill">
                                            <i class="fa-regular fa-user"></i>
                                        </div>
                                        <div class="flex-fill">
                                            <i class="fa-solid fa-cart-shopping"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- menu end -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- hero area -->
        <div class="hero-area hero-bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 offset-lg-2 text-center">
                        <div class="hero-text">
                            <div class="hero-text-tablecell">
                                <h2>El <span class="text-primary">arte</span> que todos llevamos dentro</h2>
                                <div class="hero-btns d-flex justify-content-center">
                                    <div class="input-group" style="width:80%">
                                        <input type="text" style="height:50px" class="form-control" aria-label="Text input with dropdown button">
                                        <div class="input-group-append">
                                            <button style="padding-left: 20px;padding-right: 20px;" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">OBRAS</button>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="#">Action</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container" style="padding-bottom:0px;">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 class="font-weight-bold text-dark heading">
                            ¿Aún no te decides?
                        </h2>
                        <span>Echa un vistazo a las últimas publicaciones...</span>
                    </div>
                </div>
            </div>
            <div class="container" style="padding-top:0px;">
                <div class="row">
                    <div class="col-12" style="padding-top:0px;">
                        <div class="property-slider-wrap">
                            <ul class="controls" id="customize-controls-publish" aria-label="Carousel Navigation" tabindex="0" style="color: #000000">
                                <li class="prev" data-controls="prev" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li class="next" data-controls="next" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-right"></i>          
                                </li>
                            </ul>
                            <div class="container" style="padding-left:30px;padding-right:40px;">
                                <div id="slider-publish" class="property-slider">
                                    <div class="property-item">
                                        <div class="card"  style="width: 27rem;border-radius:0px;border:0px;">
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7" style="padding-right: 5px;padding-left: 5px;">
                                                        <h6 style="margin-bottom:0px;"><b>Customer focused context sensitive encoding</b></h6>
                                                        <div class="d-flex flex-row">
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Arte Abstracto</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Pintura</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Óleo</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5" style="padding-right: 5px;padding-left: 5px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div class="flex-fill">
                                                                <img src="images/avatar.png" class="img-thumbnail" style="border: none;" />
                                                            </div>
                                                            <div class="flex-fill text-center" style="font-size: 14px">
                                                                Inés carraspo
                                                                <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" style="border-top: 1px solid #000000;">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill">
                                                                <h5>692.000,00 €</h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end" style="color:#CCCCCC;">
                                                                <h5><i class="fa-regular fa-bookmark" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-heart"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card"  style="width: 27rem;border-radius:0px;border:0px;">
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7" style="padding-right: 5px;padding-left: 5px;">
                                                        <h6 style="margin-bottom:0px;"><b>Customer focused context sensitive encoding</b></h6>
                                                        <div class="d-flex flex-row">
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Arte Abstracto</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Pintura</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Óleo</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5" style="padding-right: 5px;padding-left: 5px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div class="flex-fill">
                                                                <img src="images/avatar.png" class="img-thumbnail" style="border: none;" />
                                                            </div>
                                                            <div class="flex-fill text-center" style="font-size: 14px">
                                                                Inés carraspo
                                                                <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" style="border-top: 1px solid #000000;">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill">
                                                                <h5>692.000,00 €</h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end" style="color:#CCCCCC;">
                                                                <h5><i class="fa-regular fa-bookmark" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-heart"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card"  style="width: 27rem;border-radius:0px;border:0px;">
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7" style="padding-right: 5px;padding-left: 5px;">
                                                        <h6 style="margin-bottom:0px;"><b>Customer focused context sensitive encoding</b></h6>
                                                        <div class="d-flex flex-row">
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Arte Abstracto</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Pintura</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Óleo</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5" style="padding-right: 5px;padding-left: 5px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div class="flex-fill">
                                                                <img src="images/avatar.png" class="img-thumbnail" style="border: none;" />
                                                            </div>
                                                            <div class="flex-fill text-center" style="font-size: 14px">
                                                                Inés carraspo
                                                                <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" style="border-top: 1px solid #000000;">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill">
                                                                <h5>692.000,00 €</h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end" style="color:#CCCCCC;">
                                                                <h5><i class="fa-regular fa-bookmark" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-heart"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card"  style="width: 27rem;border-radius:0px;border:0px;">
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-7" style="padding-right: 5px;padding-left: 5px;">
                                                        <h6 style="margin-bottom:0px;"><b>Customer focused context sensitive encoding</b></h6>
                                                        <div class="d-flex flex-row">
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Arte Abstracto</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Pintura</a>
                                                            </div>
                                                            <div class="p-2">
                                                                <a href="#" class="text-primary">Óleo</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-5" style="padding-right: 5px;padding-left: 5px;">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <div class="flex-fill">
                                                                <img src="images/avatar.png" class="img-thumbnail" style="border: none;" />
                                                            </div>
                                                            <div class="flex-fill text-center" style="font-size: 14px">
                                                                Inés carraspo
                                                                <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12" style="border-top: 1px solid #000000;">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill">
                                                                <h5>692.000,00 €</h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end" style="color:#CCCCCC;">
                                                                <h5><i class="fa-regular fa-bookmark" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-heart"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="user-section">
            <div class="container" style="padding-bottom:0px;">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 class="font-weight-bold text-white heading">
                            Artistas que quizás te puedan interesar...
                        </h2>
                    </div>
                </div>
            </div>
            
            <div class="container" style="padding-top:0px;"> 
                <div class="row">
                    <div class="col-12"  style="padding-top:0px;">
                        <div class="property-slider-wrap">
                            <ul class="controls" id="customize-controls" aria-label="Carousel Navigation" tabindex="0">
                                <li class="prev" data-controls="prev" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li class="next" data-controls="next" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-right"></i>          
                                </li>
                            </ul>
                            <div class="container" style="padding-left:30px;padding-right:40px;">
                                <div id="slider-user" class="property-slider">
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card card-especial" style="width:238px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12 d-flex justify-content-center">
                                                        <img src="images/avatar_artista.png" class="img-thumbnail" style="border: none;" />
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <h5 class="text-black mb-0">Inés Alfonzo</h5>
                                                        <span class="text-primary">Pintora</span>
                                                        <p class="text-black" style="font-style:italic;">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et elementum nisl. Maecenas accumsan...”</p>
                                                    </div>
                                                    <div class="col-md-12 text-center">
                                                        <button class="btn btn-primary btn-block btn-sm">SEGUIR</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container" style="padding-bottom:0px;">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 class="font-weight-bold text-black heading">
                            Mi comunidad
                        </h2>
                    </div>
                </div>
            </div>
            <div class="container" style="padding-top:0px;"> 
                <div class="row">
                    <div class="col-12" style="padding-top:0px;">
                        <div class="property-slider-wrap">
                            <ul class="controls" id="customize-controls-comunidad" aria-label="Carousel Navigation" tabindex="0" style="color:#000000;">
                                <li class="prev" data-controls="prev" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li class="next" data-controls="next" aria-controls="customize" tabindex="-1">
                                    <i class="fas fa-angle-right"></i>          
                                </li>
                            </ul>
                            <div class="container" style="padding-left:30px;padding-right:40px;">
                                <div id="slider-comunidad" class="property-slider">
                                    <div class="property-item">
                                        <div class="card" style="max-width: 30rem;border-radius:0px;border:0px;">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <img src="images/avatar.png" class="img-thumbnail" style="border: none;width: 56px;height: 56px;" />
                                                </div>
                                                <div>
                                                    <h6 style="margin-bottom:0px;">Inés carraspo</h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;height: 300px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill d-flex justify-content-start">
                                                                <h5><i class="fa-regular fa-heart" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-comment" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-paper-plane"></i></h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end">
                                                                <h5><i class="fa-regular fa-bookmark"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">Arte forma de expresión</h5>
                                                        <p class="text-black">Conjunto de obras que resultan de esta actividad, así como las diferentes tendencias o estilos de las mismas</p>
                                                        <p class="text-primary">#Arte #Artistas_Plastico #Arte_es_poder</p>
                                                        <span style="color:#CCCCCC">10 comentarios</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card" style="max-width: 30rem;border-radius:0px;border:0px;">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <img src="images/avatar.png" class="img-thumbnail" style="border: none;width: 56px;height: 56px;" />
                                                </div>
                                                <div>
                                                    <h6 style="margin-bottom:0px;">Inés carraspo</h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;height: 300px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill d-flex justify-content-start">
                                                                <h5><i class="fa-regular fa-heart" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-comment" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-paper-plane"></i></h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end">
                                                                <h5><i class="fa-regular fa-bookmark"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">Arte forma de expresión</h5>
                                                        <p class="text-black">Conjunto de obras que resultan de esta actividad, así como las diferentes tendencias o estilos de las mismas</p>
                                                        <p class="text-primary">#Arte #Artistas_Plastico #Arte_es_poder</p>
                                                        <span style="color:#CCCCCC">10 comentarios</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div class="card" style="max-width: 30rem;border-radius:0px;border:0px;">
                                            <div class="d-flex align-items-center">
                                                <div>
                                                    <img src="images/avatar.png" class="img-thumbnail" style="border: none;width: 56px;height: 56px;" />
                                                </div>
                                                <div>
                                                    <h6 style="margin-bottom:0px;">Inés carraspo</h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img src="images/img_2.png" class="card-img-top" style="border-radius:0px;height: 300px;">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-flex align-items-center">
                                                            <div class="flex-fill d-flex justify-content-start">
                                                                <h5><i class="fa-regular fa-heart" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-comment" style="margin-right:10px;"></i></h5>
                                                                <h5><i class="fa-regular fa-paper-plane"></i></h5>
                                                            </div>
                                                            <div class="flex-fill d-flex justify-content-end">
                                                                <h5><i class="fa-regular fa-bookmark"></i></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">Arte forma de expresión</h5>
                                                        <p class="text-black">Conjunto de obras que resultan de esta actividad, así como las diferentes tendencias o estilos de las mismas</p>
                                                        <p class="text-primary">#Arte #Artistas_Plastico #Arte_es_poder</p>
                                                        <span style="color:#CCCCCC">10 comentarios</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-dark btn-lg">
                            VER MAS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container"  style="padding-bottom:0px">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h2 class="font-weight-bold text-black heading">
                            Últimas noticias en el mundo del arte...
                        </h2>
                    </div>
                </div>
            </div>
            <div class="container" style="padding-top:0px">
                <div class="row" style="padding-top:0px">
                    <div class="col-sm-6 col-lg-6" style="padding-left:5px;padding-right:5px;"> 
                        <div class="card" style="border:0px;">
                            <div class="card-body">
                                <div class="row">
                                    <div style="background-image: url('/images/ultima_informacion.png')" class="col-md-12 ultima-info" >
                                        <div class="d-flex justify-content-end" style="height: 20%;">
                                            <h6 style="color:#CCCCCC;">
                                                <i class="fa-regular fa-heart" style="margin-right:10px;"></i>
                                            </h6>
                                            <h6 style="color:#CCCCCC;">
                                                <i class="fa-regular fa-bookmark" style="margin-right:10px;"></i>
                                            </h6>
                                        </div>
                                        <div class="d-flex align-items-end" style="height: 80%;">
                                            <h5 class="text-white">TENDENCIAS EN LA ESCULTURA EN EL 2022</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas auctor, lectus nec ornare rutrum, magna risus lacinia risus, nec tempus eros magna et erat. Pellentesque molestie arcu turpis, eu consequat enim auctor vel. Nullam eget lacus libero. Quisque sit amet venenatis sapien, tempor posuere ligula. Mauris convallis lorem vitae nunc varius aliquet. Donec neque justo, varius a lacus euismod, aliquet pellentesque sapien. Vivamus pulvinar nisl vel orci placerat vehicula. Nam velit quam, elementum eget viverra in, rhoncus vitae magna... 
                                            <span class="text-primary">Seguir leyendo</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-6" style="padding-left:5px;padding-right:5px;"> 
                        <div class="card" style="border:0px;">
                            <div class="card-body">
                                <div class="row">
                                    <div style="background-image: url('/images/ultima_informacion.png')" class="col-md-12 ultima-info" >
                                        <div class="d-flex justify-content-end" style="height: 20%;">
                                            <h6 style="color:#CCCCCC;">
                                                <i class="fa-regular fa-heart" style="margin-right:10px;"></i>
                                            </h6>
                                            <h6 style="color:#CCCCCC;">
                                                <i class="fa-regular fa-bookmark" style="margin-right:10px;"></i>
                                            </h6>
                                        </div>
                                        <div class="d-flex align-items-end" style="height: 80%;">
                                            <h5 class="text-white">TENDENCIAS EN LA ESCULTURA EN EL 2022</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas auctor, lectus nec ornare rutrum, magna risus lacinia risus, nec tempus eros magna et erat. Pellentesque molestie arcu turpis, eu consequat enim auctor vel. Nullam eget lacus libero. Quisque sit amet venenatis sapien, tempor posuere ligula. Mauris convallis lorem vitae nunc varius aliquet. Donec neque justo, varius a lacus euismod, aliquet pellentesque sapien. Vivamus pulvinar nisl vel orci placerat vehicula. Nam velit quam, elementum eget viverra in, rhoncus vitae magna... 
                                            <span class="text-primary">Seguir leyendo</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button class="btn btn-dark btn-lg">
                            VER MAS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-section">
            <div class="container text-center">
                <h2 style="font-size: 48px;">El newsletter para grandes artistas</h2>
                <div class="hero-btns d-flex justify-content-center">
                    <div class="input-group">
                        <input type="text" style="height:60px;border-radius:0px;opacity: 0.5;" class="form-control" aria-label="Text input with dropdown button">
                        <div class="input-group-append">
                            <button style="padding-left: 20px;padding-right: 20px;" class="btn btn-dark " type="button">SUSCRÍBETE</button>
                        </div>
                    </div>
                </div>
                <h5 style="margin-top:20px;">100% arte, 0% spam, lo prometemos.</h5>
            </div>
        </div>
        <div class="section-dark">
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="col-lg-3 col-sm-12 col-xs-12">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="images/icon/shiel1.png" class="img-thumbnail" style="border: none;margin-bottom: 20px;background: transparent;" />
                        </div>
                        <h6 class="text-white text-center">PAGO SEGURO</h6>
                        <h6 class="text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                    </div>
                    <div class="col-lg-3 text-center col-sm-12 col-xs-12">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="images/icon/shiel2.png" class="img-thumbnail" style="border: none;margin-bottom: 20px;background: transparent;" />
                        </div>
                        <h6 class="text-white text-center">ARTISTAS VERIFICADOS</h6>
                        <h6 class="text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                    </div>
                    <div class="col-lg-3 col-sm-12 col-xs-12">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="images/icon/pintaje.png" class="img-thumbnail" style="border: none;margin-bottom: 20px;background: transparent;" />
                        </div>
                        <h6 class="text-white text-center">OBRAS ORIGINALES</h6>
                        <h6 class="text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                    </div>
                    <div class="col-lg-3 col-sm-12 col-xs-12">
                        <div class="w-100 d-flex justify-content-center">
                            <img src="images/icon/music.png" class="img-thumbnail" style="border: none;margin-bottom: 20px;background: transparent;" />
                        </div>
                        <h6 class="text-white text-center">SOPORTE 24 HORAS</h6>
                        <h6 class="text-white text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer Start -->
        <div class="container-fluid bg-white text-dark footer pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div class="d-flex justify-content-center">
                <div class="row g-5  justify-content-md-center">
                    <div class="col-lg-2 col-md-6 col-sm-12 center-mobile">
                        <img src="/images/myHeartBlack.png" alt="" style="width: 220px;" >
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12 center-mobile">
                        <h5 class="text-dark mb-2">AYUDA NOSOTROS</h5>
                        <p style="margin-bottom:1px;">Quienes</p>
                        <p style="margin-bottom:1px;">Somos</p>
                        <p style="margin-bottom:1px;">Pregunta Frecuentes</p>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12 center-mobile">
                        <h5 class="text-dark mb-2">POLÍTICAS</h5>
                        <p style="margin-bottom:1px;">Politicas de Envio</p>
                        <p style="margin-bottom:1px;">Politicas de Privacidad</p>
                        <p style="margin-bottom:1px;">Terminos y Condiciones</p>
                        <p style="margin-bottom:1px;">Soporte</p>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-12 center-mobile">
                        <h5 class="text-dark mb-2">CONTACTO</h5>
                        <p style="margin-bottom:1px;">Call Us: 344-755-111</p>
                        <p style="margin-bottom:1px;">support@aazztech.com</p>
                    </div>
                    <div class="col-lg-2 col-md-6 d-flex align-items-center">
                        <div class="row">
                            <div class="col" style="padding-left:2px;padding-right: 2px;">
                                <img src="images/icon-comerce/VisaClassic.png" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col" style="padding-left:2px;padding-right: 2px;">
                                <img src="images/icon-comerce/MastercardFull.png" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col" style="padding-left:2px;padding-right: 2px;">
                                <img src="images/icon-comerce/Paypal.png" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col" style="padding-left:2px;padding-right: 2px;">
                                <img src="images/icon-comerce/StorePay.png" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col" style="padding-left:2px;padding-right: 2px;">
                                <img src="images/icon-comerce/GooglePay.png" class="img-fluid" alt="Responsive image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { tns } from "tiny-slider/src/tiny-slider";

    function mounted(){
        var slider1 = tns({
            container: '#slider-user',
            mode: 'carousel',
            speed: 700,
            gutter: 30,
            items: 3,
            autoplay: true,
            mouseDrag: true,
            autoplayButtonOutput: false,
            controlsContainer: "#customize-controls",
            responsive: {
                0: {
                    items: 1
                },
                700: {
                    items: 2
                },
                900: {
                    items: 4
                }
            }
        });

        var slider2 = tns({
            container: '#slider-publish',
            mode: 'carousel',
            speed: 700,
            gutter: 30,
            items: 3,
            autoplay: true,
            mouseDrag: true,
            autoplayButtonOutput: false,
            center: true,
            controlsContainer: "#customize-controls-publish",
            responsive: {
                0: {
                    items: 1
                },
                700: {
                    items: 2
                },
            }
        });

        var slider3 = tns({
            container: '#slider-comunidad',
            mode: 'carousel',
            speed: 700,
            gutter: 30,
            items: 3,
            autoplay: true,
            mouseDrag: true,
            autoplayButtonOutput: false,
            controlsContainer: "#customize-controls-comunidad",
            responsive: {
                0: {
                    items: 1
                },
                700: {
                    items: 2
                }
            }
        });
    }

    function perfilUsers() {
        return this.$store.getters.getProfile;
    }

    function logout() {
        this.$store.dispatch('authLogout')
        .then(() => {
            this.$router.push('/home')
        })
    }
    export default {
        name:'app-header',
        mounted,
        methods:{
            logout,
            openNav(){
                document.getElementById("mySidenav").style.display = "block";
                document.getElementById("mySidenav").style.width = "80%";
            },
            closeNav(){
                document.getElementById("mySidenav").style.display = "none";
                document.getElementById("mySidenav").style.width = "0";
            }
        },
        computed:{
            perfilUsers,
        }
    }
</script>