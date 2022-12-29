<template>
    <div class="w-full">
        <div class="flex flex-row justify-between items-center">
            <div class="flex justify-start items-center">
                <Avatar :artist="artist" />
                <div class="mt-4 ml-2">
                    <p class="font-medium text-gray-900 text-xs">
                        {{ artist?.name }}
                        <br />
                        <span class="text-gray-400">
                            {{ location }}
                        </span>
                    </p>
                </div>
            </div>
            <div v-if="showButtonsCol" class="flex justify-end items-center">
                <v-btn text small class="text-xs" @click.stop="" v-if="isOwner">
                    <i class="fa-solid fa-pencil"></i>
                    <span class="hidden md:block">Editar</span>
                </v-btn>
                <v-btn text small class="text-xs" @click.stop="">
                    <i class="fa-solid fa-trash"></i>
                    <span class="hidden md:block">Eliminar</span>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from "../../../../components/Avatar.vue";

export default {
    name: "InfoArtist",
    components: { Avatar },
    props: {
        artist: {
            type: Object,
            default: () => {},
        },
        location: {
            type: String,
            default: "",
        },
        showButtonsCol: {
            type: Boolean,
            default: false,
            description:
                "Si se muestran botones de acción | solo aplicara para colectivos",
        },
        isOwner: {
            type: Boolean,
            default: false,
            description:
                "Si es el usuario creador de la publicación | solo aplicara para colectivos",
        },
    },
};
</script>
