<template>
    <div class="w-full">
        <div class="flex flex-row justify-start items-center">
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
    },
};
</script>
