<template>
    <div>
        <v-row justify="center">
            <v-dialog
                v-model="show"
                persistent
                width="600"
                content-class=""
                scrollable
            >
                <v-card class="bg-white">
                    <v-card-title class="hidden sm:block">
                        <div
                            class="flex justify-between border-b border-gray-800 pb-3"
                        >
                            
                            <h1 class="text-2xl font-medium">
                                {{title}}
                            </h1>
                            <button type="button" @click="$emit('close-modal')">
                                <i class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <LoadingTailwind v-if="globalLoading" />
                            <!--<div
                                v-else
                                class="grid grid-cols-1 md:grid-cols-3 content-center gap-5"
                            >
                                <CardCollective
                                    v-for="collective in collectives"
                                    :key="collective.id"
                                    :collective="collective"
                                    class="mb-5"
                                />
                            </div>-->
                            <div>
                                <ul>
                                
                                <li v-for="follow in followers" :key="follow.id">
                                    <div class="flex justify-start items-center">
                                        <Avatar
                                            :artist="follow"
                                            custom="border w-12 h-12"
                                        />
                                        <div class="flex flex-col pl-2">
                                            <div
                                                class="text-sm font-bold text-zinc-900"
                                            >
                                            {{ follow.user.name}} 
                                            </div>
                                        </div>
                                        <div>
                                            <FollowArtistButton
                                                :artist="follow"
                                                class="btn-custom-follow py-2"
                                            />
                                        </div>
                                    </div>
                                </li>
                                </ul>
                            </div>
                        </div>
                        
                    </v-card-text>
                    <v-card-actions class="bg-white">
                        <div class="flex justify-center py-5 py-md-8">
                            <v-btn
                                class="text-white"
                                :disabled="globalLoading"
                                @click="$emit('close-modal')"
                                color="#B2794C"
                            >
                                continuar
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import LoadingTailwind from "../../../components/LoadingTailwind.vue";
import CardCollective from "../../collective/components/CardCollective.vue";
import FollowArtistButton from "../../artwork/components/FollowArtistButton";
import Avatar from "../../../components/Avatar.vue";

export default {
    name: "FollowersModal",
    components: { LoadingTailwind, CardCollective,FollowArtistButton,Avatar },
    props: {
        title: {
            type: String,
            default:''
        },
        show: {
            type: Boolean,
            default: false,
        },
        followers: {
            type: Array,
            default: function () {
               return []; 
            }
        }
    },
};
</script>