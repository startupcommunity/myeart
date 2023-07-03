"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_components_CardComment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Avatar.vue */ "./resources/js/components/Avatar.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// vuex


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    Avatar: _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    comment: {
      type: Object,
      "default": function _default() {}
    },
    artwork: {
      type: Object,
      "default": function _default() {}
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    user: "getProfile"
  })), {}, {
    /**
     * Devuelve el usuario artista de la obra
     */
    artist: function artist() {
      var _this$comment;

      return (_this$comment = this.comment) === null || _this$comment === void 0 ? void 0 : _this$comment.user;
    },

    /**
     * Devuelve la foto de perfil del usuario
     */
    profilePhoto: function profilePhoto() {
      var _this$artist;

      if (!((_this$artist = this.artist) !== null && _this$artist !== void 0 && _this$artist.profile_photo)) return this.getURLDefaultProfilePhoto;
      return "".concat(this.pathProfilePhoto + this.artist.profile_photo);
    },

    /**
     * Si el artista es el dueño de la obra
     */
    isOwnerArtwork: function isOwnerArtwork() {
      var _this$artwork, _this$user;

      return ((_this$artwork = this.artwork) === null || _this$artwork === void 0 ? void 0 : _this$artwork.user_id) === ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id) && !this.answer;
    },

    /**
     * Objeto de respuesta al comentario/pregunta
     */
    answer: function answer() {
      var _this$comment2;

      return (_this$comment2 = this.comment) === null || _this$comment2 === void 0 ? void 0 : _this$comment2.answer;
    }
  }),
  filters: {
    /**
     * Filtro para formatear la fecha
     */
    formatDate: function formatDate(value) {
      if (value) {
        var date = new Date(value).toLocaleDateString(); // convertir a dd/mm/yyyy

        var dateParts = date.split("/");
        return "".concat(dateParts[1], "/").concat(dateParts[0], "/").concat(dateParts[2]);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$artist, _vm$answer, _vm$answer2;

  var _vm = this,
      _c = _vm._self._c;

  return _c("div", [_c("div", {
    staticClass: "flex flex-wrap items-center"
  }, [_c("div", {
    staticClass: "w-full flex justify-start items-center"
  }, [_c("Avatar", {
    attrs: {
      artist: _vm.artist
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap items-center ml-2"
  }, [_c("div", {
    staticClass: "w-full"
  }, [_c("span", {
    staticClass: "text-lg font-medium"
  }, [_vm._v("\n                        " + _vm._s((_vm$artist = _vm.artist) === null || _vm$artist === void 0 ? void 0 : _vm$artist.name) + "\n                    ")])]), _vm._v(" "), _c("div", {
    staticClass: "w-full -mt-2"
  }, [_c("span", {
    staticClass: "text-sm font-medium"
  }, [_vm._v("\n                        " + _vm._s(_vm._f("formatDate")(_vm.comment.created_at)) + "\n                    ")])])])], 1)]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-wrap items-center pt-3"
  }, [_c("div", {
    staticClass: "w-full"
  }, [_c("span", {
    staticClass: "text-sm font-normal"
  }, [_vm._v("\n                " + _vm._s(_vm.comment.comment) + "\n            ")]), _vm._v(" "), _vm.isOwnerArtwork ? _c("button", {
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.$emit("sendResponse", _vm.comment);
      }
    }
  }, [_c("span", {
    staticClass: "text-xs text-primary font-medium"
  }, [_vm._v("\n                    [Responder]\n                ")])]) : _vm._e()]), _vm._v(" "), _vm.answer ? _c("div", {
    staticClass: "w-full"
  }, [_c("div", {
    staticClass: "text-gray-400 font-light text-sm ml-2 py-3"
  }, [_c("div", {
    staticClass: "flex items-start md:items-center justify-start"
  }, [_vm._m(0), _vm._v(" "), _c("span", {
    staticClass: "ml-1"
  }, [_vm._v("\n                        " + _vm._s((_vm$answer = _vm.answer) === null || _vm$answer === void 0 ? void 0 : _vm$answer.answer) + " |\n                        " + _vm._s(_vm._f("formatDate")((_vm$answer2 = _vm.answer) === null || _vm$answer2 === void 0 ? void 0 : _vm$answer2.created_at)) + "\n                    ")])])])]) : _vm._e()])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("span", [_c("i", {
    staticClass: "fa-solid fa-angle-right text-gray-400"
  })]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/artwork/components/CardComment.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardComment.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardComment.vue?vue&type=template&id=657f698c& */ "./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c&");
/* harmony import */ var _CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardComment.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/CardComment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardComment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComment_vue_vue_type_template_id_657f698c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardComment.vue?vue&type=template&id=657f698c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardComment.vue?vue&type=template&id=657f698c&");


/***/ })

}]);