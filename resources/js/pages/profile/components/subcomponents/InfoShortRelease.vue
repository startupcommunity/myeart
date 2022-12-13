<template>
    <div class="flex justify-between">
        <div>
            <span class="text-sm font-medium tracking-wide text-gray-600">
                {{ release.created_at | formatTextDate }}
            </span>
        </div>
        <div class="flex gap-3 items-center justify-end">
            <div class="text-gray-400">
                <span class="text-sm uppercase">{{ likes }}</span>
                <i class="fa-regular fa-heart text-primary"></i>
            </div>
            <ShareButton :release="release" />
        </div>
    </div>
</template>

<script>
import ShareButton from "../../../release/components/ShareButton.vue";

export default {
    name: "InfoShortRelease",
    components: { ShareButton },
    props: {
        release: {
            type: Object,
            default: () => {},
        },
        likes: {
            type: Number,
            default: 0,
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
