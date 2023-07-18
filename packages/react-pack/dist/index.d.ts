import React from "react";
import ReactDOM from "react-dom/client";
declare const ROOT: unique symbol;
declare const EVENTER: unique symbol;
declare const PROPS: unique symbol;
declare const ID: unique symbol;
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
    [PROPS]?: any;
    [ID]: string;
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
    getDefaultProps(): Record<string, any> | undefined;
    getComponentId(): string;
    setEvent(eventName: string, callback: (...args: any[]) => any): any;
}
export declare function CreatePack<T extends object>(component: T, componentInfo: ComponentInfo): MojitoComponent<T>;
export {};
