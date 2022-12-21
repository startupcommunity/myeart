<template>
    <div
        class="relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center"
        :class="!user.front_photo ? 'bg-hero-profile-bg' : ''"
        :style="{
            'background-image': user.front_photo ? frontPhoto : '',
        }"
    >
        <div
            class="container py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
        >
            <div class="">
                <div
                    class="flex flex-row items-center justify-center justify-md-between"
                >
                    <div
                        class="relative w-full md:w-1/2 flex justify-center px-2 sm:px-0"
                    >
                        <div class="flex flex-col items-center md:-mb-10 md:gap-2">
                            <img
                                :src="
                                    user.profile_photo
                                        ? profilePhoto
                                        : '/img/avatar.png'
                                "
                                alt="profile-photo-myaert"
                                class="rounded-full w-48 h-48 sm:w-56 sm:h-56 aspect-square"
                            />
                            <h3
                                class="text-3xl sm:text-lg md:text-3xl tracking-tight text-gray-900 text-center hidden md:block"
                            >
                                <b class="font-black"> {{ user.name }} </b>
                            </h3>
                        </div>
                        <div
                            class="absolute sm:bottom-16 bottom-6 sm:pl-52 pl-44"
                        >
                            <button
                                class="border rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-primary text-2xl"
                                @click.stop="$emit('openDialogPP')"
                            >
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <div
                            class="absolute top-0 right-0 mt-14 block md:hidden"
                        >
                            <button
                                class="font-bold text-xs md:text-lg text-white"
                                type="button"
                                @click.stop="$emit('openDialogFP')"
                            >
                                <i class="fas fa-camera"></i> Portada
                            </button>
                        </div>
                    </div>
                    <div
                        class="w-full md:w-1/2 justify-end gap-5 hidden md:flex"
                    >
                        <button
                            class="font-bold text-xs md:text-lg text-white"
                            type="button"
                            @click.stop="$emit('openDialogFP')"
                        >
                            <i class="fas fa-camera"></i> Editar portada
                        </button>
                        <button
                            class="btn btn-primary text-white px-3 py-2 rounded-lg uppercase"
                            @click.stop="$router.push('/colectivos/crear')"
                        >
                            Crear colectivo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-zinc-900 bg-opacity-60"
        ></div>
    </div>
</template>
<script>
export default {
    name: "HeroProfile",
    props: {
        user: {
            type: Object,
        },
    },
    computed: {
        /**
         * Foto de portada del usuario
         */
        frontPhoto() {
            return `url('${this.pathFrontPhoto + this.user?.front_photo}')`;
        },

        /**
         * Foto de perfil del usuario
         */
        profilePhoto() {
            return `${this.pathProfilePhoto + this.user?.profile_photo}`;
        },
    },
};
</script>
