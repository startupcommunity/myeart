"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_release_components_ReleaseCommentsDialog_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Avatar",
  props: {
    artist: {
      type: Object,
      "default": function _default() {},
      required: true
    },
    defaultClass: {
      type: String,
      "default": "border w-10 h-10"
    },
    custom: {
      type: String,
      "default": ""
    }
  },
  computed: {
    /**
     * Devuelve la foto de perfil
     */
    profilePhoto: function profilePhoto() {
      var _this$artist;

      var photo = (_this$artist = this.artist) === null || _this$artist === void 0 ? void 0 : _this$artist.profile_photo; // path por defecto @globalMixin

      if (!photo) return this.getURLDefaultProfilePhoto; // path en el servidor @globalMixin

      return "".concat(this.pathProfilePhoto + photo);
    },

    /**
     * Devuelve el path del perfil del artista
     */
    getPathProfile: function getPathProfile() {
      var _this$artist2;

      return {
        name: "showArtist",
        params: {
          id: (_this$artist2 = this.artist) === null || _this$artist2 === void 0 ? void 0 : _this$artist2.id
        }
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Avatar.vue */ "./resources/js/components/Avatar.vue");
/* harmony import */ var _utils_rulesCommentMixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/rulesCommentMixin */ "./resources/js/pages/release/utils/rulesCommentMixin.js");
 // util rules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CardComment",
  mixins: [_utils_rulesCommentMixin__WEBPACK_IMPORTED_MODULE_1__["default"]],
  components: {
    Avatar: _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    comment: {
      type: Object,
      "default": function _default() {}
    },
    owner: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      liked: false,
      loading: false,
      answer: false,
      releaseAnswer: "",
      likes: 0
    };
  },
  mounted: function mounted() {
    this.getLikes();
    this.isLiked();
  },
  computed: {
    /**
     * Devuelve del creador del comentario
     */
    getImage: function getImage() {
      var _this$comment, _this$comment$creator;

      var image = (_this$comment = this.comment) === null || _this$comment === void 0 ? void 0 : (_this$comment$creator = _this$comment.creator) === null || _this$comment$creator === void 0 ? void 0 : _this$comment$creator.profile_photo;
      if (!image) return this.getDefaultImageRelease;
      return "".concat(this.pathProfilePhoto + image);
    },

    /**
     * Devuelve el creador del comentario
     */
    creator: function creator() {
      var _this$comment2;

      return ((_this$comment2 = this.comment) === null || _this$comment2 === void 0 ? void 0 : _this$comment2.user) || {};
    },

    /**
     * Usuario logueado
     */
    user: function user() {
      return this.$store.getters.getProfile;
    },

    /**
     * Respuesta del comentario
     */
    getAnswer: function getAnswer() {
      var _this$comment3;

      return ((_this$comment3 = this.comment) === null || _this$comment3 === void 0 ? void 0 : _this$comment3.answer) || null;
    },

    /**
     * Verifica si el usuario logueado es el creador de la publicación
     *
     * si es asi, puede responder comentarios
     */
    isOwner: function isOwner() {
      var _this$user, _this$owner;

      return ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id) === ((_this$owner = this.owner) === null || _this$owner === void 0 ? void 0 : _this$owner.id);
    },

    /**
     * verifica si puede responder el comentario
     *
     * puede responder si:
     * 1. es el creador de la publicación
     * 2. no tiene una respuesta
     */
    canAnswer: function canAnswer() {
      return this.isOwner && !this.getAnswer;
    }
  },
  filters: {
    /**
     * Devuelve el tiempo transcurrido desde la fecha
     * que se creo el comentario en formato 24H
     *
     * ejemplo: hace 1 H
     */
    date: function date(value) {
      var date = new Date(value);
      var now = new Date();
      var diff = now.getTime() - date.getTime();
      var diffDays = Math.floor(diff / (1000 * 3600 * 24));
      var diffHours = Math.floor(diff / (1000 * 3600));
      var diffMinutes = Math.floor(diff / (1000 * 60));
      var diffSeconds = Math.floor(diff / 1000);
      if (diffDays > 0) return "".concat(diffDays, "D");
      if (diffHours > 0) return "".concat(diffHours, "H");
      if (diffMinutes > 0) return "".concat(diffMinutes, "M");
      if (diffSeconds > 0) return "".concat(diffSeconds, "S");
      return "1S";
    }
  },
  methods: {
    /**
     * Agrega un like al comentario
     */
    addOrDeleteLike: function addOrDeleteLike() {
      var _this = this;

      var ep = this.liked ? this.ep.comments.deleteReleaselike : this.ep.comments.addReleaseLike;
      var data = {
        comment_id: this.comment.id,
        user_id: this.user.id
      }; // request

      this.axios.post(ep, data).then(function () {
        _this.liked = !_this.liked; // aumenta o disminuye el numero de likes

        _this.liked ? _this.likes++ : _this.likes--;
      })["catch"](function (error) {
        return _this.manageError(error);
      });
    },

    /**
     * Devuelve el numero de likes del comentario
     */
    getLikes: function getLikes() {
      var _this$comment4, _this$comment4$likes;

      this.likes = ((_this$comment4 = this.comment) === null || _this$comment4 === void 0 ? void 0 : (_this$comment4$likes = _this$comment4.likes) === null || _this$comment4$likes === void 0 ? void 0 : _this$comment4$likes.length) || 0;
    },

    /**
     * verifica si el usuario le dio like al comentario
     */
    isLiked: function isLiked() {
      var _this$comment5, _this$user2;

      var likes = ((_this$comment5 = this.comment) === null || _this$comment5 === void 0 ? void 0 : _this$comment5.likes) || [];
      var userID = ((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.id) || 0;
      this.liked = likes.some(function (like) {
        return like.user_id === userID;
      });
    },

    /**
     * muestra la caja de texto para responder el comentario
     */
    showTextFieldAnswer: function showTextFieldAnswer() {
      this.answer = true;
    },

    /**
     * Agrega una respuesta al comentario
     */
    addAnswer: function addAnswer() {
      var _this$user3,
          _this2 = this;

      // validar formulario
      if (!this.$refs.formAnswer.validate()) return;

      if (!((_this$user3 = this.user) !== null && _this$user3 !== void 0 && _this$user3.id)) {
        this.noty("Debes iniciar sesión para poder responder", "warning");
        return;
      }

      this.loading = true;
      var data = {
        comment_id: this.comment.id,
        user_id: this.user.id,
        answer: this.releaseAnswer
      }; // request

      this.axios.post(this.ep.comments.addAnswerRelease, data).then(function () {
        _this2.$emit("addAnswer");

        _this2.noty("Tu respuesta agregada ha sido publicada");

        _this2.releaseAnswer = "";
        _this2.answer = false;
      })["catch"](function (error) {
        return _this2.manageError(error);
      })["finally"](function () {
        return _this2.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Avatar.vue */ "./resources/js/components/Avatar.vue");
/* harmony import */ var _CardComment_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardComment.vue */ "./resources/js/pages/release/components/CardComment.vue");
/* harmony import */ var _mixins_utilMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/utilMixin */ "./resources/js/mixins/utilMixin.js");
/* harmony import */ var _utils_rulesCommentMixin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/rulesCommentMixin */ "./resources/js/pages/release/utils/rulesCommentMixin.js");

 // mixin utilMixin

 // util rules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ReleaseCommentsDialog",
  mixins: [_mixins_utilMixin__WEBPACK_IMPORTED_MODULE_2__["default"], _utils_rulesCommentMixin__WEBPACK_IMPORTED_MODULE_3__["default"]],
  components: {
    Avatar: _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    CardComment: _CardComment_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    show: {
      type: Boolean,
      "default": false
    },
    releaseID: {
      type: Number,
      "default": 0
    }
  },
  data: function data() {
    return {
      comments: [],
      question: "",
      release: {},
      loading: false
    };
  },
  watch: {
    show: function show() {
      if (this.show) {
        this.getComments();
      }
    }
  },
  computed: {
    /**
     * Devuelve la imagen de la publicación
     */
    getImage: function getImage() {
      var _this$release;

      var image = (_this$release = this.release) === null || _this$release === void 0 ? void 0 : _this$release.image;
      if (!image) return this.getDefaultImageRelease;
      return "".concat(this.pathReleaseImage + image);
    },

    /**
     * Devuelve el creador de la publicación
     */
    creator: function creator() {
      var _this$release2;

      return ((_this$release2 = this.release) === null || _this$release2 === void 0 ? void 0 : _this$release2.creator) || {};
    },

    /**
     * devuelve los calificativos del artista
     * según las categorías de sus obras
     *
     * limitar solo a 1
     */
    getNameQualified: function getNameQualified() {
      return this.getArtistQualifying(this.creator, null, true);
    },

    /**
     * Evalúa el text de la publicación, si tiene hashtag lo convierte en link
     */
    getText: function getText() {
      var _this$release3;

      // acceder al filter de vue para convertir el texto en link
      var text = (_this$release3 = this.release) === null || _this$release3 === void 0 ? void 0 : _this$release3.text;
      if (!text) return "";
      return this.hashTag(text);
    },

    /**
     * Numero de likes de la publicación
     */
    likes: function likes() {
      var _this$release4, _this$release4$likes;

      return ((_this$release4 = this.release) === null || _this$release4 === void 0 ? void 0 : (_this$release4$likes = _this$release4.likes) === null || _this$release4$likes === void 0 ? void 0 : _this$release4$likes.length) || 0;
    },

    /**
     * si hay likes devuelve el texto:
     * Les gusta a user1, user2 y {count} personas más
     *
     * sino devuelve:
     * Por ahora no hay likes
     */
    textLikes: function textLikes() {
      var _this$release5, _this$release5$likes;

      var likes = this.likes;
      if (!likes) return "Por ahora no hay likes";
      var firstLikes = (_this$release5 = this.release) === null || _this$release5 === void 0 ? void 0 : (_this$release5$likes = _this$release5.likes) === null || _this$release5$likes === void 0 ? void 0 : _this$release5$likes.slice(0, 2);
      var count = likes - 2;
      var text = firstLikes.map(function (like) {
        var _like$user;

        return (_like$user = like.user) === null || _like$user === void 0 ? void 0 : _like$user.name;
      }).join(", ");
      var textOne = "Les gusta a ".concat(text, " y ").concat(count, " personas m\xE1s");
      var textTwo = "Le gusta a ".concat(text);
      return count > 0 ? textOne : textTwo;
    },

    /**
     * Usuario logueado
     */
    user: function user() {
      return this.$store.getters.getProfile;
    },

    /**
     * verifica si estamos en modo mobile
     */
    isMobile: function isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },

    /**
     * verifica si puede publicar un comentario
     *
     * para que pueda comentar:
     * 1. Debe estar logueado
     * 2. No debe ser el creador de la publicación
     */
    canComment: function canComment() {
      return this.user && this.user.id !== this.creator.id;
    }
  },
  methods: {
    /**
     * Obtiene los comentarios de la publicación
     */
    getComments: function getComments() {
      var _this = this;

      this.loading = true;
      this.axios.get(this.ep.releases.getComment + this.releaseID).then(function (resp) {
        // ordenar por fecha
        _this.comments = resp.data.comments.sort(function (a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        }); // la publicación actualizada

        _this.release = resp.data;
      })["catch"](function (error) {
        return _this.manageError(error);
      })["finally"](function () {
        return _this.loading = false;
      });
    },

    /**
     * Crea un comentario
     */
    createComment: function createComment() {
      var _this2 = this;

      // validate formAnswer
      if (!this.$refs.formComment.validate()) {
        return;
      }

      this.loading = true;
      var data = {
        release_id: this.release.id,
        user_id: this.user.id,
        comment: this.question
      };
      this.axios.post(this.ep.releases.storeComment, data).then(function () {
        _this2.noty("Tu comentario ha sido publicado");

        _this2.question = "";

        _this2.$refs.formComment.resetValidation();

        _this2.getComments();
      })["catch"](function (error) {
        return _this2.manageError(error);
      })["finally"](function () {
        return _this2.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=template&id=62781b04&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=template&id=62781b04& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("router-link", {
    attrs: {
      to: _vm.getPathProfile
    }
  }, [_c("img", {
    staticClass: "rounded-full",
    "class": _vm.custom || _vm.defaultClass,
    attrs: {
      src: _vm.profilePhoto
    }
  })]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$creator, _vm$comment, _vm$comment2, _vm$getAnswer, _vm$getAnswer2, _vm$getAnswer2$user, _vm$getAnswer3, _vm$getAnswer4;

  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex justify-between items-start"
  }, [_c("div", [_c("div", {
    staticClass: "flex justify-start items-start"
  }, [_c("Avatar", {
    attrs: {
      artist: _vm.creator,
      custom: "w-8 h-8 md:w-14 md:h-14 border"
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-start"
  }, [_c("div", {
    staticClass: "flex flex-col items-start pl-2"
  }, [_c("div", {
    staticClass: "text-sm font-medium text-zinc-900"
  }, [_vm._v("\n                " + _vm._s((_vm$creator = _vm.creator) === null || _vm$creator === void 0 ? void 0 : _vm$creator.name) + "\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "text-xs text-zinc-400 w-52 md:w-60"
  }, [_vm._v("\n                " + _vm._s((_vm$comment = _vm.comment) === null || _vm$comment === void 0 ? void 0 : _vm$comment.comment) + "\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-row justify-start gap-3 items-center"
  }, [_c("span", {
    staticClass: "text-xs text-zinc-400"
  }, [_vm._v("\n                    " + _vm._s(_vm._f("date")((_vm$comment2 = _vm.comment) === null || _vm$comment2 === void 0 ? void 0 : _vm$comment2.created_at)) + "\n                ")]), _vm._v(" "), _vm.canAnswer ? _c("button", {
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.showTextFieldAnswer.apply(null, arguments);
      }
    }
  }, [_c("span", {
    staticClass: "text-xs font-bold text-zinc-900"
  }, [_vm._v("\n                        Responder\n                    ")])]) : _vm._e()]), _vm._v(" "), _vm.answer ? _c("div", {
    staticClass: "w-full"
  }, [_c("v-form", {
    ref: "formAnswer",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.addAnswer.apply(null, arguments);
      }
    },
    model: {
      value: _vm.isFormValid,
      callback: function callback($$v) {
        _vm.isFormValid = $$v;
      },
      expression: "isFormValid"
    }
  }, [_c("div", {
    staticClass: "flex flex-col justify-start"
  }, [_c("div", {
    staticClass: "w-full"
  }, [_c("v-text-field", {
    staticClass: "w-full",
    attrs: {
      label: "Añade una respuesta..",
      color: "#B2794C",
      rules: _vm.rulesComment
    },
    model: {
      value: _vm.releaseAnswer,
      callback: function callback($$v) {
        _vm.releaseAnswer = $$v;
      },
      expression: "releaseAnswer"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "flex flex-row justify-start gap-3"
  }, [_c("button", {
    attrs: {
      type: "submit",
      disabled: !_vm.isFormValid || _vm.loading
    }
  }, [_c("span", {
    staticClass: "text-primary text-xs"
  }, [_vm._v("\n                                    Responder\n                                ")])]), _vm._v(" "), _c("button", {
    attrs: {
      type: "button",
      disabled: !_vm.isFormValid || _vm.loading
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        _vm.answer = false;
      }
    }
  }, [_c("span", {
    staticClass: "text-primary text-xs"
  }, [_vm._v("\n                                    Cancelar\n                                ")])])])])])], 1) : _vm._e(), _vm._v(" "), _vm.getAnswer ? _c("div", {
    staticClass: "w-full pt-2"
  }, [_c("div", {
    staticClass: "flex flex-row justify-start items-center"
  }, [_c("div", {
    staticClass: "flex flex-col justify-start items-start"
  }, [_c("div", {
    staticClass: "text-xs text-zinc-900 flex flex-row justify-start"
  }, [_c("Avatar", {
    attrs: {
      artist: (_vm$getAnswer = _vm.getAnswer) === null || _vm$getAnswer === void 0 ? void 0 : _vm$getAnswer.user,
      custom: "w-8 h-8 border"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col justify-start pl-2"
  }, [_c("span", [_vm._v("\n                                    " + _vm._s((_vm$getAnswer2 = _vm.getAnswer) === null || _vm$getAnswer2 === void 0 ? void 0 : (_vm$getAnswer2$user = _vm$getAnswer2.user) === null || _vm$getAnswer2$user === void 0 ? void 0 : _vm$getAnswer2$user.name) + "\n                                ")]), _vm._v(" "), _c("div", {
    staticClass: "text-xs text-zinc-400"
  }, [_vm._v("\n                                    " + _vm._s((_vm$getAnswer3 = _vm.getAnswer) === null || _vm$getAnswer3 === void 0 ? void 0 : _vm$getAnswer3.answer) + "\n                                ")]), _vm._v(" "), _c("div", {
    staticClass: "text-xs text-zinc-400"
  }, [_vm._v("\n                                    " + _vm._s(_vm._f("date")((_vm$getAnswer4 = _vm.getAnswer) === null || _vm$getAnswer4 === void 0 ? void 0 : _vm$getAnswer4.created_at)) + "\n                                ")])])], 1)])])]) : _vm._e()])]), _vm._v(" "), _c("div", [_c("div", {
    staticClass: "flex justify-end items-start"
  }, [_c("button", {
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.addOrDeleteLike.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-heart text-base",
    "class": {
      "text-red-600": _vm.likes,
      "text-gray-500": !_vm.likes
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "text-xs text-zinc-900"
  }, [_vm._v("\n                    " + _vm._s(_vm.likes) + "\n                ")])])])])]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$creator;

  var _vm = this,
      _c = _vm._self._c;

  return _c("v-row", {
    attrs: {
      justify: "center"
    }
  }, [_c("loading-overlay", {
    attrs: {
      active: _vm.loading,
      "is-full-page": true,
      loader: "bars"
    }
  }), _vm._v(" "), _c("v-dialog", {
    attrs: {
      persistent: "",
      "max-width": "1200",
      fullscreen: _vm.isMobile,
      "hide-overlay": _vm.isMobile
    },
    model: {
      value: _vm.show,
      callback: function callback($$v) {
        _vm.show = $$v;
      },
      expression: "show"
    }
  }, [_c("v-card", {
    staticClass: "bg-white"
  }, [_c("div", {
    staticClass: "flex flex-wrap justify-center h-full p-3"
  }, [_c("div", {
    staticClass: "w-full md:w-3/5 md:min-h-[600px]"
  }, [_c("img", {
    staticClass: "w-full h-full object-cover object-center",
    attrs: {
      src: _vm.getImage,
      alt: "imagen-publicación"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-2/5 min-h-min md:pl-8 md:pr-2"
  }, [_c("div", {
    staticClass: "flex flex-col justify-between h-full md:shadow-[5px_3px_5px_-4px_rgba(0,0,0,0.1)] md:px-3 pt-2"
  }, [_c("div", [_c("div", {
    staticClass: "flex flex-row justify-between items-center border-b pb-3 border-gray-300"
  }, [_c("div", {
    staticClass: "flex flex-row justify-start items-center"
  }, [_c("Avatar", {
    attrs: {
      artist: _vm.creator,
      custom: "w-12 h-12 border"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "ml-2"
  }, [_c("div", {
    staticClass: "font-semibold text-gray-900 text-xs"
  }, [_c("div", {
    staticClass: "pb-1"
  }, [_vm._v("\n                                                " + _vm._s((_vm$creator = _vm.creator) === null || _vm$creator === void 0 ? void 0 : _vm$creator.name) + "\n                                            ")]), _vm._v(" "), _c("div", [_c("span", {
    staticClass: "text-xs"
  }, [_vm._v("\n                                                    " + _vm._s(_vm.getNameQualified) + "\n                                                ")])])])])], 1), _vm._v(" "), _c("div", [_c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        return _vm.$emit("close-comments");
      }
    }
  }, [_c("i", {
    staticClass: "fa-solid fa-times text-gray-400"
  })])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "font-bold text-xs py-3 border-b border-gray-300"
  }, [_c("span", {
    staticClass: "font-normal",
    domProps: {
      innerHTML: _vm._s(_vm.getText)
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "block md:hidden py-3 border-b border-gray-300"
  }, [_c("span", {
    staticClass: "text-xs text-zinc-400"
  }, [_vm._v("\n                                    hay\n                                    "), _c("span", {
    staticClass: "font-extra-bold"
  }, [_vm._v("\n                                        " + _vm._s(_vm.comments.length) + "\n                                    ")]), _vm._v("\n                                    comentarios en esta publicación\n                                ")])]), _vm._v(" "), _c("div", {
    staticClass: "overflow-y-auto h-60 md:h-80 pr-2"
  }, _vm._l(_vm.comments, function (comment) {
    return _c("div", {
      key: comment.id,
      staticClass: "flex flex-col space-y-3 py-3 border-b border-gray-300"
    }, [_c("CardComment", {
      attrs: {
        comment: comment,
        owner: _vm.creator
      },
      on: {
        addAnswer: _vm.getComments
      }
    })], 1);
  }), 0), _vm._v(" "), _c("div", {
    staticClass: "flex items-center justify-start border-b border-gray-300 py-3 md:pl-3"
  }, [_c("i", {
    staticClass: "fa-regular fa-heart fa-2x cursor-pointer",
    "class": {
      "text-red-600": _vm.likes,
      "text-gray-500": !_vm.likes
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "font-bold text-xs pl-2"
  }, [_vm._v("\n                                    " + _vm._s(_vm.textLikes) + "\n                                ")])])]), _vm._v(" "), _vm.canComment ? _c("v-form", {
    ref: "formComment",
    attrs: {
      "lazy-validation": ""
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.createComment.apply(null, arguments);
      }
    },
    model: {
      value: _vm.isFormValid,
      callback: function callback($$v) {
        _vm.isFormValid = $$v;
      },
      expression: "isFormValid"
    }
  }, [_c("div", {
    staticClass: "flex justify-end items-end p-0"
  }, [_c("div", {
    staticClass: "flex flex-wrap justify-between items-center pt-3"
  }, [_c("div", {
    staticClass: "w-4/5"
  }, [_c("div", {
    staticClass: "flex flex-row justify-start items-center"
  }, [_c("i", {
    staticClass: "fa-regular fa-face-smile text-zinc-800"
  }), _vm._v(" "), _c("div", {
    staticClass: "ml-2 w-full"
  }, [_c("v-text-field", {
    staticClass: "w-full",
    attrs: {
      label: "Añade un comentario..",
      color: "#B2794C",
      rules: _vm.rulesComment
    },
    model: {
      value: _vm.question,
      callback: function callback($$v) {
        _vm.question = $$v;
      },
      expression: "question"
    }
  })], 1)])]), _vm._v(" "), _c("div", {
    staticClass: "w-1/5 flex justify-end"
  }, [_c("button", {
    attrs: {
      type: "submit",
      disabled: !_vm.isFormValid || _vm.loading
    }
  }, [_c("span", {
    staticClass: "text-primary text-xs"
  }, [_vm._v("\n                                                Publicar\n                                            ")])])])])])]) : _vm._e()], 1)])])])], 1)], 1);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/mixins/utilMixin.js":
/*!******************************************!*\
  !*** ./resources/js/mixins/utilMixin.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: {
    /**
     * Fecha máxima permitida para el picker de fecha de nacimiento
     *
     * toma la fecha actual y la convierte en un formato aceptado
     * por el picker
     */
    dateMaxPicker: function dateMaxPicker() {
      var date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
      return date.toISOString().substr(0, 10);
    },

    /**
     * Devuelve la fecha actual en el formato indicado
     */
    actualDate: function actualDate() {
      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Y-m-d";
      var date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
      return date.toISOString().substr(0, 10);
    },

    /**
     * Verificar si la pantalla esta en modo responsive md
     */
    isMd: function isMd() {
      return this.$vuetify.breakpoint.md;
    },

    /**
     * Verificar si la pantalla esta en modo responsive sm
     */
    isSm: function isSm() {
      return this.$vuetify.breakpoint.sm;
    },

    /**
     * Verificar si la pantalla esta en modo responsive lg
     */
    isLg: function isLg() {
      return this.$vuetify.breakpoint.lg;
    },

    /**
     * Verificar si la pantalla esta en modo responsive xs
     */
    isXs: function isXs() {
      return this.$vuetify.breakpoint.xs;
    },

    /**
     * Verificar todos los responsives pequeños
     */
    isSmall: function isSmall() {
      return this.isSm || this.isMd || this.isLg;
    },

    /**
     * Si esta en modo mobile
     */
    isMobileMode: function isMobileMode() {
      return this.isXs;
    }
  },
  methods: {
    /**
     * Devuelve el icono que corresponde según
     * el nombre de la categoría
     * @param {String} name
     * @returns         LA clase del icono
     */
    setIcon: function setIcon(name) {
      if (name == "Literatura") {
        return "fas fa-book";
      }

      if (name == "Pintura") {
        return "fas fa-palette";
      }

      if (name == "Escultura") {
        return "fas fa-hanukiah";
      }

      if (name == "Dibujo") {
        return "fas fa-pencil";
      }

      if (name == "Fotografía") {
        return "fas fa-camera";
      }

      if (name == "Artesanía y Manualidades") {
        return "fas fa-glass-water";
      }

      if (name == "Audios") {
        return "fas fa-volume-up";
      }

      if (name == "Arte Digital") {
        return "fas fa-square-pen";
      }

      if (name == "Otros") {
        return "fas fa-plus";
      }

      if (name == "Libros") {
        return "fas fa-book-reader";
      }

      return "fas fa-info";
    },

    /**
     * Devuelve una fecha en el formato indicado
     * @param {String} string
     * @param {String} format
     * @returns
     */
    dateFormat: function dateFormat(string) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Y-m-d";
      var date = new Date(string);
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    },

    /**
     * Devuelve un archivo file en formato entendible para el front
     */
    getFileImage: function getFileImage(path, _ref) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var id, picture, config;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref.id, picture = _ref.picture;
                config = {
                  responseType: "blob"
                };
                _context2.next = 4;
                return _this.axios(path, config).then( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
                    var contentType, blob, file, endpoint, image, data;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            contentType = response.headers["content-type"];
                            _context.next = 3;
                            return response.data;

                          case 3:
                            blob = _context.sent;
                            file = new File([blob], picture, {
                              contentType: contentType
                            }); // obtener datos de la imagen

                            endpoint = _this.ep.artworks.getImage + id;
                            _context.next = 8;
                            return _this.axios.get(endpoint);

                          case 8:
                            image = _context.sent;
                            _context.next = 11;
                            return image.data;

                          case 11:
                            data = _context.sent;
                            return _context.abrupt("return", {
                              file: file,
                              front: data.front_page
                            });

                          case 13:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },

    /**
     * Copia en el portapapeles el texto indicado
     *
     * @param {String} text      texto a ser copiado
     */
    copyToClipboard: function copyToClipboard(text) {
      // opción 1 - execCommand
      if (!navigator.clipboard) {
        var textArea = document.createElement("textarea");
        textArea.value = text; // Avoid scrolling to bottom

        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return this.noty("Copiado al portapapeles");
      } // opción 2 - navigator


      navigator.clipboard.writeText(text).then(function () {
        console.log("Async: Copying to clipboard was successful!");
      }, function (err) {
        console.error("Async: Could not copy text: ", err);
      });
      this.noty("Copiado al portapapeles");
    },

    /**
     * Comparte una obra públicamente
     */
    sharePublicArtwork: function sharePublicArtwork(artwork) {
      var _artwork$slug;

      var url = this.secureUrl;
      var slug = (_artwork$slug = artwork.slug) !== null && _artwork$slug !== void 0 ? _artwork$slug : "";
      var route = "/obras/slug/" + slug;
      var text = url + route;
      this.copyToClipboard(text);
    },

    /**
     * Agrupa un array de acuerdo al callback indicado
     *
     * @param {Array} arr                       Array de datos
     * @param {CallableFunction} keyGetter      función callback o key
     * @returns Array agrupado por la key
     */
    groupBy: function groupBy(arr, keyGetter) {
      var map = new Map();
      arr.forEach(function (item) {
        var key = keyGetter(item);
        var collection = map.get(key);

        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },

    /**
     * devuelve los calificativos del artista
     * según las categorías de sus obras
     */
    getArtistQualifying: function getArtistQualifying(artist) {
      var _artist$artworks;

      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var one = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var artworks = (_artist$artworks = artist === null || artist === void 0 ? void 0 : artist.artworks) !== null && _artist$artworks !== void 0 ? _artist$artworks : [];
      var categories = artworks.map(function (artwork) {
        var _artwork$categories;

        return artwork === null || artwork === void 0 ? void 0 : (_artwork$categories = artwork.categories) === null || _artwork$categories === void 0 ? void 0 : _artwork$categories.map(function (category) {
          return category.qualified;
        });
      }); // eliminar las redundancias

      var categoriesUnique = categories.flat().filter(function (v, i, a) {
        return a.indexOf(v) === i;
      }); // si solo se quiere un calificativo

      if (one) {
        return categoriesUnique[0];
      } // si max es tiene valor, se devuelven los primeros indicados


      if (max) {
        return categoriesUnique.slice(0, max).join(", ");
      }

      return categoriesUnique.join(", ");
    },

    /**
     * Filtrar el texto de la publicación, para
     * convertir los hashtags en un router-link
     * con class text-primary
     *
     * @param {String} text
     */
    hashTag: function hashTag(text) {
      var regex = /#(\w+)/g;
      var matches = text.match(regex);
      if (!matches) return text;
      var result = text.replace(regex, function (match) {
        // match sin el #
        var matchWithoutHash = match.replace("#", ""); // result

        return "<a class=\"text-primary\" href=\"/comunidad/".concat(matchWithoutHash, "\">").concat(match, "</a>");
      }); // agregar un solo br al momento de encontrar
      // el primer hashtag

      return result.replace(/<a/, "<br><a");
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/artwork/utils/listDisallowedWords.js":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/artwork/utils/listDisallowedWords.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Lista de palabras prohibidas para comentarios/preguntas/respuestas
 * de la app
 */
var listDisallowedWords = ["puta", "puto", "putos", "putas", "putita", "putitas", "putito", "putitos", "putazo", "putazos", "putazón", "putazones", "putazónes", "putazón", "putazones", "putazónes", "putazón", "putazones", "putazónes", "culo", "culos", "culito", "culitos", "culazo", "culazos", "culazón", "tetas", "teta", "tetazas", "tetazos", "tetazón", "tetazones", "tetazónes", "verga", "vergas", "vergazo", "vergazos", "vergazón", "vergazones", "vergazónes", "cuca", "cucas", "cucazo", "cucazos", "cucazón", "cucazones", "http", "https", "www.", ".com", ".net", ".org", ".info", ".es", "@", "gmail", "hotmail", "yahoo", "outlook", "live", "facebook", "twitter", "instagram", "youtube", "tiktok", "tik", "tok", "snapchat", "snap", "chat", "twitch", "twitch.tv", "ano", "anos", "anito", "jodete", "muerete", "muerte", "/", "//", "!", "nalgas", "nalguitas", "nalguitos", "nalguita", "nalguito", "nalgón", "nalgones", "nalgónes", "nalgón", "nalgones", "nalgónes", "nalga", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "whatsapp", "whats", "app", "wsp", "wsp.", "wsp:", "wsp/", "wsp//", "telegram", "maricon", "marica", "maricona", "maricones", "marico", "maricos", "homo", "homosexual"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listDisallowedWords);

/***/ }),

/***/ "./resources/js/pages/release/utils/rulesCommentMixin.js":
/*!***************************************************************!*\
  !*** ./resources/js/pages/release/utils/rulesCommentMixin.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _artwork_utils_listDisallowedWords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../artwork/utils/listDisallowedWords */ "./resources/js/pages/artwork/utils/listDisallowedWords.js");
// listDisallowedWords utils

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isFormValid: true,
      rulesComment: [function (v) {
        return !!v || "No hay texto escrito";
      }, function (v) {
        return v.length <= 1000 || "El texto no debe superar los 1000 caracteres";
      }, // validar palabras no permitidas
      function (v) {
        // array de palabras no permitidas
        var badWordsFound = [];
        _artwork_utils_listDisallowedWords__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (word) {
          if (v.toLowerCase().includes(word)) {
            badWordsFound.push(word);
          }
        }); // mensaje error, resaltar las palabras no permitidas

        var mjs_error = "Las siguientes palabras no est\xE1n permitidas:\n              ".concat(badWordsFound.join(", "), ", tenga cuidado al ingresar malas palabras"); // validar si hay palabras no permitidas

        if (badWordsFound.length > 0) {
          return mjs_error;
        }

        return true;
      }]
    };
  }
});

/***/ }),

/***/ "./resources/js/components/Avatar.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Avatar.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Avatar.vue?vue&type=template&id=62781b04& */ "./resources/js/components/Avatar.vue?vue&type=template&id=62781b04&");
/* harmony import */ var _Avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Avatar.vue?vue&type=script&lang=js& */ "./resources/js/components/Avatar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__.render,
  _Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Avatar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/release/components/CardComment.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/release/components/CardComment.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardComment.vue?vue&type=template&id=39800747& */ "./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747&");
/* harmony import */ var _CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardComment.vue?vue&type=script&lang=js& */ "./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/release/components/CardComment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/release/components/ReleaseCommentsDialog.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/release/components/ReleaseCommentsDialog.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a& */ "./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a&");
/* harmony import */ var _ReleaseCommentsDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReleaseCommentsDialog.vue?vue&type=script&lang=js& */ "./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReleaseCommentsDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__.render,
  _ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/release/components/ReleaseCommentsDialog.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Avatar.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Avatar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Avatar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Avatar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardComment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReleaseCommentsDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReleaseCommentsDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ReleaseCommentsDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Avatar.vue?vue&type=template&id=62781b04&":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Avatar.vue?vue&type=template&id=62781b04& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Avatar_vue_vue_type_template_id_62781b04___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Avatar.vue?vue&type=template&id=62781b04& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Avatar.vue?vue&type=template&id=62781b04&");


/***/ }),

/***/ "./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_39800747___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardComment.vue?vue&type=template&id=39800747& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/CardComment.vue?vue&type=template&id=39800747&");


/***/ }),

/***/ "./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ReleaseCommentsDialog_vue_vue_type_template_id_2648ff4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/ReleaseCommentsDialog.vue?vue&type=template&id=2648ff4a&");


/***/ })

}]);