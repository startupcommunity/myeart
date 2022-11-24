"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artist_components_CardRelease_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CardEvent",
  props: {
    release: {
      type: Object,
      "default": {}
    },
    artist: {
      type: Object,
      "default": function _default() {}
    }
  },
  computed: {
    /**
     * Path completo de la foto de perfil
     */
    profilePhoto: function profilePhoto() {
      var artist = this.artist;
      if (!(artist !== null && artist !== void 0 && artist.profile_photo)) return this.getURLDefaultProfilePhoto;
      return "".concat(this.pathProfilePhoto + artist.profile_photo);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$artist, _vm$release, _vm$release2, _vm$artist2, _vm$release3, _vm$release4;

  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "overflow-hidden"
  }, [_c("div", {
    staticClass: "flex flex-wrap items-start"
  }, [_c("div", {
    staticClass: "w-full"
  }, [_c("div", {
    staticClass: "flex justify-between items-center py-2"
  }, [_c("div", {
    staticClass: "flex flex-row justify-start items-center"
  }, [_c("img", {
    staticClass: "border w-10 h-10 rounded-full",
    attrs: {
      src: _vm.profilePhoto
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "mt-4 ml-2"
  }, [_c("p", {
    staticClass: "font-medium text-gray-900 text-xs"
  }, [_vm._v("\n                            " + _vm._s((_vm$artist = _vm.artist) === null || _vm$artist === void 0 ? void 0 : _vm$artist.name) + "\n                            "), _c("br"), _vm._v(" "), _c("span", {
    staticClass: "text-gray-400"
  }, [_vm._v("Museo " + _vm._s((_vm$release = _vm.release) === null || _vm$release === void 0 ? void 0 : _vm$release.museum) + " ")])])])]), _vm._v(" "), _c("div", [_c("v-btn", {
    attrs: {
      text: ""
    }
  }, [_vm._v("...")])], 1)])]), _vm._v(" "), _c("div", {
    staticClass: "w-full h-96 md:h-[24rem]"
  }, [_c("img", {
    staticClass: "w-full h-full object-cover object-center",
    attrs: {
      src: (_vm$release2 = _vm.release) === null || _vm$release2 === void 0 ? void 0 : _vm$release2.image,
      alt: "release"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "w-full px-4"
  }, [_vm._m(0), _vm._v(" "), _c("div", {
    staticClass: "font-extra-bold text-xs mb-1"
  }, [_c("span", {
    staticClass: "uppercase"
  }, [_vm._v(_vm._s((_vm$artist2 = _vm.artist) === null || _vm$artist2 === void 0 ? void 0 : _vm$artist2.name))]), _vm._v(" "), _c("span", {
    staticClass: "font-normal"
  }, [_vm._v("\n                    " + _vm._s((_vm$release3 = _vm.release) === null || _vm$release3 === void 0 ? void 0 : _vm$release3.text) + "\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "text-app-hashtag text-xs font-medium mb-1"
  }, [_vm._v("\n                " + _vm._s((_vm$release4 = _vm.release) === null || _vm$release4 === void 0 ? void 0 : _vm$release4.hashtag) + "\n            ")]), _vm._v(" "), _c("div", {
    staticClass: "text-xs font-semibold text-gray-400"
  }, [_vm._v("\n                10 comentarios\n            ")])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex justify-between py-3"
  }, [_c("div", {
    staticClass: "flex gap-3"
  }, [_c("button", [_c("i", {
    staticClass: "fa-regular fa-heart text-gray-400 text-xl"
  })]), _vm._v(" "), _c("button", [_c("i", {
    staticClass: "fa-regular fa-comment text-gray-400 text-xl"
  })]), _vm._v(" "), _c("button", [_c("i", {
    staticClass: "fa-regular fa-paper-plane text-gray-400 text-xl"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-start items-center gap-1"
  }, [_c("i", {
    staticClass: "fa-solid fa-circle super-small text-app-hashtag"
  }), _vm._v(" "), _c("i", {
    staticClass: "fa-solid fa-circle super-small text-gray-400"
  }), _vm._v(" "), _c("i", {
    staticClass: "fa-solid fa-circle super-small text-gray-400"
  }), _vm._v(" "), _c("i", {
    staticClass: "fa-solid fa-circle super-small text-gray-400"
  })]), _vm._v(" "), _c("div", [_c("button", [_c("i", {
    staticClass: "fa-regular fa-bookmark text-gray-400 text-xl"
  })])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/artist/components/CardRelease.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/artist/components/CardRelease.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardRelease.vue?vue&type=template&id=8c497526& */ "./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526&");
/* harmony import */ var _CardRelease_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardRelease.vue?vue&type=script&lang=js& */ "./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardRelease_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artist/components/CardRelease.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRelease_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardRelease.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRelease_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRelease_vue_vue_type_template_id_8c497526___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardRelease.vue?vue&type=template&id=8c497526& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artist/components/CardRelease.vue?vue&type=template&id=8c497526&");


/***/ })

}]);