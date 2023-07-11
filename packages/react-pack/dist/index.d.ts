import ReactDOM from "react-dom/client";
declare const rootSym: unique symbol;
declare const evenerSym: unique symbol;
declare const propsSym: unique symbol;
declare const idSym: unique symbol;
export type ComponentProps = {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "array";
    description?: string;
    default?: any;
};
export type ComponentInfo = {
    name: string;
    cover?: string;
    version?: string;
    props?: Record<string, ComponentProps>;
    deps?: Record<string, string>;
};
export interface MojitoComponent<T> {
    [rootSym]: null | ReactDOM.Root;
    [evenerSym]: null | EventTarget;
    [propsSym]?: any;
    [idSym]: string;
    framework?: {
        name: "react" | "vue";
        version: string;
    };
    component: T;
    componentInfo: ComponentInfo;
    mount(container: Element | DocumentFragment, props?: any): void;
    unmount(): void;
    setProps(newProps: any): void;
    getProps(): Record<string, any>;
    getId(): string;
}
export declare function CreatePack<T extends object>(component: T, componentInfo: ComponentInfo): MojitoComponent<T>;
export {};
