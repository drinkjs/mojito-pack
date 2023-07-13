import { MojitoComponentProps } from "@mojito/react-pack";
interface TextProps extends MojitoComponentProps {
    text?: string;
}
declare function Text({ text, $display, $style, $setProps }: TextProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("@mojito/react-pack").MojitoComponent<typeof Text>;
export default _default;
