import * as Vue from "vue";
export interface IMojitoComponentProps {
    __display: "editor" | "viewer";
    __style?: Record<string, any>;
    __root: Element | ShadowRoot;
    __updateProps?: (props: Record<string, any>) => void;
}
export declare const MojitoComponentProps: {
    __display: StringConstructor;
    __style: ObjectConstructor;
    __root: ObjectConstructor;
    __updateProps: FunctionConstructor;
};
export type ComponentPropsExplain = {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "array" | "image" | Array<string | number>;
    description?: string;
    default?: any;
};
export type ComponentInfo = {
    name: string;
    category?: string;
    cover?: string;
    props?: Record<string, ComponentPropsExplain>;
    events?: Record<string, {
        name?: string;
        description?: string;
    }>;
};
export interface MojitoComponent<T> {
    framework?: {
        name: string;
        version: string;
    };
    mount(container: Element | DocumentFragment, props?: any): void;
    unmount(): void;
    setProps(newProps: any): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): Record<string, any> | undefined;
    readonly component: T;
    readonly componentInfo: ComponentInfo;
    readonly componentId: string;
}
declare const App: Vue.DefineComponent<{
    componentProps: {
        type: ObjectConstructor;
        default: () => void;
    };
    component: {
        type: Vue.PropType<Vue.Component>;
    };
}, () => Vue.VNode<Vue.RendererNode, Vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, Vue.ComponentOptionsMixin, Vue.ComponentOptionsMixin, {}, string, Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps, Readonly<Vue.ExtractPropTypes<{
    componentProps: {
        type: ObjectConstructor;
        default: () => void;
    };
    component: {
        type: Vue.PropType<Vue.Component>;
    };
}>>, {
    componentProps: Record<string, any>;
}, {}>;
export declare function CreatePack<T extends object>(component: T, componentInfo: ComponentInfo): {
    new (): {
        __component: T;
        __info: ComponentInfo;
        __root: null | Vue.App<Element>;
        __props?: Record<string, any> | undefined;
        __id: string;
        __ref?: Vue.Ref<{
            updateProps: (props: Record<string, any>) => void;
        }> | undefined;
        framework: {
            name: string;
            version: string;
        };
        readonly component: T;
        readonly componentInfo: ComponentInfo;
        readonly componentId: string;
        mount(container: HTMLElement, props?: Record<string, any>, onMount?: ((props?: Record<string, any>) => void) | undefined): void;
        unmount(): void;
        setProps(newProps: Record<string, any>): void;
        getProps(): Record<string, any> | undefined;
        getDefaultProps(): any;
    };
};
export {};
