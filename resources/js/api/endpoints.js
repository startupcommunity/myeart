import API_URL from "../common/config";

// api v1
const API = `${API_URL}api`;

const endpoints = {
    // obras
    artworks: {
        save: `${API}/artworks/create`, // post
        edit: `${API}/artworks/edit/`, // get - params :id
        update: `${API}/artworks/update/`, // put - params :id
        delete: `${API}/artworks/delete/`, // delete - params :id
        getImage: `${API}/artworks/image/`, // get - params :id
        getPublish: `${API}/artworks/publish`, // get
        getUserPublish: `${API}/artworks/user/publish/`, // get - params :id
        getPublishForCategory: `${API}/artworks/publish/category/`, // get - params :id
        liked: `${API}/artworks/liked/`,
        disliked: `${API}/artworks/disliked/`,
        show: `${API}/artworks/show/`,
        slug: `${API}/artworks/slug/`,
        filterPublished: `${API}/artworks/filterPublished`,
        addVisit: `${API}/artworks/addvisit`,
    },

    // direcciones del usuario
    shippingAddress: {
        save: `${API}/shippingAddress/save`, // post
        update: `${API}/shippingAddress/update/`, // put
        delete: `${API}/shippingAddress/delete/`, // delete
        getShippingAddress: `${API}/shippingAddress/getShippingAddress`, // get
    },

    // acceso global
    global: {
        categories: `${API}/categories`, // get
        subcategories: `${API}/subcategories/`, // get
        labels: `${API}/labels/`, // get
    },

    // user
    user: {
        // actualizar profile
        editProfile: `${API}/profile/update-profile`, // put

        // user - seguir artista
        followArtist: `${API}/user/follow-artist`, // post

        // user - dejar de seguir artista
        unfollowArtist: `${API}/user/unfollow-artist`, // post

        // artistas seguidos por el usuario
        getFollowArtists: `${API}/user/get-follow-artists`, // get

        // obras seguidas por el usuario
        getFollowArtworks: `${API}/user/get-follow-artworks`, // get

        // obtiene las publicaciones seguidas por el usuario
        getFollowReleases: `${API}/user/get-follow-releases`, // get

        // obtiene los eventos seguidos por el usuario
        getFollowEvents: `${API}/user/get-follow-events`, // get

        // obtiene los colectivos seguidos por el usuario
        getFollowCollectives: `${API}/user/get-follow-collectives`, // get

        // artistas seguidos por el usuario, info corta y necesaria
        getFASI: `${API}/user/get-follow-artists-short-info`, // get

        // colección de artistas activos
        getArtists: `${API}/user/get-artists`, // get

        // colección de artistas activos, de forma random
        getRandomArtists: `${API}/user/get-random-artists`, // get

        // obtiene todos los datos de un artista (params :id)
        getArtist: `${API}/user/get-artist/`, // get

        // agregar obra a favoritos
        addArtworkToFav: `${API}/user/add-favorite-artwork`, // post

        // eliminar obra de favoritos
        removeArtworkToFav: `${API}/user/remove-favorite-artwork`, // post
    },

    // comentarios
    comments: {
        artworkSave: `${API}/comments/artworks/save`, // post
        artworkAnswerSave: `${API}/comments/artworks/answer/save`, // post
        artworkList: `${API}/comments/artwork-list/`, // get
        addReleaseLike: `${API}/comments/add-release-like`, // post
        deleteReleaselike: `${API}/comments/delete-release-like`, // post
        addAnswerRelease: `${API}/comments/add-release-answer`, // post
    },

    // publicaciones
    releases: {
        // guardar una nueva publicación
        save: `${API}/releases/store`, // post

        // actualiza una publicación
        update: `${API}/releases/update/`, // post

        // elimina una publicación
        delete: `${API}/releases/delete/`, // delete

        // obtiene todas las publicaciones del usuario
        getAllUser: `${API}/releases/get-user-releases`, // get

        // obtiene todas las publicaciones de un artista especifico - {id}
        getAllUserForID: `${API}/releases/get-user-releases/`, // get

        // get publicaciones de artistas seguidos
        followArtists: `${API}/releases/get-follow-artists-releases`, // get

        // agrega un like a una publicación
        like: `${API}/releases/like`, // post

        // elimina un like a una publicación
        dislike: `${API}/releases/dislike`, // post

        // agregar a favoritos la publicación
        addFav: `${API}/releases/add-favorite`, // post

        // eliminar de favoritos la publicación
        removeFav: `${API}/releases/remove-favorite`, // post

        // obtiene los comentarios de una publicación / {id}
        getComment: `${API}/releases/get-comments/`, // get

        // obtiene los comentarios de una publicación por slug / {slug}
        getCommentSlug: `${API}/releases/get-comments-slug/`, // get

        // guarda un comentario en una publicación
        storeComment: `${API}/releases/store-comment`, // post
    },

    // carrito de compras
    carts: {
        // agregar un item al carrito
        addItem: `${API}/cart/add-item`, // post

        // obtiene los artículos del carrito
        getItems: `${API}/cart/get-items`, // get

        // elimina un item del carrito - {id}
        deleteItem: `${API}/cart/delete-item/`, // delete

        // finalizar compra
        finish: `${API}/cart/finish-shop`, // post
    },

    // pedidos - ordenes
    orders: {
        // obtiene los artículos del pedido
        getItems: `${API}/orders/get-items/`, // get

        // obtiene las ordenes del usuario logueado o indicado / {id?}
        getUserOrders: `${API}/orders/get-user-orders/`, // get
    },

    // eventos
    events: {
        // guarda un nuevo evento
        store: `${API}/events/store`, // post

        // devuelve todos los eventos
        getAll: `${API}/events/get-all`, // get

        // devuelve todos los eventos de un usuario / {id}
        getUserEvents: `${API}/events/get-user-events/`, // get

        // agregar a favoritos el evento
        addFav: `${API}/events/add-favorite`, // post

        // eliminar de favoritos el evento
        removeFav: `${API}/events/remove-favorite`, // post

        // agregar un like al evento
        like: `${API}/events/like`, // post

        // eliminar un like al evento
        dislike: `${API}/events/dislike`, // post

        // muestre el detalle de un evento / {id}
        show: `${API}/events/show/`, // get
    },

    // colectivos
    collectives: {
        // guarda un nuevo colectivo
        store: `${API}/collectives/store`, // post

        // actualizar datos planos de un colectivo / {id}
        update: `${API}/collectives/update/`, // put

        // devuelve un colectivo / {id}
        getCollective: `${API}/collectives/get-collective/`, // get

        // actualiza la foto de perfil de un colectivo / {id}
        updateProfilePhoto: `${API}/collectives/update-profile-photo/`, // put

        // actualiza la foto de portada de un colectivo / {id}
        updateFrontPhoto: `${API}/collectives/update-front-photo/`, // put

        // devuelve todos los colectivos de un usuario / {id?}
        // si no se envía el id, devuelve los colectivos del usuario logueado
        // se devuelven todos los colectivos, invitado y administrador
        getUserCollectives: `${API}/collectives/get-user-collectives/`, // get

        // devuelve todas las publicaciones de un colectivo / {id}
        getAllRelease: `${API}/collectives/get-collective-releases/`, // get

        // devuelve las publicaciones de un colectivo filtradas por una opción / {id}
        getReleaseByOption: `${API}/collectives/get-collective-releases-by-option/`, // get

        // envía una invitación a un usuario para unirse a un colectivo / {id}
        sendInvitation: `${API}/collectives/send-invitation`, // post

        // devuelve los miembros de un colectivo / {id}
        members: `${API}/collectives/get-members/`, // get

        // elimina un miembro de un colectivo / {id}
        removeMember: `${API}/collectives/remove-member`, // post

        // devuelve las obras del colectivo / {id}
        artworks: `${API}/collectives/get-artworks/`, // get

        // devuelve las obras del colectivo filtrada por request / {id}
        filterArtworks: `${API}/collectives/get-filters-artworks/`, // get

        // devuelve todos los colectivos creados
        // pueden estar filtrados por request
        getAll: `${API}/collectives/get-all`, // get

        // agrega un like a el colectivo
        like: `${API}/collectives/like`, // post

        // elimina un like del colectivo
        dislike: `${API}/collectives/dislike`, // post

        // seguir un colectivo
        follow: `${API}/collectives/follow`, // post

        // dejar de seguir un colectivo
        unfollow: `${API}/collectives/unfollow`, // post
    },

    notifications: {
        markAsRead: `${API}/notifications/mark-as-read/`, //get
    }
};

export default endpoints;
