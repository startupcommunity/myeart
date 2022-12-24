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
        };
    },

    methods: {
        // getCollective(id) {
        //     const ep = this.ep.collectives.getCollective;
        //     this.globalLoading = true;
        //     this.axios
        //         .get(`${ep + id}`)
        //         .then((response) => {
        //             if (response.status === 200) {
        //                 this.collective = response.data;
        //             }
        //         })
        //         .catch((error) => this.manageError(error))
        //         .finally(() => (this.globalLoading = false));
        // },

        activeSection(section) {
            this.sections = {
                profile: false,
                release: false,
                member: false,
                artwork: false,
            };
            this.sections[section] = true;
        },
    },

    computed: {
        profile() {
            return this.collective?.profile;
        },

        collective() {
            return this.$store.getters.getCollective || {};
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
};
