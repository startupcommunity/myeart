<template>
    <img
        :src="getImage"
        alt="avatar-del-colectivo"
        class="rounded-full aspect-square object-cover object-center"
        :class="imgClass"
    />
</template>

<script>
export default {
    name: "CollectiveAvatar",
    props: {
        img: {
            type: String,
            default: "",
        },
        imgClass: {
            type: String,
            default: "",
        },
    },

    computed: {
        getImage() {
            if (this.img) {
                return this.$pathProfileCollective + this.img;
            }

            return this.$defaultProfilePhotoCollective;
        },
    },
};
</script>
