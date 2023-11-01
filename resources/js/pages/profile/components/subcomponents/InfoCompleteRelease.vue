<template>
    <div class="flex justify-between">
        <div>
            <span class="text-sm font-medium tracking-wide text-gray-600">
                {{ release.created_at | formatTextDate }}
            </span>
        </div>
        <div class="flex gap-2 items-start justify-end">
            <CommentButton
                @open-modal-comment="$emit('open-comment-modal', release)"
                v-if="showBtnComment"
            />
            <LikeButton :release="release" />
            <FavButton :release="release" />
            <ShareButton :release="release" />
        </div>
    </div>
</template>

<script>
import CommentButton from "../../../release/components/CommentButton.vue";
import FavButton from "../../../release/components/FavButton.vue";
import LikeButton from "../../../release/components/LikeButton.vue";
import ShareButton from "../../../release/components/ShareButton.vue";

export default {
    name: "InfoCompleteRelease",
    components: { CommentButton, LikeButton, FavButton, ShareButton },
    props: {
        release: {
            type: Object,
            default: () => {},
        },
        showBtnComment: {
            type: Boolean,
            default: true,
        },
    },
    filters: {
        /**
         * filtro de fecha
         * que devuelve la fecha en formato: dia, numero dia mes y hora en formato 24 horas
         * ejemplo: Martes, 13 de diciembre a las 21:00
         * @param {Date} value
         */
        formatTextDate(value) {
            const date = new Date(value);
            const day = date.toLocaleString("es-ES", { weekday: "long" });
            const dayNumber = date.toLocaleString("es-ES", { day: "numeric" });
            const month = date.toLocaleString("es-ES", { month: "long" });
            const hour = date.toLocaleString("es-ES", {
                hour: "numeric",
                minute: "numeric",
            });

            // nombre de dia y meses en PascalCase
            const dayPascal = day.charAt(0).toUpperCase() + day.slice(1);
            const monthPascal = month.charAt(0).toUpperCase() + month.slice(1);
            return `${dayPascal}, ${dayNumber} ${monthPascal} a las ${hour}`;
        },
    },
};
</script>
