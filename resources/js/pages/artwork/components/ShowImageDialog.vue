<template>
    <div class="text-center">
        <v-dialog v-model="show" max-width="1080" persistent>
            <div class="px-0 mx-0">
                <img
                    :src="imageBlob"
                    class="w-full h-full object-cover object-center rounded-sm"
                    :alt="'artwork-file-' + imageBlob"
                />

                <v-divider></v-divider>
            </div>
            <div class="bg-gray-50 py-2 px-3 flex justify-end">
                <v-spacer></v-spacer>
                <v-btn color="#B2794C" text raised outlined @click="$emit('close-full-image')">
                    <span class="font-bold">Cerrar</span>
                </v-btn>
            </div>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: "ShowImageDialog",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        imageBlob: {
            type: String,
            default: "",
        },
    },
};
</script>
