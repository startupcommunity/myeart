<template>
    <div class="overflow-hidden">
        <div
            class="flex flex-wrap items-start hover:animate-shadow-drop-center"
        >
            <div class="w-full">
                <div class="flex justify-between items-center py-4">
                    <div class="flex flex-row justify-start items-center">
                        <img
                            :src="profilePhoto"
                            class="border w-20 h-20 rounded-full"
                        />
                        <div class="mt-3">
                            <p class="font-semibold text-gray-900 text-base">
                                {{ artist?.name }}
                                <br />
                                <span class="text-gray-400"> Museo MOMA </span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <v-btn text>...</v-btn>
                    </div>
                </div>
            </div>
            <div class="w-full h-96 md:h-[28rem]">
                <img
                    class="w-full h-full object-cover object-center"
                    :src="release?.image"
                    alt="release"
                />
            </div>
            <div class="w-full px-4">
                <div class="flex justify-between py-3">
                    <div class="flex gap-3">
                        <button>
                            <i
                                class="fa-regular fa-heart text-gray-400 text-xl"
                            ></i>
                        </button>
                        <button>
                            <i
                                class="fa-regular fa-comment text-gray-400 text-xl"
                            ></i>
                        </button>
                        <button>
                            <i
                                class="fa-regular fa-paper-plane text-gray-400 text-xl"
                            ></i>
                        </button>
                    </div>
                    <div>
                        <button>
                            <i
                                class="fa-regular fa-bookmark text-gray-400 text-xl"
                            ></i>
                        </button>
                    </div>
                </div>
                <p class="font-extra-bold text-xs">
                    <span class="uppercase">{{ artist?.name }}</span>
                    <span class="font-normal">
                        {{ release?.text }}
                    </span>
                </p>
                <p class="text-app-hashtag text-xs font-medium">
                    {{ release?.hashtag }}
                </p>
                <p class="text-xs font-semibold text-gray-400">
                    10 comentarios
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CardEvent",
    props: {
        release: {
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
