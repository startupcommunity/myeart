"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_community_sections_index_Filters_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Filters",
  data: function data() {
    return {
      sortBy: [{
        text: "Mas reciente",
        val: 1
      }, {
        text: "Orden alfabético",
        val: 2
      }],
      filters: {
        sortBy: 1
      }
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("section", {
    staticClass: "bg-white"
  }, [_c("div", {
    staticClass: "py-10 container"
  }, [_c("div", {
    staticClass: "flex justify-center items-center md:gap-16 border-b border-zinc-700 pb-5"
  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c("div", [_c("div", {
    staticClass: "flex flex-wrap items-center"
  }, [_vm._m(2), _vm._v(" "), _c("v-select", {
    staticClass: "pl-2 uppercase w-52",
    attrs: {
      items: _vm.sortBy,
      "item-text": "text",
      "item-value": "val",
      color: "#B2794C",
      "item-color": "brown darken-2"
    },
    model: {
      value: _vm.filters.sortBy,
      callback: function callback($$v) {
        _vm.$set(_vm.filters, "sortBy", $$v);
      },
      expression: "filters.sortBy"
    }
  })], 1)])])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "md:border-r border-gray-900 h-full md:pr-16"
  }, [_c("button", {
    staticClass: "hover:animate-bg-gray-light rounded-md p-2"
  }, [_c("span", {
    staticClass: "text-zinc-900 font-medium tracking-widest uppercase text-base"
  }, [_c("i", {
    staticClass: "fas fa-user text-zinc-900"
  }, [_vm._v("\n                            Publicaciones de amigos\n                        ")])])])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "md:border-r border-gray-900 h-full md:pr-16"
  }, [_c("button", {
    staticClass: "hover:animate-bg-gray-light rounded-md p-2"
  }, [_c("span", {
    staticClass: "text-zinc-400 font-medium tracking-wide uppercase text-base"
  }, [_c("i", {
    staticClass: "fa-solid fa-bars-staggered text-zinc-400"
  }, [_vm._v("\n                            Blog\n                        ")])])])]);
}, function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "w-auto"
  }, [_c("span", {
    staticClass: "text-zinc-900 font-medium tracking-wide uppercase text-base"
  }, [_vm._v("\n                            Ordenar por:\n                        ")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/community/sections/index/Filters.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/community/sections/index/Filters.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Filters.vue?vue&type=template&id=2d02704c& */ "./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c&");
/* harmony import */ var _Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filters.vue?vue&type=script&lang=js& */ "./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__.render,
  _Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/community/sections/index/Filters.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Filters.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Filters_vue_vue_type_template_id_2d02704c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Filters.vue?vue&type=template&id=2d02704c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/sections/index/Filters.vue?vue&type=template&id=2d02704c&");


/***/ })

}]);