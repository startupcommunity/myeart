"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_artwork_components_CardRowCart_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Avatar.vue */ "./resources/js/components/Avatar.vue");
/* harmony import */ var _FollowArtistButton_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FollowArtistButton.vue */ "./resources/js/pages/artwork/components/FollowArtistButton.vue");
/* harmony import */ var _mixins_utilMixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mixins/utilMixin */ "./resources/js/mixins/utilMixin.js");

 // utilmixin


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CardRowCart",
  components: {
    Avatar: _components_Avatar_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    FollowArtistButton: _FollowArtistButton_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  mixins: [_mixins_utilMixin__WEBPACK_IMPORTED_MODULE_2__["default"]],
  props: {
    artwork: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  computed: {
    /**
     * Devuelve el creador de la obra
     */
    creator: function creator() {
      var _this$artwork;

      return ((_this$artwork = this.artwork) === null || _this$artwork === void 0 ? void 0 : _this$artwork.user) || {};
    },

    /**
     * Devuelve las medidas de la obra
     */
    measures: function measures() {
      var _this$artwork$width, _this$artwork$large;

      var width = (_this$artwork$width = this.artwork.width) !== null && _this$artwork$width !== void 0 ? _this$artwork$width : 0;
      var large = (_this$artwork$large = this.artwork.large) !== null && _this$artwork$large !== void 0 ? _this$artwork$large : 0;
      return "".concat(width, " X ").concat(large, " ").concat(this.artSize);
    },

    /**
     * Devuelve el peso de la obra
     */
    weight: function weight() {
      var _this$artwork$weight;

      var weight = (_this$artwork$weight = this.artwork.weight) !== null && _this$artwork$weight !== void 0 ? _this$artwork$weight : 0;
      return "".concat(weight, " ").concat(this.ArtWeight);
    },

    /**
     * Devuelve las dimensiones y peso de la obra
     */
    dimensionsAndWeight: function dimensionsAndWeight() {
      var width = "Ancho ".concat(this.artwork.width + this.artSize);
      var large = "Largo ".concat(this.artwork.large + this.artSize);
      var weight = this.weight;
      return "".concat(width, " | ").concat(large, " | ").concat(weight);
    },

    /**
     * devuelve el path completo de la imagen de la obra
     */
    getPathImage: function getPathImage() {
      var _front_page$;

      var artwork = this.artwork;
      var gallery = (artwork === null || artwork === void 0 ? void 0 : artwork.gallery) || [];
      if (!(artwork !== null && artwork !== void 0 && artwork.gallery.length)) return this.getURLDefaultFrontArtwork;
      var front_page = gallery.filter(function (pic) {
        return pic.front_page === 1;
      });
      return "".concat(this.pathArtworkGallery + ((_front_page$ = front_page[0]) === null || _front_page$ === void 0 ? void 0 : _front_page$.picture));
    },

    /**
     * Si el producto no esta disponible
     * notificar al usuario
     */
    isAvailable: function isAvailable() {
      var _this$artwork2;

      return ((_this$artwork2 = this.artwork) === null || _this$artwork2 === void 0 ? void 0 : _this$artwork2.state) === 1;
    }
  },
  methods: {
    /**
     * Elimina un item del carrito
     */
    deleteItem: function deleteItem() {
      var _this = this;

      var dialog = {
        title: "¿Deseas eliminar este producto de tu carrito?",
        text: "Eliminaras el producto de tu carrito",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar"
      };
      this.confirmedDialog(dialog).then(function (resp) {
        if (resp.isConfirmed) {
          _this.loading = true; // data

          var _method = {
            _method: "DELETE"
          }; // ep

          var ep = _this.ep.carts.deleteItem + _this.artwork.id; // request axios

          _this.axios.post(ep, _method).then(function (resp) {
            return _this.successMsj();
          })["catch"](function (error) {
            return _this.$manageError(error);
          })["finally"](function () {
            return _this.loading = false;
          });
        }
      });
    },

    /**
     * Avisar al usuario que se ha eliminado el item del carrito
     *
     */
    successMsj: function successMsj() {
      this.notySwal({
        title: "Eliminado",
        text: "El producto se ha eliminado de tu carrito",
        icon: "success",
        showConfirmButton: false
      });
      this.$emit("deleteItemSuccess");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm$creator, _vm$creator2;

  var _vm = this,
      _c = _vm._self._c;

  return _c("div", {
    staticClass: "flex flex-wrap justify-between items-start"
  }, [_c("div", {
    staticClass: "w-full md:w-3/4 mb-4 md:mb-0"
  }, [_c("div", {
    staticClass: "flex flex-col md:flex-row items-start gap-4"
  }, [_c("div", {
    staticClass: "w-full md:w-80 h-80 md:h-60"
  }, [_c("img", {
    staticClass: "w-full h-full object-cover object-center",
    attrs: {
      src: _vm.getPathImage,
      alt: "imagen-obra-de-arte"
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "flex flex-col justify-start space-y-3 w-full"
  }, [_c("h3", {
    staticClass: "text-lg md:text-2xl font-bold text-zinc-900"
  }, [_vm._v("\n                    " + _vm._s(_vm.artwork.title) + "\n                ")]), _vm._v(" "), _c("div", [_c("p", {
    staticClass: "uppercase text-base leading-8 font-bold"
  }, [_vm._v("\n                        Medida: " + _vm._s(_vm.measures) + "\n                    ")]), _vm._v(" "), _c("p", {
    staticClass: "uppercase text-base leading-8 font-bold -mt-5"
  }, [_vm._v("\n                        Peso: " + _vm._s(_vm.weight) + "\n                    ")])]), _vm._v(" "), _c("div", {
    staticClass: "w-full"
  }, [_c("div", {
    staticClass: "flex justify-between md:justify-start"
  }, [_c("div", {
    staticClass: "flex justify-start"
  }, [_c("Avatar", {
    attrs: {
      artist: _vm.creator,
      custom: "w-14 h-14 border"
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "flex-col pl-2 hidden md:flex"
  }, [_c("span", {
    staticClass: "py-0"
  }, [_vm._v("\n                                    " + _vm._s((_vm$creator = _vm.creator) === null || _vm$creator === void 0 ? void 0 : _vm$creator.name) + "\n                                ")]), _vm._v(" "), _c("FollowArtistButton", {
    staticClass: "w-40 py-2 rounded-md",
    attrs: {
      artist: _vm.creator
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "flex-col justify-center pl-2 flex md:hidden"
  }, [_c("span", {
    staticClass: "py-0 font-bold"
  }, [_vm._v("\n                                    " + _vm._s((_vm$creator2 = _vm.creator) === null || _vm$creator2 === void 0 ? void 0 : _vm$creator2.name) + "\n                                ")]), _vm._v(" "), _c("span", [_vm._v("\n                                    " + _vm._s(_vm.getArtistQualifying(_vm.creator, null, 1)) + "\n                                ")])])], 1), _vm._v(" "), _c("div", {
    staticClass: "flex justify-end items-center md:hidden"
  }, [_c("FollowArtistButton", {
    staticClass: "w-32 h-7 rounded-md",
    attrs: {
      artist: _vm.creator
    }
  })], 1)])])])])]), _vm._v(" "), _c("div", {
    staticClass: "w-full md:w-1/4"
  }, [_c("div", {
    staticClass: "flex flex-col items-start md:items-end"
  }, [_c("div", {
    staticClass: "md:mb-3"
  }, [_c("h4", {
    staticClass: "text-2xl font-bold text-zinc-900 uppercase"
  }, [_vm._v("\n                    " + _vm._s(_vm.artwork.total) + " " + _vm._s(_vm.euro) + "\n                ")])]), _vm._v(" "), _c("div", {
    staticClass: "md:mb-3"
  }, [_c("v-btn", {
    attrs: {
      text: ""
    },
    on: {
      click: function click($event) {
        $event.stopPropagation();
        return _vm.deleteItem.apply(null, arguments);
      }
    }
  }, [_vm._v("Eliminar")])], 1), _vm._v(" "), !_vm.isAvailable ? _c("div", [_vm._m(0)]) : _vm._e()])])]);
};

var staticRenderFns = [function () {
  var _vm = this,
      _c = _vm._self._c;

  return _c("p", {
    staticClass: "text-red-500 text-sm"
  }, [_c("i", {
    staticClass: "fa fa-warning"
  }), _vm._v("\n                    Esta obra ya no se encuentra disponible\n                ")]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/artwork/components/CardRowCart.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardRowCart.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardRowCart.vue?vue&type=template&id=799c3375& */ "./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375&");
/* harmony import */ var _CardRowCart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardRowCart.vue?vue&type=script&lang=js& */ "./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CardRowCart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/artwork/components/CardRowCart.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRowCart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardRowCart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRowCart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CardRowCart_vue_vue_type_template_id_799c3375___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardRowCart.vue?vue&type=template&id=799c3375& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/artwork/components/CardRowCart.vue?vue&type=template&id=799c3375&");


/***/ })

}]);