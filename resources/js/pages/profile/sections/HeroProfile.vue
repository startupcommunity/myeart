<template>
    <div
        class="relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center"
        :class="!user.front_photo ? 'bg-hero-profile-bg' : ''"
        :style="{
            'background-image': user.front_photo ? frontPhoto : '',
        }"
    >
        <div
            class="container-fluid py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
        >
            <div class="">
                <div
                    class="flex flex-row items-center justify-center sm:justify-between"
                >
                    <div class="w-1/3 block sm:hidden"></div>
                    <div
                        class="relative w-full sm:w-2/5 flex justify-center px-2 sm:px-0"
                    >
                        <img
                            :src="
                                user.profile_photo
                                    ? profilePhoto
                                    : '/img/avatar.png'
                            "
                            alt="profile-photo-myaert"
                            class="rounded-full w-48 h-48 sm:w-56 sm:h-56"
                        />
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
                    </div>
                    <div class="w-1/3 sm:w-3/5 justify-end flex">
                        <button
                            class="font-bold text-xs sm:text-lg lg:mr-28 text-white"
                            type="button"
                            @click.stop="$emit('openDialogFP')"
                        >
                            <i class="fas fa-camera"></i> Editar portada
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="absolute top-0 bottom-auto pb-24 inset-x-0 bg-gray-900 bg-opacity-60"
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
