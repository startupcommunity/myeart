"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_components_FormQuestion_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
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

// vuex
 // palabras no permitidas


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    artwork: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      validForm: false,
      loading: false,
      form: {
        comment: ""
      },
      // rules
      commentRule: [function (v) {
        return !!v || "Debe escribir una pregunta";
      }, function (v) {
        return v.length <= 500 || "El comentario no puede ser mayor a 500 caracteres";
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
  methods: {
    /**
     * Agrega una nueva pregunta o comentario
     */
    addComment: function addComment() {
      var _this$artwork,
          _this$user,
          _this = this;

      if (!this.$refs.commentForm.validate()) {
        return;
      }

      this.loading = true;
      var data = {
        artwork_id: (_this$artwork = this.artwork) === null || _this$artwork === void 0 ? void 0 : _this$artwork.id,
        user_id: (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.id,
        comment: this.form.comment
      };
      this.axios.post(this.ep.comments.artworkSave, data).then(function (resp) {
        _this.form.comment = "";

        _this.$refs.commentForm.resetValidation();

        _this.noty("Pregunta agregada correctamente"); // emit


        _this.$emit("saveComment", resp.data);
      })["catch"](function (err) {
        return _this.manageError(err);
      })["finally"](function () {
        return _this.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("v-form", {
    ref: "commentForm",
    attrs: {
      "lazy-validation": ""
    },
    model: {
      value: _vm.validForm,
      callback: function callback($$v) {
        _vm.validForm = $$v;
      },
      expression: "validForm"
    }
  }, [_c("div", {
    staticClass: "flex flex-wrap items-center mt-5"
  }, [_c("div", {
    staticClass: "w-full md:w-4/5"
  }, [_c("h4", [_c("span", {
    staticClass: "text-xl font-medium"
  }, [_vm._v("\n                    ¿Tienes una pregunta?\n                ")])]), _vm._v(" "), _c("v-textarea", {
    staticClass: "mx-2",
    attrs: {
      label: "Escribe tu pregunta...",
      rows: "1",
      counter: "",
      rules: _vm.commentRule,
      color: "#B2794C"
    },
    model: {
      value: _vm.form.comment,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "comment", $$v);
      },
      expression: "form.comment"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/5"
  }, [_c("v-btn", {
    staticClass: "mt-4",
    attrs: {
      large: "",
      color: "#B2794C",
      disabled: !_vm.validForm || _vm.loading
    },
    on: {
      click: _vm.addComment
    }
  }, [_c("span", {
    staticClass: "text-white"
  }, [_vm._v("Preguntar")])])], 1)])]);
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

/***/ "./resources/js/pages/artwork/components/FormQuestion.vue":
/*!****************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FormQuestion.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormQuestion.vue?vue&type=template&id=d5e91462& */ "./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462&");
/* harmony import */ var _FormQuestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormQuestion.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormQuestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__.render,
  _FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/FormQuestion.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormQuestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormQuestion.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormQuestion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormQuestion_vue_vue_type_template_id_d5e91462___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FormQuestion.vue?vue&type=template&id=d5e91462& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/FormQuestion.vue?vue&type=template&id=d5e91462&");


/***/ })

}]);