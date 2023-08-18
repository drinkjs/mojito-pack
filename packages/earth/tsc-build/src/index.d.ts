import { MojitoComponentProps } from "@drinkjs/mojito-react-pack";
type XYZ = {
    x: number;
    y: number;
    z: number;
};
interface EarthProps extends MojitoComponentProps {
    data: {
        lat: string;
        lng: string;
        value: number;
    }[];
    positions?: {
        cp: XYZ;
        cr: XYZ;
        gp: XYZ;
        gr: XYZ;
    };
    onControl?: (params: {
        cp: XYZ;
        cr: XYZ;
        gp: XYZ;
        gr: XYZ;
    }) => void;
}
export default function Earth({ data, onControl, positions }: EarthProps): import("react/jsx-runtime").JSX.Element;
export {};
