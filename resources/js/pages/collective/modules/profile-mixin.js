/**
 * mixin para el manejo de los perfiles de los colectivos
 * de los usuarios
 */
export default {
    data() {
        return {
            // secciones de la vista
            sections: {
                profile: false,
                release: false,
                member: false,
                artwork: false,
            },

            // control para abrir/cerra el modal de imagen de perfil
            imageModal: false,
        };
    },

    computed: {
        profile() {
            return this.collective?.profile;
        },

        collective() {
            return this.$store.getters.getCollective || {};
        },

        user() {
            return this.$store.getters.getProfile;
        },

        isOwner() {
            return this.collective?.user_id === this.user?.id;
        },
    },

    watch: {
        sections: {
            handler(val) {
                if (val.profile) {
                    const id = this.$route.params.id;
                    this.$store.dispatch("getUserCollective", id);
                }
            },
            deep: true,
        },
    },

    methods: {
        activeSection(section) {
            this.sections = {
                profile: false,
                release: false,
                member: false,
                artwork: false,
            };
            this.sections[section] = true;
        },

        openImageModal() {
            this.imageModal = true;
        },
    },
};
