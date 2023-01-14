<template>
    <!-- <div> -->
    <li class="menu-items-sub">
        <div class="header-icons">
            <a
                class="mobile-hide search-bar-icon uppercase hover:no-underline"
                @click.stop="markAllAsRead"
            >
                <div class="position-relative">
                    <span
                        class="badge badge-super rounded bg-danger"
                        v-if="notifications.length > 0"
                    >
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    <i class="fas fa-bell"></i>
                </div>
            </a>
        </div>
        <ul class="sub-menu-notification" v-if="notifications.length > 0">
            <div class="p-3">
                <h2 class="text-center">NOTIFICACIONES</h2>
            </div>
            <div class="w-full px-3">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="flex items-center gap-3 mb-5"
                >
                    <div>
                        <img
                            :src="profilePhoto(notification.data)"
                            class="rounded-full w-10 h-10 sm:w-12 sm:h-12 aspect-square"
                        />
                    </div>
                    <div class="flex flex-col justify-center">
                        <span class="font-bold text-xs">
                            {{ notification.data.user_username }}
                        </span>
                        <span class="text-[9px] font-light">
                            {{ notification.data.message }}
                        </span>
                    </div>
                    <div>
                        <timeago
                            class="time"
                            :datetime="notification.data.created_at"
                            :auto-update="60"
                        ></timeago>
                    </div>
                    <div>
                        <FollowArtistButton
                            @click="markAsRead(notification.id)"
                            v-if="notification.data.type == 'new-follower'"
                            :artist="{ id: notification.data.user_id }"
                        />
                        <button
                            class="btn btn-primary btn-sm text-xxs px-4 uppercase btn-block"
                            v-else
                            @click="
                                actionButton(
                                    notification.data.url,
                                    notification.id
                                )
                            "
                        >
                            {{ setNamebutton(notification.data.type) }}
                        </button>
                    </div>
                </div>
            </div>
        </ul>
    </li>
</template>

<script>
import VueTimeago from "vue-timeago";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";
Vue.use(VueTimeago, { name: "Timeago", locale: "es_ES" });

export default {
    name: "Notifications",
    components: { FollowArtistButton },
    computed: {
        /**
         * Usuario logueado
         */
        user() {
            return this.$store.getters.getProfile;
        },

        /**
         * Notificaciones del usuario logueado
         */
        notifications() {
            return this.user?.unread_notifications || [];
        },
    },

    mounted() {
        const LaraEcho = globalThis.Echo;

        LaraEcho.channel("notification-channel").listen(
            "NotificationEvent",
            (e) => {
                this.$store.dispatch("userRequest");
            }
        );
    },
    methods: {
        actionButton(url, id) {
            this.markAsRead(id);
            if (this.$route.path !== url) this.$router.push(url);
        },

        /**
         * Nombre del botón según el tipo de notificacion
         *
         * @param {String} type   Tipo de notificacion
         */
        setNamebutton(type) {
            if (type != "new-follower") {
                return "Ir";
            }
        },

        /**
         * Marca una notificacion como leída
         *
         * @param {Int} id    Id de la notificacion
         */
        markAsRead(id) {
            this.axios
                .get(this.ep.notifications.markAsRead + id)
                .then((resp) => {
                    // dispatch
                    if (resp.data === 1) {
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => this.manageError(error));
        },

        /**
         * Marcar todas como leídas
         */
        markAllAsRead() {
            const data = { user_id: this.user.id };
            this.axios
                .post(this.ep.notifications.markAllAsRead, data)
                .then((resp) => {
                    // dispatch
                    if (resp.data === 1) {
                        this.$store.dispatch("userRequest");
                    }
                })
                .catch((error) => this.manageError(error));
        },

        /**
         * Path de la foto de perfil del usuario
         */
        profilePhoto(data) {
            if (!data.user_profile_photo) return "/img/avatar.png";
            return `${this.pathProfilePhoto + data.user_profile_photo}`;
        },
    },
};
</script>

<style>
.dashboard nav.main-menu ul ul.sub-menu-notification {
    width: 500px !important;
    color: #000;

    position: absolute;
    background-color: #fff;
    padding: 0.5em;
    left: -300px;
    top: 50px;
    border: 1px solid;
    border-radius: 3px;
    transition: 0.3s;
    opacity: 0;
    visibility: hidden;
    box-shadow: 0 0 20px #555555;
}

.user-name {
    font-weight: 600;
    font-size: 12px !important;
    line-height: 133.9%;
    color: #1d1d1c;
}

.message {
    font-weight: 400;
    font-size: 9px;
    line-height: 133.9%;
}

.time {
    font-size: 8px;
    color: #000;
    font-weight: 900;
}

.visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}
</style>
