const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .sass("resources/css/app.scss", "public/css")
    .vue({ version: 2 });

// imagenes del perfil del usuario
mix.copy("resources/img/profile", "public/img/profile");

// imagenes del home
mix.copy("resources/img/home", "public/img/home");

// imagenes de obras - categorías
mix.copy("resources/img/artwork", "public/img/artwork");

// favicons
mix.copy("resources/img/favicon", "public/img/favicon");

if (process.env.MIX_IN_PRODUCTION) {
    mix.version();
}

// reload browser
mix.browserSync(process.env.MIX_APP_URL);
