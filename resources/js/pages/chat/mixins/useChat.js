const sizes = {
    mobile: 768,
    tablet: 1024,
    desktop: 1500,
};

export default {
    computed: {
        authUser() {
            return this.$store.getters.getProfile;
        },

        globalChats: {
            get() {
                return this.$store.getters.chats;
            },
        },
    },

    methods: {
        /**
         * Abrir chat de conversación
         */
        openChat(artist) {
            // verificar si el chat ya esta agregado
            const chat = this.globalChats.find((c) => c.id === artist.id);
            if (chat) return false;

            // si es el mismo usuario, no abrir el chat
            if (artist.id === this.authUser.id) return false;

            // add  chat
            this.$store.dispatch("addChat", {
                id: artist.id,
                isOpen: true,
                artist,
            });

            // ajustar la cantidad de chats a mostrar
            this.adjustChats();
        },

        /**
         * Ajusta la cantidad de chats a mostrar
         */
        adjustChats() {
            // si es menor a 768px, dejar el ultimo chat
            if (window.innerWidth < sizes.mobile) {
                this.$store.dispatch("reduceChats", 1);
            }

            // si es menor a 768px, dejar solo los últimos 2 chats
            if (
                window.innerWidth > sizes.mobile &&
                window.innerWidth < sizes.tablet
            ) {
                this.$store.dispatch("reduceChats", 2);
            }

            // si es mayor a 1024px, dejar solo los últimos 3 chats
            if (
                window.innerWidth > sizes.tablet &&
                window.innerWidth < sizes.desktop
            ) {
                this.$store.dispatch("reduceChats", 3);
            }

            // si es mayor a 1500px, dejar solo los últimos 4 chats
            if (window.innerWidth > sizes.desktop) {
                this.$store.dispatch("reduceChats", 4);
            }
        },
    },
};
