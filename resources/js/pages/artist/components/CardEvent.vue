<template>
    <div class="overflow-hidden">
        <div
            class="flex flex-wrap items-start hover:animate-shadow-drop-center"
        >
            <div class="w-full md:w-1/2 h-60 md:h-96">
                <img
                    class="w-full h-full object-cover object-center rounded-xl"
                    src="/img/events/default-event.webp"
                    alt="event"
                />
            </div>
            <div class="px-6 w-full md:w-1/2">
                <h3 class="text-2xl text-zinc-900 font-semibold">
                    <!-- {{ event?.title }} -->
                    Exposición de arte: Cubismo 2022
                </h3>
                <p class="leading-relaxed text-xl text-zinc-500">
                    <!-- {{ event?.date }} -->
                    22 Junio 2022
                </p>
                <p class="leading-relaxed text-xl text-zinc-500">
                    <!-- {{ event?.time }} -->
                    21:00 hr.
                </p>
                <p class="leading-relaxed text-xl text-zinc-500">
                    <!-- {{ event?.location }} -->
                    Museo del Prado. Madrid
                </p>
                <v-btn color="grey darken-4" large class="rounded">
                    <span class="text-gray-50 hidden lg:block">Asistir a este evento</span>
                    <span class="text-gray-50 block lg:hidden">Asistir</span>
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "CardEvent",
    props: {
        event: {
            type: Object,
            default: {},
        },
        artist: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        /**
         * Path completo de la foto de perfil
         */
        // profilePhoto() {
        //     const artist = this.artist;
        //     if (!artist?.profile_photo) return this.getURLDefaultProfilePhoto;
        //     return `${this.pathProfilePhoto + artist.profile_photo}`;
        // },
    },
};
</script>
