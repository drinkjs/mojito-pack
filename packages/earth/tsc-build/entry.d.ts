/// <reference types="react" />
export declare const PackEarth: () => Promise<new () => {
    __component: typeof import("./src").default;
    __info: import("@mojito/react-pack/dist").ComponentInfo;
    __root: import("react-dom/client").Root | null;
    __props?: Record<string, any> | undefined;
    __id: string;
    __ref: import("react").MutableRefObject<{
        updateProps: (props: Record<string, any>) => void;
    } | undefined>;
    framework: {
        name: string;
        version: string;
    };
    readonly component: typeof import("./src").default;
    readonly componentInfo: import("@mojito/react-pack/dist").ComponentInfo;
    readonly componentId: string;
    mount(container: Element | DocumentFragment, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: any): void;
    setEvent(eventName: string, callback: (...args: any[]) => any, thisArg?: any): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
}>;
