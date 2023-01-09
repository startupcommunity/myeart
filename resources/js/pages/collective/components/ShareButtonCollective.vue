<template>
    <v-btn
        outlined
        color="#B2794C"
        :x-small="small || isMobileMode"
        :small="isSmall"
        @click.stop="share"
    >
        <i class="fa-solid fa-share"></i>
        Compartir
    </v-btn>
</template>

<script>
import utilMixin from "../../../mixins/utilMixin";

export default {
    name: "ShareButtonCollective",
    mixins: [utilMixin],

    props: {
        collective: {
            type: Object,
            default: () => {},
        },
        small: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
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
    },
};
</script>
