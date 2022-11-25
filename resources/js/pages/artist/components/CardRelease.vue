<template>
    <div class="overflow-hidden">
        <div class="flex flex-wrap items-start">
            <div class="w-full">
                <div class="flex justify-between items-center py-2">
                    <div class="flex flex-row justify-start items-center">
                        <Avatar :artist="artist" />
                        <div class="mt-4 ml-2">
                            <p class="font-medium text-gray-900 text-xs">
                                {{ artist?.name }}
                                <br />
                                <span class="text-gray-400"
                                    >Museo {{ release?.museum }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <v-btn text>...</v-btn>
                    </div>
                </div>
            </div>
            <div class="w-full h-96 md:h-[24rem]">
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
                    <div class="flex justify-start items-center gap-1">
                        <i
                            class="fa-solid fa-circle super-small text-app-hashtag"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                        <i
                            class="fa-solid fa-circle super-small text-gray-400"
                        ></i>
                    </div>
                    <div>
                        <button>
                            <i
                                class="fa-regular fa-bookmark text-gray-400 text-xl"
                            ></i>
                        </button>
                    </div>
                </div>
                <div class="font-extra-bold text-xs mb-1">
                    <span class="uppercase">{{ artist?.name }}</span>
                    <span class="font-normal">
                        {{ release?.text }}
                    </span>
                </div>
                <div class="text-app-hashtag text-xs font-medium mb-1">
                    {{ release?.hashtag }}
                </div>
                <div class="text-xs font-semibold text-gray-400">
                    10 comentarios
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Avatar from "../../../components/Avatar.vue";
export default {
    components: { Avatar },
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
