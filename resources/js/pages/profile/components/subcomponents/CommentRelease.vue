<template>
    <div class="mb-1">
        <span class="uppercase font-bold text-xs" v-if="!isTheCreator">
            {{ artistName }}
        </span>
        <span
            class="font-normal text-xs"
            :class="{
                'text-gray-600': isTheCreator,
            }"
            v-html="getTextWithHashtag"
        ></span>
        <p v-if="showLabels || labels.length">
            <router-link
                v-for="label in labels"
                :key="label.id"
                class="text-xs font-medium text-blue-600 pr-1"
                :to="getPathProfile(label.user?.id)"
            >
                @{{ label.user?.username ?? label.user?.name }} &nbsp;
            </router-link>
        </p>
        <div v-if="showComments">
            <div
                class="text-xs font-medium text-gray-400 py-2"
                v-if="!isTheCreator"
            >
                <button
                    v-if="countComment"
                    type="button"
                    @click.stop="openModalComment"
                >
                    Ver los {{ countComment }} comentarios
                </button>
                <span v-else>
                    Aún no hay comentarios,
                    <button
                        type="button"
                        @click.stop="openModalComment"
                        class="text-gray-800"
                    >
                        agregar nuevo
                    </button>
                </span>
            </div>
            <div v-else>
                <button
                    type="button"
                    class="text-xs font-medium text-gray-400 py-2"
                    @click.stop="openModalComment"
                >
                    <span v-if="countComment">
                        Ver {{ countComment }} comentario(s)
                    </span>
                    <span v-else>No hay comentarios</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import utilMixin from "../../../../mixins/utilMixin";

export default {
    name: "CommentRelease",
    mixins: [utilMixin],
    props: {
        release: {
            type: Object,
            default: () => {},
        },
        showComments: {
            type: Boolean,
            default: true,
        },
        countComment: {
            type: Number,
            default: 0,
        },
        artistName: {
            type: String,
            default: "",
        },
        showLabels: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        user() {
            return this.$store.getters.getProfile || {};
        },
        isTheCreator() {
            return this.user?.id === this.release?.user_id;
        },
        getTextWithHashtag() {
            const text = this.release?.text;
            if (!text) return "";
            return this.hashTag(text);
        },
        labels() {
            return this.release?.labels || [];
        },
    },

    methods: {
        openModalComment() {
            this.$emit("open-comment-modal");
        },
        getPathProfile(id) {
            return {
                name: "showArtist",
                params: { id },
            };
        },
    },
};
</script>
