import React from "react";
import ReactDOM from "react-dom/client";
export interface MojitoComponentProps {
    $syncData?: Record<string, {
        args: any[];
        retruns?: any;
    }>;
    $display: "editor" | "viewer";
    $style?: React.CSSProperties;
    $setProps: (props: Record<string, any>) => void;
    $setStyle: (style: React.CSSProperties) => void;
}
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
    events?: Record<string, {
        name?: string;
        description?: string;
    }>;
    deps?: Record<string, string>;
};
type AppActionRef = React.MutableRefObject<{
    updateProps: (props: Record<string, any>) => void;
} | undefined>;
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
    setEvent(eventName: string, callback: (...args: any[]) => any): any;
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
        setProps(newProps: any): void;
        setEvent(eventName: string, callback: (...args: any[]) => any, thisArg?: any): void;
        getProps(): Record<string, any> | undefined;
        getDefaultProps(): any;
    };
};
export {};
