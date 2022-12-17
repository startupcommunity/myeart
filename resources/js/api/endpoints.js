import API_URL from "../common/config";

// api v1
const API = `${API_URL}api`;

const endpoints = {
    // obras
    artworks: {
        save: `${API}/artworks/create`,
        edit: `${API}/artworks/edit/`,
        update: `${API}/artworks/update/`,
        getImage: `${API}/artworks/image/`,
        getPublish: `${API}/artworks/publish`,
        getUserPublish: `${API}/artworks/user/publish/`,
        getPublishForCategory: `${API}/artworks/publish/category/`,
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
    },

    // eventos
    events: {
        // guarda un nuevo evento
        store: `${API}/events/store`, // post

        // devuelve todos los eventos
        getAll: `${API}/events/get-all`, // get
    },
};

export default endpoints;
