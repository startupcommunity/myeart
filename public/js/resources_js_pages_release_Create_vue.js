(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_release_Create_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_anka_cropper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-anka-cropper */ "./node_modules/vue-anka-cropper/dist/VueAnkaCropper.umd.min.js");
/* harmony import */ var vue_anka_cropper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_anka_cropper__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CreateRelease",
  components: {
    AnkaCropper: (vue_anka_cropper__WEBPACK_IMPORTED_MODULE_0___default())
  },
  data: function data() {
    return {
      loading: false,
      formIsValid: true,
      artists: [],
      croppedFile: "",
      form: {
        image: "",
        text: "",
        labels: [],
        location: ""
      },
      ankaOptions: {
        aspectRatio: 1.5,
        closeOnSave: false,
        cropArea: "box",
        croppedHeight: 800,
        croppedWidth: 800,
        cropperHeight: false,
        dropareaMessage: "Arrastre la imagen aquí",
        frameLineDash: [5, 3],
        frameStrokeColor: "rgba(255, 255, 255, 255)",
        handleFillColor: "rgba(255, 255, 255, 255)",
        handleHoverFillColor: "rgba(255, 255, 255, 255)",
        handleHoverStrokeColor: "rgba(255, 255, 255, 255)",
        handleSize: 5,
        handleStrokeColor: "rgba(255, 255, 255, 255)",
        layoutBreakpoint: 850,
        maxCropperHeight: 1200,
        maxFileSize: 80000000000,
        overlayFill: "rgba(0, 0, 0, 0.5)",
        previewOnDrag: false,
        previewQuality: 0.65,
        resultQuality: 0.8,
        resultMimeType: "image/jpeg",
        selectButtonLabel: "Seleccionar del ordenador",
        showPreview: false,
        skin: "light",
        uploadData: {},
        uploadTo: false
      }
    };
  },
  created: function created() {
    this.getFASI();
  },
  methods: {
    /**
     * Devuelve los artistas seguidos por el usuario,
     * con la info corta y justa
     */
    getFASI: function getFASI() {
      var _this = this;

      this.loading = true;
      var ep = this.ep.user.getFASI;
      this.axios.get(ep).then(function (resp) {
        return _this.artists = resp.data;
      })["catch"](function (error) {
        return _this.$manageError(error);
      })["finally"](function () {
        return _this.loading = false;
      });
    },

    /**
     * Algún error al cargar el archivo
     */
    errorCropper: function errorCropper(error) {
      this.$noty("Error al carga el archivo [" + error + "]", "error");
    },

    /**
     * Dar click al botón para guardar la imagen cargada y recortada
     * y los datos adicionales del formulario
     */
    buttonClick: function buttonClick() {
      var btn = document.querySelector('.anka-release a[title="Save"]');
      if (!btn) return;
      btn.click();
    },

    /**
     * valida y confirma los datos del formulario
     *
     * @param {File} file
     */
    validateAndConfirm: function validateAndConfirm(file) {
      this.validateData(file);
      this.croppedFile = file;
      if (!this.formIsValid) return;
      this.confirmSave();
    },

    /**
     * Valida Los datos del formulario
     */
    validateData: function validateData(file) {
      this.formIsValid = true;
      var form = this.form;

      if (!file) {
        this.$noty("Debe seleccionar una imagen", "error");
        this.formIsValid = false;
      }

      if (!form.text) {
        this.$noty("Debe indicar un texto descriptivo", "error");
        this.formIsValid = false;
      }

      if (!form.location) {
        this.$noty("Debe indicar una ubicación", "error");
        this.formIsValid = false;
      } // if (!form.labels.length) {
      //     this.$noty("Debe etiquetar algunos amigos", "error");
      //     this.formIsValid = false;
      // }

    },

    /**
     * Confirmar y guardar o rechazar
     */
    confirmSave: function confirmSave() {
      var _this2 = this;

      // ejecutar swalert de confirm
      this.confirmedDialog({
        title: "¿Estás seguro de publicar esta publicación?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        confirmButtonText: "Si, publicar",
        cancelButtonText: "Cancelar"
      }).then(function (result) {
        if (result.isConfirmed) {
          _this2.globalLoading = true;
          var file = _this2.croppedFile;
          var form = _this2.form;
          var data = new FormData();
          var ep = _this2.ep.releases.save; // imagen cortada

          var croppedFile = new File([file.croppedFile], file.croppedFile.name); // datos para el backend

          data.append("image", croppedFile);
          data.append("text", form.text);
          data.append("location", form.location);
          form.labels.forEach(function (label) {
            return data.append("labels[]", label);
          });

          _this2.axios.post(ep, data, _this2.headerFormData).then(function (_) {
            _this2.notySwal({
              title: "¡Publicado!",
              text: "La publicación ha sido publicada con éxito",
              icon: "success"
            });

            _this2.$emit("created");
          })["catch"](function (error) {
            return _this2.$manageError(error);
          })["finally"](function () {
            return _this2.globalLoading = false;
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
    staticClass: "w-full md:w-3/4"
  }, [_c("div", {
    staticClass: "flex flex-col space-y-5 pt-5"
  }, [_c("div", {
    staticClass: "w-full"
  }, [_c("AnkaCropper", {
    staticClass: "anka-release",
    attrs: {
      options: _vm.ankaOptions
    },
    on: {
      "cropper-error": _vm.errorCropper,
      "cropper-saved": _vm.validateAndConfirm
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full"
  }, [_c("v-textarea", {
    attrs: {
      filled: "",
      label: "Escribe un pie para tu foto",
      color: "#B2794C"
    },
    model: {
      value: _vm.form.text,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "text", $$v);
      },
      expression: "form.text"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full flex justify-start items-center gap-2"
  }, [_c("i", {
    staticClass: "fa-solid fa-user-plus"
  }), _vm._v(" "), _c("v-autocomplete", {
    attrs: {
      "deletable-chips": "",
      multiple: "",
      "small-chips": "",
      label: "Etiqueta a tus amigos",
      "item-value": "following.id",
      "item-text": "following.name",
      items: _vm.artists,
      color: "#B2794C",
      "item-color": "#B2794C"
    },
    model: {
      value: _vm.form.labels,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "labels", $$v);
      },
      expression: "form.labels"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full flex justify-start items-center gap-2"
  }, [_c("i", {
    staticClass: "fa-solid fa-location-pin"
  }), _vm._v(" "), _c("v-text-field", {
    attrs: {
      label: "Añade tu ubicación",
      color: "#B2794C"
    },
    model: {
      value: _vm.form.location,
      callback: function callback($$v) {
        _vm.$set(_vm.form, "location", $$v);
      },
      expression: "form.location"
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "w-full flex justify-center pb-5"
  }, [_c("v-btn", {
    staticClass: "text-white",
    attrs: {
      depressed: "",
      large: "",
      color: "#B2794C"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.buttonClick.apply(null, arguments);
      }
    }
  }, [_vm._v("\n                Publicar\n            ")])], 1)]), _vm._v(" "), _c("loading-overlay", {
    attrs: {
      active: _vm.globalLoading,
      "is-full-page": true,
      loader: "bars"
    }
  })], 1);
};

var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/vue-anka-cropper/dist/VueAnkaCropper.umd.min.js":
/*!**********************************************************************!*\
  !*** ./node_modules/vue-anka-cropper/dist/VueAnkaCropper.umd.min.js ***!
  \**********************************************************************/
/***/ (function(module) {

(function(t,e){ true?module.exports=e():0})("undefined"!==typeof self?self:this,(function(){return function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s="fb15")}({"0a06":function(t,e,i){"use strict";var r=i("c532"),n=i("30b5"),o=i("f6b4"),s=i("5270"),a=i("4a7b");function c(t){this.defaults=t,this.interceptors={request:new o,response:new o}}c.prototype.request=function(t){"string"===typeof t?(t=arguments[1]||{},t.url=arguments[0]):t=t||{},t=a(this.defaults,t),t.method=t.method?t.method.toLowerCase():"get";var e=[s,void 0],i=Promise.resolve(t);this.interceptors.request.forEach((function(t){e.unshift(t.fulfilled,t.rejected)})),this.interceptors.response.forEach((function(t){e.push(t.fulfilled,t.rejected)}));while(e.length)i=i.then(e.shift(),e.shift());return i},c.prototype.getUri=function(t){return t=a(this.defaults,t),n(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(t){c.prototype[t]=function(e,i){return this.request(r.merge(i||{},{method:t,url:e}))}})),r.forEach(["post","put","patch"],(function(t){c.prototype[t]=function(e,i,n){return this.request(r.merge(n||{},{method:t,url:e,data:i}))}})),t.exports=c},"0cd6":function(t,e,i){},"0d58":function(t,e,i){var r=i("ce10"),n=i("e11e");t.exports=Object.keys||function(t){return r(t,n)}},"0df6":function(t,e,i){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},"1d2b":function(t,e,i){"use strict";t.exports=function(t,e){return function(){for(var i=new Array(arguments.length),r=0;r<i.length;r++)i[r]=arguments[r];return t.apply(e,i)}}},"230e":function(t,e,i){var r=i("d3f4"),n=i("7726").document,o=r(n)&&r(n.createElement);t.exports=function(t){return o?n.createElement(t):{}}},2444:function(t,e,i){"use strict";(function(e){var r=i("c532"),n=i("c8af"),o={"Content-Type":"application/x-www-form-urlencoded"};function s(t,e){!r.isUndefined(t)&&r.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function a(){var t;return"undefined"!==typeof e&&"[object process]"===Object.prototype.toString.call(e)?t=i("b50d"):"undefined"!==typeof XMLHttpRequest&&(t=i("b50d")),t}var c={adapter:a(),transformRequest:[function(t,e){return n(e,"Accept"),n(e,"Content-Type"),r.isFormData(t)||r.isArrayBuffer(t)||r.isBuffer(t)||r.isStream(t)||r.isFile(t)||r.isBlob(t)?t:r.isArrayBufferView(t)?t.buffer:r.isURLSearchParams(t)?(s(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):r.isObject(t)?(s(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"===typeof t)try{t=JSON.parse(t)}catch(e){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(t){c.headers[t]={}})),r.forEach(["post","put","patch"],(function(t){c.headers[t]=r.merge(o)})),t.exports=c}).call(this,i("f28c"))},2621:function(t,e){e.f=Object.getOwnPropertySymbols},"2aba":function(t,e,i){var r=i("7726"),n=i("32e9"),o=i("69a8"),s=i("ca5a")("src"),a=i("fa5b"),c="toString",h=(""+a).split(c);i("8378").inspectSource=function(t){return a.call(t)},(t.exports=function(t,e,i,a){var c="function"==typeof i;c&&(o(i,"name")||n(i,"name",e)),t[e]!==i&&(c&&(o(i,s)||n(i,s,t[e]?""+t[e]:h.join(String(e)))),t===r?t[e]=i:a?t[e]?t[e]=i:n(t,e,i):(delete t[e],n(t,e,i)))})(Function.prototype,c,(function(){return"function"==typeof this&&this[s]||a.call(this)}))},"2b4c":function(t,e,i){var r=i("5537")("wks"),n=i("ca5a"),o=i("7726").Symbol,s="function"==typeof o,a=t.exports=function(t){return r[t]||(r[t]=s&&o[t]||(s?o:n)("Symbol."+t))};a.store=r},"2d00":function(t,e){t.exports=!1},"2d83":function(t,e,i){"use strict";var r=i("387f");t.exports=function(t,e,i,n,o){var s=new Error(t);return r(s,e,i,n,o)}},"2d95":function(t,e){var i={}.toString;t.exports=function(t){return i.call(t).slice(8,-1)}},"2e67":function(t,e,i){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},"30b5":function(t,e,i){"use strict";var r=i("c532");function n(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,i){if(!e)return t;var o;if(i)o=i(e);else if(r.isURLSearchParams(e))o=e.toString();else{var s=[];r.forEach(e,(function(t,e){null!==t&&"undefined"!==typeof t&&(r.isArray(t)?e+="[]":t=[t],r.forEach(t,(function(t){r.isDate(t)?t=t.toISOString():r.isObject(t)&&(t=JSON.stringify(t)),s.push(n(e)+"="+n(t))})))})),o=s.join("&")}if(o){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+o}return t}},"32e9":function(t,e,i){var r=i("86cc"),n=i("4630");t.exports=i("9e1e")?function(t,e,i){return r.f(t,e,n(1,i))}:function(t,e,i){return t[e]=i,t}},"36bd":function(t,e,i){"use strict";var r=i("4bf8"),n=i("77f1"),o=i("9def");t.exports=function(t){var e=r(this),i=o(e.length),s=arguments.length,a=n(s>1?arguments[1]:void 0,i),c=s>2?arguments[2]:void 0,h=void 0===c?i:n(c,i);while(h>a)e[a++]=t;return e}},"387f":function(t,e,i){"use strict";t.exports=function(t,e,i,r,n){return t.config=e,i&&(t.code=i),t.request=r,t.response=n,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},t}},3934:function(t,e,i){"use strict";var r=i("c532");t.exports=r.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a");function n(t){var r=t;return e&&(i.setAttribute("href",r),r=i.href),i.setAttribute("href",r),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:"/"===i.pathname.charAt(0)?i.pathname:"/"+i.pathname}}return t=n(window.location.href),function(e){var i=r.isString(e)?n(e):e;return i.protocol===t.protocol&&i.host===t.host}}():function(){return function(){return!0}}()},4588:function(t,e){var i=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:i)(t)}},4630:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"467f":function(t,e,i){"use strict";var r=i("2d83");t.exports=function(t,e,i){var n=i.config.validateStatus;!n||n(i.status)?t(i):e(r("Request failed with status code "+i.status,i.config,null,i.request,i))}},"475e":function(t,e,i){"use strict";var r=i("0cd6"),n=i.n(r);n.a},"4a7b":function(t,e,i){"use strict";var r=i("c532");t.exports=function(t,e){e=e||{};var i={};return r.forEach(["url","method","params","data"],(function(t){"undefined"!==typeof e[t]&&(i[t]=e[t])})),r.forEach(["headers","auth","proxy"],(function(n){r.isObject(e[n])?i[n]=r.deepMerge(t[n],e[n]):"undefined"!==typeof e[n]?i[n]=e[n]:r.isObject(t[n])?i[n]=r.deepMerge(t[n]):"undefined"!==typeof t[n]&&(i[n]=t[n])})),r.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],(function(r){"undefined"!==typeof e[r]?i[r]=e[r]:"undefined"!==typeof t[r]&&(i[r]=t[r])})),i}},"4bf8":function(t,e,i){var r=i("be13");t.exports=function(t){return Object(r(t))}},5270:function(t,e,i){"use strict";var r=i("c532"),n=i("c401"),o=i("2e67"),s=i("2444"),a=i("d925"),c=i("e683");function h(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){h(t),t.baseURL&&!a(t.url)&&(t.url=c(t.baseURL,t.url)),t.headers=t.headers||{},t.data=n(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]}));var e=t.adapter||s.adapter;return e(t).then((function(e){return h(t),e.data=n(e.data,e.headers,t.transformResponse),e}),(function(e){return o(e)||(h(t),e&&e.response&&(e.response.data=n(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)}))}},"52a7":function(t,e){e.f={}.propertyIsEnumerable},5537:function(t,e,i){var r=i("8378"),n=i("7726"),o="__core-js_shared__",s=n[o]||(n[o]={});(t.exports=function(t,e){return s[t]||(s[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:i("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"5ca1":function(t,e,i){var r=i("7726"),n=i("8378"),o=i("32e9"),s=i("2aba"),a=i("9b43"),c="prototype",h=function(t,e,i){var u,f,l,p,d=t&h.F,v=t&h.G,g=t&h.S,m=t&h.P,w=t&h.B,y=v?r:g?r[e]||(r[e]={}):(r[e]||{})[c],x=v?n:n[e]||(n[e]={}),b=x[c]||(x[c]={});for(u in v&&(i=e),i)f=!d&&y&&void 0!==y[u],l=(f?y:i)[u],p=w&&f?a(l,r):m&&"function"==typeof l?a(Function.call,l):l,y&&s(y,u,l,t&h.U),x[u]!=l&&o(x,u,p),m&&b[u]!=l&&(b[u]=l)};r.core=n,h.F=1,h.G=2,h.S=4,h.P=8,h.B=16,h.W=32,h.U=64,h.R=128,t.exports=h},"613b":function(t,e,i){var r=i("5537")("keys"),n=i("ca5a");t.exports=function(t){return r[t]||(r[t]=n(t))}},"626a":function(t,e,i){var r=i("2d95");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},6821:function(t,e,i){var r=i("626a"),n=i("be13");t.exports=function(t){return r(n(t))}},"69a8":function(t,e){var i={}.hasOwnProperty;t.exports=function(t,e){return i.call(t,e)}},"6a99":function(t,e,i){var r=i("d3f4");t.exports=function(t,e){if(!r(t))return t;var i,n;if(e&&"function"==typeof(i=t.toString)&&!r(n=i.call(t)))return n;if("function"==typeof(i=t.valueOf)&&!r(n=i.call(t)))return n;if(!e&&"function"==typeof(i=t.toString)&&!r(n=i.call(t)))return n;throw TypeError("Can't convert object to primitive value")}},"6c7b":function(t,e,i){var r=i("5ca1");r(r.P,"Array",{fill:i("36bd")}),i("9c6c")("fill")},7333:function(t,e,i){"use strict";var r=i("9e1e"),n=i("0d58"),o=i("2621"),s=i("52a7"),a=i("4bf8"),c=i("626a"),h=Object.assign;t.exports=!h||i("79e5")((function(){var t={},e={},i=Symbol(),r="abcdefghijklmnopqrst";return t[i]=7,r.split("").forEach((function(t){e[t]=t})),7!=h({},t)[i]||Object.keys(h({},e)).join("")!=r}))?function(t,e){var i=a(t),h=arguments.length,u=1,f=o.f,l=s.f;while(h>u){var p,d=c(arguments[u++]),v=f?n(d).concat(f(d)):n(d),g=v.length,m=0;while(g>m)p=v[m++],r&&!l.call(d,p)||(i[p]=d[p])}return i}:h},7726:function(t,e){var i=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=i)},"77f1":function(t,e,i){var r=i("4588"),n=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?n(t+e,0):o(t,e)}},"79e5":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"7a77":function(t,e,i){"use strict";function r(t){this.message=t}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,t.exports=r},"7aac":function(t,e,i){"use strict";var r=i("c532");t.exports=r.isStandardBrowserEnv()?function(){return{write:function(t,e,i,n,o,s){var a=[];a.push(t+"="+encodeURIComponent(e)),r.isNumber(i)&&a.push("expires="+new Date(i).toGMTString()),r.isString(n)&&a.push("path="+n),r.isString(o)&&a.push("domain="+o),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"7f7f":function(t,e,i){var r=i("86cc").f,n=Function.prototype,o=/^\s*function ([^ (]*)/,s="name";s in n||i("9e1e")&&r(n,s,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},8378:function(t,e){var i=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=i)},"86cc":function(t,e,i){var r=i("cb7c"),n=i("c69a"),o=i("6a99"),s=Object.defineProperty;e.f=i("9e1e")?Object.defineProperty:function(t,e,i){if(r(t),e=o(e,!0),r(i),n)try{return s(t,e,i)}catch(a){}if("get"in i||"set"in i)throw TypeError("Accessors not supported!");return"value"in i&&(t[e]=i.value),t}},"8df4":function(t,e,i){"use strict";var r=i("7a77");function n(t){if("function"!==typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise((function(t){e=t}));var i=this;t((function(t){i.reason||(i.reason=new r(t),e(i.reason))}))}n.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},n.source=function(){var t,e=new n((function(e){t=e}));return{token:e,cancel:t}},t.exports=n},"9b43":function(t,e,i){var r=i("d8e8");t.exports=function(t,e,i){if(r(t),void 0===e)return t;switch(i){case 1:return function(i){return t.call(e,i)};case 2:return function(i,r){return t.call(e,i,r)};case 3:return function(i,r,n){return t.call(e,i,r,n)}}return function(){return t.apply(e,arguments)}}},"9c6c":function(t,e,i){var r=i("2b4c")("unscopables"),n=Array.prototype;void 0==n[r]&&i("32e9")(n,r,{}),t.exports=function(t){n[r][t]=!0}},"9def":function(t,e,i){var r=i("4588"),n=Math.min;t.exports=function(t){return t>0?n(r(t),9007199254740991):0}},"9e1e":function(t,e,i){t.exports=!i("79e5")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},b50d:function(t,e,i){"use strict";var r=i("c532"),n=i("467f"),o=i("30b5"),s=i("c345"),a=i("3934"),c=i("2d83");t.exports=function(t){return new Promise((function(e,h){var u=t.data,f=t.headers;r.isFormData(u)&&delete f["Content-Type"];var l=new XMLHttpRequest;if(t.auth){var p=t.auth.username||"",d=t.auth.password||"";f.Authorization="Basic "+btoa(p+":"+d)}if(l.open(t.method.toUpperCase(),o(t.url,t.params,t.paramsSerializer),!0),l.timeout=t.timeout,l.onreadystatechange=function(){if(l&&4===l.readyState&&(0!==l.status||l.responseURL&&0===l.responseURL.indexOf("file:"))){var i="getAllResponseHeaders"in l?s(l.getAllResponseHeaders()):null,r=t.responseType&&"text"!==t.responseType?l.response:l.responseText,o={data:r,status:l.status,statusText:l.statusText,headers:i,config:t,request:l};n(e,h,o),l=null}},l.onabort=function(){l&&(h(c("Request aborted",t,"ECONNABORTED",l)),l=null)},l.onerror=function(){h(c("Network Error",t,null,l)),l=null},l.ontimeout=function(){h(c("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED",l)),l=null},r.isStandardBrowserEnv()){var v=i("7aac"),g=(t.withCredentials||a(t.url))&&t.xsrfCookieName?v.read(t.xsrfCookieName):void 0;g&&(f[t.xsrfHeaderName]=g)}if("setRequestHeader"in l&&r.forEach(f,(function(t,e){"undefined"===typeof u&&"content-type"===e.toLowerCase()?delete f[e]:l.setRequestHeader(e,t)})),t.withCredentials&&(l.withCredentials=!0),t.responseType)try{l.responseType=t.responseType}catch(m){if("json"!==t.responseType)throw m}"function"===typeof t.onDownloadProgress&&l.addEventListener("progress",t.onDownloadProgress),"function"===typeof t.onUploadProgress&&l.upload&&l.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then((function(t){l&&(l.abort(),h(t),l=null)})),void 0===u&&(u=null),l.send(u)}))}},bc3a:function(t,e,i){t.exports=i("cee4")},be13:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c345:function(t,e,i){"use strict";var r=i("c532"),n=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,i,o,s={};return t?(r.forEach(t.split("\n"),(function(t){if(o=t.indexOf(":"),e=r.trim(t.substr(0,o)).toLowerCase(),i=r.trim(t.substr(o+1)),e){if(s[e]&&n.indexOf(e)>=0)return;s[e]="set-cookie"===e?(s[e]?s[e]:[]).concat([i]):s[e]?s[e]+", "+i:i}})),s):s}},c366:function(t,e,i){var r=i("6821"),n=i("9def"),o=i("77f1");t.exports=function(t){return function(e,i,s){var a,c=r(e),h=n(c.length),u=o(s,h);if(t&&i!=i){while(h>u)if(a=c[u++],a!=a)return!0}else for(;h>u;u++)if((t||u in c)&&c[u]===i)return t||u||0;return!t&&-1}}},c401:function(t,e,i){"use strict";var r=i("c532");t.exports=function(t,e,i){return r.forEach(i,(function(i){t=i(t,e)})),t}},c532:function(t,e,i){"use strict";var r=i("1d2b"),n=i("c7ce"),o=Object.prototype.toString;function s(t){return"[object Array]"===o.call(t)}function a(t){return"[object ArrayBuffer]"===o.call(t)}function c(t){return"undefined"!==typeof FormData&&t instanceof FormData}function h(t){var e;return e="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer,e}function u(t){return"string"===typeof t}function f(t){return"number"===typeof t}function l(t){return"undefined"===typeof t}function p(t){return null!==t&&"object"===typeof t}function d(t){return"[object Date]"===o.call(t)}function v(t){return"[object File]"===o.call(t)}function g(t){return"[object Blob]"===o.call(t)}function m(t){return"[object Function]"===o.call(t)}function w(t){return p(t)&&m(t.pipe)}function y(t){return"undefined"!==typeof URLSearchParams&&t instanceof URLSearchParams}function x(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function C(t,e){if(null!==t&&"undefined"!==typeof t)if("object"!==typeof t&&(t=[t]),s(t))for(var i=0,r=t.length;i<r;i++)e.call(null,t[i],i,t);else for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.call(null,t[n],n,t)}function k(){var t={};function e(e,i){"object"===typeof t[i]&&"object"===typeof e?t[i]=k(t[i],e):t[i]=e}for(var i=0,r=arguments.length;i<r;i++)C(arguments[i],e);return t}function S(){var t={};function e(e,i){"object"===typeof t[i]&&"object"===typeof e?t[i]=S(t[i],e):t[i]="object"===typeof e?S({},e):e}for(var i=0,r=arguments.length;i<r;i++)C(arguments[i],e);return t}function M(t,e,i){return C(e,(function(e,n){t[n]=i&&"function"===typeof e?r(e,i):e})),t}t.exports={isArray:s,isArrayBuffer:a,isBuffer:n,isFormData:c,isArrayBufferView:h,isString:u,isNumber:f,isObject:p,isUndefined:l,isDate:d,isFile:v,isBlob:g,isFunction:m,isStream:w,isURLSearchParams:y,isStandardBrowserEnv:b,forEach:C,merge:k,deepMerge:S,extend:M,trim:x}},c69a:function(t,e,i){t.exports=!i("9e1e")&&!i("79e5")((function(){return 7!=Object.defineProperty(i("230e")("div"),"a",{get:function(){return 7}}).a}))},c7ce:function(t,e){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
t.exports=function(t){return null!=t&&null!=t.constructor&&"function"===typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}},c8af:function(t,e,i){"use strict";var r=i("c532");t.exports=function(t,e){r.forEach(t,(function(i,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=i,delete t[r])}))}},ca5a:function(t,e){var i=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++i+r).toString(36))}},cb7c:function(t,e,i){var r=i("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},ce10:function(t,e,i){var r=i("69a8"),n=i("6821"),o=i("c366")(!1),s=i("613b")("IE_PROTO");t.exports=function(t,e){var i,a=n(t),c=0,h=[];for(i in a)i!=s&&r(a,i)&&h.push(i);while(e.length>c)r(a,i=e[c++])&&(~o(h,i)||h.push(i));return h}},cee4:function(t,e,i){"use strict";var r=i("c532"),n=i("1d2b"),o=i("0a06"),s=i("4a7b"),a=i("2444");function c(t){var e=new o(t),i=n(o.prototype.request,e);return r.extend(i,o.prototype,e),r.extend(i,e),i}var h=c(a);h.Axios=o,h.create=function(t){return c(s(h.defaults,t))},h.Cancel=i("7a77"),h.CancelToken=i("8df4"),h.isCancel=i("2e67"),h.all=function(t){return Promise.all(t)},h.spread=i("0df6"),t.exports=h,t.exports.default=h},d3f4:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d8e8:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},d925:function(t,e,i){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},e11e:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},e683:function(t,e,i){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},f28c:function(t,e){var i,r,n=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(i===setTimeout)return setTimeout(t,0);if((i===o||!i)&&setTimeout)return i=setTimeout,setTimeout(t,0);try{return i(t,0)}catch(e){try{return i.call(null,t,0)}catch(e){return i.call(this,t,0)}}}function c(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{return r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(function(){try{i="function"===typeof setTimeout?setTimeout:o}catch(t){i=o}try{r="function"===typeof clearTimeout?clearTimeout:s}catch(t){r=s}})();var h,u=[],f=!1,l=-1;function p(){f&&h&&(f=!1,h.length?u=h.concat(u):l=-1,u.length&&d())}function d(){if(!f){var t=a(p);f=!0;var e=u.length;while(e){h=u,u=[];while(++l<e)h&&h[l].run();l=-1,e=u.length}h=null,f=!1,c(t)}}function v(t,e){this.fun=t,this.array=e}function g(){}n.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)e[i-1]=arguments[i];u.push(new v(t,e)),1!==u.length||f||a(d)},v.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=g,n.addListener=g,n.once=g,n.off=g,n.removeListener=g,n.removeAllListeners=g,n.emit=g,n.prependListener=g,n.prependOnceListener=g,n.listeners=function(t){return[]},n.binding=function(t){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(t){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},f6b4:function(t,e,i){"use strict";var r=i("c532");function n(){this.handlers=[]}n.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},n.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},n.prototype.forEach=function(t){r.forEach(this.handlers,(function(e){null!==e&&t(e)}))},t.exports=n},f6fd:function(t,e){(function(t){var e="currentScript",i=t.getElementsByTagName("script");e in t||Object.defineProperty(t,e,{get:function(){try{throw new Error}catch(r){var t,e=(/.*at [^\(]*\((.*):.+:.+\)$/gi.exec(r.stack)||[!1])[1];for(t in i)if(i[t].src==e||"interactive"==i[t].readyState)return i[t];return null}}})})(document)},f751:function(t,e,i){var r=i("5ca1");r(r.S+r.F,"Object",{assign:i("7333")})},fa5b:function(t,e,i){t.exports=i("5537")("native-function-to-string",Function.toString)},fb15:function(t,e,i){"use strict";var r;(i.r(e),"undefined"!==typeof window)&&(i("f6fd"),(r=window.document.currentScript)&&(r=r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))&&(i.p=r[1]));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vueAnkaCropper"},[i("div",{staticClass:"ankaCropper",class:[t.opts.skin]},[t.file?i("div",{staticClass:"ankaCropper__navigation"},[i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Upload a new image"},on:{click:function(e){return e.preventDefault(),t.triggerInput(e)}}},[i("svg",{staticClass:"feather feather-upload",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{attrs:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}}),i("polyline",{attrs:{points:"17 8 12 3 7 8"}}),i("line",{attrs:{x1:"12",y1:"3",x2:"12",y2:"15"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Rotate counterclockwise"},on:{click:function(e){return e.preventDefault(),t.rotate(-90)}}},[i("svg",{staticClass:"feather feather-rotate-ccw",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("polyline",{attrs:{points:"1 4 1 10 7 10"}}),i("path",{attrs:{d:"M3.51 15a9 9 0 1 0 2.13-9.36L1 10"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Rotate clockwise"},on:{click:function(e){return e.preventDefault(),t.rotate(90)}}},[i("svg",{staticClass:"feather feather-rotate-cw",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("polyline",{attrs:{points:"23 4 23 10 17 10"}}),i("path",{attrs:{d:"M20.49 15a9 9 0 1 1-2.12-9.36L23 10"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Flip horizontally"},on:{click:function(e){return e.preventDefault(),t.flip("h")}}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{staticStyle:{fill:"none"},attrs:{d:"M 9.7148438,2.8183594 1.8203125,18 c -0.7648346,1.324499 0.1796183,2.982419 1.7089844,3 h 6.1855469 z m 4.5703122,0 V 21 h 6.185547 c 1.529366,-0.01758 2.47382,-1.675501 1.708985,-3 z",id:"path2"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Flip vertically"},on:{click:function(e){return e.preventDefault(),t.flip("v")}}},[i("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{staticStyle:{fill:"none"},attrs:{d:"M 21.090975,9.7148433 5.9093341,1.820312 c -1.324499,-0.7648346 -2.982419,0.1796183 -3,1.7089844 v 6.1855469 z m 0,4.5703127 H 2.9093341 v 6.185547 c 0.01758,1.529366 1.675501,2.47382 3,1.708985 z",id:"path2"}})])]),i("a",{staticClass:"ankaCropper__navButton",attrs:{href:"#",title:"Cancel"},on:{click:function(e){return e.preventDefault(),t.cancelCrop(e)}}},[i("svg",{staticClass:"feather feather-x-circle",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#0c55f0","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("circle",{attrs:{cx:"12",cy:"12",r:"10"}}),i("line",{attrs:{x1:"15",y1:"9",x2:"9",y2:"15"}}),i("line",{attrs:{x1:"9",y1:"9",x2:"15",y2:"15"}})])]),i("a",{staticClass:"ankaCropper__saveButton",attrs:{href:"#",title:"Save"},on:{click:function(e){return e.preventDefault(),t.doCrop(e)}}},[i("svg",{staticClass:"feather feather-save",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#fff","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[i("path",{attrs:{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}}),i("polyline",{attrs:{points:"17 21 17 13 7 13 7 21"}}),i("polyline",{attrs:{points:"7 3 7 8 15 8"}})]),t._v(" Save\n            ")])]):t._e(),i("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileInput",staticClass:"ankaCropper__fileInput",attrs:{type:"file"},on:{change:t.selectFile}}),t.file?t._e():i("div",{staticClass:"ankaCropper__droparea",on:{drop:function(e){return e.preventDefault(),t.dropFile(e)},dragover:function(t){t.preventDefault()}}},[i("div",[t._v(t._s(t.opts.dropareaMessage))]),i("button",{staticClass:"ankaCropper__selectButton",on:{click:t.triggerInput}},[t._v(t._s(t.opts.selectButtonLabel))])]),t.file?i("div",{staticClass:"ankaCropper__mainArea"},[i("div",{style:{width:t.cropperWidth+"px",height:t.cropperHeight+"px",float:"left"}},[i("canvas",{ref:"canvas",staticStyle:{background:"#ccc"},attrs:{width:t.canvasWidth,height:t.canvasHeight},on:{mousemove:t.moveMouse,mousedown:t.startDrag,mouseup:t.stopDrag,mouseleave:function(e){t.dragged=!1}}})]),t.opts.showPreview?i("div",{staticClass:"ankaCropper__previewArea",style:{width:t.prevdivWidth+"px",height:t.prevdivHeight+"px",float:"left"}},[i("img",{style:{width:t.previewSize.w+"px",height:t.previewSize.h+"px",borderRadius:"circle"===t.opts.cropArea?"50%":0},attrs:{src:t.previewImage}})]):t._e()]):t._e()])])},o=[],s=(i("6c7b"),i("7f7f"),i("f751"),i("bc3a")),a=i.n(s),c={name:"ankaCropper",data:function(){return{allowedMimeTypes:["image/jpeg","image/png","image/gif"],canvas:!1,ctx:!1,defaultOptions:{aspectRatio:1,closeOnSave:!0,cropArea:"box",croppedHeight:400,croppedWidth:400,cropperHeight:!1,dropareaMessage:"Drop file here or use the button below.",frameLineDash:[5,3],frameStrokeColor:"rgba(255, 255, 255, 0.8)",handleFillColor:"rgba(255, 255, 255, 0.2)",handleHoverFillColor:"rgba(255, 255, 255, 0.4)",handleHoverStrokeColor:"rgba(255, 255, 255, 1)",handleSize:10,handleStrokeColor:"rgba(255, 255, 255, 0.8)",layoutBreakpoint:850,maxCropperHeight:768,maxFileSize:8e6,overlayFill:"rgba(0, 0, 0, 0.5)",previewOnDrag:!0,previewQuality:.65,resultQuality:.8,resultMimeType:"image/jpeg",selectButtonLabel:"Select File",showPreview:!0,skin:"light",uploadData:{},uploadTo:!1},dragged:!1,fullWidth:500,file:!1,fliph:!1,flipv:!1,h:100,image:!1,imageWidth:0,imageHeight:0,loadingImage:!1,minW:8,minH:8,mx:0,my:0,over:!1,previewImage:!1,rotation:0,w:100,x:20,y:20}},props:{options:{type:Object,default:function(){return{}}}},computed:{canvasHeight:function(){return this.imageRatio<=this.cropperRatio?this.cropperHeight:Math.round(this.cropperWidth/this.imageRatio)},canvasWidth:function(){return this.imageRatio>=this.cropperRatio?this.cropperWidth:Math.round(this.imageRatio*this.canvasHeight)},cropData:function(){var t,e,i,r,n=Math.round((this.imageWidth/this.canvasWidth+this.imageHeight/this.canvasHeight)/.002)/1e3,o=[this.rotation,this.fliph,this.flipv],s=o[0],a=o[1],c=o[2],h=this.x*n,u=this.y*n,f=this.w*n,l=this.h*n,p=this.imageWidth-h-f,d=this.imageHeight-u-l;return(0===s&&!a&&!c||180===s&&a&&c)&&(t=h,e=u),(90===s&&!a&&!c||270===s&&a&&c)&&(t=u,e=p),(180===s&&!a&&!c||0===s&&a&&c)&&(t=p,e=d),(270===s&&!a&&!c||90===s&&a&&c)&&(t=d,e=h),(0===s&&a&&!c||180===s&&!a&&c)&&(t=p,e=u),(90===s&&a&&!c||270===s&&!a&&c)&&(t=u,e=h),(180===s&&a&&!c||0===s&&!a&&c)&&(t=h,e=d),(270===s&&a&&!c||90===s&&!a&&c)&&(t=d,e=p),0===s||180===s?(i=f,r=l):(i=l,r=f),{x:t,y:e,w:i,h:r}},cropperHeight:function(){if(this.opts.cropperHeight&&this.fullWidth>this.opts.layoutBreakpoint)return this.opts.cropperHeight-80;var t=Math.floor(this.cropperWidth/this.imageRatio),e=this.opts.maxCropperHeight;return e&&e>100&&e<t?e-80:t},cropperRatio:function(){return Math.round(this.cropperWidth/this.cropperHeight*1e3)/1e3},cropperWidth:function(){var t=this.fullWidth-24;return this.fullWidth<=this.opts.layoutBreakpoint||!this.opts.showPreview?t:Math.floor(.65*t)},cx:function(){var t=this.canvas.getBoundingClientRect();return this.mx-t.left},cy:function(){var t=this.canvas.getBoundingClientRect();return this.my-t.top},imageRatio:function(){return this.imageHeight?Math.round(this.imageWidth/this.imageHeight*1e3)/1e3:0},markers:function(){return{nw:{x:this.x-this.opts.handleSize,y:this.y-this.opts.handleSize},ne:{x:this.x+this.w-this.opts.handleSize,y:this.y-this.opts.handleSize},sw:{x:this.x-this.opts.handleSize,y:this.y+this.h-this.opts.handleSize},se:{x:this.x+this.w-this.opts.handleSize,y:this.y+this.h-this.opts.handleSize}}},opts:function(){var t=Object.assign({},this.defaultOptions,this.options);return"circle"===t.cropArea&&(t.aspectRatio=1),t},prevdivHeight:function(){return this.fullWidth>this.opts.layoutBreakpoint?this.cropperHeight:300},prevdivWidth:function(){var t=this.fullWidth-24;return this.fullWidth<=this.opts.layoutBreakpoint?t:Math.floor(.35*t)},previewCanvas:function(){if(!this.image||!this.resultCanvas)return!1;var t=document.createElement("canvas");t.width=this.previewSize.w,t.height=this.previewSize.h;var e=t.getContext("2d");return e.drawImage(this.resultCanvas,0,0,t.width,t.height),t},previewSize:function(){var t,e,i=this.prevdivWidth-20,r=this.prevdivHeight-20,n=Math.round(i/r*1e3)/1e3,o=Math.round(this.resultWidth/this.resultHeight*1e3)/1e3;return o>n?(t=i,e=i/o):(e=r,t=e*o),{w:Math.min(t,this.resultWidth),h:Math.min(e,this.resultHeight)}},resultCanvas:function(){if(!this.image)return!1;var t=document.createElement("canvas");t.width=this.resultWidth,t.height=this.resultHeight;var e=t.getContext("2d");e.save(),this.fliph&&(e.translate(this.previewSize.w,0),e.scale(-1,1)),this.flipv&&(e.translate(0,this.previewSize.h),e.scale(1,-1));var i=90===this.rotation||270===this.rotation,r=i?t.height:t.width,n=i?t.width:t.height;return e.translate(t.width/2,t.height/2),e.rotate(this.rotation*Math.PI/180),e.drawImage(this.image,this.cropData.x,this.cropData.y,this.cropData.w,this.cropData.h,-r/2,-n/2,r,n),e.restore(),t},resultWidth:function(){var t=[this.opts.aspectRatio,this.opts.croppedWidth,this.opts.croppedHeight],e=t[0],i=t[1],r=t[2],n=Math.round(this.imageWidth/this.canvasWidth*1e3)/1e3,o=e||this.w/this.h;if(i&&!r)return i;if(!i&&!r)return Math.round(this.w*n);if(!i&&r)return Math.round(r*o);var s=i/r;return o>=s?i:Math.round(r*o)},resultHeight:function(){var t=[this.opts.aspectRatio,this.opts.croppedWidth,this.opts.croppedHeight],e=t[0],i=t[1],r=t[2],n=Math.round(this.imageHeight/this.canvasHeight*1e3)/1e3,o=e||this.w/this.h;if(r&&!i)return r;if(!i&&!r)return Math.round(this.h*n);if(!r&&i)return Math.round(i/o);var s=i/r;return o<=s?r:Math.round(i/o)}},mounted:function(){this.getFullWidth(),this.$emit("cropper-mounted"),window.addEventListener("resize",this.getFullWidth)},beforeDestroy:function(){this.$emit("cropper-before-destroy"),window.removeEventListener("resize",this.getFullWidth)},methods:{cancelCrop:function(){var t=this.$refs.fileInput;t.type="",t.type="file",this.file=!1,this.$emit("cropper-cancelled")},doCrop:function(){var t=this,e=this.resultCanvas.toDataURL(this.opts.resultMimeType,this.opts.resultQuality),i=this.file.name.lastIndexOf("."),r=this.file.name.substring(0,i),n={originalFile:this.file,filename:r,rotation:this.rotation,cropCoords:this.cropData,flippedH:this.fliph,flippedV:this.flipv,croppedImageURI:e};this.resultCanvas.toBlob((function(e){var i=new Date;if(e.lastModified=i.getTime(),e.lastModifiedDate=i,e.name=r,n.croppedFile=e,t.$emit("cropper-saved",n),t.opts.uploadTo){var o=new FormData;for(var s in n)o.append(s,n[s]);for(var c in t.opts.uploadData)o.append(c,t.opts.uploadData[c]);a.a.post(t.opts.uploadTo,o).then((function(e){t.$emit("cropper-uploaded",e),t.opts.closeOnSave&&(t.file=!1)}))}else t.opts.closeOnSave&&(t.file=!1)}),this.opts.resultMimeType,this.opts.resultQuality)},drawCanvas:function(){this.ctx&&(this.drawImageOnCanvas(),this.drawOverlay(),this.drawMarkers(),this.opts.showPreview&&this.opts.previewOnDrag&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality)))},drawImageOnCanvas:function(){if(this.image){this.ctx.save(),this.fliph&&(this.ctx.translate(this.canvasWidth,0),this.ctx.scale(-1,1)),this.flipv&&(this.ctx.translate(0,this.canvasHeight),this.ctx.scale(1,-1));var t=90===this.rotation||270===this.rotation,e=t?this.canvasHeight:this.canvasWidth,i=t?this.canvasWidth:this.canvasHeight;this.ctx.translate(this.canvasWidth/2,this.canvasHeight/2),this.ctx.rotate(this.rotation*Math.PI/180),this.ctx.drawImage(this.image,-e/2,-i/2,e,i),this.ctx.restore()}},drawMarkers:function(){var t=[this.cx,this.cy],e=t[0],i=t[1],r=this.ctx;for(var n in this.canvas.style.cursor="default",this.over=!1,r.beginPath(),"circle"!==this.opts.cropArea?r.rect(this.x,this.y,this.w,this.h):r.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,0,2*Math.PI),r.isPointInPath(e,i)&&(this.over="all",this.canvas.style.cursor="move"),r.setLineDash(this.opts.frameLineDash),r.strokeStyle=this.opts.frameStrokeColor,r.stroke(),r.setLineDash([]),this.markers){var o=this.markers[n];r.beginPath(),r.rect(o.x,o.y,2*this.opts.handleSize,2*this.opts.handleSize),r.fillStyle=this.opts.handleFillColor,r.strokeStyle=this.opts.handleStrokeColor,r.isPointInPath(e,i)&&(r.fillStyle=this.opts.handleHoverFillColor,r.strokeStyle=this.opts.handleHoverStrokeColor,this.canvas.style.cursor=n+"-resize",this.over=n),r.fill(),r.stroke()}},drawOverlay:function(){var t=this.ctx;t.fillStyle=this.opts.overlayFill,t.fillRect(0,0,this.canvasWidth,this.y),t.fillRect(0,this.y,this.x,this.h),t.fillRect(this.x+this.w,this.y,this.canvasWidth-(this.x+this.w),this.h),t.fillRect(0,this.y+this.h,this.canvasWidth,this.canvasHeight-(this.y+this.h)),"circle"===this.opts.cropArea&&(t.beginPath(),t.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,Math.PI,1.5*Math.PI),t.lineTo(this.x,this.y),t.closePath(),t.fill(),t.beginPath(),t.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,1.5*Math.PI,2*Math.PI),t.lineTo(this.x+this.w,this.y),t.closePath(),t.fill(),t.beginPath(),t.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,0,.5*Math.PI),t.lineTo(this.x+this.w,this.y+this.h),t.closePath(),t.fill(),t.beginPath(),t.arc(this.x+this.w/2,this.y+this.h/2,this.w/2,.5*Math.PI,Math.PI),t.lineTo(this.x,this.y+this.h),t.closePath(),t.fill())},dropFile:function(t){var e=t.dataTransfer.files[0];this.useFile(e)},flip:function(t){"v"===t?(this.flipv=!this.flipv,this.y=this.canvasHeight-this.y-this.h):(this.fliph=!this.fliph,this.x=this.canvasWidth-this.x-this.w),this.drawCanvas(),this.opts.showPreview&&!this.opts.previewOnDrag&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality))},getFullWidth:function(){var t=this.$el.getBoundingClientRect();this.fullWidth=t.width,this.$nextTick(this.drawCanvas)},humanFileSize:function(t,e){void 0===e&&(e=!0);var i=e?1e3:1024;if(Math.abs(t)<i)return t+" B";var r=e?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],n=-1;do{t/=i,++n}while(Math.abs(t)>=i&&n<r.length-1);return t.toFixed(1)+" "+r[n]},moveMouse:function(t){var e=t.clientX||t.touches[0].clientX,i=t.clientY||t.touches[0].clientY,r=e-this.mx,n=i-this.my;this.dragged&&this.updateCoords(r,n),this.mx=e,this.my=i,this.drawCanvas()},rotate:function(t){var e=this,i=[this.canvasWidth,this.canvasHeight];(this.fliph?!this.flipv:this.flipv)?this.rotation-=t:this.rotation+=t,this.rotation>270&&(this.rotation=0),this.rotation<0&&(this.rotation=270);var r=this.imageWidth,n=this.imageHeight;this.imageWidth=n,this.imageHeight=r,this.$nextTick((function(){var t=e.canvasHeight/i[0],r=e.canvasWidth/i[1],n=e.canvasWidth-e.y*r-e.h*r,o=e.x*t,s=e.h*r*e.opts.aspectRatio,a=e.w*t*e.opts.aspectRatio;e.x=Math.round(n),e.y=Math.round(o),e.w=Math.round(s),e.h=Math.round(a),e.updateCoords(),e.drawCanvas(),e.opts.showPreview&&!e.opts.previewOnDrag&&e.previewCanvas&&(e.previewImage=e.previewCanvas.toDataURL("image/jpeg",e.opts.previewQuality))}))},selectFile:function(t){var e=t.currentTarget.files[0];e&&this.useFile(e),this.getFullWidth()},startCanvas:function(){var t=this;if(this.image){this.canvas=this.$refs.canvas,this.ctx=this.canvas.getContext("2d");var e=[this.imageRatio,this.opts.aspectRatio],i=e[0],r=e[1];r?r>=i?(this.w=Math.round(this.canvasWidth/2),this.h=Math.round(this.w/r)):(this.h=Math.round(this.canvasHeight/2),this.w=Math.round(this.h*r)):(this.w=Math.round(this.canvasWidth/2),this.h=Math.round(this.canvasHeight/2)),this.x=Math.round((this.canvasWidth-this.w)/2),this.y=Math.round((this.canvasHeight-this.h)/2),this.drawCanvas()}else this.canvas=!1,this.ctx=!1;this.opts.showPreview&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality)),this.canvas.addEventListener("touchstart",(function(e){e.preventDefault(),t.startDrag(e)})),this.canvas.addEventListener("touchend",(function(e){e.preventDefault(),t.stopDrag(e)})),this.canvas.addEventListener("touchmove",(function(e){e.preventDefault(),t.moveMouse(e)}))},startDrag:function(t){void 0!==t.touches&&(this.mx=t.touches[0].clientX,this.my=t.touches[0].clientY,this.drawCanvas()),this.dragged=this.over},stopDrag:function(){this.dragged=!1;var t=this.resultCanvas.toDataURL("image/jpeg",this.opts.previewQuality);this.$emit("cropper-preview",t),this.opts.showPreview&&this.previewCanvas&&(this.previewImage=this.previewCanvas.toDataURL("image/jpeg",this.opts.previewQuality))},triggerInput:function(){var t=this.$refs.fileInput;t.click()},updateCoords:function(t,e){var i=this.x,r=this.y,n=this.w,o=this.h,s=this.opts.aspectRatio;switch(this.dragged){case"all":i=this.x+t,r=this.y+e;break;case"nw":i=this.x+t,r=this.y+e,n=this.w-t,o=this.h-e;break;case"ne":r=this.y+e,n=this.w+t,o=this.h-e;break;case"sw":i=this.x+t,n=this.w-t,o=this.h+e;break;case"se":n=this.w+t,o=this.h+e;break}s&&(o=n/s),(n<this.minW||o<this.minH)&&(s&&s>1?(o=this.minH,n=o*s):s&&s<1?(n=this.minW,o=n/s):(n<this.minW&&(n=this.minW),o<this.minH&&(o=this.minH))),n+i>this.canvasWidth&&(n=this.canvasWidth-i,s&&(o=n/s),n/s<this.minH&&s&&s>1&&(o=this.minH,n=o*s,i=this.canvasWidth-n),n<this.minW&&(n=this.minW,i=this.canvasWidth-n)),o+r>this.canvasHeight&&(o=this.canvasHeight-r,s&&(n=o*s),o*s<this.minW&&s&&s<1&&(n=this.minW,o=n/s,r=this.canvasHeight-o),o<this.minH&&(o=this.minH,r=this.canvasHeight-o)),i<0&&(i=0),r<0&&(r=0),this.x=i,this.y=r,this.w=n,this.h=o},useFile:function(t){if(-1!==this.allowedMimeTypes.indexOf(t.type))if(this.opts.maxFileSize&&t.size>this.opts.maxFileSize){var e=this.humanFileSize(t.size);this.$emit("cropper-error","File too large ("+e+")! Max file size is "+this.humanFileSize(this.opts.maxFileSize))}else this.file=t,this.$emit("cropper-file-selected",t);else this.$emit("cropper-error","Wrong file type: "+t.type)}},watch:{file:function(t){var e=this;this.rotation=0,this.fliph=!1,this.flipv=!1;var i=new FileReader;i.onload=function(t){var i=new Image;i.onload=function(){e.imageWidth=i.width,e.imageHeight=i.height,e.image=i,e.loadingImage=!1,e.$nextTick(e.startCanvas)},i.onerror=function(t){e.loadingImage=!1,e.imageWidth=0,e.imageHeight=0,e.image=!1,e.file=!1,e.$emit("cropper-error","Image reading error"+t)};var r=e.$refs.fileInput;r.val="",i.src=t.target.result},i.onerror=function(t){e.file=!1,e.$emit("cropper-error","File reading error"+t)},t?i.readAsDataURL(this.file):(this.imageWidth=0,this.imageHeight=0,this.image=!1)}}},h=c;i("475e");function u(t,e,i,r,n,o,s,a){var c,h="function"===typeof t?t.options:t;if(e&&(h.render=e,h.staticRenderFns=i,h._compiled=!0),r&&(h.functional=!0),o&&(h._scopeId="data-v-"+o),s?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},h._ssrRegister=c):n&&(c=a?function(){n.call(this,this.$root.$options.shadowRoot)}:n),c)if(h.functional){h._injectStyles=c;var u=h.render;h.render=function(t,e){return c.call(e),u(t,e)}}else{var f=h.beforeCreate;h.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:h}}var f=u(h,n,o,!1,null,null,null),l=f.exports;e["default"]=l}})["default"]}));
//# sourceMappingURL=VueAnkaCropper.umd.min.js.map

/***/ }),

/***/ "./resources/js/pages/release/Create.vue":
/*!***********************************************!*\
  !*** ./resources/js/pages/release/Create.vue ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=b824b866& */ "./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/js/pages/release/Create.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__.render,
  _Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/release/Create.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/release/Create.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/pages/release/Create.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_b824b866___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Create.vue?vue&type=template&id=b824b866& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/release/Create.vue?vue&type=template&id=b824b866&");


/***/ })

}]);