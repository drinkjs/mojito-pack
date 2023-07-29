/// <reference types="react" />
import { MojitoComponentProps } from "@mojito/react-pack";
interface ImageProps extends MojitoComponentProps {
    src?: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
}
declare function Image({ src, width, height, preview, $style }: ImageProps): import("react/jsx-runtime").JSX.Element;
declare const _default: new () => {
    __component: typeof Image;
    __info: import("@mojito/react-pack").ComponentInfo;
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
    readonly component: typeof Image;
    readonly componentInfo: import("@mojito/react-pack").ComponentInfo;
    readonly componentId: string;
    mount(container: Element | DocumentFragment, props?: Record<string, any> | undefined, onMount?: ((props?: Record<string, any> | undefined) => void) | undefined): void;
    unmount(): void;
    setProps(newProps: Record<string, any>): void;
    getProps(): Record<string, any> | undefined;
    getDefaultProps(): any;
};
export default _default;
