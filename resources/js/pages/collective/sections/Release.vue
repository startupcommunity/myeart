<template>
    <section class="animate-fade-in-down">
        <FrontImage
            :bg="profile?.front_image"
            :id-collective="collective?.id"
            :changeFront="false"
        />

        <div
            class="flex flex-col md:flex-row justify-center justify-md-between items-center md:items-start py-3 border-b border-gray-400 border-spacing-y-5"
        >
            <div
                class="flex flex-col items-center md:items-start justify-start"
            >
                <h3 class="text-base font-bold text-zinc-900 uppercase">
                    Miembros del colectivo...
                </h3>
                <div v-if="members?.length" class="flex justify-start py-2">
                    <Avatar
                        custom="w-12 h-12 rounded-full object-cover object-center aspect-square border"
                        v-for="(m, index) in members.slice(0, 5)"
                        :key="m.id"
                        :artist="m.user"
                        :class="{
                            '-ml-5': index > 0,
                        }"
                    />
                </div>
                <span
                    class="text-primary font-light text-base uppercase"
                    v-else-if="!members?.length && !globalLoading"
                >
                    No hay miembros todavía
                </span>
            </div>
            <div class="flex flex-col items-md-end justify-center">
                <div class="flex flex-col md:flex-row justify-md-end md:gap-5">
                    <span
                        class="text-primary font-light text-base uppercase text-md-right text-center"
                    >
                        tienes {{ likes }}
                        <i class="fa-regular fa-thumbs-up text-primary"></i>
                        Me gusta
                    </span>
                    <span
                        class="text-primary font-light text-base uppercase text-md-right text-center"
                    >
                        {{ followers }}
                        <i class="fa-solid fa-rss text-primary"></i>
                        Te siguen
                    </span>
                </div>
                <div class="flex justify-md-end pt-2">
                    <v-btn color="#B2794C" outlined @click.stop="share">
                        <i class="fa-solid fa-share"></i> compartir colectivo
                    </v-btn>
                </div>
            </div>
        </div>

        <!-- listado de publicaciones -->
        <div class="py-8 py-md-0 pb-md-10">
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 content-center place-items-center h-28"
            >
                <v-btn block @click.stop="showDialog = true" depressed large>
                    <i class="fas fa-plus"></i> Crear una nueva publicación
                </v-btn>
                <div
                    class="inline-flex items-center justify-center"
                    v-if="isOwner"
                >
                    <span
                        class="uppercase text-zinc-900 tracking-widest text-xs font-bold w-full text-right"
                    >
                        Ver publicaciones de:
                    </span>
                    <v-select
                        :items="options"
                        item-text="text"
                        item-value="val"
                        color="#B2794C"
                        item-color="brown darken-2"
                        class="pl-2"
                        v-model="option"
                    ></v-select>
                </div>
            </div>

            <LoadingTailwind v-if="globalLoading" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-5" v-else>
                <CardRelease
                    v-for="rel in releases"
                    :key="rel?.id"
                    :artist="rel?.creator"
                    :release="rel"
                    :show-actions="false"
                    :show-short-info="false"
                    :show-artist="true"
                    :show-btn-comment="true"
                    :show-comments="true"
                    :show-complete-info="true"
                    :show-labels="true"
                    :show-buttons-col="true"
                    :is-owner="isCollectiveOwner(rel?.creator?.id)"
                    @showCommentDialog="activeCommentModal"
                    @updated-release-success="getReleasesAccordingToUser"
                />
            </div>

            <div
                class="flex flex-col items-center justify-center"
                v-if="releases.length < original.length"
            >
                <v-btn
                    color="grey darken-4"
                    @click.stop="showMore"
                    depressed
                    large
                    class="text-white"
                >
                    <i class="fas fa-plus"></i> Ver más publicaciones
                </v-btn>
            </div>
        </div>
        <!-- /listado de publicaciones -->

        <!-- modal de comentarios -->
        <ReleaseCommentsDialog
            :show="showComments"
            :releaseID="release?.id"
            @close-comments="showComments = false"
        />

        <!-- modal para crear publicación -->
        <CreateReleaseModal
            :show="showDialog"
            @close-modal="showDialog = false"
            @created="getReleasesAccordingToUser"
        />
    </section>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import utilMixin from "../../../mixins/utilMixin";
import CardRelease from "../../profile/components/CardRelease.vue";
import ReleaseCommentsDialog from "../../release/components/ReleaseCommentsDialog.vue";
import CreateReleaseModal from "../components/CreateReleaseModal.vue";
import FrontImage from "../components/FrontImage.vue";

const INIT_RELEASES = 6;
const MORE_RELEASES = 2;

export default {
    name: "ReleaseCollective",
    mixins: [utilMixin],
    components: {
        FrontImage,
        LoadingTailwind,
        CardRelease,
        CreateReleaseModal,
        ReleaseCommentsDialog,
        Avatar,
    },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        profile: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            option: 1,
            showComments: false,
            showDialog: false,
            releases: [],
            original: [],
            release: {},
            options: [
                { text: "Todas", val: 1 },
                { text: "Solo mías", val: 2 },
                { text: "Miembros", val: 3 },
            ],
        };
    },

    created() {
        this.getReleasesAccordingToUser();
    },

    computed: {
        likes() {
            return this.collective?.likes?.length || 0;
        },
        followers() {
            return this.collective?.followers?.length || 0;
        },
        members() {
            return this.collective?.members || [];
        },
        creatorID() {
            return this.collective?.user_id || 0;
        },
        user() {
            return this.$store.getters.getProfile;
        },
        isOwner() {
            return this.creatorID === this.user?.id;
        },
    },

    watch: {
        option(val) {
            this.getFilterReleases(val);
        },
    },

    methods: {
        /**
         * carga las publicaciones del creador del colectivo
         * y de los miembros del colectivo
         */
        getReleases() {
            this.showDialog = false;
            this.globalLoading = true;
            const ep = this.ep.collectives.getAllRelease + this.collective.id;
            this.axios
                .get(ep)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.releases = resp.data.slice(0, INIT_RELEASES);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * carga las publicaciones del creador del colectivo
         * y de los miembros del colectivo
         */
        getFilterReleases(option = null) {
            this.showDialog = false;
            this.globalLoading = true;
            const path = this.ep.collectives.getReleaseByOption;
            const ep = path + this.collective.id;
            const val = option || this.option;
            const params = {
                params: { option: val, creatorID: this.creatorID },
            };

            this.axios
                .get(ep, params)
                .then((resp) => {
                    this.original = JSON.parse(JSON.stringify(resp.data));
                    this.releases = resp.data.slice(0, INIT_RELEASES);
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Carga las publicaciones según el
         * usuario que visite el colectivo
         */
        getReleasesAccordingToUser() {
            if (this.isOwner) return this.getReleases();
            return this.getFilterReleases(3);
        },

        /**
         * Obtiene la imagen del usuario miembro
         */
        getImageUser(member) {
            const user = member?.user;
            if (!user?.profile_photo) return this.getURLDefaultProfilePhoto;
            return `${this.pathProfilePhoto + user?.profile_photo}`;
        },

        /**
         * Comparte la url del colectivo
         */
        share() {
            const path = this.secureUrl;
            const slug = this.collective?.slug ?? "";
            const route = `/colectivos/publico/${slug}`;
            const text = path + route;
            this.copyToClipboard(text);
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
         * Muestra más publicaciones
         */
        showMore() {
            const total = this.releases.length + MORE_RELEASES;
            this.releases = this.original.slice(0, total);
        },
    },
};
</script>
