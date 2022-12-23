<template>
    <div class="w-full md:min-h-screen bg-cover bg-center bg-no-repeat bg-woman-black-mobile md:bg-woman-black flex items-center">
        <!-- loading full page -->
        <loading-overlay :active="loading" :is-full-page="true" loader="bars" />
        <!-- /loading full page -->

        <!-- content -->
        <div class="md:container mx-auto w-full h-full">
            <slot></slot>
        </div>
        <!-- /content -->
    </div>
</template>
<script>
export default {
    name: "WomanLayout",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
