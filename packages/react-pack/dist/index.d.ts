import React from "react";
import ReactDOM from "react-dom/client";
type AppActionRef = React.MutableRefObject<{
    updateProps: (props: Record<string, any>) => void;
} | undefined>;
export interface MojitoComponentProps {
    $display: "editor" | "viewer";
    $style: Record<string, any>;
    $updateProps: (props: Record<string, any>) => void;
}
export type ComponentPropsExplain = {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "array";
    description?: string;
    default?: any;
};
export type ComponentInfo = {
    name: string;
    cover?: string;
    version?: string;
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
export declare function CreatePack<T extends object>(component: T, componentInfo: ComponentInfo): {
    new (): {
        __component: T;
        __info: ComponentInfo;
        __root: null | ReactDOM.Root;
        __props?: Record<string, any> | undefined;
        __id: string;
        __ref: AppActionRef;
        framework: {
            name: string;
            version: string;
        };
        readonly component: T;
        readonly componentInfo: ComponentInfo;
        readonly componentId: string;
        mount(container: Element | DocumentFragment, props?: Record<string, any>, onMount?: ((props?: Record<string, any>) => void) | undefined): void;
        unmount(): void;
        setProps(newProps: Record<string, any>): void;
        getProps(): Record<string, any> | undefined;
        getDefaultProps(): any;
    };
};
export {};
