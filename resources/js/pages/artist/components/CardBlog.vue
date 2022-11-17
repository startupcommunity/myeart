<template>
    <div>
        <div
            class="h-full rounded-md overflow-hidden p-4 hover:animate-shadow-drop-center shadow-md"
        >
            <div class="relative">
                <img
                    class="lg:h-48 md:h-36 w-full object-cover object-center"
                    src="/images/img_2.png"
                    alt="blog"
                />
                <div
                    class="bg-opacity-50 hover:bg-opacity-0 bg-gray-900 w-full h-full absolute top-0 bottom-0 inset-x-0"
                ></div>
                <div class="absolute bottom-3 left-3">
                    <h3 class="text-xl font-bold text-gray-50">
                        NUEVAS TÉCNICAS DE PINTURA
                    </h3>
                </div>
            </div>
            <div class="p-6">
                <p class="leading-relaxed mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas auctor, lectus nec ornare rutrum, magna risus
                    lacinia risus, nec tempus eros magna et erat. Pellentesque
                    molestie arcu turpis, eu consequat enim auctor vel. Nullam
                    eget lacus libero. Nam velit quam...
                    <span class="text-primary">Seguir leyendo</span>
                </p>
            </div>
            <div class="w-full">
                <div class="flex flex-wrap justify-between items-center">
                    <div class="w-full xl:w-1/2 mb-3 xl:mb-0">
                        <div
                            class="flex flex-row justify-center xl:justify-start items-center"
                        >
                            <img
                                :src="profilePhoto"
                                class="border w-20 h-20 rounded-full"
                            />
                            <div class="mt-3">
                                <p
                                    class="font-semibold text-gray-900 text-base"
                                >
                                    {{ artist?.name }}
                                    <br />
                                    <span class="text-primary">
                                        Escultora
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        class="w-full xl:w-1/2 text-gray-400 flex flex-col justify-end text-center text-lg-right -space-y-4"
                    >
                        <p>25 de mayo 2022</p>
                        <p>Madrid, España</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CardBlog",
    props: {
        post: {
            type: Object,
            default: {},
        },
        artist: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        /**
         * Path completo de la foto de perfil
         */
        profilePhoto() {
            const artist = this.artist;
            if (!artist?.profile_photo) return this.getURLDefaultProfilePhoto;

            return `${this.pathProfilePhoto + artist.profile_photo}`;
        },
    },
};
</script>
