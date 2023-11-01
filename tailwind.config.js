/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        fontWeight: {
            "extra-light": 100,
            thin: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            "extra-bold": 800,
            black: 900,
            "extra-black": 1000,
            "super-black": 1100,
            "ultra-black": 1200,
        },
        extend: {
            backgroundImage: {
                "hero-profile-bg": "url('/img/profile/hero-profile.webp')",
                "hero-front-default": "url('/img/profile/front-artist.webp')",
                "profile-about-me": "url('/img/profile/about-me.webp')",
                "default-event": "url('/img/events/default-event.webp')",
                newsletter: "url('/img/home/newsletter.png')",
                "mobile-newsletter": "url('/img/home/mobile-newsletter.png')",
                "last-info": "url('/images/ultima_informacion.png')",
                "categories-pintura":
                    "url('/img/artwork/categories/pintura.webp')",
                "woman-black": "url('/img/layout/bg-woman.webp')",
                "woman-black-mobile": "url('/img/layout/bg-woman-mobile.webp')",
                "default-front-collective": "url('/img/collective/default-front.webp')",
                "quienes-somos": "url('/img/home/somos.webp')",
                "joined": "url('/img/home/joined.webp')",
            },
            animation: {
                "fade-in-both":
                    "fade-in-both 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                "fade-in-down": "fade-in-down 0.4s ease-in",
                "slide-in-blurred-top":
                    "slide-in-blurred-top 1.2s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
                "swing-in-top-fwd":
                    "swing-in-top-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both",
                "shadow-drop-center":
                    "shadow-drop-center .4s cubic-bezier(.25,.46,.45,.94) both",
                "shadow-and-color-app":
                    "shadow-and-color-app .4s cubic-bezier(.25,.46,.45,.94) both",
                "bg-gray-light":
                    "bg-gray-light .4s cubic-bezier(.25,.46,.45,.94) both",
            },
            keyframes: {
                "fade-in-both": {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "slide-in-blurred-top": {
                    "0%": {
                        "-webkit-transform":
                            "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
                        transform:
                            "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
                        "-webkit-transform-origin": "50% 0%",
                        "transform-origin": "50% 0%",
                        "-webkit-filter": "blur(40px)",
                        filter: "blur(40px)",
                        opacity: "0",
                    },
                    "100%": {
                        "-webkit-transform":
                            "translateY(0) scaleY(1) scaleX(1)",
                        transform: "translateY(0) scaleY(1) scaleX(1)",
                        "-webkit-transform-origin": "50% 50%",
                        "transform-origin": "50% 50%",
                        "-webkit-filter": "blur(0)",
                        filter: "blur(0)",
                        opacity: "1",
                    },
                },
                "swing-in-top-fwd": {
                    "0%": {
                        "-webkit-transform": "rotateX(-100deg)",
                        transform: "rotateX(-100deg)",
                        "-webkit-transform-origin": "top",
                        "transform-origin": "top",
                        opacity: 0,
                    },

                    "100%": {
                        "-webkit-transform": "rotateX(0deg)",
                        transform: "rotateX(0deg)",
                        "-webkit-transform-origin": "top",
                        "transform-origin": "top",
                        opacity: 1,
                    },
                },
                "shadow-drop-center": {
                    "0%": {
                        transform: "translateZ(0)",
                        "box-shadow": "0 0 0 0 transparent",
                    },
                    "100%": {
                        transform: "translateZ(50px)",
                        "box-shadow": "0 0 20px 0 rgba(0,0,0,0.2)",
                    },
                },
                "shadow-and-color-app": {
                    "0%": {
                        transform: "translateZ(0)",
                        "box-shadow": "0 0 0 0 transparent",
                    },
                    "100%": {
                        transform: "translateZ(50px)",
                        "box-shadow": "0 0 10px 0 rgba(0,0,0,0.2)",
                        "background-color": "#B2794C",
                    },
                },
                "bg-gray-light": {
                    "0%": {
                        transform: "translateZ(0)",
                        "box-shadow": "0 0 0 0 transparent",
                    },
                    "100%": {
                        transform: "translateZ(50px)",
                        "background-color": "#eeeeee",
                    },
                },
            },
            colors: {
                "app-brown-1": "#B2794C",
                "app-brown-2": "#C27446",
                "app-gray-1": "#E0E0E0",
                "app-hashtag": "#298FC2",
            },
            boxShadow: {
                "card-artist": "10px 10px 15px -2px rgba(0,0,0,0.1)",
            },
        },
    },
    plugins: [],
};
