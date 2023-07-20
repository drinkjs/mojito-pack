import React from "react";
import ReactDOM from "react-dom/client";
declare const ROOT: unique symbol;
declare const EVENTER: unique symbol;
declare const PROPS: unique symbol;
declare const ID: unique symbol;
declare const COMPONENT: unique symbol;
declare const INFO: unique symbol;
export interface MojitoComponentProps {
    $syncData?: Record<string, any>;
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
export interface MojitoComponent<T> {
    [ROOT]: null | ReactDOM.Root;
    [EVENTER]: null | EventTarget;
    [PROPS]?: Record<string, any>;
    [ID]: string;
    framework?: {
        name: string;
        version: string;
    };
    [COMPONENT]: T;
    [INFO]: ComponentInfo;
    mount(container: Element | DocumentFragment, props?: any): void;
    unmount(): void;
    setProps(newProps: any): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): Record<string, any> | undefined;
    getComponentId(): string;
    setEvent(eventName: string, callback: (...args: any[]) => any): any;
}
export declare function CreatePack<T extends object>(component: T, componentInfo: ComponentInfo): {
    new (): {
        framework: {
            name: string;
            version: string;
        };
        readonly component: T;
        readonly componentInfo: ComponentInfo;
        mount(container: Element | DocumentFragment, props?: Record<string, any>, onMount?: ((props?: Record<string, any>) => void) | undefined): void;
        unmount(): void;
        setProps(newProps: any): void;
        setEvent(eventName: string, callback: (...args: any[]) => any, thisArg?: any): void;
        getProps(): Record<string, any> | undefined;
        getDefaultProps(): any;
        getComponentId(): string;
        [COMPONENT]: T;
        [INFO]: ComponentInfo;
        [ROOT]: null | ReactDOM.Root;
        [EVENTER]: null | EventTarget;
        [PROPS]?: Record<string, any> | undefined;
        [ID]: string;
    };
};
export {};
