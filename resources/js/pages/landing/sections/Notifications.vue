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
                        v-if="unreadNotifications.length > 0"
                    >
                        <span class="visually-hidden">no leídas</span>
                    </span>
                    <i class="fas fa-bell"></i> ({{
                        shortNotifications.length
                    }})
                </div>
            </a>
        </div>
        <ul
            class="sub-menu-notification w-full md:w-[600px] text-zinc-900"
            v-if="shortNotifications.length > 0"
        >
            <div class="p-3">
                <h2
                    class="text-center font-bold uppercase text-gray-900 tracking-wider text-base"
                >
                    NOTIFICACIONES
                </h2>
            </div>
            <div class="w-full overflow-y-auto h-80">
                <div
                    v-for="noty in shortNotifications"
                    :key="noty.id"
                    class="flex items-center gap-3 hover:bg-gray-100 transition-all duration-300 ease-in-out px-3"
                >
                    <div class="flex justify-start items-center gap-1">
                        <Avatar
                            :artist="{
                                id: noty.data.user_id,
                                profile_photo: noty.data.user_profile_photo,
                            }"
                            defaultClass="w-10 h-10 sm:w-12 sm:h-12 aspect-square border"
                        />
                        <div class="flex flex-col justify-center gap-1">
                            <span class="font-bold text-xs tracking-wide">
                                {{ noty.data.user_username }}
                            </span>
                            <span
                                class="text-xs font-normal tracking-wide"
                                v-html="noty.data.message"
                            >
                            </span>
                            <timeago
                                class="text-[10px] font-light tracking-wide text-gray-500"
                                :datetime="noty.data.created_at"
                                :auto-update="60"
                            ></timeago>
                        </div>
                    </div>
                    <div class="max-w-[100px]">
                        <FollowArtistButton
                            @click="markAsRead(noty.id)"
                            v-if="isFollowOrUnfollow(noty.data.type)"
                            :artist="{ id: noty.data.user_id }"
                        />
                        <button
                            class="btn btn-primary btn-sm text-xs px-4 uppercase btn-block"
                            v-else
                            @click="
                                actionButton(
                                    noty.data.url,
                                    noty.id,
                                    noty.data.type
                                )
                            "
                        >
                            {{ setNamebutton(noty.data.type) }}
                        </button>

                        <div
                            v-if="isInvitationCollective(noty.data.type)"
                            class="pt-2 flex gap-2 justify-center"
                        >
                            <button
                                class="btn btn-success btn-sm text-xs px-4 uppercase"
                                @click.stop="confirmAcceptInvitation(noty)"
                            >
                                <i class="fas fa-check text-white"></i>
                            </button>
                            <button
                                class="btn btn-danger btn-sm text-xs px-4 uppercase"
                                @click.stop="confirmDeclineInvitation(noty)"
                            >
                                <i class="fas fa-times text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    </li>
</template>

<script>
import VueTimeago from "vue-timeago";
import FollowArtistButton from "../../artwork/components/FollowArtistButton.vue";
import Avatar from "../../../components/Avatar.vue";
Vue.use(VueTimeago, { name: "Timeago", locale: "es_ES" });

export default {
    name: "Notifications",
    components: { FollowArtistButton, Avatar },

    data() {
        return {
            typeNoty: {
                QUESTION: 1,
                COMMENT: 2,
                ANSWER: 3,
                FOLLOW: 4,
                BUY: 5,
                LIKE_ARTWORK: 6,
                LIKE_RELEASE: 7,
                LIKE_QUESTION: 8,
                LIKE_COLLECTIVE: 9,
                LIKE_COMMENT: 10,
                LIKE_ANSWER: 11,
                LIKE_ARTIST: 12,
                INVITATION_COLLECTIVE: 13,
                DECLINE_INVITATION_COLLECTIVE: 14,
                ACCEPT_INVITATION_COLLECTIVE: 15,
                UNFOLLOW: 16,
            },
            shortNotifications: [],
        };
    },

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
            return this.user?.notifications || [];
        },

        /**
         * no leídas
         */
        unreadNotifications() {
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

    watch: {
        user() {
            this.setNotifications();
        },
    },

    methods: {
        /**
         * Ordenar y mostrar solo 10 notificaciones
         */
        setNotifications() {
            this.shortNotifications = [];

            // ordenar notificaciones por fecha
            this.shortNotifications = this.notifications.sort(
                (a, b) =>
                    new Date(b.data.created_at) - new Date(a.data.created_at)
            );

            // mostrar max 10 notificaciones
            this.shortNotifications = this.shortNotifications.slice(0, 10);
        },

        /**
         * Marca como leída y redirige a la url indicada
         *
         * @param {String} url  Url a la que se redirige
         * @param {Number} id        Id de la notificacion
         * @param {Number} type      Tipo de notificacion
         */
        actionButton(url, id, type = null) {
            if (!this.isInvitationCollective(type)) {
                this.markAsRead(id);
            }

            if (this.$route.path !== url) this.$router.push(url);
        },

        /**
         * Nombre del botón según el tipo de notificacion
         *
         * @param {String} type   Tipo de notificacion
         */
        setNamebutton(type) {
            if (!this.isFollowOrUnfollow(type)) {
                return "Ir";
            }
        },

        /**
         * Valida si es de tipo follow o unfollow
         */
        isFollowOrUnfollow(type) {
            return (
                type === this.typeNoty.FOLLOW || type === this.typeNoty.UNFOLLOW
            );
        },

        /**
         * Si es una invitación a un colectivo
         */
        isInvitationCollective(type) {
            return type === this.typeNoty.INVITATION_COLLECTIVE;
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
            if (!this.unreadNotifications.length) return false;
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
         * Mensaje de confirmación
         * aceptar invitación
         */
        confirmAcceptInvitation(arr) {
            // tomar el id de la url
            const obj = arr.data;
            const collective_id = obj.url.split("/").pop();

            const data = {
                user_id: this.user.id,
                collective_id,
                notification_id: arr.id,
            };

            const dialog = this.confirmedDialog({
                title: "¿Aceptar invitación?",
                text: "Estás a punto de aceptar la invitación al colectivo",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Volver",
            });

            dialog.then((result) => {
                if (result.isConfirmed) {
                    this.acceptInvitation(data);
                }
            });
        },

        /**
         * Acepta la invitación al colectivo
         */
        acceptInvitation(data) {
            this.globalLoading = true;
            this.axios
                .post(this.ep.collectives.acceptInvitation, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        const name = resp.data?.name ?? "";
                        this.notySwal({
                            title: "¡Bienvenido al colectivo!",
                            text: "Ahora eres miembro del colectivo " + name,
                        });

                        this.markAsRead(data.notification_id);
                    }

                    if (resp.status === 204) {
                        this.notySwal({
                            icon: "warning",
                            title: "¡Hubo un problema!",
                            text: "Parece que ya perteneces a este colectivo o no fuiste invitado",
                        });
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Mensaje de confirmación
         * rechazar invitación
         */
        confirmDeclineInvitation(arr) {
            const data = {
                user_id: this.user.id,
                collective_id: arr.data.url.split("/").pop(),
                notification_id: arr.id,
            };

            const dialog = this.confirmedDialog({
                title: "¿Rechazar invitación?",
                text: "Estás a punto de rechazar la invitación al colectivo",
                confirmButtonText: "Rechazar",
                cancelButtonText: "Volver",
            });

            dialog.then((result) => {
                if (result.isConfirmed) {
                    this.declineInvitation(data);
                }
            });
        },

        /**
         * Rechaza la invitación al colectivo
         */
        declineInvitation(data) {
            this.globalLoading = true;
            this.axios
                .post(this.ep.collectives.declineInvitation, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.notySwal({
                            title: "¡Invitación rechazada!",
                            text: "Has rechazado la invitación al colectivo",
                        });

                        this.markAsRead(data.notification_id);
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
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

/* .time {
    font-size: 8px;
    color: #000;
    font-weight: 900;
} */

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
