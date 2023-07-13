import * as THREE from "three";

  // 经纬度转成球体坐标
  export function convertLatLngToSphereCoords(
    latitude: number,
    longitude: number,
    radius: number
  ) {
    const phi = (latitude * Math.PI) / 180;
    const theta = ((longitude - 180) * Math.PI) / 180;
    const x = -(radius + -1) * Math.cos(phi) * Math.cos(theta);
    const y = (radius + -1) * Math.sin(phi);
    const z = (radius + -1) * Math.cos(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z)
  }

  /**
   * 2d的地图坐标转为球体3d坐标
   * @param x
   * @param y
   */
  export function convertFlatCoordsToSphereCoords({x, y, width, height, radius:globeRadius}:{x: number, y: number, width:number, height:number, radius:number}) {
    // Calculate the relative 3d coordinates using Mercator projection relative to the radius of the globe.
    // Convert latitude and longitude on the 90/180 degree axis.
    let latitude = ((x - width) / width) * -180;
    let longitude = ((y - height) / height) * -90;
    latitude = (latitude * Math.PI) / 180; //(latitude / 180) * Math.PI
    longitude = (longitude * Math.PI) / 180; //(longitude / 180) * Math.PI // Calculate the projected starting point
    const radius = Math.cos(longitude) * globeRadius;
    const targetX = Math.cos(latitude) * radius;
    const targetY = Math.sin(longitude) * globeRadius;
    const targetZ = Math.sin(latitude) * radius;
    return {
      x: targetX,
      y: targetY,
      z: targetZ,
    };
  }

  export function throttle(callback:(...args:any[])=>void, delay:number){
    let prev = 0;
    return (...args:any[])=>{
      const now = Date.now();
      if(now - prev >= delay){
        callback(...args);
        prev = now;
      }
    }
  }