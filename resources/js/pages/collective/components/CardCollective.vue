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
                <button
                    v-if="isWatchingCreator"
                    class="py-1 px-2 rounded-lg hover:bg-gray-200"
                    @click.stop="goToCollectiveProfile"
                >
                    <i class="fa-solid fa-cogs text-blue-800"></i>
                </button>
                <button @click.stop="share">
                    <i class="fa-solid fa-share-nodes text-gray-400"></i>
                </button>
            </div>
        </div>
        <!-- artista -->

        <!-- imagen -->
        <div>
            <router-link :to="getPathShowCollective">
                <img
                    :src="getFrontImage"
                    class="w-full h-full object-cover object-center aspect-video"
                    alt="imagen de portada del colectivo"
                />
            </router-link>
        </div>
        <!-- /imagen -->

        <!-- content -->
        <div>
            <h3 class="font-bold text-lg">
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
                        {{ following }}
                    </span>
                    <span
                        class="text-primary font-bold tracking-widest text-xs"
                    >
                        following
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
            <div>
                <div class="text-xs font-bold text-zinc-900">
                    Colectivo de arte:
                    <span class="text-primary">{{ categories }}</span>
                </div>
            </div>
        </div>
        <!-- /content -->
    </div>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";
import CollectiveAvatar from "./CollectiveAvatar.vue";

export default {
    name: "CardCollective",
    components: { CollectiveAvatar },
    mixins: [utilMixin],
    props: {
        collective: {
            type: Object,
            default: () => ({}),
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

        following() {
            return this.collective?.following?.length || 0;
        },

        artworks() {
            return this.collective?.artworks?.length || 0;
        },

        categories() {
            const categories = this.collective?.categories || [];

            // obtener solo los nombres de las categorias
            const names = categories.map((cat) => cat.category?.name);

            // convertir el array en string separado por comas
            return names.join(", ");
        },

        getPathShowCollective() {
            return {
                name: "collectiveShow",
                params: {
                    id: this.collective?.id,
                },
            };
        },

        isWatchingCreator() {
            return this.user?.id === this.creator?.id;
        },
    },

    methods: {
        goToCollectiveProfile() {
            this.$router.push({
                name: "collectiveProfile",
                params: {
                    id: this.collective?.id,
                },
            });
        },
        share() {
            const path = this.secureUrl;
            const slug = this.collective?.slug ?? "";
            const route = `/colectivos/publico/${slug}`;
            const text = path + route;
            this.copyToClipboard(text);
        },
    },
};
</script>
