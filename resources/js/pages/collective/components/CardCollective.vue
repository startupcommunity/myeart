<template>
    <div class="flex flex-col">
        <!-- artista -->
        <div class="flex justify-between items-center my-3">
            <div class="flex justify-start gap-1 items-center">
                <CollectiveAvatar
                    :img="profile?.profile_image"
                    img-class="border w-10 h-10"
                />
                <div>
                    <span
                        class="font-bold text-sm"
                        :class="{
                            'text-blue-800': isWatchingCreator,
                            'text-zinc-800': !isWatchingCreator,
                        }"
                    >
                        {{ creator?.name }}
                    </span>
                </div>
            </div>
            <div class="flex gap-3 justify-end">
                <div v-if="!$isUserGuest" class="flex justify-end items-center">
                    <button
                        v-if="isWatchingCreator || isUserInCollective"
                        class="py-1 px-2 rounded-lg hover:bg-gray-200"
                        @click.stop="goToCollectiveProfile"
                    >
                        <i class="fa-solid fa-cogs text-blue-800"></i>
                    </button>
                    <button
                        v-else
                        class="py-1 px-2 rounded-lg hover:bg-gray-200"
                        @click.stop="goToCollectiveProfile"
                    >
                        <i class="fa-solid fa-eye text-zinc-800"></i>
                    </button>
                </div>
                <LikeButtonCollective
                    :collective="collective"
                    v-if="!$isUserGuest"
                />
                <button @click.stop="share">
                    <i class="fa-solid fa-share-nodes text-gray-400"></i>
                </button>
            </div>
        </div>
        <!-- artista -->

        <!-- imagen -->
        <div>
            <img
                @click="getPathShowCollective"
                :src="getFrontImage"
                class="w-full h-full object-cover object-center aspect-square cursor-pointer"
                alt="imagen de portada del colectivo"
            />
        </div>
        <!-- /imagen -->

        <!-- content -->
        <div>
            <h3 class="font-bold text-lg mt-1">
                {{ collective.name }}
            </h3>
            <div class="flex justify-between py-2">
                <div class="uppercase">
                    <span class="font-bold text-xs text-zinc-900">
                        {{ followers }}
                    </span>
                    <span
                        class="text-primary font-bold tracking-widest text-xs"
                    >
                        followers
                    </span>
                </div>
                <div class="uppercase">
                    <span class="font-bold text-xs text-zinc-900">
                        {{ artworks }}
                    </span>
                    <span
                        class="text-primary font-bold tracking-widest text-xs"
                    >
                        Obras
                    </span>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-xs font-bold text-zinc-900">
                    <span class="text-gray-900">{{ getType }}</span>
                </div>
                <div v-if="followBtn">
                    <FollowCollectiveButton
                        :collective="collective"
                        :is-creator="isWatchingCreator"
                        @follow="follow"
                        @unfollow="unfollow"
                    />
                </div>
            </div>
        </div>
        <!-- /content -->
    </div>
</template>

<script>
import getDataMixin from "../../../mixins/getDataMixin";
import utilMixin from "../../../mixins/utilMixin";
import CollectiveAvatar from "./CollectiveAvatar.vue";
import FollowCollectiveButton from "./FollowCollectiveButton.vue";
import LikeButtonCollective from "./LikeButtonCollective.vue";

export default {
    name: "CardCollective",
    mixins: [utilMixin, getDataMixin],
    components: {
        CollectiveAvatar,
        LikeButtonCollective,
        FollowCollectiveButton,
    },
    props: {
        collective: {
            type: Object,
            default: () => ({}),
        },
        followBtn: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        user() {
            return this.$store.getters.getProfile;
        },

        creator() {
            return this.collective?.user;
        },

        profile() {
            return this.collective?.profile || {};
        },

        getFrontImage() {
            const front = this.profile?.front_image;
            if (!front) return this.$defaultFrontPhotoCollective;
            return `${this.$pathFrontCollective + front}`;
        },

        followers() {
            return this.collective?.followers?.length || 0;
        },

        artworks() {
            return this.collective?.artworks?.length || 0;
        },

        isWatchingCreator() {
            return this.user?.id === this.creator?.id;
        },

        getType() {
            return (
                this.collectiveTypes.filter(
                    (type) => type.value === this.collective?.type
                )[0].text || ""
            );
        },

        members() {
            return this.collective?.members || [];
        },

        /**
         * Verifica si el usuario actual pertenece al colectivo
         *
         * @returns {Boolean}
         */
        isUserInCollective() {
            const userId = this.user?.id;
            return this.members?.some((obj) => obj.user_id === userId);
        },

        // categories() {
        //     const categories = this.collective?.categories || [];

        //     // obtener solo los nombres de las categorias
        //     const names = categories.map((cat) => cat.category?.name);

        //     // convertir el array en string separado por comas
        //     return names.join(", ");
        // },
    },

    methods: {
        /**
         * Ir al perfil del colectivo, no es lo mismo que el detalle
         */
        goToCollectiveProfile() {
            this.$router.push({
                name: "collectiveProfile",
                params: {
                    id: this.collective?.id,
                },
            });
        },

        /**
         * Compartir colectivo
         */
        share() {
            const path = this.secureUrl;
            const slug = this.collective?.slug ?? "";
            const route = `/colectivos/publico/${slug}`;
            const text = path + route;
            this.copyToClipboard(text);
        },

        /**
         * Agregar el usuario a la lista de followers
         */
        follow() {
            this.collective.followers.push({
                user_id: this.user.id,
                collective_id: this.collective.id,
                collective: this.collective,
            });
        },

        /**
         * eliminar el usuario de la lista de followers
         */
        unfollow() {
            this.collective.followers = this.collective.followers.filter(
                (follower) => follower.user_id !== this.user.id
            );
        },

        /**
         * Ir al detalle del colectivo
         */
        getPathShowCollective() {
            this.$router.push({
                name: "collectiveShow",
                params: {
                    id: this.collective?.id,
                },
            });
        },
    },
};
</script>
