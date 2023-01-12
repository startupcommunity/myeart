<template>
    <section class="bg-white">
        <div class="container py-10">
            <div class="flex flex-wrap justify-center items-start">
                <!-- sección obras -->
                <div class="w-full md:w-1/4">
                    <div class="flex flex-col gap-5">
                        <v-btn
                            color="#B2794C"
                            class="text-white font-medium"
                            block
                            @click.stop="openArtworks"
                            v-if="!openSectionArtworks"
                        >
                            ver obras del colectivo
                        </v-btn>
                        <v-btn
                            class="font-medium"
                            @click.stop="closeArtworks"
                            text
                            v-else
                        >
                            <i class="fas fa-arrow-left"></i>
                            volver atrás
                        </v-btn>

                        <div v-if="!openSectionArtworks">
                            <h3 class="uppercase font-bold text-zinc-900 mb-3">
                                Algunas obras del colectivo
                            </h3>

                            <div class="grid grid-cols-1">
                                <CardArtwork
                                    v-for="art in lastArtworks"
                                    :key="art.id"
                                    :artwork="art"
                                    :showButtonDelete="false"
                                    :showButtonEdit="false"
                                    :type="2"
                                    :collectiveID="collective.id"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- sección publicaciones -->
                <div class="w-full md:w-1/2 md:px-10">
                    <div class="w-full">
                        <v-text-field
                            label="Buscar por nombre"
                            filled
                            color="#B2794C"
                            @input="search"
                            class="rounded-lg"
                        ></v-text-field>

                        <div
                            class="grid grid-cols-1"
                            v-if="!openSectionArtworks"
                        >
                            <CardRelease
                                v-for="rel in releases"
                                :key="rel.id"
                                :release="rel"
                                :artist="rel?.creator"
                                :isOwner="isCollectiveOwner(rel?.creator?.id)"
                                :showActions="false"
                                :showArtist="true"
                                :showBtnComment="true"
                                :showComments="true"
                                :showLabels="true"
                                :showCompleteInfo="true"
                                :showShortInfo="false"
                                :showButtonsCol="false"
                                @showCommentDialog="activeCommentModal"
                            />
                            <!-- modal de comentarios -->
                            <ReleaseCommentsDialog
                                :show="showComments"
                                :releaseID="release?.id"
                                @close-comments="showComments = false"
                            />
                        </div>

                        <div
                            v-else
                            class="grid grid-cols-1 md:grid-cols-2 gap-3"
                        >
                            <CardArtwork
                                v-for="art in artworks"
                                :key="art.id"
                                :artwork="art"
                                :showButtonDelete="false"
                                :showButtonEdit="false"
                                :type="2"
                                :collectiveID="collective.id"
                                class=""
                            />
                        </div>
                    </div>
                </div>

                <!-- sección miembros -->
                <div class="w-full md:w-1/4">
                    <div>
                        <h3 class="uppercase font-bold text-zinc-900">
                            Miembros que pertenecen a este colectivo
                        </h3>

                        <div class="grid grid-cols-1" v-if="members.length">
                            <MiniCardArtist
                                :artist="member?.user"
                                :key="member?.id"
                                v-for="member in members"
                            />
                        </div>

                        <div v-else>
                            <p class="text-zinc-900 font-light text-sm pt-2">
                                <i class="fa-solid fa-circle-info"></i>
                                Aun no hay miembros en el colectivo
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CardArtwork from "./CardArtwork.vue";
import MiniCardArtist from "./../../community/components/MiniCardArtist.vue";
import CardRelease from "../../profile/components/CardRelease.vue";
import ReleaseCommentsDialog from "../../release/components/ReleaseCommentsDialog.vue";

export default {
    name: "ContentCollective",
    components: {
        CardArtwork,
        MiniCardArtist,
        CardRelease,
        ReleaseCommentsDialog,
    },
    props: {
        collective: {
            type: Object,
            default: () => {},
        },
    },

    data() {
        return {
            showComments: false,
            openSectionArtworks: false,
            release: {},
            releases: [],
            original: [],
            artworks: [],
            originalArtworks: [],
        };
    },
    computed: {
        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * Verificar si esta viendo el creador
         */
        isOwner() {
            return this.user.id === this.collective?.user_id;
        },

        /**
         * Id del creador del colectivo
         */
        creatorID() {
            return this.collective?.user_id || 0;
        },

        /**
         * Todas las Obras del colectivo
         */
        // artworks() {
        //     return this.collective?.artworks || [];
        // },
        /**
         * 3 ultimas obras del colectivo
         */
        lastArtworks() {
            const data = this.artworks.sort((a, b) => b.id - a.id);
            return data.slice(0, 3);
        },

        /**
         * Miembros del colectivo
         */
        members() {
            return this.collective?.members || [];
        },
    },

    mounted() {
        // ordenar publicaciones por fecha
        const releases = this.collective?.releases || [];
        const orderBy = releases.sort((a, b) => b.id - a.id);
        this.releases = orderBy;
        this.original = JSON.parse(JSON.stringify(orderBy));

        // ordenar obras por fecha
        const artworks = this.collective?.artworks || [];
        const orderByArtworks = artworks.sort((a, b) => b.id - a.id);
        this.artworks = orderByArtworks;
        this.originalArtworks = JSON.parse(JSON.stringify(orderByArtworks));
    },

    methods: {
        /**
         * Buscar publicaciones en el array de publicaciones
         *
         * @param {String} event    Texto a buscar
         */
        search(event) {
            const text = event.toString().toLowerCase();

            const searchArtworks = this.openSectionArtworks;

            if (text.length > 0) {
                // si la sección obras esta cerrada
                // se busca en las publicaciones
                if (!searchArtworks) {
                    this.releases = this.original.filter((release) => {
                        const name = release.text.toLowerCase();
                        return name.includes(text);
                    });
                }

                // si la sección obras esta abierta
                // se busca en las obras
                if (searchArtworks) {
                    this.artworks = this.originalArtworks.filter((artwork) => {
                        const name = artwork.title.toLowerCase();
                        return name.includes(text);
                    });
                }
            } else {
                this.releases = this.original;
                this.artworks = this.originalArtworks;
            }
        },

        /**
         * Activa el modal de comentarios
         *
         * @param {Object} release
         */
        activeCommentModal(release) {
            this.release = release;
            this.showComments = true;
        },

        /**
         * SI es el creador de la publicación
         *
         * @param {Integer} creatorID
         */
        isCollectiveOwner(creatorID) {
            return this.creatorID === creatorID;
        },

        /**
         * Abrir Mini sección de obras del colectivo
         * muestra todas las obras
         */
        openArtworks() {
            this.openSectionArtworks = true;
        },

        /**
         * Cerrar Mini sección de obras del colectivo
         * muestra solo 3 obras
         */
        closeArtworks() {
            this.openSectionArtworks = false;
        },
    },
};
</script>
