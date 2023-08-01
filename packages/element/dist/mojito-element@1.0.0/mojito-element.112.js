(self["webpackChunkmojito_element"] = self["webpackChunkmojito_element"] || []).push([[112],{

/***/ 381:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(541);
/* harmony import */ var _node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(861);
/* harmony import */ var _node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_8_1_webpack_5_88_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
#test[data-v-3a7f3c44]{
		color: #fff000;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(381);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(667)/* ["default"] */ .Z)
var update = add("2fedd658", content, "mojito-element", "1.0.0");
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ components)
});

// EXTERNAL MODULE: ../../node_modules/.pnpm/@vue+runtime-core@3.3.4/node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var runtime_core_esm_bundler = __webpack_require__(991);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@vue+shared@3.3.4/node_modules/@vue/shared/dist/shared.esm-bundler.js
var shared_esm_bundler = __webpack_require__(117);
// EXTERNAL MODULE: ../../node_modules/.pnpm/@vue+reactivity@3.3.4/node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var reactivity_esm_bundler = __webpack_require__(888);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/esbuild-loader@3.0.1_webpack@5.88.1/node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../node_modules/.pnpm/vue-loader@17.2.2_@vue+compiler-sfc@3.3.4_webpack@5.88.1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Test.vue?vue&type=script&setup=true&lang=ts



/* harmony default export */ const Testvue_type_script_setup_true_lang_ts = (/* @__PURE__ */(0,runtime_core_esm_bundler/* defineComponent */.aZ)({
  __name: "Test",
  props: {
    text: {},
    __display: {},
    __style: {},
    __updateProps: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const count = (0,reactivity_esm_bundler/* ref */.iH)(0);
    const data = (0,reactivity_esm_bundler/* ref */.iH)(props);
    const instance = (0,runtime_core_esm_bundler/* getCurrentInstance */.FN)();
    console.log("===", instance);
    (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
      console.log(instance == null ? void 0 : instance.options);
    });
    return (_ctx, _cache) => {
      return (0,runtime_core_esm_bundler/* openBlock */.wg)(), (0,runtime_core_esm_bundler/* createElementBlock */.iD)(
        "div",
        {
          id: "test",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("onClick"))
        },
        (0,shared_esm_bundler/* toDisplayString */.zw)(count.value.toFixed(2)) + " " + (0,shared_esm_bundler/* toDisplayString */.zw)(data.value.text),
        1
        /* TEXT */
      );
    };
  }
}));

;// CONCATENATED MODULE: ./src/components/Test.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ../../node_modules/.pnpm/mojito-vue-style-loader@1.0.4/node_modules/mojito-vue-style-loader/index.js??clonedRuleSet-3.use[0]!../../node_modules/.pnpm/css-loader@6.8.1_webpack@5.88.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-3.use[1]!../../node_modules/.pnpm/vue-loader@17.2.2_@vue+compiler-sfc@3.3.4_webpack@5.88.1/node_modules/vue-loader/dist/stylePostLoader.js!../../node_modules/.pnpm/postcss-loader@7.3.3_postcss@8.4.27_webpack@5.88.1/node_modules/postcss-loader/dist/cjs.js!../../node_modules/.pnpm/vue-loader@17.2.2_@vue+compiler-sfc@3.3.4_webpack@5.88.1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/Test.vue?vue&type=style&index=0&id=3a7f3c44&scoped=true&lang=css
var Testvue_type_style_index_0_id_3a7f3c44_scoped_true_lang_css = __webpack_require__(111);
;// CONCATENATED MODULE: ./src/components/Test.vue?vue&type=style&index=0&id=3a7f3c44&scoped=true&lang=css

// EXTERNAL MODULE: ../../node_modules/.pnpm/vue-loader@17.2.2_@vue+compiler-sfc@3.3.4_webpack@5.88.1/node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(986);
;// CONCATENATED MODULE: ./src/components/Test.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Testvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-3a7f3c44"]])

/* harmony default export */ const Test = (__exports__);
// EXTERNAL MODULE: ../../node_modules/.pnpm/vue@3.3.4/node_modules/vue/dist/vue.runtime.esm-bundler.js + 1 modules
var vue_runtime_esm_bundler = __webpack_require__(968);
// EXTERNAL MODULE: ../../node_modules/.pnpm/nanoid@4.0.2/node_modules/nanoid/index.browser.js
var index_browser = __webpack_require__(319);
;// CONCATENATED MODULE: ../vue-compack/dist/index.js



const App = (0,runtime_core_esm_bundler/* defineComponent */.aZ)({
  props: {
    componentProps: {
      type: Object,
      default: () => {
      }
    },
    component: {
      type: Object
    }
  },
  setup(props, { expose }) {
    const componentProps = (0,reactivity_esm_bundler/* ref */.iH)(props.componentProps);
    const updateProps = (props2) => componentProps.value = Object.assign(Object.assign({}, componentProps.value), props2);
    expose({
      updateProps
    });
    return () => (0,runtime_core_esm_bundler.h)(props.component, Object.assign({}, componentProps.value));
  }
});
function CreatePack(component, componentInfo) {
  const componentId = (0,index_browser/* nanoid */.x0)();
  return class MojitoPack {
    constructor() {
      this.__component = component;
      this.__info = componentInfo;
      this.__root = null;
      this.__props = void 0;
      this.__id = componentId;
      this.framework = {
        name: "vue",
        version: runtime_core_esm_bundler/* version */.i8
      };
    }
    get component() {
      return this.__component;
    }
    get componentInfo() {
      return this.__info;
    }
    get componentId() {
      return this.__id;
    }
    mount(container, props, onMount) {
      const { createApp, ref: ref2 } = vue_runtime_esm_bundler;
      this.__props = Object.assign(Object.assign({}, this.getDefaultProps()), props);
      const self = this;
      this.__root = createApp({
        shadowRoot: container.parentNode,
        setup() {
          const componentRef = ref2();
          (0,runtime_core_esm_bundler/* onMounted */.bv)(() => {
            self.__ref = componentRef;
            if (onMount) {
              onMount(self.__props);
            }
          });
          return () => (0,runtime_core_esm_bundler.h)(App, {
            componentProps: self.__props,
            component: self.__component,
            ref: componentRef
          });
        }
      });
      this.__root.mount(container);
    }
    unmount() {
      if (this.__root) {
        this.__root.unmount();
        this.__root = null;
        this.__ref = void 0;
      }
    }
    setProps(newProps) {
      if (this.__ref) {
        const oldProps = this.__props;
        this.__props = Object.assign(Object.assign({}, oldProps), newProps);
        this.__ref.value.updateProps(this.__props);
      }
    }
    getProps() {
      return this.__props;
    }
    getDefaultProps() {
      let defaultProps;
      if (this.componentInfo.props) {
        for (const key in this.componentInfo.props) {
          if (this.componentInfo.props[key].default) {
            if (!defaultProps) {
              defaultProps = {};
            }
            defaultProps[key] = this.componentInfo.props[key].default;
          }
        }
      }
      return defaultProps;
    }
  };
}

;// CONCATENATED MODULE: ./src/components/data.json
const data_namespaceObject = {"data":"xxx"};
;// CONCATENATED MODULE: ../../node_modules/.pnpm/esbuild-loader@3.0.1_webpack@5.88.1/node_modules/esbuild-loader/dist/index.cjs??clonedRuleSet-1.use[0]!../../node_modules/.pnpm/vue-loader@17.2.2_@vue+compiler-sfc@3.3.4_webpack@5.88.1/node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/index.vue?vue&type=script&lang=ts



console.log(data_namespaceObject);
/* harmony default export */ const componentsvue_type_script_lang_ts = (CreatePack(Test, {
  name: "vue\u6D4B\u8BD5",
  props: {
    text: {
      name: "\u6587\u5B57",
      type: "string",
      default: "\u6D4B\u8BD5"
    }
  }
}));

;// CONCATENATED MODULE: ./src/components/index.vue?vue&type=script&lang=ts
 
;// CONCATENATED MODULE: ./src/components/index.vue



const components_exports_ = componentsvue_type_script_lang_ts;

/* harmony default export */ const components = (components_exports_);

/***/ })

}]);