(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_auth_register_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//data
function data() {
  return {
    action: 'register',
    username: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    accept: false
  };
} //computed


function authErrors() {
  return this.$store.getters.authErrors;
} //methods


function register() {
  var _this = this;

  if (this.accept) {
    var action = this.action,
        username = this.username,
        name = this.name,
        email = this.email,
        password = this.password,
        password_confirmation = this.password_confirmation;
    this.$store.dispatch('authRequest', {
      action: action,
      username: username,
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }).then(function () {
      _this.$router.push('/perfil');
    });
  } else {}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'register',
  data: data,
  methods: {
    register: register
  },
  computed: {
    authErrors: authErrors
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=template&id=425558de&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=template&id=425558de& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "home-login"
  }, [_c("div", {
    staticClass: "wrap-login p-2"
  }, [_c("div", {
    staticClass: "container-login",
    staticStyle: {
      background: "rgba(255, 255, 255, 0.05)"
    }
  }, [_c("form", {
    staticClass: "login-form validate-form"
  }, [_c("div", {
    staticClass: "login-icon"
  }, [_c("router-link", {
    staticStyle: {
      color: "#FFF"
    },
    attrs: {
      "exact-active-class": "active",
      to: "/"
    }
  }, [_c("i", {
    staticClass: "fas fa-arrow-left"
  })])], 1), _vm._v(" "), _vm.authErrors.has("username") || _vm.authErrors.has("name") || _vm.authErrors.has("email") || _vm.authErrors.has("password") ? _c("div", {
    staticClass: "alert alert-danger mt-3",
    attrs: {
      role: "alert"
    }
  }, [_c("div", {
    domProps: {
      textContent: _vm._s(_vm.authErrors.get("username"))
    }
  }), _vm._v(" "), _c("div", {
    domProps: {
      textContent: _vm._s(_vm.authErrors.get("name"))
    }
  }), _vm._v(" "), _c("div", {
    domProps: {
      textContent: _vm._s(_vm.authErrors.get("email"))
    }
  }), _vm._v(" "), _c("div", {
    domProps: {
      textContent: _vm._s(_vm.authErrors.get("password"))
    }
  })]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "wrap-input100 validate-input",
    attrs: {
      "data-validate": "Enter username"
    }
  }, [_c("b-form-input", {
    staticClass: "input100",
    attrs: {
      type: "text",
      placeholder: "Correo electronico"
    },
    model: {
      value: _vm.email,
      callback: function callback($$v) {
        _vm.email = $$v;
      },
      expression: "email"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "focus-input100 email-input"
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "wrap-input100 validate-input",
    attrs: {
      "data-validate": "Enter username"
    }
  }, [_c("b-form-input", {
    staticClass: "input100",
    attrs: {
      type: "text",
      placeholder: "Nombre y apellido"
    },
    model: {
      value: _vm.name,
      callback: function callback($$v) {
        _vm.name = $$v;
      },
      expression: "name"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "focus-input100 user-input"
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "wrap-input100 validate-input",
    attrs: {
      "data-validate": "Enter username"
    }
  }, [_c("b-form-input", {
    staticClass: "input100",
    attrs: {
      type: "text",
      placeholder: "Nombre de usuario"
    },
    model: {
      value: _vm.username,
      callback: function callback($$v) {
        _vm.username = $$v;
      },
      expression: "username"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "focus-input100 user-input"
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "wrap-input100 validate-input",
    attrs: {
      "data-validate": "Enter password"
    }
  }, [_c("b-form-input", {
    staticClass: "input100",
    attrs: {
      type: "password",
      placeholder: "Contraseña"
    },
    model: {
      value: _vm.password,
      callback: function callback($$v) {
        _vm.password = $$v;
      },
      expression: "password"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "focus-input100 password-input"
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "wrap-input100 validate-input",
    attrs: {
      "data-validate": "Enter confirm password"
    }
  }, [_c("b-form-input", {
    staticClass: "input100",
    attrs: {
      type: "password",
      placeholder: "Confirmar contraseña"
    },
    model: {
      value: _vm.password_confirmation,
      callback: function callback($$v) {
        _vm.password_confirmation = $$v;
      },
      expression: "password_confirmation"
    }
  }), _vm._v(" "), _c("span", {
    staticClass: "focus-input100 password-input"
  })], 1), _vm._v(" "), _c("b-form-checkbox", {
    attrs: {
      id: "checkbox-1",
      name: "checkbox-1",
      value: "accepted",
      "unchecked-value": "not_accepted"
    },
    model: {
      value: _vm.accept,
      callback: function callback($$v) {
        _vm.accept = $$v;
      },
      expression: "accept"
    }
  }, [_vm._v("\n                        Acepto los "), _c("b", {
    staticStyle: {
      "border-bottom": "2px solid #FFF"
    }
  }, [_vm._v("Términos y Condiciones")])]), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "container-login-form-btn"
  }, [_c("button", {
    staticClass: "btn btn-primary login-form-btn",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.register
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tRegistrate\n\t\t\t\t\t\t")])]), _vm._v(" "), _vm._m(0)], 1)])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "container-login-form-btn"
  }, [_c("button", {
    staticClass: "btn btn-primary google-form-btn"
  }, [_vm._v("\n\t\t\t\t\t\t\tEntrar Con "), _c("img", {
    staticStyle: {
      "margin-top": "4px"
    },
    attrs: {
      src: __webpack_require__(/*! ../../../../public/img/image 31.png */ "./public/img/image 31.png"),
      width: "70px"
    }
  })])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./public/img/image 31.png":
/*!*********************************!*\
  !*** ./public/img/image 31.png ***!
  \*********************************/
/***/ ((module) => {

module.exports = "/images/image 31.png?e7045514b688b20f3068aa9d4bda1f34";

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.email-input::after {\n    content: \"\\f0e0\";\n}\n.user-input::after {\n    content: \"\\f007\";\n}\n.password-input::after {\n    content: \"\\f023\";\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_style_index_0_id_425558de_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./register.vue?vue&type=style&index=0&id=425558de&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_style_index_0_id_425558de_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_style_index_0_id_425558de_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/pages/auth/register.vue":
/*!**********************************************!*\
  !*** ./resources/js/pages/auth/register.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./register.vue?vue&type=template&id=425558de& */ "./resources/js/pages/auth/register.vue?vue&type=template&id=425558de&");
/* harmony import */ var _register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.vue?vue&type=script&lang=js& */ "./resources/js/pages/auth/register.vue?vue&type=script&lang=js&");
/* harmony import */ var _register_vue_vue_type_style_index_0_id_425558de_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.vue?vue&type=style&index=0&id=425558de&lang=css& */ "./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__.render,
  _register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/auth/register.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/auth/register.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/auth/register.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/auth/register.vue?vue&type=template&id=425558de&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/auth/register.vue?vue&type=template&id=425558de& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_template_id_425558de___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./register.vue?vue&type=template&id=425558de& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=template&id=425558de&");


/***/ }),

/***/ "./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_register_vue_vue_type_style_index_0_id_425558de_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./register.vue?vue&type=style&index=0&id=425558de&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/auth/register.vue?vue&type=style&index=0&id=425558de&lang=css&");


/***/ })

}]);