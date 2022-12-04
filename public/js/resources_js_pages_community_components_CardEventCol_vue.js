"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_community_components_CardEventCol_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CardEventCol",
  props: {
    event: {
      type: Object,
      "default": {}
    }
  },
  data: function data() {
    return {
      loading: false
    };
  },
  computed: {
    /**
     * Obtener la fecha del evento
     */
    date: function date() {
      return this.event.date;
    },

    /**
     * Obtener el titulo del evento
     */
    title: function title() {
      return this.event.title;
    },

    /**
     * Obtener la descripcion del evento
     */
    description: function description() {
      return this.event.description;
    },

    /**
     * Obtener la imagen del evento
     */
    image: function image() {
      return this.event.image;
    },

    /**
     * Obtener la url del evento
     */
    url: function url() {
      return this.event.url;
    },

    /**
     * Creador del evento
     */
    creator: function creator() {
      var _this$event;

      return (_this$event = this.event) === null || _this$event === void 0 ? void 0 : _this$event.creator;
    }
  },
  filters: {
    /**
     * Formatear la fecha del evento, en un formato
     * de texto español, ejemplo:
     * Lunes, 1 de Enero de 2021
     * @param {String} date
     */
    formatDate: function formatDate(date) {
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return new Date(date).toLocaleDateString("es-ES", options);
    },

    /**
     * Acortar texto para que se vea bien
     * en pantalla
     */
    truncateText: function truncateText(text) {
      return text.length > 20 ? text.substring(0, 20) + "..." : text;
    }
  },
  methods: {
    /**
     * Obtener la fecha del evento
     */
    getDate: function getDate() {
      return this.date;
    },

    /**
     * Obtener el titulo del evento
     */
    getTitle: function getTitle() {
      return this.title;
    },

    /**
     * Obtener la descripcion del evento
     */
    getDescription: function getDescription() {
      return this.description;
    },

    /**
     * Obtener la imagen del evento
     */
    getImage: function getImage() {
      return this.image;
    },

    /**
     * Obtener la url del evento
     */
    getUrl: function getUrl() {
      return this.url;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
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

  return _c("div", [_c("div", {
    staticClass: "flex flex-col space-y-2 hover:animate-shadow-drop-center hover:cursor-pointer"
  }, [_c("div", {
    staticClass: "w-full h-48"
  }, [_c("img", {
    staticClass: "w-full h-full object-cover object-center",
    attrs: {
      src: _vm.event.image,
      alt: _vm.event.title
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "px-1"
  }, [_c("span", {
    staticClass: "text-base font-medium tracking-wide text-gray-500"
  }, [_vm._v("\n                " + _vm._s(_vm._f("formatDate")(_vm.event.created_at)) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "px-1"
  }, [_c("h5", {
    staticClass: "text-2xl font-bold text-zinc-900 uppercase tracking-wide"
  }, [_vm._v("\n                " + _vm._s(_vm.event.title) + "\n            ")])]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-between items-end px-1 pb-2"
  }, [_c("div", {
    staticClass: "border-r border-gray-600 pr-2 h-full"
  }, [_c("span", {
    staticClass: "text-xs font-medium tracking-wide text-gray-500"
  }, [_vm._v("\n                    " + _vm._s(_vm._f("truncateText")(_vm.event.location)) + "\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "pl-2"
  }, [_c("span", {
    staticClass: "text-xs font-medium tracking-wide text-gray-500"
  }, [_vm._v("\n                    Organizador\n                    "), _c("span", {
    staticClass: "text-primary"
  }, [_vm._v(_vm._s((_vm$creator = _vm.creator) === null || _vm$creator === void 0 ? void 0 : _vm$creator.name))])])])])])]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/community/components/CardEventCol.vue":
/*!******************************************************************!*\
  !*** ./resources/js/pages/community/components/CardEventCol.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardEventCol.vue?vue&type=template&id=03e39d70& */ "./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70&");
/* harmony import */ var _CardEventCol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardEventCol.vue?vue&type=script&lang=js& */ "./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardEventCol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/community/components/CardEventCol.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardEventCol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardEventCol.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardEventCol_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardEventCol_vue_vue_type_template_id_03e39d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardEventCol.vue?vue&type=template&id=03e39d70& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/community/components/CardEventCol.vue?vue&type=template&id=03e39d70&");


/***/ })

}]);