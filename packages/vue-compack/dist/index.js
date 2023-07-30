import * as Vue from "vue";
import { defineComponent, h, ref, onMounted } from "vue";
import { nanoid } from "nanoid";
const App = defineComponent({
    props: {
        componentProps: {
            type: Object,
            default: () => { },
        },
        component: {
            type: Object,
        },
    },
    setup(props, { expose }) {
        const componentProps = ref(props.componentProps);
        const updateProps = (props) => (componentProps.value = Object.assign(Object.assign({}, componentProps.value), props));
        expose({
            updateProps,
        });
        return () => h(props.component, Object.assign({}, componentProps.value));
    },
});
export function CreatePack(component, componentInfo) {
    const componentId = nanoid();
    return class MojitoPack {
        constructor() {
            this.__component = component;
            this.__info = componentInfo;
            this.__root = null;
            this.__props = undefined;
            this.__id = componentId;
            this.framework = {
                name: "vue",
                version: Vue.version,
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
            const { createApp, ref } = Vue;
            this.__props = Object.assign(Object.assign({}, this.getDefaultProps()), props);
            const self = this;
            this.__root = createApp({
                shadowRoot: container.parentNode,
                setup() {
                    const componentRef = ref();
                    onMounted(() => {
                        self.__ref = componentRef;
                        if (onMount) {
                            onMount(self.__props);
                        }
                    });
                    return () => h(App, {
                        componentProps: self.__props,
                        component: self.__component,
                        ref: componentRef,
                    });
                },
            });
            this.__root.mount(container);
        }
        unmount() {
            if (this.__root) {
                this.__root.unmount();
                this.__root = null;
                this.__ref = undefined;
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
