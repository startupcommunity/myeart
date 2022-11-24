"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artist_components_RowArtwork_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "RowArtwork",
  props: {
    artwork: {
      type: Object,
      "default": {}
    }
  },
  computed: {
    routerPath: function routerPath() {
      var _this$artwork;

      return {
        name: "showArtwork",
        params: {
          id: (_this$artwork = this.artwork) === null || _this$artwork === void 0 ? void 0 : _this$artwork.id
        }
      };
    }
  },
  methods: {
    /**
     * Devuelve el path de la imagen de portada de la obra
     *
     * @param {Object} artwork
     * @returns
     */
    getPathGallery: function getPathGallery(artwork) {
      var _front_page$;

      if (!artwork.gallery.length) return this.getURLDefaultFrontArtwork;
      var front_page = artwork.gallery.filter(function (pic) {
        return pic.front_page === 1;
      });
      return "".concat(this.pathArtworkGallery + ((_front_page$ = front_page[0]) === null || _front_page$ === void 0 ? void 0 : _front_page$.picture));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "w-full h-full animate-swing-in-top-fwd"
  }, [_c("div", {
    staticClass: "rounded-md hover:animate-shadow-drop-center"
  }, [_c("router-link", {
    attrs: {
      to: _vm.routerPath
    }
  }, [_c("img", {
    staticClass: "object-cover object-center w-60 h-60",
    attrs: {
      src: _vm.getPathGallery(_vm.artwork),
      alt: _vm.artwork.title
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col"
  }, [_c("div", {
    staticClass: "space-y-2"
  }, [_c("h3", {
    staticClass: "text-xl font-medium tracking-wide text-gray-900 pt-3"
  }, [_vm._v("\n                    " + _vm._s(_vm.artwork.title) + "\n                ")])])])], 1)]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/artist/components/RowArtwork.vue":
/*!*************************************************************!*\
  !*** ./resources/js/pages/artist/components/RowArtwork.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RowArtwork.vue?vue&type=template&id=eb52f1d8& */ "./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8&");
/* harmony import */ var _RowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowArtwork.vue?vue&type=script&lang=js& */ "./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__.render,
  _RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artist/components/RowArtwork.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RowArtwork.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RowArtwork_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RowArtwork_vue_vue_type_template_id_eb52f1d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RowArtwork.vue?vue&type=template&id=eb52f1d8& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/RowArtwork.vue?vue&type=template&id=eb52f1d8&");


/***/ })

}]);