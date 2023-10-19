<template>
    <section
        class="bg-white border-gray-900 rounded-t-3xl -mt-10 sm:rounded-t-none relative"
    >
        <div class="container pt-10 pb-10">
            <div class="flex flex-wrap justify-center items-start">
                <div class="w-full lg:w-1/3 order-3 order-lg-1">
                    <div
                        class="flex gap-4 md:gap-12 justify-center px-10 px-md-0"
                    >
                        <div class="border-b pb-2 border-gray-400 text-center" @click="openDialogCollectives">
                            <div class="text-2xl font-bold">
                                {{ followers.length | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Followers
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-2xl font-bold">
                                {{ artworks.length | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Obras
                            </span>
                        </div>
                        <div class="border-b pb-2 border-gray-400 text-center">
                            <div class="text-2xl font-bold">
                                {{ events.length | numberK }}
                            </div>
                            <span
                                class="font-bold text-xs md:text-base text-primary uppercase"
                            >
                                Eventos
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full lg:w-1/3 order-1 order-lg-2 -mt-48 lg:-mt-60"
                >
                    <div class="flex flex-col justify-center">
                        <div class="flex justify-center pb-3 pt-20">
                            <CollectiveAvatar
                                :img="profile?.profile_image"
                                img-class="border rounded-full w-40 h-40 md:w-56 md:h-56"
                            />
                        </div>
                        <h3
                            class="text-2xl font-black tracking-wide text-center"
                        >
                            {{ collective.name }}
                        </h3>
                        <p class="text-zinc-900 font-light text-sm text-center">
                            {{ type?.text ?? "independiente" }}
                        </p>
                        <p class="text-zinc-900 font-light text-sm text-center">
                            Creado por: {{ collective.user.name }}
                        </p>
                    </div>
                </div>
                <div class="w-full lg:w-1/3 order-2 order-lg-3 lg:px-0 mb-5">
                    <div class="flex gap-3 justify-center">
                        <LikeButtonOutlinedCollective
                            :collective="collective"
                            :small="false"
                            v-if="collective?.id"
                        />
                        <FollowCollectiveButton
                            :collective="collective"
                            :is-creator="isCreator"
                            :outlined="true"
                            :small="false"
                            :icon="true"
                            custom="text-primary"
                            v-if="collective?.id"
                        />
                        <ShareButtonCollective
                            :collective="collective"
                            :small="false"
                        />
                        <!--<FollowersModal
                            :show="isOwner"
                            :followers="followers"
                            v-if="isOwner"
                            title="Seguidores"
                        />-->
                        <FollowersModal
                            :show="dialogCollectives"
                            @close-modal="closeDialogCollectives"
                            :followers="followers"
                            title="Seguidores"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import getDataMixin from "../../../mixins/getDataMixin";
import CollectiveAvatar from "./CollectiveAvatar.vue";
import FollowCollectiveButton from "./FollowCollectiveButton.vue";
import LikeButtonOutlinedCollective from "./LikeButtonOutlinedCollective.vue";
import ShareButtonCollective from "./ShareButtonCollective.vue";
import FollowersModal from "./FollowersModal.vue";

export default {
    components: {
        CollectiveAvatar,
        FollowCollectiveButton,
        LikeButtonOutlinedCollective,
        ShareButtonCollective,
        FollowersModal
    },
    name: "PostHeroCollective",
    mixins: [getDataMixin],
    props: {
        collective: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * Perfil del colectivo
         */
        profile() {
            return this.collective?.profile || {};
        },

        /**
         * Seguidores del colectivo
         */
        followers() {
            return this.collective?.followers || [];
        },

        /**
         * obras del colectivo
         */
        artworks() {
            return this.collective?.artworks || [];
        },

        /**
         * eventos del colectivo
         */
        events() {
            return this.collective?.events || [];
        },

        /**
         * Tipo de colectivo (artista, galeria, etc)
         */
        type() {
            return this.collectiveTypes.find(
                (type) => type.value === this.collective.type
            );
        },

        /**
         * SI es el creador del colectivo
         */
        isCreator() {
            return this.user?.id === this.collective?.user_id;
        },

        /**
         * devuelve el path del perfil del colectivo
         */
        getPathProfile() {
            return {
                name: "collectiveProfile",
                params: {
                    id: this.collective.id,
                },
            };
        },
    },
    filters: {
        /**
         * Si el numero pasa de 1000, se convierte a K
         */
        numberK(value) {
            if (value > 1000) {
                return `${(value / 1000).toFixed(1)}K`;
            }
            return value;
        },
    },
    data() {
        return {
            isOwner: false,
            dialogCollectives: false,
        }
    },
    methods: {        
        openDialogCollectives() {
            this.dialogCollectives = true;
            this.$emit("dialog-collectives-opened");
        },

        closeDialogCollectives() {
            this.dialogCollectives = false;
            this.$emit("dialog-collectives-closed");
        },
    
    }
};
</script>
