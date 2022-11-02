"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_ShowArtwork_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _mixins_utilMixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../mixins/utilMixin */ "./resources/js/mixins/utilMixin.js");
/* harmony import */ var _landing_sections_Header_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../landing/sections/Header.vue */ "./resources/js/pages/landing/sections/Header.vue");
/* harmony import */ var _layouts_MainLayout_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layouts/MainLayout.vue */ "./resources/js/pages/layouts/MainLayout.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ShowArtwork",
  components: {
    MainLayout: _layouts_MainLayout_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    Header: _landing_sections_Header_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mixins: [_mixins_utilMixin__WEBPACK_IMPORTED_MODULE_0__["default"]],
  data: function data() {
    return {
      previewFiles: [],
      artwork: {
        categories: [],
        subcategories: [],
        labels: []
      },
      isLike: false
    };
  },
  mounted: function mounted() {
    this.loadData();
    globalThis.scrollTo(0, 0);
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)({
    user: "getProfile"
  })), {}, {
    /**
     * Obtiene el string completo para la categoría y derivados
     */
    allCategory: function allCategory() {
      var _this$artwork$categor, _this$artwork$categor2, _this$artwork$subcate, _this$artwork$subcate2, _this$artwork$labels$, _this$artwork$labels$2;

      var category = (_this$artwork$categor = (_this$artwork$categor2 = this.artwork.categories[0]) === null || _this$artwork$categor2 === void 0 ? void 0 : _this$artwork$categor2.name) !== null && _this$artwork$categor !== void 0 ? _this$artwork$categor : "-";
      var subcat = (_this$artwork$subcate = (_this$artwork$subcate2 = this.artwork.subcategories[0]) === null || _this$artwork$subcate2 === void 0 ? void 0 : _this$artwork$subcate2.name) !== null && _this$artwork$subcate !== void 0 ? _this$artwork$subcate : "-";
      var label = (_this$artwork$labels$ = (_this$artwork$labels$2 = this.artwork.labels[0]) === null || _this$artwork$labels$2 === void 0 ? void 0 : _this$artwork$labels$2.name) !== null && _this$artwork$labels$ !== void 0 ? _this$artwork$labels$ : "-";
      return "".concat(category, " ").concat(subcat, " ").concat(label);
    },

    /**
     * Devuelve las medidas de la obra
     */
    measures: function measures() {
      var _this$artwork$width, _this$artwork$large;

      var width = (_this$artwork$width = this.artwork.width) !== null && _this$artwork$width !== void 0 ? _this$artwork$width : 0;
      var large = (_this$artwork$large = this.artwork.large) !== null && _this$artwork$large !== void 0 ? _this$artwork$large : 0;
      return "".concat(width, " X ").concat(large, " ").concat(this.artSize);
    },

    /**
     * Devuelve el peso de la obra
     */
    weight: function weight() {
      var _this$artwork$weight;

      var weight = (_this$artwork$weight = this.artwork.weight) !== null && _this$artwork$weight !== void 0 ? _this$artwork$weight : 0;
      return "".concat(weight, " ").concat(this.ArtWeight);
    },

    /**
     * Devuelve una imagen distinta a la de portada
     * en caso de no existir, devuelve la portada
     */
    randomImage: function randomImage() {
      var image = this.previewFiles[1];
      return image ? image : this.previewFiles[0];
    },

    /**
     * Devuelve las dimensiones y peso de la obra
     */
    dimensionsAndWeight: function dimensionsAndWeight() {
      var width = "Ancho ".concat(this.artwork.width + this.artSize);
      var large = "Largo ".concat(this.artwork.large + this.artSize);
      var weight = this.weight;
      return "".concat(width, " | ").concat(large, " | ").concat(weight);
    }
  }),
  methods: {
    loadData: function loadData() {
      var _this = this;

      this.globalLoading = true;
      var id = this.$route.params.id;
      this.axios.get(this.ep.artworks.show + id).then(function (resp) {
        if (resp.status === 200) {
          console.log(resp); // data

          var gallery = resp.data.gallery; // obra

          _this.artwork = resp.data; // load galeria

          _this.loadGallery(gallery); // si esta like por el usuario


          _this.isLiked();
        }
      })["catch"](function (error) {
        return console.error(error);
      })["finally"](function () {
        return _this.globalLoading = false;
      });
    },

    /**
     * Cargar la galeria de imagenes
     */
    loadGallery: function loadGallery(data) {
      var _this2 = this;

      data.forEach(function (picture) {
        var fullname = picture.picture;
        var path = "".concat(_this2.pathArtworkGallery + fullname);

        var promise = _this2.getFileImage(path, picture);

        promise.then(function (resp) {
          // crear el preview
          var objectUrl = URL.createObjectURL(resp.file);

          _this2.previewFiles.push({
            file: objectUrl,
            front: resp.front
          }); // ordenar por foto de portada


          _this2.previewFiles.sort(function (a, b) {
            return b.front - a.front;
          });
        });
      });
    },

    /**
     * Devuelve el path completo de la foto de perfil del usuario
     */
    getProfilePhoto: function getProfilePhoto() {
      var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!user || !(user !== null && user !== void 0 && user.profile_photo)) return null;
      return "".concat(this.pathProfilePhoto + user.profile_photo);
    },

    /**
     * Agrega o elimina un me gusta por parte del usuario
     * a la obra seleccionada
     */
    likeOrDislike: function likeOrDislike() {
      var _this3 = this;

      var id = this.artwork.id;
      this.globalLoading = true;
      var endpoint = this.isLike ? this.ep.artworks.disliked : this.ep.artworks.liked;
      this.axios.post(endpoint + id).then(function (resp) {
        if (resp.status === 200) {
          _this3.isLike = !_this3.isLike;
        }
      })["catch"](function (error) {
        return console.log(error);
      })["finally"](function () {
        return _this3.globalLoading = false;
      });
    },

    /**
     * Si la obra ha sido likeada para el usuario logueado
     * se muestra en rojo el botón de me gusta
     */
    isLiked: function isLiked() {
      var _this4 = this;

      this.isLike = this.artwork.likes.some(function (like) {
        return like.user_id === _this4.user.id;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "ExtraInfo"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Footer"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Header",
  methods: {
    logout: function logout() {
      var _this = this;

      this.$store.dispatch("authLogout").then(function () {
        _this.$router.push("/home");
      });
    },
    openNav: function openNav() {
      document.getElementById("mySidenav").style.display = "block";
      document.getElementById("mySidenav").style.width = "80%";
    },
    closeNav: function closeNav() {
      document.getElementById("mySidenav").style.display = "none";
      document.getElementById("mySidenav").style.width = "0";
    },
    closeAndGo: function closeAndGo(val) {
      if (val == "obras") {
        this.$router.push("/obras/crear");
      }

      this.closeNav();
    }
  },
  computed: {
    perfilUsers: function perfilUsers() {
      return this.$store.getters.getProfile;
    },
    isPathObrasCreate: function isPathObrasCreate() {
      return this.$route.path == "/obras/crear";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "NewLetter"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "PreHeader"
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _landing_sections_Header_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../landing/sections/Header.vue */ "./resources/js/pages/landing/sections/Header.vue");
/* harmony import */ var _landing_sections_PreHeader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../landing/sections/PreHeader.vue */ "./resources/js/pages/landing/sections/PreHeader.vue");
/* harmony import */ var _landing_sections_Newletter_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../landing/sections/Newletter.vue */ "./resources/js/pages/landing/sections/Newletter.vue");
/* harmony import */ var _landing_sections_ExtraInfo_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../landing/sections/ExtraInfo.vue */ "./resources/js/pages/landing/sections/ExtraInfo.vue");
/* harmony import */ var _landing_sections_Footer_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../landing/sections/Footer.vue */ "./resources/js/pages/landing/sections/Footer.vue");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "MainLayout",
  components: {
    PreHeader: _landing_sections_PreHeader_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Header: _landing_sections_Header_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    Newletter: _landing_sections_Newletter_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    ExtraInfo: _landing_sections_ExtraInfo_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    Footer: _landing_sections_Footer_vue__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  props: {
    showPre: {
      type: Boolean,
      "default": true
    },
    showHeader: {
      type: Boolean,
      "default": true
    },
    preClass: {
      type: String,
      "default": ""
    },
    headerClass: {
      type: String,
      "default": ""
    },
    loadingOverlay: {
      type: Boolean,
      "default": false
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$getProfilePhoto, _vm$artwork$user, _vm$randomImage, _vm$randomImage2;

  var _vm = this,
      _c = _vm._self._c;

  return _c("main-layout", {
    attrs: {
      showHeader: false,
      loadingOverlay: _vm.globalLoading
    }
  }, [_c("div", {
    staticClass: "bg-zinc-900 pb-32"
  }, [_c("Header", {
    staticClass: "mt-5"
  })], 1), _vm._v(" "), _c("section", {
    staticClass: "bg-white"
  }, [_c("div", {
    staticClass: "container py-20"
  }, [_c("div", {
    staticClass: "flex flex-wrap"
  }, [_c("div", {
    staticClass: "w-full lg:w-2/4"
  }, [_vm.previewFiles.length ? _c("div", [_c("div", {
    staticClass: "h-96 w-full"
  }, [_c("img", {
    staticClass: "w-full object-cover object-center h-full rounded-sm",
    attrs: {
      src: _vm.previewFiles[0].file,
      alt: _vm.previewFiles[0]
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "overflow-x-auto flex pt-4"
  }, _vm._l(_vm.previewFiles.filter(function (_, i) {
    return i !== 0;
  }), function (file) {
    return _c("div", {
      key: file.id,
      staticClass: "flex-shrink-0 w-1/2 xl:w-1/4 h-32 lg:h-40 bg-gray-200 rounded-sm border border-gray-300 animate-swing-in-top-fwd"
    }, [_c("div", {
      staticClass: "h-full w-full"
    }, [_c("img", {
      staticClass: "w-full object-cover object-center h-full rounded-sm",
      attrs: {
        src: file.file,
        alt: file
      }
    })])]);
  }), 0)]) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/4 px-7"
  }, [_c("div", {
    staticClass: "flex flex-row justify-between items-center"
  }, [_c("div", [_c("h1", {
    staticClass: "text-xl lg:text-5xl font-bold leading-10 text-zinc-900"
  }, [_vm._v("\n                                " + _vm._s(_vm.artwork.title) + "\n                            ")])]), _vm._v(" "), _c("div", {
    staticClass: "text-gray-400 flex justify-end"
  }, [_c("button", {
    staticClass: "pr-4",
    on: {
      click: function click($event) {
        $event.stopPropagation();
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-bookmark fa-2x"
  })]), _vm._v(" "), _c("button", {
    staticClass: "pr-4",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.likeOrDislike();
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-heart fa-2x",
    "class": _vm.isLike ? "border rounded-full p-1 text-red-800" : ""
  })]), _vm._v(" "), _c("button", {
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.sharePublicArtwork(_vm.artwork);
      }
    }
  }, [_c("i", {
    staticClass: "fa-solid fa-share-nodes fa-2x"
  })])])]), _vm._v(" "), _c("p", {
    staticClass: "text-base leading-5 tracking-widest text-gray-400 pt-2"
  }, [_vm._v("\n                        " + _vm._s(_vm.artwork.description) + "\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "text-primary text-sm leading-4"
  }, [_vm._v("\n                        " + _vm._s(_vm.allCategory) + "\n                    ")]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-row justify-between"
  }, [_c("p", {
    staticClass: "uppercase text-base leading-8 font-bold"
  }, [_vm._v("\n                            Medida: " + _vm._s(_vm.measures) + "\n                        ")]), _vm._v(" "), _c("p", {
    staticClass: "text-primary text-base leading-8"
  }, [_vm._v("\n                            0 views "), _c("i", {
    staticClass: "fa fa-eye text-primary"
  })])]), _vm._v(" "), _c("p", {
    staticClass: "uppercase text-base leading-8 font-bold -mt-4"
  }, [_vm._v("\n                        Peso: " + _vm._s(_vm.weight) + "\n                    ")]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-start items-center py-5"
  }, [_c("img", {
    staticClass: "img-thumbnail border w-14 h-14 rounded-full",
    attrs: {
      src: (_vm$getProfilePhoto = _vm.getProfilePhoto(_vm.artwork.user)) !== null && _vm$getProfilePhoto !== void 0 ? _vm$getProfilePhoto : _vm.getURLDefaultProfilePhoto,
      alt: "profile-picture"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col pl-2"
  }, [_c("span", {
    staticClass: "py-0"
  }, [_vm._v("\n                                " + _vm._s((_vm$artwork$user = _vm.artwork.user) === null || _vm$artwork$user === void 0 ? void 0 : _vm$artwork$user.name) + "\n                            ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary btn-sm text-xs px-4 uppercase w-20"
  }, [_vm._v("\n                                Seguir\n                            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "border-t border-zinc-800 w-full pb-5"
  }), _vm._v(" "), _c("div", [_c("p", {
    staticClass: "uppercase"
  }, [_c("span", {
    staticClass: "text-base leading-8 font-bold tracking-wide"
  }, [_vm._v("\n                                Precio\n                            ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "text-2xl font-bold"
  }, [_vm._v("\n                                " + _vm._s(_vm.artwork.price) + " " + _vm._s(_vm.euro) + "\n                            ")])])]), _vm._v(" "), _c("div", {
    staticClass: "py-2"
  }, [_c("v-btn", {
    attrs: {
      large: "",
      color: "grey darken-4"
    }
  }, [_c("span", {
    staticClass: "uppercase text-white"
  }, [_vm._v("\n                                comprar esta obra\n                            ")])])], 1)])])])]), _vm._v(" "), _c("section", {
    staticClass: "bg-white"
  }, [_c("div", {
    staticClass: "container pb-20"
  }, [_c("div", {
    staticClass: "flex flex-wrap"
  }, [_c("div", {
    staticClass: "w-full lg:w-[60%]"
  }, [_c("div", {
    staticClass: "border-b border-zinc-900 pb-5"
  }, [_c("h2", {
    staticClass: "text-primary text-2xl leading-5 tracking-widest uppercase"
  }, [_vm._v("\n                            Sobre la obra\n                        ")])]), _vm._v(" "), _c("div", {
    staticClass: "mt-5"
  }, [_c("div", {
    staticClass: "flex flex-wrap justify-center lg:justify-between w-full"
  }, [_c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Fecha de creación\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        " + _vm._s(_vm.artwork.date_created) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Categoría\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        " + _vm._s(_vm.allCategory) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Dimensiones y peso\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        " + _vm._s(_vm.dimensionsAndWeight) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Ubicación\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        " + _vm._s(_vm.artwork.location) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Envío\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        " + _vm._s(_vm.artwork.shipping) + "\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-2/6 pb-8"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Otros detalles\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600"
  }, [_vm._v("\n                                        -\n                                    ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full"
  }, [_c("p", [_c("span", {
    staticClass: "uppercase font-extra-bold text-base text-zinc-900"
  }, [_vm._v("\n                                        Descripción\n                                    ")]), _vm._v(" "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "font-medium text-base text-gray-600 text-justify"
  }, [_vm._v("\n                                        " + _vm._s(_vm.artwork.description) + "\n                                    ")])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full lg:w-[40%] px-7 lg:mt-10 h-80 lg:h-[30rem]"
  }, [_c("img", {
    staticClass: "w-full h-full object-cover object-center rounded-sm",
    attrs: {
      src: (_vm$randomImage = _vm.randomImage) === null || _vm$randomImage === void 0 ? void 0 : _vm$randomImage.file,
      alt: (_vm$randomImage2 = _vm.randomImage) === null || _vm$randomImage2 === void 0 ? void 0 : _vm$randomImage2.file
    }
  })])])])])]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm._m(0);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "section-dark"
  }, [_c("div", {
    staticClass: "container"
  }, [_c("div", {
    staticClass: "row justify-content-md-center sm:mt-4"
  }, [_c("div", {
    staticClass: "col-lg-3 col-sm-12 col-xs-12 mb-8 md:mb-0"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center"
  }, [_c("img", {
    staticClass: "img-thumbnail border-0 mb-5 bg-transparent",
    attrs: {
      src: "/images/icon/shiel1.png"
    }
  })]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-sm"
  }, [_vm._v("PAGO SEGURO")]), _vm._v(" "), _c("p", {
    staticClass: "text-white text-center text-xs sm:text-sm"
  }, [_vm._v("\n                    Lorem ipsum dolor sit amet,"), _c("br"), _vm._v(" consectetur adipiscing elit.\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-3 col-sm-12 col-xs-12 mb-8 md:mb-0"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center"
  }, [_c("img", {
    staticClass: "img-thumbnail border-0 mb-5 bg-transparent",
    attrs: {
      src: "/images/icon/shiel2.png"
    }
  })]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-sm"
  }, [_vm._v("ARTISTAS VERIFICADOS")]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-xs sm:text-sm"
  }, [_vm._v("\n                    Lorem ipsum dolor sit amet,"), _c("br"), _vm._v(" consectetur adipiscing elit.\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-3 col-sm-12 col-xs-12 mb-8 md:mb-0"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center"
  }, [_c("img", {
    staticClass: "img-thumbnail border-0 mb-5 bg-transparent",
    attrs: {
      src: "/images/icon/pintaje.png"
    }
  })]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-sm"
  }, [_vm._v("OBRAS ORIGINALES")]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-xs sm:text-sm"
  }, [_vm._v("\n                    Lorem ipsum dolor sit amet,"), _c("br"), _vm._v(" consectetur adipiscing elit.\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-3 col-sm-12 col-xs-12"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center"
  }, [_c("img", {
    staticClass: "img-thumbnail border-0 mb-5 bg-transparent",
    attrs: {
      src: "/images/icon/music.png"
    }
  })]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-sm"
  }, [_vm._v("SOPORTE 24 HORAS")]), _vm._v(" "), _c("h6", {
    staticClass: "text-white text-center text-xs sm:text-sm"
  }, [_vm._v("\n                    Lorem ipsum dolor sit amet,"), _c("br"), _vm._v(" consectetur adipiscing elit.\n                ")])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm._m(0);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "container bg-white text-dark footer py-12 wow fadeIn",
    attrs: {
      "data-wow-delay": "0.1s"
    }
  }, [_c("div", {
    staticClass: "d-flex justify-content-center sm:py-5"
  }, [_c("div", {
    staticClass: "row g-5 justify-content-md-center"
  }, [_c("div", {
    staticClass: "col-lg-2 col-md-6 col-sm-12 text-center"
  }, [_c("img", {
    staticClass: "w-40 sm:w-56 mx-auto",
    attrs: {
      src: "/images/myHeartBlack.png",
      alt: "myHeartBlack"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
  }, [_c("h5", {
    staticClass: "text-gray-900 mb-2 font-black"
  }, [_vm._v("\n                    AYUDA NOSOTROS\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Quienes\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Somos\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Pregunta Frecuentes\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
  }, [_c("h5", {
    staticClass: "text-gray-900 mb-2 font-black"
  }, [_vm._v("POLÍTICAS")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Politicas de Envio\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Politicas de Privacidad\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Terminos y Condiciones\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Soporte\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-2 col-md-6 col-sm-12 center-mobile mb-4 sm:mb-0"
  }, [_c("h5", {
    staticClass: "text-gray-900 mb-2 font-black"
  }, [_vm._v("CONTACTO")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    Call Us: 344-755-111\n                ")]), _vm._v(" "), _c("p", {
    staticClass: "mb-1 font-light uppercase text-xs leading-relaxed"
  }, [_vm._v("\n                    support@aazztech.com\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "col-lg-4 col-md-6 d-flex align-items-center md:-mt-10"
  }, [_c("div", {
    staticClass: "flex flex-wrap justify-center items-center"
  }, [_c("div", {
    staticClass: "w-2/6 md:w-1/5 px-1"
  }, [_c("img", {
    staticClass: "w-20 md:w-48",
    attrs: {
      src: "/images/icon-comerce/VisaClassic.png",
      alt: "Responsive image"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "w-2/6 md:w-1/5 px-1"
  }, [_c("img", {
    staticClass: "w-20 md:w-48",
    attrs: {
      src: "/images/icon-comerce/MastercardFull.png",
      alt: "Responsive image"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "w-2/6 md:w-1/5 px-1"
  }, [_c("img", {
    staticClass: "w-20 md:w-48",
    attrs: {
      src: "/images/icon-comerce/Paypal.png",
      alt: "Responsive image"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-center items-center md:w-2/5"
  }, [_c("div", {
    staticClass: "px-1"
  }, [_c("img", {
    staticClass: "w-auto md:w-48",
    attrs: {
      src: "/images/icon-comerce/StorePay.png",
      alt: "Responsive image"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "px-1"
  }, [_c("img", {
    staticClass: "w-auto md:w-48",
    attrs: {
      src: "/images/icon-comerce/GooglePay.png",
      alt: "Responsive image"
    }
  })])])])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "top-header-area",
    attrs: {
      id: "sticker"
    }
  }, [_c("div", {
    staticClass: "sidenav",
    attrs: {
      id: "mySidenav"
    }
  }, [_c("div", {
    staticClass: "sidenav_header"
  }, [_c("button", {
    staticClass: "closebtn",
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        return _vm.closeNav();
      }
    }
  }, [_c("i", {
    staticClass: "fa-solid fa-arrow-left"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "sidenav_body"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center"
  }, [_c("label", {
    staticStyle: {
      border: "2px solid #b2794c",
      padding: "5px",
      "border-radius": "50%"
    }
  }, [_c("v-avatar", {
    attrs: {
      size: "120"
    }
  }, [_c("v-img", {
    attrs: {
      src: "/img/avatar.png",
      "lazy-src": "/img/avatar.png",
      width: "118px",
      height: "118px"
    },
    on: {
      error: function error($event) {
        "URL ON ERROR";
      }
    },
    scopedSlots: _vm._u([{
      key: "placeholder",
      fn: function fn() {
        return [_c("v-progress-circular", {
          attrs: {
            indeterminate: "",
            color: "custm_theme_6"
          }
        })];
      },
      proxy: true
    }])
  })], 1)], 1)]), _vm._v(" "), _c("p", {
    staticClass: "text-white"
  }, [_vm._v("Artista/Fotografía")]), _vm._v(" "), _c("button", {
    staticClass: "text-white text-2xl",
    on: {
      click: function click($event) {
        return _vm.closeAndGo("obras");
      }
    }
  }, [_vm._v("\n                SUBIR OBRA "), _c("i", {
    staticClass: "fa-solid fa-arrow-up-from-bracket"
  })]), _vm._v(" "), _c("router-link", {
    attrs: {
      to: {
        name: "listArtwork"
      }
    }
  }, [_vm._v(" OBRAS ")]), _vm._v(" "), _c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("ARTISTAS")]), _vm._v(" "), _c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("EVENTOS")]), _vm._v(" "), _c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("MI COMUNIDAD")])], 1), _vm._v(" "), _c("div", {
    staticClass: "sidenav_footer"
  }, [_c("a", {
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.logout.apply(null, arguments);
      }
    }
  }, [_vm._v("CERRAR SESIÓN")])])]), _vm._v(" "), _c("div", {
    staticClass: "container-fluid"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-lg-12 col-sm-12 text-center"
  }, [_c("div", {
    staticClass: "main-menu-wrap"
  }, [_c("div", {
    staticClass: "flex justify-center items-center"
  }, [_c("div", {
    staticClass: "flex-fill block lg:hidden"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center -mt-4 xl:-mt-0"
  }, [_c("i", {
    staticClass: "fa-solid fa-bars text-white",
    on: {
      click: function click($event) {
        return _vm.openNav();
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "flex-fill d-flex justify-content-center"
  }, [_c("div", {
    staticClass: "site-logo"
  }, [_c("router-link", {
    attrs: {
      to: {
        name: "dashboard"
      }
    }
  }, [_c("img", {
    attrs: {
      src: "/images/Logo_Myeart.svg",
      alt: "my-eart"
    }
  })])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "flex-fill hidden lg:block"
  }, [_c("nav", {
    staticClass: "main-menu lg:mr-8 xl:mr-32"
  }, [_c("ul", {
    staticClass: "text-left text-[9px] xl:text-xs"
  }, [_c("li", [_c("router-link", {
    attrs: {
      to: {
        name: "listArtwork"
      }
    }
  }, [_vm._v("\n                                            OBRAS\n                                        ")])], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c("li", [_c("ul", [_c("li", {
    staticClass: "menu-items-sub"
  }, [_c("div", {
    staticClass: "header-icons"
  }, [_c("a", {
    staticClass: "mobile-hide search-bar-icon uppercase hover:no-underline",
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "fas fa-user mr-1"
  }), _vm._v("\n                                                        " + _vm._s(_vm.perfilUsers.username) + "\n                                                    ")])]), _vm._v(" "), _c("ul", {
    staticClass: "sub-menu"
  }, [_c("li", {
    staticClass: "bg-zinc-900"
  }, [_c("router-link", {
    attrs: {
      to: {
        name: "userProfile",
        params: {
          id: _vm.perfilUsers.id
        }
      }
    }
  }, [_vm._v("\n                                                            Perfil\n                                                        ")])], 1), _vm._v(" "), _c("li", {
    staticClass: "bg-zinc-900"
  }, [_c("a", {
    attrs: {
      href: "#"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.logout.apply(null, arguments);
      }
    }
  }, [_vm._v("\n                                                            Cerrar sesión\n                                                        ")])])])]), _vm._v(" "), _c("li", [_c("div", {
    staticClass: "header-icons"
  }, [_vm._m(3), _vm._v(" "), !_vm.isPathObrasCreate ? _c("button", {
    staticClass: "btn btn-primary text-white px-3 py-2 rounded-lg",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.$router.push("/obras/crear");
      }
    }
  }, [_vm._v("\n                                                        SUBIR OBRA\n                                                    ")]) : _vm._e()])])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "flex-fill block lg:hidden"
  }, [_c("div", {
    staticClass: "w-100 d-flex justify-content-center -mt-4"
  }, [_c("div", {
    staticClass: "flex-fill"
  }, [_c("router-link", {
    attrs: {
      to: {
        name: "userProfile",
        params: {
          id: _vm.perfilUsers.id
        }
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-user text-white"
  })])], 1), _vm._v(" "), _vm._m(4)])])])])])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", [_c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("ARTISTAS")])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", [_c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("EVENTOS")])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("li", [_c("a", {
    attrs: {
      href: "#"
    }
  }, [_vm._v("MI COMUNIDAD")])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("a", {
    staticClass: "shopping-cart hover:no-underline",
    attrs: {
      href: "#"
    }
  }, [_c("i", {
    staticClass: "fas fa-shopping-cart mr-1"
  }), _vm._v("\n                                                        00.00\n                                                    ")]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex-fill"
  }, [_c("i", {
    staticClass: "fa-solid fa-cart-shopping text-white"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm._m(0);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "lg:py-28 bg-mobile-newsletter md:bg-newsletter bg-cover bg-no-repeat bg-center"
  }, [_c("div", {
    staticClass: "container py-6 sm:py-0"
  }, [_c("h2", {
    staticClass: "font-black text-xl lg:text-3xl leading-10 text-white text-center"
  }, [_vm._v("\n            El newsletter para grandes artistas\n        ")]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-center items-center"
  }, [_c("div", {
    staticClass: "input-group w-full lg:w-1/2 py-8"
  }, [_c("input", {
    staticClass: "form-control h-14",
    attrs: {
      type: "text",
      "aria-label": "Text input with dropdown button"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "input-group-append"
  }, [_c("button", {
    staticClass: "btn btn-dark px-5 text-gray-200"
  }, [_vm._v("SUSCRÍBETE")])])])]), _vm._v(" "), _c("h5", {
    staticClass: "text-white font-light tracking-wider text-sm text-center uppercase"
  }, [_vm._v("100% arte, 0% spam, lo prometemos.")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _vm._m(0);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex flex-row justify-between items-center bg-white px-2 sm:px-4"
  }, [_c("div", {
    staticClass: "flex-auto w-4/5 sm:w-[90%]"
  }, [_c("div", {
    staticClass: "flex flex-wrap sm:justify-center items-center text-start sm:text-center text-dark"
  }, [_c("img", {
    attrs: {
      src: "/img/shipping.png",
      alt: "shipping"
    }
  }), _vm._v(" "), _c("div", [_c("b", {
    staticClass: "text-[10px] sm:text-lg text-"
  }, [_vm._v("\n                    ENVÍOS GRATIS A TODO EL MUNDO\n                ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "text-end text-primary flex-auto w-1/5 sm:w-[10%]"
  }, [_c("b", {
    staticClass: "text-xs sm:text-lg"
  }, [_vm._v("ESPAÑOL")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "dashboard"
  }, [_c("loading-overlay", {
    attrs: {
      active: _vm.loadingOverlay,
      "is-full-page": true,
      loader: "bars"
    }
  }), _vm._v(" "), _vm.showPre ? _c("PreHeader", {
    "class": _vm.preClass
  }) : _vm._e(), _vm._v(" "), _vm.showHeader ? _c("Header", {
    "class": _vm.headerClass
  }) : _vm._e(), _vm._v(" "), _c("main", [_vm._t("default")], 2), _vm._v(" "), _c("Newletter"), _vm._v(" "), _c("ExtraInfo"), _vm._v(" "), _c("Footer")], 1);
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
      var route = "/obras/" + slug;
      var text = url + route;
      this.copyToClipboard(text);
    }
  }
});

/***/ }),

/***/ "./resources/js/pages/artwork/ShowArtwork.vue":
/*!****************************************************!*\
  !*** ./resources/js/pages/artwork/ShowArtwork.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShowArtwork.vue?vue&type=template&id=d56b1eba& */ "./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba&");
/* harmony import */ var _ShowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShowArtwork.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ShowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__.render,
  _ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/ShowArtwork.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/landing/sections/ExtraInfo.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/landing/sections/ExtraInfo.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtraInfo.vue?vue&type=template&id=c18c9a84& */ "./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84&");
/* harmony import */ var _ExtraInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtraInfo.vue?vue&type=script&lang=js& */ "./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExtraInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__.render,
  _ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/landing/sections/ExtraInfo.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/landing/sections/Footer.vue":
/*!********************************************************!*\
  !*** ./resources/js/pages/landing/sections/Footer.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Footer.vue?vue&type=template&id=349bcd6b& */ "./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b&");
/* harmony import */ var _Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer.vue?vue&type=script&lang=js& */ "./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__.render,
  _Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/landing/sections/Footer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/landing/sections/Header.vue":
/*!********************************************************!*\
  !*** ./resources/js/pages/landing/sections/Header.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header.vue?vue&type=template&id=55ce315d& */ "./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d&");
/* harmony import */ var _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.vue?vue&type=script&lang=js& */ "./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__.render,
  _Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/landing/sections/Header.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/landing/sections/Newletter.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/landing/sections/Newletter.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Newletter.vue?vue&type=template&id=745a2fa6& */ "./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6&");
/* harmony import */ var _Newletter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Newletter.vue?vue&type=script&lang=js& */ "./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Newletter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__.render,
  _Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/landing/sections/Newletter.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/landing/sections/PreHeader.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/landing/sections/PreHeader.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PreHeader.vue?vue&type=template&id=4239c020& */ "./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020&");
/* harmony import */ var _PreHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PreHeader.vue?vue&type=script&lang=js& */ "./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PreHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__.render,
  _PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/landing/sections/PreHeader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/layouts/MainLayout.vue":
/*!***************************************************!*\
  !*** ./resources/js/pages/layouts/MainLayout.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainLayout.vue?vue&type=template&id=ed152b5c& */ "./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c&");
/* harmony import */ var _MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainLayout.vue?vue&type=script&lang=js& */ "./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__.render,
  _MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/layouts/MainLayout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowArtwork.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtraInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ExtraInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtraInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Header.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Newletter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Newletter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Newletter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PreHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba& ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ShowArtwork_vue_vue_type_template_id_d56b1eba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ShowArtwork.vue?vue&type=template&id=d56b1eba& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/ShowArtwork.vue?vue&type=template&id=d56b1eba&");


/***/ }),

/***/ "./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtraInfo_vue_vue_type_template_id_c18c9a84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ExtraInfo.vue?vue&type=template&id=c18c9a84& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/ExtraInfo.vue?vue&type=template&id=c18c9a84&");


/***/ }),

/***/ "./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Footer_vue_vue_type_template_id_349bcd6b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Footer.vue?vue&type=template&id=349bcd6b& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Footer.vue?vue&type=template&id=349bcd6b&");


/***/ }),

/***/ "./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Header_vue_vue_type_template_id_55ce315d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Header.vue?vue&type=template&id=55ce315d& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Header.vue?vue&type=template&id=55ce315d&");


/***/ }),

/***/ "./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Newletter_vue_vue_type_template_id_745a2fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Newletter.vue?vue&type=template&id=745a2fa6& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/Newletter.vue?vue&type=template&id=745a2fa6&");


/***/ }),

/***/ "./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PreHeader_vue_vue_type_template_id_4239c020___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PreHeader.vue?vue&type=template&id=4239c020& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/landing/sections/PreHeader.vue?vue&type=template&id=4239c020&");


/***/ }),

/***/ "./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c&":
/*!**********************************************************************************!*\
  !*** ./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_ed152b5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainLayout.vue?vue&type=template&id=ed152b5c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/layouts/MainLayout.vue?vue&type=template&id=ed152b5c&");


/***/ })

}]);