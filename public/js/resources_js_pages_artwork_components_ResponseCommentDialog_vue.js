"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_components_ResponseCommentDialog_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _utils_listDisallowedWords__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/listDisallowedWords */ "./resources/js/pages/artwork/utils/listDisallowedWords.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    comment: {
      type: Object,
      "default": function _default() {}
    },
    showDialog: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      valid: false,
      answer: "",
      rules: [function (v) {
        return !!v || "Debe escribir una respuesta";
      }, function (v) {
        return v.length <= 1000 || "La respuesta no debe superar los 1000 caracteres";
      }, // validar palabras no permitidas
      function (v) {
        // array de palabras no permitidas
        var badWordsFound = [];
        _utils_listDisallowedWords__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (word) {
          if (v.toLowerCase().includes(word)) {
            badWordsFound.push(word);
          }
        }); // mensaje error, resaltar las palabras no permitidas

        var mjs_error = "Las siguientes palabras no est\xE1n permitidas:\n                    ".concat(badWordsFound.join(", "), ", tenga cuidado al ingresar malas palabras"); // validar si hay palabras no permitidas

        if (badWordsFound.length > 0) {
          return mjs_error;
        }

        return true;
      }]
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)({
    user: "getProfile"
  })),
  watch: {
    showDialog: function showDialog(val) {
      if (val) {
        var _this$$refs$formAnswe;

        this.answer = "";
        (_this$$refs$formAnswe = this.$refs.formAnswer) === null || _this$$refs$formAnswe === void 0 ? void 0 : _this$$refs$formAnswe.resetValidation();
      }
    }
  },
  methods: {
    saveResponse: function saveResponse() {
      var _this$comment,
          _this$user,
          _this = this;

      // validate formAnswer
      if (!this.$refs.formAnswer.validate()) {
        return;
      }

      this.globalLoading = true; // axios

      this.axios.post(this.ep.comments.artworkAnswerSave, {
        answer: this.answer,
        comment_id: (_this$comment = this.comment) === null || _this$comment === void 0 ? void 0 : _this$comment.id,
        user_id: (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id
      }).then(function () {
        return _this.$emit("saveAnswer");
      })["catch"](function (err) {
        return _this.manageError(err);
      })["finally"](function () {
        return _this.globalLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$comment$user;

  var _vm = this,
      _c = _vm._self._c;

  return _c("v-row", {
    attrs: {
      justify: "center"
    }
  }, [_c("v-dialog", {
    attrs: {
      fullscreen: "",
      "hide-overlay": "",
      transition: "dialog-bottom-transition"
    },
    model: {
      value: _vm.showDialog,
      callback: function callback($$v) {
        _vm.showDialog = $$v;
      },
      expression: "showDialog"
    }
  }, [_c("v-card", {
    staticClass: "px-8"
  }, [_c("v-container", [_c("v-card-title", [_c("div", {
    staticClass: "flex justify-between"
  }, [_c("h3", [_c("span", {
    staticClass: "text-2xl font-bold"
  }, [_vm._v("\n                                Responder a " + _vm._s((_vm$comment$user = _vm.comment.user) === null || _vm$comment$user === void 0 ? void 0 : _vm$comment$user.name) + "\n                            ")])]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-end"
  }, [_c("v-btn", {
    attrs: {
      icon: "",
      disabled: _vm.globalLoading
    },
    on: {
      click: function click($event) {
        return _vm.$emit("closeResponseDialog");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-times text-gray-800"
  })])], 1)])]), _vm._v(" "), _c("v-divider"), _vm._v(" "), _c("v-card-text", [_c("h4", {
    staticClass: "mb-4"
  }, [_c("span", {
    staticClass: "text-xl font-medium text-gray-400"
  }, [_vm._v("\n                            " + _vm._s(_vm.comment.comment) + "\n                        ")])]), _vm._v(" "), _c("v-form", {
    ref: "formAnswer",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.valid,
      callback: function callback($$v) {
        _vm.valid = $$v;
      },
      expression: "valid"
    }
  }, [_c("v-textarea", {
    attrs: {
      rules: _vm.rules,
      label: "Respuesta",
      outlined: "",
      rows: "3",
      color: "#B2794C",
      counter: "1000"
    },
    model: {
      value: _vm.answer,
      callback: function callback($$v) {
        _vm.answer = $$v;
      },
      expression: "answer"
    }
  }), _vm._v(" "), _c("v-btn", {
    staticClass: "mr-4",
    attrs: {
      disabled: !_vm.valid || _vm.globalLoading,
      color: "#B2794C"
    },
    on: {
      click: _vm.saveResponse
    }
  }, [_c("span", {
    staticClass: "text-white"
  }, [_vm._v(" Guardar ")])]), _vm._v(" "), _c("v-btn", {
    attrs: {
      color: "red",
      disabled: _vm.globalLoading
    },
    on: {
      click: function click($event) {
        return _vm.$emit("closeResponseDialog");
      }
    }
  }, [_c("span", {
    staticClass: "text-white"
  }, [_vm._v(" Cancelar ")])])], 1)], 1)], 1)], 1)], 1)], 1);
};

var staticRenderFns = [];
render._withStripped = true;


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

/***/ "./resources/js/pages/artwork/components/ResponseCommentDialog.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/ResponseCommentDialog.vue ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResponseCommentDialog.vue?vue&type=template&id=4d78fc91& */ "./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91&");
/* harmony import */ var _ResponseCommentDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResponseCommentDialog.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResponseCommentDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__.render,
  _ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/ResponseCommentDialog.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResponseCommentDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResponseCommentDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ResponseCommentDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91& ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ResponseCommentDialog_vue_vue_type_template_id_4d78fc91___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResponseCommentDialog.vue?vue&type=template&id=4d78fc91& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/ResponseCommentDialog.vue?vue&type=template&id=4d78fc91&");


/***/ })

}]);