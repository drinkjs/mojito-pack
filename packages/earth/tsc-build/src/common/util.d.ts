import * as THREE from "three";
export declare function convertLatLngToSphereCoords(latitude: number, longitude: number, radius: number): THREE.Vector3;
/**
 * 2d的地图坐标转为球体3d坐标
 * @param x
 * @param y
 */
export declare function convertFlatCoordsToSphereCoords({ x, y, width, height, radius: globeRadius }: {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
}): {
    x: number;
    y: number;
    z: number;
};
export declare function throttle(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void;
export declare function technique(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void;
