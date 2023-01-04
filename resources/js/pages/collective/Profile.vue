<template>
    <MainLayout :show-header="false" :loading-overlay="globalLoading">
        <!-- header -->
        <div class="bg-zinc-900 pb-32">
            <Header class="mt-5" />
        </div>
        <!-- /header -->

        <section class="bg-white">
            <div class="container py-10">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- menu -->
                    <div class="md:col-span-1">
                        <div class="flex flex-col items-center">
                            <div class="relative">
                                <CollectiveAvatar
                                    :img="profile?.profile_image"
                                    img-class="w-60 h-60 border"
                                />
                                <div class="absolute top-5 left-5">
                                    <v-btn
                                        elevation="1"
                                        icon
                                        outlined
                                        color="#B2794C"
                                        class="bg-white"
                                        @click.stop="openImageModal"
                                        v-if="isOwner"
                                    >
                                        <v-icon>mdi-camera</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                            <h2 class="font-bold text-lg md:text-4xl mt-5">
                                {{ collective.name }}
                            </h2>

                            <!-- links -->
                            <div class="flex flex-col items-start gap-5 my-5">
                                <v-btn
                                    class="uppercase hover:no-underline text-lg"
                                    text
                                    @click.stop="activeSection('profile')"
                                    :class="{
                                        'font-bold': sections.profile,
                                        'font-normal': !sections.profile,
                                    }"
                                >
                                    Mi información
                                </v-btn>
                                <v-btn
                                    class="uppercase hover:no-underline text-lg"
                                    text
                                    @click.stop="activeSection('release')"
                                    :class="{
                                        'font-bold': sections.release,
                                        'font-normal': !sections.release,
                                    }"
                                >
                                    Publicaciones
                                </v-btn>
                                <v-btn
                                    class="uppercase hover:no-underline text-lg"
                                    text
                                    @click.stop="activeSection('member')"
                                    :class="{
                                        'font-bold': sections.member,
                                        'font-normal': !sections.member,
                                    }"
                                >
                                    Integrantes
                                </v-btn>
                                <v-btn
                                    class="uppercase hover:no-underline text-lg"
                                    text
                                    @click.stop="activeSection('artwork')"
                                    :class="{
                                        'font-bold': sections.artwork,
                                        'font-normal': !sections.artwork,
                                    }"
                                >
                                    Obras
                                </v-btn>
                            </div>
                            <!-- /links -->
                        </div>

                        <ProfilePhotoCollectiveModal
                            :show-modal="imageModal"
                            :id-collective="collective.id"
                            @close-modal="imageModal = false"
                        />
                    </div>
                    <!-- /menu -->

                    <!-- content -->
                    <div class="md:col-span-2">
                        <Info
                            :collective="collective"
                            :profile="profile"
                            v-if="sections.profile"
                        />
                        <Release
                            :collective="collective"
                            :profile="profile"
                            v-if="sections.release"
                        />
                        <Member
                            :collective="collective"
                            v-if="sections.member"
                        />
                        <Artwork
                            :collective="collective"
                            v-if="sections.artwork"
                        />
                    </div>
                    <!-- content -->
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script>
import ProfilePhotoCollectiveModal from "./components/ProfilePhotoCollectiveModal.vue";
import CollectiveAvatar from "./components/CollectiveAvatar.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Header from "../landing/sections/Header.vue";
import profileMixin from "./modules/profile-mixin";
import Info from "./sections/Info.vue";
import Release from "./sections/Release.vue";
import Member from "./sections/Member.vue";
import Artwork from "./sections/Artwork.vue";

export default {
    name: "Profile",
    mixins: [profileMixin],
    components: {
        MainLayout,
        Header,
        CollectiveAvatar,
        Info,
        ProfilePhotoCollectiveModal,
        Release,
        Member,
        Artwork,
    },

    mounted() {
        this.sections.profile = true;
    },
};
</script>
