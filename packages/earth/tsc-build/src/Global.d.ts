/// <reference types="react" />
import * as THREE from "three";
interface EarthProps {
    data: {
        lat: string;
        lng: string;
        value: number;
    }[];
    isPause?: boolean;
    gref?: React.MutableRefObject<THREE.Group | null>;
}
declare function Global({ data, isPause, gref }: EarthProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof Global>;
export default _default;
