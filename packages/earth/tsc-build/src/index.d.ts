type XYZ = {
    x: number;
    y: number;
    z: number;
};
interface EarthProps {
    data: {
        lat: string;
        lng: string;
        value: number;
    }[];
    syncData?: any;
    onControl?: (params: {
        cp: XYZ;
        cr: XYZ;
        gp: XYZ;
        gr: XYZ;
    }) => void;
}
export default function Earth({ data, onControl, syncData }: EarthProps): import("react/jsx-runtime").JSX.Element;
export {};
