<template>
    <v-app>
        <notifications
            group="container"
            position="top right"
            :duration="3000"
            :max="5"
            :ignoreDuplicates="true"
            :closeOnClick="true"
            class="mt-3 mr-3"
        />
        <router-view></router-view>
    </v-app>
</template>

<script>
export default {
    name: "App",
};
</script>
