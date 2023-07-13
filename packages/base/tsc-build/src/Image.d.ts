import { MojitoComponentProps } from "@mojito/react-pack";
interface ImageProps extends MojitoComponentProps {
    src?: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
}
declare function Image({ src, width, height, preview, $style }: ImageProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof Image>;
export default _default;
