"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_release_components_FavButton_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "FavButtonRelease",
  props: {
    release: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: function data() {
    return {
      loading: false,
      isFav: false
    };
  },
  mounted: function mounted() {
    this.hasFavorite();
  },
  computed: {
    user: function user() {
      return this.$store.getters.getProfile;
    }
  },
  methods: {
    addOrRemoveFav: function addOrRemoveFav() {
      var _this = this;

      var data = {
        release_id: this.release.id,
        user_id: this.user.id
      };
      var ep = this.isFav ? this.ep.releases.removeFav : this.ep.releases.addFav;
      this.loading = true;
      this.axios.post(ep, data).then(function (resp) {
        if (_this.isFav) {
          _this.$emit("fav-removed", true);

          _this.isFav = false;
        } else {
          _this.$emit("fav-added");

          _this.isFav = true;
        }

        _this.$store.dispatch("userRequest");

        _this.$store.dispatch("userFavoriteReleases");
      })["catch"](function (error) {
        return _this.manageError(error);
      })["finally"](function () {
        return _this.loading = false;
      });
    },
    hasFavorite: function hasFavorite() {
      var _this$user;

      var favs = (_this$user = this.user) === null || _this$user === void 0 ? void 0 : _this$user.favorite_releases;
      var release = this.release;
      this.isFav = favs.some(function (fav) {
        return fav.release_id === release.id;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45& ***!
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

  return _c("button", {
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.addOrRemoveFav.apply(null, arguments);
      }
    }
  }, [_c("i", {
    staticClass: "fa-regular fa-bookmark text-base",
    "class": {
      "text-blue-600": _vm.isFav,
      "text-gray-500": !_vm.isFav
    }
  }), _vm._v(" "), _c("loading-overlay", {
    attrs: {
      active: _vm.loading,
      "is-full-page": true,
      loader: "bars"
    }
  })], 1);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/release/components/FavButton.vue":
/*!*************************************************************!*\
  !*** ./resources/js/pages/release/components/FavButton.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FavButton.vue?vue&type=template&id=37fa3d45& */ "./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45&");
/* harmony import */ var _FavButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FavButton.vue?vue&type=script&lang=js& */ "./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FavButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__.render,
  _FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/release/components/FavButton.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FavButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FavButton.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FavButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FavButton_vue_vue_type_template_id_37fa3d45___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FavButton.vue?vue&type=template&id=37fa3d45& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/components/FavButton.vue?vue&type=template&id=37fa3d45&");


/***/ })

}]);