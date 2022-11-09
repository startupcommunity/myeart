const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .vue()
    .sass("resources/css/app.scss", "public/css");

// imagenes del perfil del usuario
mix.copy("resources/img/profile", "public/img/profile");

// imagenes del home
mix.copy("resources/img/home", "public/img/home");

// imagenes de obras - categorías
mix.copy("resources/img/artwork", "public/img/artwork");

// favicons
mix.copy("resources/img/favicon", "public/img/favicon");
