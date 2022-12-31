<template>
    <div class="text-center">
        <v-dialog v-model="show" width="600" persistent scrollable>
            <v-card>
                <v-card-text>
                    <div class="py-5">
                        <h1 class="text-zinc-900 font-bold text-lg">
                            Agregar miembro al colectivo
                        </h1>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-center w-full">
                            <v-text-field
                                label="Buscar por correo o nombre"
                                filled
                                color="#B2794C"
                                @input="search"
                                class="rounded-md"
                            ></v-text-field>
                        </div>

                        <div class="md:container">
                            <LoadingTailwind v-if="globalLoading" />
                            <div class="flex flex-wrap" v-else>
                                <div
                                    v-for="artist in friends"
                                    :key="artist.id"
                                    class="mb-5 w-full"
                                >
                                    <div
                                        class="flex flex-col md:flex-row justify-md-between items-center gap-3"
                                    >
                                        <div
                                            class="flex justify-start gap-2 items-center"
                                        >
                                            <Avatar
                                                :artist="artist"
                                                custom="w-12 h-14 object-cover object-center w-full h-full rounded-full border aspect-square"
                                            />
                                            <div
                                                class="flex flex-col justify-center"
                                            >
                                                <span
                                                    class="text-zinc-900 font-bold text-sm"
                                                >
                                                    {{ artist.name }}
                                                </span>
                                                <span
                                                    class="text-zinc-900 font-light text-sm"
                                                >
                                                    {{ artist.email }}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <v-btn
                                                color="#B2794C"
                                                @click.stop="
                                                    sendInvitation(artist)
                                                "
                                                outlined
                                                small
                                                :disabled="globalLoading"
                                                :loading="artist.loading"
                                                v-if="!hasInvitation(artist)"
                                            >
                                                Agregar
                                            </v-btn>
                                            <v-btn
                                                outlined
                                                small
                                                disabled
                                                color="grey darken-4"
                                                v-else
                                                class="text-zinc-900"
                                            >
                                                <span
                                                    v-if="isPending(artist)"
                                                    class="text-blue-600"
                                                >
                                                    Invitación enviada
                                                </span>
                                                <span
                                                    v-else-if="isAccept(artist)"
                                                    class="text-green-600"
                                                >
                                                    Invitación aceptada
                                                </span>
                                                <span
                                                    v-else-if="
                                                        isRejected(artist)
                                                    "
                                                    class="text-red-600"
                                                >
                                                    Invitación rechazada
                                                </span>
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full flex justify-center gap-5">
                        <v-btn
                            depressed
                            large
                            @click.stop="$emit('close')"
                            :disabled="globalLoading"
                        >
                            Cancelar
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Avatar from "../../../components/Avatar.vue";
import LoadingTailwind from "../../../components/LoadingTailwind.vue";

const status = {
    PENDING: 1,
    ACCEPTED: 2,
    REJECTED: 3,
};

export default {
    name: "AddMemberModal",
    components: { Avatar, LoadingTailwind },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        collectiveID: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            friends: [],
            original: [],
        };
    },

    watch: {
        show(val) {
            if (val) {
                this.getFriends();
            }
        },
    },

    methods: {
        /**
         * Buscar amigos en el array original
         *
         * @param {String} event    Texto a buscar
         */
        search(event) {
            const text = event.toString().toLowerCase();

            if (text.length > 0) {
                this.friends = this.original.filter((friend) => {
                    return (
                        friend.name.toLowerCase().includes(text) ||
                        friend.email.toLowerCase().includes(text)
                    );
                });
            } else {
                this.friends = JSON.parse(JSON.stringify(this.original));
            }
        },

        /**
         * Verifica si el usuario ya fue invitado a este colectivo
         */
        hasInvitation(friend) {
            const invitations = friend.collective_invitations || [];

            return invitations.some((invitation) => {
                return invitation.collective_id === this.collectiveID;
            });
        },

        /**
         * Verifica si la invitación esta pendiente
         */
        isPending(friend) {
            const invitations = friend.collective_invitations || [];

            return invitations.some((invitation) => {
                return (
                    invitation.collective_id === this.collectiveID &&
                    invitation.status === status.PENDING
                );
            });
        },

        /**
         * Verifica si la invitación fue aceptada
         */
        isAccept(friend) {
            const invitations = friend.collective_invitations || [];

            return invitations.some((invitation) => {
                return (
                    invitation.collective_id === this.collectiveID &&
                    invitation.status === status.ACCEPTED
                );
            });
        },

        /**
         * Verifica si la invitación fue rechazada
         */
        isRejected(friend) {
            const invitations = friend.collective_invitations || [];

            return invitations.some((invitation) => {
                return (
                    invitation.collective_id === this.collectiveID &&
                    invitation.status === status.REJECTED
                );
            });
        },

        /**
         * Devuelve los artistas seguidos por el usuario,
         * con la info corta y justa
         */
        getFriends() {
            this.globalLoading = true;
            const ep = this.ep.user.getFASI;
            this.friends = [];

            this.axios
                .get(ep)
                .then((resp) => {
                    this.friends = resp.data;

                    this.friends = this.friends.map((friend) => {
                        return friend.following;
                    });

                    this.original = JSON.parse(JSON.stringify(this.friends));
                })
                .catch((error) => this.manageError(error))
                .finally(() => (this.globalLoading = false));
        },

        /**
         * Enviar invitación al usuario
         *
         * @param {Object} artist
         */
        sendInvitation(artist) {
            const ep = this.ep.collectives.sendInvitation;
            const data = {
                user_id: artist.id,
                collective_id: this.collectiveID,
            };

            this.globalLoading = true;
            artist.loading = true;

            this.axios
                .post(ep, data)
                .then((resp) => {
                    if (resp.status === 201) {
                        this.noty("Invitación enviada");
                        this.getFriends();
                        return;
                    }

                    if (resp.status === 204) {
                        this.noty("Ya fue enviada la invitación", "warning");
                    }
                })
                .catch((error) => this.manageError(error))
                .finally(() => {
                    this.globalLoading = false;
                    artist.loading = false;
                });
        },
    },
};
</script>
