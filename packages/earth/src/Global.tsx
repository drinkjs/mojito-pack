import * as THREE from "three";
import { useRef, useEffect, useState, useMemo, useImperativeHandle, memo } from "react";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import * as d3Scale from "d3-scale";
import { useFrame } from "@react-three/fiber";
import {
	convertFlatCoordsToSphereCoords,
	convertLatLngToSphereCoords,
} from "./common/util";
import mapPoints from "./data/mapPoints.json";
import { Group } from "three";

const GlobeRadius = 100;
const GlobeSegments = 64;
const MapWidth = 4098 / 2;
const MapHeight = 1968 / 2;

const colors = [
	0xffdfe0, 0xffc0c0, 0xff0000, 0xee7070, 0x800200, 0x900000, 0x510000,
	0x290000,
];
const domain = [1000, 3000, 10000, 50000, 100000, 500000, 1000000, 1000000];
const scale = d3Scale
	.scaleLinear()
	.domain(domain)
	.range([0, 1, 2, 3, 4, 5, 6, 7, 8]);

const GlobalPoints: THREE.SphereGeometry[] = [];
for (let point of mapPoints.points) {
	// Transform our latitude and longitude values to points on the sphere.
	const pos = convertFlatCoordsToSphereCoords({
		x: point.x,
		y: point.y,
		width: MapWidth,
		height: MapHeight,
		radius: GlobeRadius,
	});
	if (pos.x && pos.y && pos.z) {
		// The geometry that will contain all of our points.
		const pingGeometry = new THREE.SphereGeometry(0.4, 5, 5);
		pingGeometry.translate(pos.x, pos.y, pos.z);
		GlobalPoints.push(pingGeometry);
	}
}

interface EarthProps {
	data: { lat: string; lng: string; value: number }[];
  isPause?:boolean
  gref?:React.MutableRefObject<THREE.Group | null>
}

function Global({data, isPause, gref}: EarthProps){
  const groupRef = useRef<THREE.Group | null>(null);
  const [earthMesh, setEarthMesh] = useState<THREE.Mesh | null>(null);
  useFrame((state, delta) => {
    if(groupRef.current && !isPause){
      groupRef.current.rotation.y += 0.001;
    }
    if (!state.gl.domElement?.parentElement) return

    const { clientWidth, clientHeight } = state.gl.domElement.parentElement
    if (
      state.size.width !== clientWidth &&
      state.size.height !== clientHeight
    ) {
      state.setSize(clientWidth, clientHeight)
    }
  });

  useImperativeHandle(
    gref,
    () => groupRef.current!,
    []
  );

  const Bars = useMemo(()=>{
    if(!earthMesh) return null;

   return data.map(({ lat, lng, value }, index) => {
      const color = Math.floor(scale(value));
      const size = value / 20000;
      const pos = convertLatLngToSphereCoords(
        parseFloat(lat),
        parseFloat(lng),
        GlobeRadius
      );
      return (
        <mesh
          key={`${lat}-${lng}-${size}-${index}`}
          position={pos}
          scale={[1, 1, Math.max(size, 0.1)]}
          onUpdate={(self) => {
            self.lookAt(earthMesh.position);
            self.updateMatrix();
          }}
        >
          <boxGeometry
            args={[2, 2, 1]}
            onUpdate={(self)=>{
              self.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.5));
            }}
          />
          <meshBasicMaterial color={colors[color]}></meshBasicMaterial>
        </mesh>
      );
    })
  }, [earthMesh, data])

  return (
    <group ref={groupRef}>
      <mesh ref={(ref)=>setEarthMesh(ref)}>
        <meshBasicMaterial
          transparent
          opacity={0.8}
          color={0x333333}
        ></meshBasicMaterial>
        <sphereGeometry
          args={[GlobeRadius, GlobeSegments, GlobeSegments]}
        ></sphereGeometry>
      </mesh>
      <mesh args={[mergeGeometries(GlobalPoints)]}>
        <meshBasicMaterial color={0xaaaaaa}></meshBasicMaterial>
      </mesh>
      {Bars}
  </group>
  )
}

export default memo(Global, (prev, next) => {
  if((prev.isPause === next.isPause) && prev.isPause){
    return false;
  }
  return prev.data !== next.data || prev.isPause !== next.isPause;
})