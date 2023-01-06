<template>
    <div id="mySidenav" class="sidenav">
        <div class="sidenav_header">
            <button type="button" class="closebtn" @click="closeNav()">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>
        <div class="sidenav_body">
            <div class="w-100 d-flex justify-content-center">
                <label
                    class="border-2 border-[#b2794c] rounded-full cursor-pointer"
                >
                    <v-avatar size="120">
                        <v-img :src="profilePhoto" :lazy-src="profilePhoto">
                            <template v-slot:placeholder>
                                <v-progress-circular
                                    indeterminate
                                    color="custm_theme_6"
                                ></v-progress-circular>
                            </template>
                        </v-img>
                    </v-avatar>
                </label>
            </div>
            <p class="text-white">Artista/Fotografía</p>
            <button @click="closeAndGo('obras')" class="text-white text-2xl">
                SUBIR OBRA <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
            <router-link :to="pathArtwork"> OBRAS </router-link>
            <router-link :to="pathArtist"> ARTISTAS </router-link>
            <router-link :to="pathEvent"> EVENTOS </router-link>
            <router-link :to="pathCommunity">COMUNIDAD</router-link>
            <router-link :to="pathCollective">COLECTIVOS</router-link>
        </div>
        <div class="sidenav_footer">
            <a href="#" @click.prevent="logout">CERRAR SESIÓN</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "MobileMenu",
    computed: {
        // paths
        pathArtwork: () => ({ name: "listArtwork" }),
        pathArtist: () => ({ name: "listArtist" }),
        pathCommunity: () => ({ name: "indexCommunity" }),
        pathCollective: () => ({ name: "indexCollective" }),
        pathEvent: () => ({ name: "eventList" }),

        // store
        user() {
            return this.$store.getters.getProfile;
        },
        profilePhoto() {
            return `${this.pathFrontPhoto + this.user?.front_photo}`;
        },
    },
    methods: {
        openNav() {
            document.getElementById("mySidenav").style.display = "block";
            document.getElementById("mySidenav").style.width = "80%";
        },
        closeNav() {
            document.getElementById("mySidenav").style.display = "none";
            document.getElementById("mySidenav").style.width = "0";
        },
        logout() {
            this.$store.dispatch("authLogout").then(() => {
                this.$router.push("/home");
            });
        },
        closeAndGo(val) {
            if (val == "obras") {
                this.$router.push("/obras/crear");
            }
            this.closeNav();
        },
    },
};
</script>
