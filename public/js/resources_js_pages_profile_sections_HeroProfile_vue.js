"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_profile_sections_HeroProfile_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "HeroProfile",
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    /**
     * Foto de portada del usuario
     */
    frontPhoto: function frontPhoto() {
      var _this$user;

      return "url('".concat(this.pathFrontPhoto + ((_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.front_photo), "')");
    },

    /**
     * Foto de perfil del usuario
     */
    profilePhoto: function profilePhoto() {
      var _this$user2;

      return "".concat(this.pathProfilePhoto + ((_this$user2 = this.user) === null || _this$user2 === void 0 ? void 0 : _this$user2.profile_photo));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d& ***!
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
    staticClass: "relative z-[1] h-96 sm:h-[30rem] bg-no-repeat bg-cover bg-center",
    "class": !_vm.user.front_photo ? "bg-hero-profile-bg" : "",
    style: {
      "background-image": _vm.user.front_photo ? _vm.frontPhoto : ""
    }
  }, [_c("div", {
    staticClass: "container py-0 px-4 sm:px-0 absolute -bottom-8 sm:-bottom-12"
  }, [_c("div", {}, [_c("div", {
    staticClass: "flex flex-row items-center justify-center justify-md-between"
  }, [_c("div", {
    staticClass: "relative w-full md:w-1/2 flex justify-center px-2 sm:px-0"
  }, [_c("div", {
    staticClass: "flex flex-col items-center md:-mb-10 md:gap-2"
  }, [_c("img", {
    staticClass: "rounded-full w-48 h-48 sm:w-56 sm:h-56 aspect-square",
    attrs: {
      src: _vm.user.profile_photo ? _vm.profilePhoto : "/img/avatar.png",
      alt: "profile-photo-myaert"
    }
  }), _vm._v(" "), _c("h3", {
    staticClass: "text-3xl sm:text-lg md:text-3xl tracking-tight text-gray-900 text-center hidden md:block"
  }, [_c("b", {
    staticClass: "font-black"
  }, [_vm._v(" " + _vm._s(_vm.user.name) + " ")])])]), _vm._v(" "), _c("div", {
    staticClass: "absolute sm:bottom-16 bottom-6 sm:pl-52 pl-44"
  }, [_c("button", {
    staticClass: "border rounded-full bg-white hover:bg-gray-100 px-2 py-1 text-primary text-2xl",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.$emit("openDialogPP");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-camera"
  })])]), _vm._v(" "), _c("div", {
    staticClass: "absolute top-0 right-0 mt-14 block md:hidden"
  }, [_c("button", {
    staticClass: "font-bold text-xs md:text-lg text-white",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.$emit("openDialogFP");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-camera"
  }), _vm._v(" Portada\n                        ")])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/2 justify-end gap-5 hidden md:flex"
  }, [_c("button", {
    staticClass: "font-bold text-xs md:text-lg text-white",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.$emit("openDialogFP");
      }
    }
  }, [_c("i", {
    staticClass: "fas fa-camera"
  }), _vm._v(" Editar portada\n                    ")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary text-white px-3 py-2 rounded-lg uppercase",
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.$router.push("/colectivos/crear");
      }
    }
  }, [_vm._v("\n                        Crear colectivo\n                    ")])])])])]), _vm._v(" "), _c("div", {
    staticClass: "absolute top-0 bottom-auto pb-24 inset-x-0 bg-zinc-900 bg-opacity-60"
  })]);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/profile/sections/HeroProfile.vue":
/*!*************************************************************!*\
  !*** ./resources/js/pages/profile/sections/HeroProfile.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeroProfile.vue?vue&type=template&id=6af6785d& */ "./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d&");
/* harmony import */ var _HeroProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeroProfile.vue?vue&type=script&lang=js& */ "./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HeroProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__.render,
  _HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/profile/sections/HeroProfile.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HeroProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_HeroProfile_vue_vue_type_template_id_6af6785d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HeroProfile.vue?vue&type=template&id=6af6785d& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/profile/sections/HeroProfile.vue?vue&type=template&id=6af6785d&");


/***/ })

}]);