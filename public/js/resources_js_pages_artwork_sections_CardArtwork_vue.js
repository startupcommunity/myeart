"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_sections_CardArtwork_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FollowArtistButton",
  props: {
    artist: {
      type: Object,
      "default": {}
    }
  },
  data: function data() {
    return {
      loadFollow: false
    };
  },
  computed: {
    /**
     * Usuario logueado
     */
    user: function user() {
      return this.$store.getters.getProfile;
    },

    /**
     * Comprueba si el usuario puede seguir al artista
     *
     * NO es posible autoseguirse
     */
    canFollowArtist: function canFollowArtist() {
      var _this$user, _this$artist;

      return ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id) !== ((_this$artist = this.artist) === null || _this$artist === void 0 ? void 0 : _this$artist.id);
    },

    /**
     * Comprueba si ya se sigue al artista seleccionado
     */
    isFollowingArtist: function isFollowingArtist() {
      var _this$user2,
          _this$user2$following,
          _this = this;

      return (_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : (_this$user2$following = _this$user2.following_artists) === null || _this$user2$following === void 0 ? void 0 : _this$user2$following.some(function (follow) {
        return follow.following_id === _this.artist.id;
      });
    },
    isGuest: function isGuest() {
      var _this$user3, _this$user4, _this$user5, _this$user6;

      return ((_this$user3 = this.user) === null || _this$user3 === void 0 ? void 0 : _this$user3.id) === undefined || ((_this$user4 = this.user) === null || _this$user4 === void 0 ? void 0 : _this$user4.id) === null || ((_this$user5 = this.user) === null || _this$user5 === void 0 ? void 0 : _this$user5.id) === "" || ((_this$user6 = this.user) === null || _this$user6 === void 0 ? void 0 : _this$user6.id) === 0;
    }
  },
  methods: {
    /**
     * Seguir o dejar de seguir a un artista
     */
    followArtist: function followArtist() {
      var _this$artist2,
          _this2 = this;

      if (!this.canFollowArtist) {
        this.$noty("No es posible autoseguirte", "error");
        return;
      }

      var data = {
        following_id: (_this$artist2 = this.artist) === null || _this$artist2 === void 0 ? void 0 : _this$artist2.id
      };
      this.loadFollow = true;
      var ep = this.isFollowingArtist ? this.ep.user.unfollowArtist : this.ep.user.followArtist;
      this.axios.post(ep, data).then(function (resp) {
        if (resp.status !== 200) return false;
        var mjs = _this2.isFollowingArtist ? "Dejaste de seguir a este artista" : "Ahora sigues a este artista";

        _this2.$noty(mjs);

        _this2.$store.dispatch("userRequest");
      })["catch"](function (error) {
        return _this2.$manageError(error);
      })["finally"](function () {
        return _this2.loadFollow = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mixins_utilMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/utilMixin */ "./resources/js/mixins/utilMixin.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FollowArtworkButton",
  mixins: [_mixins_utilMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  props: {
    artworkID: {
      type: Number,
      "default": 0,
      description: "ID de la obra a seguir"
    },
    artistID: {
      type: Number,
      "default": 0,
      description: "ID del artista de la obra"
    },
    classIcon: {
      type: String,
      "default": "",
      description: "Clase del icono opcional"
    }
  },
  data: function data() {
    return {
      loadFollow: false
    };
  },
  computed: {
    /**
     * Comprueba si el usuario puede seguir la obra
     *
     * NO es posible auto seguir sus obras
     */
    canFollowArtwork: function canFollowArtwork() {
      var _this$user;

      return ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id) !== this.artistID;
    },

    /**
     * Comprueba si ya se sigue la obra seleccionada
     */
    isFollowingArtwork: function isFollowingArtwork() {
      var _this$followArtworks;

      var id = this.artworkID;
      return (_this$followArtworks = this.followArtworks) === null || _this$followArtworks === void 0 ? void 0 : _this$followArtworks.some(function (fav) {
        return fav.id === id;
      });
    },

    /**
     * Acceder a los getters necesarios
     */
    user: function user() {
      return this.$store.getters.getProfile || {};
    },

    /**
     * Acceder a los getters necesarios
     */
    followArtworks: function followArtworks() {
      return this.$store.getters.getFollowArtworks || [];
    }
  },
  methods: {
    /**
     * Seguir o dejar de seguir a una obra
     */
    followOrUnfollow: function followOrUnfollow() {
      var _this = this;

      if (!this.canFollowArtwork) {
        this.$noty("No es posible auto seguir tus obras", "error");
        return;
      }

      this.loadFollow = true;
      var ep = this.isFollowingArtwork ? this.ep.user.removeArtworkToFav : this.ep.user.addArtworkToFav;
      this.axios.post(ep, {
        artwork_id: this.artworkID
      }).then(function (resp) {
        if (resp.status === 204) {
          _this.$noty(resp.data, "error");

          return;
        }

        if (_this.isFollowingArtwork) {
          _this.$noty("Obra eliminada de favoritos", "success");
        } else {
          _this.$noty("Obra agregada a favoritos", "success");
        }

        _this.$store.dispatch("userFollowArtworks");
      })["catch"](function (error) {
        return _this.$manageError(error);
      })["finally"](function () {
        return _this.loadFollow = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Avatar.vue */ "./resources/js/components/Avatar.vue");
/* harmony import */ var _mixins_utilMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/utilMixin */ "./resources/js/mixins/utilMixin.js");
/* harmony import */ var _components_FollowArtistButton_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/FollowArtistButton.vue */ "./resources/js/pages/artwork/components/FollowArtistButton.vue");
/* harmony import */ var _components_FollowArtworkButton_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FollowArtworkButton.vue */ "./resources/js/pages/artwork/components/FollowArtworkButton.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    FollowArtistButton: _components_FollowArtistButton_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Avatar: _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    FollowArtworkButton: _components_FollowArtworkButton_vue__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  name: "CardArtwork",
  mixins: [_mixins_utilMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  data: function data() {
    return {
      loadLiked: false,
      isLike: false
    };
  },
  mounted: function mounted() {
    this.isLiked();
  },
  props: {
    artwork: {
      type: Object,
      "default": {}
    },
    showProfile: {
      type: Boolean,
      "default": true
    },
    routerLink: {
      type: Boolean,
      "default": true
    },
    classCard: {
      type: String,
      "default": ""
    },
    classImage: {
      type: String,
      "default": ""
    },
    principalClass: {
      type: String,
      "default": "w-full md:w-1/2 lg:w-1/3 mb-10 animate-swing-in-top-fwd"
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)({
    user: "getProfile"
  })), {}, {
    /**
     * devuelve el path del detalle de obra
     */
    getPathDetailArtwork: function getPathDetailArtwork() {
      var _this$artwork;

      return {
        name: "showArtwork",
        params: {
          id: (_this$artwork = this.artwork) === null || _this$artwork === void 0 ? void 0 : _this$artwork.id
        }
      };
    },

    /**
     * Path completo de la foto de portada
     */
    getPathGallery: function getPathGallery() {
      var _this$artwork2, _front_page$;

      var artwork = this.artwork;
      var gallery = (_this$artwork2 = this.artwork) === null || _this$artwork2 === void 0 ? void 0 : _this$artwork2.gallery;
      if (!(artwork !== null && artwork !== void 0 && artwork.gallery.length)) return this.getURLDefaultFrontArtwork;
      var front_page = gallery.filter(function (pic) {
        return pic.front_page === 1;
      });
      return "".concat(this.pathArtworkGallery + ((_front_page$ = front_page[0]) === null || _front_page$ === void 0 ? void 0 : _front_page$.picture));
    },

    /**
     * Devuelve el path completo de la foto de perfil del usuario
     */
    getProfilePhoto: function getProfilePhoto() {
      var _this$artwork3;

      var user = (_this$artwork3 = this.artwork) === null || _this$artwork3 === void 0 ? void 0 : _this$artwork3.user;
      if (!user || !(user !== null && user !== void 0 && user.profile_photo)) return null;
      return "".concat(this.pathProfilePhoto + user.profile_photo);
    }
  }),
  methods: {
    /**
     * Si la obra ha sido likeada para el usuario logueado
     * se muestra en rojo el botón de me gusta
     */
    isLiked: function isLiked() {
      var _this = this;

      this.isLike = this.artwork.likes.some(function (like) {
        return like.user_id === _this.user.id;
      });
    },

    /**
     * Agrega o elimina un me gusta por parte del usuario
     * a la obra seleccionada
     */
    likeOrDislike: function likeOrDislike(id) {
      var _this2 = this;

      this.loadLiked = true;
      var endpoint = this.isLike ? this.ep.artworks.disliked : this.ep.artworks.liked;
      this.axios.post(endpoint + id).then(function (resp) {
        if (resp.status === 200) {
          _this2.isLike = !_this2.isLike;
        }
      })["catch"](function (error) {
        return _this2.$manageError(error);
      })["finally"](function () {
        return _this2.loadLiked = false;
      });
    },

    /**
     * Devuelve las dimensiones de la obra
     */
    getDimensions: function getDimensions(artwork) {
      var _artwork$width, _artwork$large;

      var width = (_artwork$width = artwork.width) !== null && _artwork$width !== void 0 ? _artwork$width : 0;
      var large = (_artwork$large = artwork.large) !== null && _artwork$large !== void 0 ? _artwork$large : 0;
      return "".concat(width + "X" + large + " " + this.artSize);
    },

    /**
     * devuelve el nombre de una categoría de una obra
     */
    getCategoryName: function getCategoryName(categories) {
      return categories.length ? categories[0].name : "";
    },

    /**
     * devuelve el nombre de una sub categoría de una obra
     */
    getSubCategory: function getSubCategory(labels) {
      return labels.length ? labels[0].name : "";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("button", {
    staticClass: "btn btn-primary btn-sm text-xxs px-4 uppercase",
    "class": {
      "btn-dark": _vm.isFollowingArtist
    },
    attrs: {
      disabled: !_vm.canFollowArtist || _vm.loadFollow
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.followArtist.apply(null, arguments);
      }
    }
  }, [_vm.isFollowingArtist ? _c("span", [_vm._v("Dejar de seguir")]) : _c("span", [_vm._v("Seguir")])]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("button", {
    staticClass: "px-2",
    attrs: {
      disabled: !_vm.canFollowArtwork || _vm.loadFollow
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.followOrUnfollow.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-bookmark",
    "class": _defineProperty({
      "text-zinc-900": _vm.isFollowingArtwork,
      "text-gray-400": !_vm.isFollowingArtwork
    }, _vm.classIcon, _vm.classIcon)
  })]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$artwork, _vm$artwork$user, _vm$artwork$total, _vm$artwork2, _vm$artwork2$user, _vm$artwork3;

  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    "class": _vm.principalClass
  }, [_c("div", {
    staticClass: "rounded-md w-full hover:animate-shadow-drop-center relative",
    "class": _vm.classCard
  }, [_vm.routerLink ? _c("router-link", {
    attrs: {
      to: _vm.getPathDetailArtwork
    }
  }, [_c("img", {
    staticClass: "object-cover object-center w-full h-72",
    "class": _vm.classImage,
    attrs: {
      src: _vm.getPathGallery,
      alt: _vm.artwork.title
    }
  })]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col justify-between space-y-8 bg-gray-50"
  }, [_c("div", {
    staticClass: "space-y-2"
  }, [_c("div", {
    staticClass: "w-full px-2"
  }, [_c("h3", {
    staticClass: "text-xl md:text-base xl:text-xl font-semibold tracking-wide text-gray-900 pt-3"
  }, [_vm._v("\n                        " + _vm._s(_vm.artwork.title) + "\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "text-primary text-xs"
  }, [_vm._v("\n                        " + _vm._s(_vm.getDimensions(_vm.artwork)) + "\n                        " + _vm._s(_vm.getCategoryName(_vm.artwork.categories)) + "\n                        " + _vm._s(_vm.getSubCategory(_vm.artwork.labels)) + "\n                    ")])]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap pb-4 px-2 bottom-0 inset-x-0 absolute"
  }, [_c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showProfile,
      expression: "showProfile"
    }],
    staticClass: "flex justify-end items-center"
  }, [_c("Avatar", {
    attrs: {
      artist: (_vm$artwork = _vm.artwork) === null || _vm$artwork === void 0 ? void 0 : _vm$artwork.user,
      custom: "border w-12 h-12"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col pl-2"
  }, [_c("span", {
    staticClass: "py-0"
  }, [_vm._v("\n                                " + _vm._s((_vm$artwork$user = _vm.artwork.user) === null || _vm$artwork$user === void 0 ? void 0 : _vm$artwork$user.name) + "\n                            ")]), _vm._v(" "), _c("FollowArtistButton", {
    staticClass: "w-3/5",
    attrs: {
      artist: _vm.artwork.user
    }
  })], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full border-t border-gray-800 my-4"
  }), _vm._v(" "), _c("div", {
    staticClass: "w-full flex justify-between items-center"
  }, [_c("div", {
    staticClass: "text-gray-900 font-black"
  }, [_vm._v("\n                            " + _vm._s((_vm$artwork$total = _vm.artwork.total) !== null && _vm$artwork$total !== void 0 ? _vm$artwork$total : 0) + "\n                            " + _vm._s(_vm.euro) + "\n                        ")]), _vm._v(" "), _c("div", {
    staticClass: "text-gray-400"
  }, [_c("FollowArtworkButton", {
    attrs: {
      artistID: (_vm$artwork2 = _vm.artwork) === null || _vm$artwork2 === void 0 ? void 0 : (_vm$artwork2$user = _vm$artwork2.user) === null || _vm$artwork2$user === void 0 ? void 0 : _vm$artwork2$user.id,
      artworkID: (_vm$artwork3 = _vm.artwork) === null || _vm$artwork3 === void 0 ? void 0 : _vm$artwork3.id
    }
  }), _vm._v(" "), _c("button", {
    staticClass: "hover:text-gray-700",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.likeOrDislike(_vm.artwork.id);
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-heart",
    "class": _vm.isLike ? "p-1 text-red-800" : ""
  })])], 1)])])])])], 1), _vm._v(" "), _c("loading-overlay", {
    attrs: {
      active: _vm.loadLiked,
      "is-full-page": true,
      loader: "bars"
    }
  })], 1);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtistButton.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtistButton.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FollowArtistButton.vue?vue&type=template&id=4f6806ef& */ "./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef&");
/* harmony import */ var _FollowArtistButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FollowArtistButton.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FollowArtistButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__.render,
  _FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/FollowArtistButton.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtworkButton.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtworkButton.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FollowArtworkButton.vue?vue&type=template&id=03b1a7c0& */ "./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0&");
/* harmony import */ var _FollowArtworkButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FollowArtworkButton.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FollowArtworkButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__.render,
  _FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/FollowArtworkButton.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/sections/CardArtwork.vue":
/*!*************************************************************!*\
  !*** ./resources/js/pages/artwork/sections/CardArtwork.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardArtwork.vue?vue&type=template&id=13a5bf32& */ "./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32&");
/* harmony import */ var _CardArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardArtwork.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/sections/CardArtwork.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtistButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FollowArtistButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtistButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtworkButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FollowArtworkButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtworkButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardArtwork.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtistButton_vue_vue_type_template_id_4f6806ef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FollowArtistButton.vue?vue&type=template&id=4f6806ef& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtistButton.vue?vue&type=template&id=4f6806ef&");


/***/ }),

/***/ "./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FollowArtworkButton_vue_vue_type_template_id_03b1a7c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FollowArtworkButton.vue?vue&type=template&id=03b1a7c0& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FollowArtworkButton.vue?vue&type=template&id=03b1a7c0&");


/***/ }),

/***/ "./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardArtwork_vue_vue_type_template_id_13a5bf32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardArtwork.vue?vue&type=template&id=13a5bf32& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/sections/CardArtwork.vue?vue&type=template&id=13a5bf32&");


/***/ })

}]);