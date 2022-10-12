<template>
    <div>
        <loading-overlay
            :active="apiStateFormLoading"
            :is-full-page="true"
            loader="bars"
        />

        <!-- pre-header -->
        <PreHeader />
        <!-- /pre-header -->

        <!-- header -->
        <Header />
        <!-- /header -->

        <!-- hero area -->
        <div class="h-[30rem] sm:h-[48rem] relative z-[1] hero-area hero-bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 offset-lg-2 text-center">
                        <div class="hero-text">
                            <div class="hero-text-tablecell">
                                <h1 class="text-white lg:text-2xl">
                                    El
                                    <span class="text-primary">arte</span> que
                                    todos llevamos dentro
                                </h1>
                                <div
                                    class="hero-btns d-flex justify-content-center"
                                >
                                    <div class="input-group" style="width: 80%">
                                        <input
                                            type="text"
                                            style="height: 50px"
                                            class="form-control"
                                            aria-label="Text input with dropdown button"
                                        />
                                        <div class="input-group-append">
                                            <button
                                                class="btn btn-primary px-5 dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                OBRAS
                                            </button>
                                            <div class="dropdown-menu">
                                                <a
                                                    class="dropdown-item"
                                                    href="#"
                                                >
                                                    Action
                                                </a>
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

        <!-- ¿Aún no te decides?  -->
        <div class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-12 sm:text-start">
                        <h2
                            class="font-extrabold text-gray-900 text-lg lg:text-3xl xl:text-4xl"
                        >
                            ¿Aún no te decides?
                        </h2>
                        <p class="py-2 text-sm sm:text-base">
                            Echa un vistazo a las últimas publicaciones...
                        </p>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="property-slider-wrap sm:px-4">
                            <ul
                                class="controls text-dark"
                                id="customize-controls-publish"
                                aria-label="Carousel Navigation"
                                tabindex="0"
                            >
                                <li
                                    class="prev"
                                    data-controls="prev"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li
                                    class="next"
                                    data-controls="next"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-right"></i>
                                </li>
                            </ul>
                            <div class="container px-10">
                                <div
                                    id="slider-publish"
                                    class="property-slider"
                                >
                                    <div class="property-item">
                                        <div
                                            class="card border-0 w-full sm:max-w-xl"
                                        >
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top border-0 rounded-none"
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-7"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <h6
                                                            style="
                                                                margin-bottom: 0px;
                                                            "
                                                        >
                                                            <b>
                                                                Customer focused
                                                                context
                                                                sensitive
                                                                encoding
                                                            </b>
                                                        </h6>
                                                        <div
                                                            class="d-flex flex-row"
                                                        >
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Arte
                                                                    Abstracto</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Pintura</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Óleo</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-5"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <div
                                                            class="d-flex justify-content-center align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <img
                                                                    src="/images/avatar.png"
                                                                    class="img-thumbnail"
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex-fill text-center text-sm text-nowrap"
                                                            >
                                                                Inés Alfonso
                                                                <button
                                                                    class="btn btn-primary btn-block btn-sm"
                                                                >
                                                                    SEGUIR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-12 border-t-2 border-gray-800"
                                                    >
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <h5>
                                                                    692.000,00 €
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end gap-3 text-gray-400"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card border-0 w-full sm:max-w-xl"
                                        >
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top border-0 rounded-none"
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-7"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <h6
                                                            style="
                                                                margin-bottom: 0px;
                                                            "
                                                        >
                                                            <b>
                                                                Customer focused
                                                                context
                                                                sensitive
                                                                encoding
                                                            </b>
                                                        </h6>
                                                        <div
                                                            class="d-flex flex-row"
                                                        >
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Arte
                                                                    Abstracto</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Pintura</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Óleo</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-5"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <div
                                                            class="d-flex justify-content-center align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <img
                                                                    src="/images/avatar.png"
                                                                    class="img-thumbnail"
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex-fill text-center text-sm text-nowrap"
                                                            >
                                                                Inés Alfonso
                                                                <button
                                                                    class="btn btn-primary btn-block btn-sm"
                                                                >
                                                                    SEGUIR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-12 border-t-2 border-gray-800"
                                                    >
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <h5>
                                                                    692.000,00 €
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end gap-3 text-gray-400"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card border-0 w-full sm:max-w-xl"
                                        >
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top border-0 rounded-none"
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-7"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <h6
                                                            style="
                                                                margin-bottom: 0px;
                                                            "
                                                        >
                                                            <b>
                                                                Customer focused
                                                                context
                                                                sensitive
                                                                encoding
                                                            </b>
                                                        </h6>
                                                        <div
                                                            class="d-flex flex-row"
                                                        >
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Arte
                                                                    Abstracto</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Pintura</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Óleo</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-5"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <div
                                                            class="d-flex justify-content-center align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <img
                                                                    src="/images/avatar.png"
                                                                    class="img-thumbnail"
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex-fill text-center text-sm text-nowrap"
                                                            >
                                                                Inés Alfonso
                                                                <button
                                                                    class="btn btn-primary btn-block btn-sm"
                                                                >
                                                                    SEGUIR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-12 border-t-2 border-gray-800"
                                                    >
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <h5>
                                                                    692.000,00 €
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end gap-3 text-gray-400"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card border-0 w-full sm:max-w-xl"
                                        >
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top border-0 rounded-none"
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-7"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <h6
                                                            style="
                                                                margin-bottom: 0px;
                                                            "
                                                        >
                                                            <b>
                                                                Customer focused
                                                                context
                                                                sensitive
                                                                encoding
                                                            </b>
                                                        </h6>
                                                        <div
                                                            class="d-flex flex-row"
                                                        >
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Arte
                                                                    Abstracto</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Pintura</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Óleo</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-5"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <div
                                                            class="d-flex justify-content-center align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <img
                                                                    src="/images/avatar.png"
                                                                    class="img-thumbnail"
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex-fill text-center text-sm text-nowrap"
                                                            >
                                                                Inés Alfonso
                                                                <button
                                                                    class="btn btn-primary btn-block btn-sm"
                                                                >
                                                                    SEGUIR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-12 border-t-2 border-gray-800"
                                                    >
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <h5>
                                                                    692.000,00 €
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end gap-3 text-gray-400"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card border-0 w-full sm:max-w-xl"
                                        >
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top border-0 rounded-none"
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-7"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <h6
                                                            style="
                                                                margin-bottom: 0px;
                                                            "
                                                        >
                                                            <b>
                                                                Customer focused
                                                                context
                                                                sensitive
                                                                encoding
                                                            </b>
                                                        </h6>
                                                        <div
                                                            class="d-flex flex-row"
                                                        >
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Arte
                                                                    Abstracto</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Pintura</a
                                                                >
                                                            </div>
                                                            <div class="p-2">
                                                                <a
                                                                    href="#"
                                                                    class="text-primary"
                                                                    >Óleo</a
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-5"
                                                        style="
                                                            padding-right: 5px;
                                                            padding-left: 5px;
                                                        "
                                                    >
                                                        <div
                                                            class="d-flex justify-content-center align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <img
                                                                    src="/images/avatar.png"
                                                                    class="img-thumbnail"
                                                                />
                                                            </div>
                                                            <div
                                                                class="flex-fill text-center text-sm text-nowrap"
                                                            >
                                                                Inés Alfonso
                                                                <button
                                                                    class="btn btn-primary btn-block btn-sm"
                                                                >
                                                                    SEGUIR
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-md-12 border-t-2 border-gray-800"
                                                    >
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill"
                                                            >
                                                                <h5>
                                                                    692.000,00 €
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end gap-3 text-gray-400"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                    ></i>
                                                                </h5>
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

        <!-- Artistas que quizás te puedan interesar -->
        <div class="user-section">
            <div class="container" style="padding-bottom: 0px">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <h2
                            class="font-extrabold text-white text-lg lg:text-3xl xl:text-4xl mb-6"
                        >
                            Artistas que quizás te puedan interesar...
                        </h2>
                    </div>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="property-slider-wrap">
                            <ul
                                class="controls"
                                id="customize-controls"
                                aria-label="Carousel Navigation"
                                tabindex="0"
                            >
                                <li
                                    class="prev"
                                    data-controls="prev"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li
                                    class="next"
                                    data-controls="next"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-right"></i>
                                </li>
                            </ul>
                            <div
                                class="container"
                                style="padding-left: 30px; padding-right: 40px"
                            >
                                <div id="slider-user" class="property-slider">
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card card-especial"
                                            style="width: 238px"
                                        >
                                            <div class="card-body">
                                                <div class="row">
                                                    <div
                                                        class="col-md-12 d-flex justify-content-center"
                                                    >
                                                        <img
                                                            src="images/avatar_artista.png"
                                                            class="img-thumbnail"
                                                            style="border: none"
                                                        />
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <h5
                                                            class="text-black mb-0"
                                                        >
                                                            Inés Alfonzo
                                                        </h5>
                                                        <span
                                                            class="text-primary"
                                                            >Pintora</span
                                                        >
                                                        <p
                                                            class="text-black"
                                                            style="
                                                                font-style: italic;
                                                            "
                                                        >
                                                            “Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipiscing elit.
                                                            Nulla et elementum
                                                            nisl. Maecenas
                                                            accumsan...”
                                                        </p>
                                                    </div>
                                                    <div
                                                        class="col-md-12 text-center"
                                                    >
                                                        <button
                                                            class="btn btn-primary btn-block btn-sm"
                                                        >
                                                            SEGUIR
                                                        </button>
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

        <!-- Mi comunidad  -->
        <div class="section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <h2
                            class="font-extrabold text-gray-900 text-lg lg:text-3xl xl:text-4xl mb-6"
                        >
                            Mi comunidad
                        </h2>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="property-slider-wrap">
                            <ul
                                class="controls"
                                id="customize-controls-comunidad"
                                aria-label="Carousel Navigation"
                                tabindex="0"
                                style="color: #000000"
                            >
                                <li
                                    class="prev"
                                    data-controls="prev"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-left"></i>
                                </li>
                                <li
                                    class="next"
                                    data-controls="next"
                                    aria-controls="customize"
                                    tabindex="-1"
                                >
                                    <i class="fas fa-angle-right"></i>
                                </li>
                            </ul>
                            <div
                                class="container"
                                style="padding-left: 30px; padding-right: 40px"
                            >
                                <div
                                    id="slider-comunidad"
                                    class="property-slider"
                                >
                                    <div class="property-item">
                                        <div
                                            class="card"
                                            style="
                                                max-width: 30rem;
                                                border-radius: 0px;
                                                border: 0px;
                                            "
                                        >
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                <div>
                                                    <img
                                                        src="images/avatar.png"
                                                        class="img-thumbnail"
                                                        style="
                                                            border: none;
                                                            width: 56px;
                                                            height: 56px;
                                                        "
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        style="
                                                            margin-bottom: 0px;
                                                        "
                                                    >
                                                        Inés carraspo
                                                    </h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top"
                                                style="
                                                    border-radius: 0px;
                                                    height: 300px;
                                                "
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill d-flex justify-content-start"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-comment"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-paper-plane"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">
                                                            Arte forma de
                                                            expresión
                                                        </h5>
                                                        <p class="text-black">
                                                            Conjunto de obras
                                                            que resultan de esta
                                                            actividad, así como
                                                            las diferentes
                                                            tendencias o estilos
                                                            de las mismas
                                                        </p>
                                                        <p class="text-primary">
                                                            #Arte
                                                            #Artistas_Plastico
                                                            #Arte_es_poder
                                                        </p>
                                                        <span
                                                            style="
                                                                color: #cccccc;
                                                            "
                                                            >10
                                                            comentarios</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card"
                                            style="
                                                max-width: 30rem;
                                                border-radius: 0px;
                                                border: 0px;
                                            "
                                        >
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                <div>
                                                    <img
                                                        src="images/avatar.png"
                                                        class="img-thumbnail"
                                                        style="
                                                            border: none;
                                                            width: 56px;
                                                            height: 56px;
                                                        "
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        style="
                                                            margin-bottom: 0px;
                                                        "
                                                    >
                                                        Inés carraspo
                                                    </h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top"
                                                style="
                                                    border-radius: 0px;
                                                    height: 300px;
                                                "
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill d-flex justify-content-start"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-comment"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-paper-plane"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">
                                                            Arte forma de
                                                            expresión
                                                        </h5>
                                                        <p class="text-black">
                                                            Conjunto de obras
                                                            que resultan de esta
                                                            actividad, así como
                                                            las diferentes
                                                            tendencias o estilos
                                                            de las mismas
                                                        </p>
                                                        <p class="text-primary">
                                                            #Arte
                                                            #Artistas_Plastico
                                                            #Arte_es_poder
                                                        </p>
                                                        <span
                                                            style="
                                                                color: #cccccc;
                                                            "
                                                            >10
                                                            comentarios</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="property-item">
                                        <div
                                            class="card"
                                            style="
                                                max-width: 30rem;
                                                border-radius: 0px;
                                                border: 0px;
                                            "
                                        >
                                            <div
                                                class="d-flex align-items-center"
                                            >
                                                <div>
                                                    <img
                                                        src="images/avatar.png"
                                                        class="img-thumbnail"
                                                        style="
                                                            border: none;
                                                            width: 56px;
                                                            height: 56px;
                                                        "
                                                    />
                                                </div>
                                                <div>
                                                    <h6
                                                        style="
                                                            margin-bottom: 0px;
                                                        "
                                                    >
                                                        Inés carraspo
                                                    </h6>
                                                    <span>Museo MOMA</span>
                                                </div>
                                            </div>
                                            <img
                                                src="images/img_2.png"
                                                class="card-img-top"
                                                style="
                                                    border-radius: 0px;
                                                    height: 300px;
                                                "
                                            />
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div
                                                            class="d-flex align-items-center"
                                                        >
                                                            <div
                                                                class="flex-fill d-flex justify-content-start"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-heart"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-comment"
                                                                        style="
                                                                            margin-right: 10px;
                                                                        "
                                                                    ></i>
                                                                </h5>
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-paper-plane"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                            <div
                                                                class="flex-fill d-flex justify-content-end"
                                                            >
                                                                <h5>
                                                                    <i
                                                                        class="fa-regular fa-bookmark"
                                                                    ></i>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <h5 class="text-black">
                                                            Arte forma de
                                                            expresión
                                                        </h5>
                                                        <p class="text-black">
                                                            Conjunto de obras
                                                            que resultan de esta
                                                            actividad, así como
                                                            las diferentes
                                                            tendencias o estilos
                                                            de las mismas
                                                        </p>
                                                        <p class="text-primary">
                                                            #Arte
                                                            #Artistas_Plastico
                                                            #Arte_es_poder
                                                        </p>
                                                        <span
                                                            style="
                                                                color: #cccccc;
                                                            "
                                                            >10
                                                            comentarios</span
                                                        >
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
                        <button
                            class="bg-gray-700 text-gray-100 py-4 px-7 rounded-lg hover:animate-shadow-and-color-app"
                        >
                            VER MAS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container border-t border-gray-700 mb-4"></div>

        <!-- Últimas noticias en el mundo del arte -->
        <div class="pb-12">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-12">
                        <h2
                            class="font-extrabold text-gray-900 text-lg lg:text-3xl xl:text-4xl mb-6"
                        >
                            Últimas noticias en el mundo del arte...
                        </h2>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row align-items-stretch">
                    <div class="col-sm-6 col-lg-4">
                        <div class="card border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div
                                        style="
                                            background-image: url('/images/ultima_informacion.png');
                                        "
                                        class="col-md-12 ultima-info"
                                    >
                                        <div
                                            class="d-flex justify-content-end"
                                            style="height: 20%"
                                        >
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-heart"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-bookmark"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                        </div>
                                        <div
                                            class="d-flex align-items-end"
                                            style="height: 80%"
                                        >
                                            <h5 class="text-white">
                                                TENDENCIAS EN LA ESCULTURA EN EL
                                                2022
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas auctor, lectus nec ornare
                                            rutrum, magna risus lacinia risus,
                                            nec tempus eros magna et erat.
                                            Pellentesque molestie arcu turpis,
                                            eu consequat enim auctor vel. Nullam
                                            eget lacus libero. Quisque sit amet
                                            venenatis sapien, tempor posuere
                                            ligula. Mauris convallis lorem vitae
                                            nunc varius aliquet. Donec neque
                                            justo, varius a lacus euismod,
                                            aliquet pellentesque sapien. Vivamus
                                            pulvinar nisl vel orci placerat
                                            vehicula. Nam velit quam, elementum
                                            eget viverra in, rhoncus vitae
                                            magna...
                                            <span class="text-primary"
                                                >Seguir leyendo</span
                                            >
                                        </p>
                                    </div>
                                    <div class="col-md-12 text-xs sm:text-lg">
                                        <div
                                            class="flex flex-wrap justify-between items-center"
                                        >
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <img
                                                    src="/images/avatar.png"
                                                    class="img-thumbnail border-0"
                                                />
                                                <div class="mt-3">
                                                    <p
                                                        class="font-bold text-gray-900"
                                                    >
                                                        Ana Maria Simon
                                                        <br>
                                                        <span class="text-primary">
                                                            Escultora
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="text-gray-400 flex flex-col justify-end text-right -space-y-4">
                                                <p>25 de mayo 2022</p>
                                                <p>Madrid, España</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="card border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div
                                        style="
                                            background-image: url('/images/ultima_informacion.png');
                                        "
                                        class="col-md-12 ultima-info"
                                    >
                                        <div
                                            class="d-flex justify-content-end"
                                            style="height: 20%"
                                        >
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-heart"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-bookmark"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                        </div>
                                        <div
                                            class="d-flex align-items-end"
                                            style="height: 80%"
                                        >
                                            <h5 class="text-white">
                                                TENDENCIAS EN LA ESCULTURA EN EL
                                                2022
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas auctor, lectus nec ornare
                                            rutrum, magna risus lacinia risus,
                                            nec tempus eros magna et erat.
                                            Pellentesque molestie arcu turpis,
                                            eu consequat enim auctor vel. Nullam
                                            eget lacus libero. Quisque sit amet
                                            venenatis sapien, tempor posuere
                                            ligula. Mauris convallis lorem vitae
                                            nunc varius aliquet. Donec neque
                                            justo, varius a lacus euismod,
                                            aliquet pellentesque sapien. Vivamus
                                            pulvinar nisl vel orci placerat
                                            vehicula. Nam velit quam, elementum
                                            eget viverra in, rhoncus vitae
                                            magna...
                                            <span class="text-primary"
                                                >Seguir leyendo</span
                                            >
                                        </p>
                                    </div>
                                    <div class="col-md-12 text-xs sm:text-lg">
                                        <div
                                            class="flex flex-wrap justify-between items-center"
                                        >
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <img
                                                    src="/images/avatar.png"
                                                    class="img-thumbnail border-0"
                                                />
                                                <div class="mt-3">
                                                    <p
                                                        class="font-bold text-gray-900"
                                                    >
                                                        Ana Maria Simon
                                                        <br>
                                                        <span class="text-primary">
                                                            Escultora
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="text-gray-400 flex flex-col justify-end text-right -space-y-4">
                                                <p>25 de mayo 2022</p>
                                                <p>Madrid, España</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="card border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div
                                        style="
                                            background-image: url('/images/ultima_informacion.png');
                                        "
                                        class="col-md-12 ultima-info"
                                    >
                                        <div
                                            class="d-flex justify-content-end"
                                            style="height: 20%"
                                        >
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-heart"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-bookmark"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                        </div>
                                        <div
                                            class="d-flex align-items-end"
                                            style="height: 80%"
                                        >
                                            <h5 class="text-white">
                                                TENDENCIAS EN LA ESCULTURA EN EL
                                                2022
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas auctor, lectus nec ornare
                                            rutrum, magna risus lacinia risus,
                                            nec tempus eros magna et erat.
                                            Pellentesque molestie arcu turpis,
                                            eu consequat enim auctor vel. Nullam
                                            eget lacus libero. Quisque sit amet
                                            venenatis sapien, tempor posuere
                                            ligula. Mauris convallis lorem vitae
                                            nunc varius aliquet. Donec neque
                                            justo, varius a lacus euismod,
                                            aliquet pellentesque sapien. Vivamus
                                            pulvinar nisl vel orci placerat
                                            vehicula. Nam velit quam, elementum
                                            eget viverra in, rhoncus vitae
                                            magna...
                                            <span class="text-primary"
                                                >Seguir leyendo</span
                                            >
                                        </p>
                                    </div>
                                    <div class="col-md-12 text-xs sm:text-lg">
                                        <div
                                            class="flex flex-wrap justify-between items-center"
                                        >
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <img
                                                    src="/images/avatar.png"
                                                    class="img-thumbnail border-0"
                                                />
                                                <div class="mt-3">
                                                    <p
                                                        class="font-bold text-gray-900"
                                                    >
                                                        Ana Maria Simon
                                                        <br>
                                                        <span class="text-primary">
                                                            Escultora
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="text-gray-400 flex flex-col justify-end text-right -space-y-4">
                                                <p>25 de mayo 2022</p>
                                                <p>Madrid, España</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="card border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div
                                        style="
                                            background-image: url('/images/ultima_informacion.png');
                                        "
                                        class="col-md-12 ultima-info"
                                    >
                                        <div
                                            class="d-flex justify-content-end"
                                            style="height: 20%"
                                        >
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-heart"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-bookmark"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                        </div>
                                        <div
                                            class="d-flex align-items-end"
                                            style="height: 80%"
                                        >
                                            <h5 class="text-white">
                                                TENDENCIAS EN LA ESCULTURA EN EL
                                                2022
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas auctor, lectus nec ornare
                                            rutrum, magna risus lacinia risus,
                                            nec tempus eros magna et erat.
                                            Pellentesque molestie arcu turpis,
                                            eu consequat enim auctor vel. Nullam
                                            eget lacus libero. Quisque sit amet
                                            venenatis sapien, tempor posuere
                                            ligula. Mauris convallis lorem vitae
                                            nunc varius aliquet. Donec neque
                                            justo, varius a lacus euismod,
                                            aliquet pellentesque sapien. Vivamus
                                            pulvinar nisl vel orci placerat
                                            vehicula. Nam velit quam, elementum
                                            eget viverra in, rhoncus vitae
                                            magna...
                                            <span class="text-primary"
                                                >Seguir leyendo</span
                                            >
                                        </p>
                                    </div>
                                    <div class="col-md-12 text-xs sm:text-lg">
                                        <div
                                            class="flex flex-wrap justify-between items-center"
                                        >
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <img
                                                    src="/images/avatar.png"
                                                    class="img-thumbnail border-0"
                                                />
                                                <div class="mt-3">
                                                    <p
                                                        class="font-bold text-gray-900"
                                                    >
                                                        Ana Maria Simon
                                                        <br>
                                                        <span class="text-primary">
                                                            Escultora
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="text-gray-400 flex flex-col justify-end text-right -space-y-4">
                                                <p>25 de mayo 2022</p>
                                                <p>Madrid, España</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-8">
                        <div class="card border-0">
                            <div class="card-body">
                                <div class="row">
                                    <div
                                        style="
                                            background-image: url('/images/ultima_informacion.png');
                                        "
                                        class="col-md-12 ultima-info"
                                    >
                                        <div
                                            class="d-flex justify-content-end"
                                            style="height: 20%"
                                        >
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-heart"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                            <h6 style="color: #cccccc">
                                                <i
                                                    class="fa-regular fa-bookmark"
                                                    style="margin-right: 10px"
                                                ></i>
                                            </h6>
                                        </div>
                                        <div
                                            class="d-flex align-items-end"
                                            style="height: 80%"
                                        >
                                            <h5 class="text-white">
                                                TENDENCIAS EN LA ESCULTURA EN EL
                                                2022
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <p class="text-black">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit.
                                            Maecenas auctor, lectus nec ornare
                                            rutrum, magna risus lacinia risus,
                                            nec tempus eros magna et erat.
                                            Pellentesque molestie arcu turpis,
                                            eu consequat enim auctor vel. Nullam
                                            eget lacus libero. Quisque sit amet
                                            venenatis sapien, tempor posuere
                                            ligula. Mauris convallis lorem vitae
                                            nunc varius aliquet. Donec neque
                                            justo, varius a lacus euismod,
                                            aliquet pellentesque sapien. Vivamus
                                            pulvinar nisl vel orci placerat
                                            vehicula. Nam velit quam, elementum
                                            eget viverra in, rhoncus vitae
                                            magna...
                                            <span class="text-primary"
                                                >Seguir leyendo</span
                                            >
                                        </p>
                                    </div>
                                    <div class="col-md-12 text-xs sm:text-lg">
                                        <div
                                            class="flex flex-wrap justify-between items-center"
                                        >
                                            <div
                                                class="flex flex-row justify-start items-center"
                                            >
                                                <img
                                                    src="/images/avatar.png"
                                                    class="img-thumbnail border-0"
                                                />
                                                <div class="mt-3">
                                                    <p
                                                        class="font-bold text-gray-900"
                                                    >
                                                        Ana Maria Simon
                                                        <br>
                                                        <span class="text-primary">
                                                            Escultora
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="text-gray-400 flex flex-col justify-end text-right -space-y-4">
                                                <p>25 de mayo 2022</p>
                                                <p>Madrid, España</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button
                            class="bg-gray-700 text-gray-100 py-4 px-7 rounded-lg hover:animate-shadow-and-color-app"
                        >
                            VER MAS
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- El newsletter para grandes artistas -->
        <Newletter />
        <!-- /El newsletter para grandes artistas -->

        <!-- extra info -->
        <ExtraInfo />
        <!-- /extra info -->

        <!-- footer -->
        <AppFooter />
        <!-- /Footer -->
    </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider";
import { mapState } from "vuex";
import ExtraInfo from "../landing/ExtraInfo.vue";
import AppFooter from "../landing/Footer.vue";
import Newletter from "../landing/Newletter.vue";
import Header from "../landing/Header.vue";
import PreHeader from "../landing/PreHeader.vue";

export default {
    name: "Landing",
    components: {
        AppFooter,
        ExtraInfo,
        Newletter,
        Header,
        PreHeader,
    },
    mounted() {
        tns({
            container: "#slider-user",
            mode: "carousel",
            speed: 700,
            gutter: 30,
            items: 3,
            autoplay: true,
            mouseDrag: true,
            autoplayButtonOutput: false,
            controlsContainer: "#customize-controls",
            responsive: {
                0: {
                    items: 1,
                },
                700: {
                    items: 2,
                },
                900: {
                    items: 4,
                },
            },
        });

        tns({
            container: "#slider-publish",
            mode: "carousel",
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
                    items: 1,
                },
                700: {
                    items: 2,
                },
            },
        });

        tns({
            container: "#slider-comunidad",
            mode: "carousel",
            speed: 700,
            gutter: 30,
            items: 3,
            autoplay: true,
            mouseDrag: true,
            autoplayButtonOutput: false,
            controlsContainer: "#customize-controls-comunidad",
            responsive: {
                0: {
                    items: 1,
                },
                700: {
                    items: 2,
                },
            },
        });
    },
    computed: {
        apiStateFormLoading() {
            return this.status === "loading";
        },
        ...mapState({
            status: (state) => state.user.status,
        }),
    },
};
</script>
