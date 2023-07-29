declare const _default: new () => {
    __component: import("vue").DefineComponent<{}, {}, any>;
    __info: import("@mojito/vue-pack").ComponentInfo;
    __root: import("vue").App<Element> | null;
    __props?: Record<string, any> | undefined;
    __id: string;
    __ref?: import("vue").Ref<{
        updateProps: (props: Record<string, any>) => void;
    }> | undefined;
    framework: {
        name: string;
        version: string;
    };
    readonly component: import("vue").DefineComponent<{}, {}, any>;
    readonly componentInfo: import("@mojito/vue-pack").ComponentInfo;
    readonly componentId: string;
    mount(container: HTMLElement, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: Record<string, any>): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
};
export default _default;
