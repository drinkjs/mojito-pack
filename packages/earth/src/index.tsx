import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import covid19 from "./data/covid2019.json";
import Global from "./Global";
import { useCallback, useEffect, useRef, useState } from "react";
import { technique, throttle } from "./common/util";
import { MojitoComponentProps } from "@mojito/react-pack";

type XYZ = { x: number; y: number; z: number };

interface EarthProps extends MojitoComponentProps {
	data: { lat: string; lng: string; value: number }[];
	onControl?: (params: { cp: XYZ; cr: XYZ; gp: XYZ; gr: XYZ }) => void;
}

// const defaultData = covid19.map(({ coordinates, stats }) => ({
// 	lat: coordinates.latitude,
// 	lng: coordinates.longitude,
// 	value: stats.confirmed,
// }));

let stopTimer:any;

export default function Earth({ data, onControl, $syncData }: EarthProps) {
	const [isControl, setIsControl] = useState(false);
	const controlRef = useRef<any>();
	const groupRef = useRef<THREE.Group | null>(null);

	useEffect(()=>{
		if($syncData?.onControl){
			const {cp, cr, gp, gr} = $syncData.onControl.args[0]; // onControl回调的第一个参数
			if(groupRef.current){
				groupRef.current.position.set(gp.x, gp.y, gp.z);
				groupRef.current.rotation.set(gr.x, gr.y, gr.z);
			}

			if(controlRef.current && controlRef.current.object){
				controlRef.current.object.position.set(cp.x, cp.y, cp.z);
				controlRef.current.object.rotation.set(cr.x, cr.y, cr.z);
			}

		}
	}, [$syncData?.onControl])

	const startHandler = useCallback(() => {
		if(stopTimer){
			clearTimeout(stopTimer);
		}
		setIsControl(true);
	}, []);

	const endHandler = useCallback(()=>{
		if(stopTimer){
			clearTimeout(stopTimer);
		}
		stopTimer = setTimeout(setIsControl, 2000, false)
	}, [onControl]);

	const changeHandler = useCallback(
		throttle(() => {
			if (isControl && controlRef.current && groupRef.current && onControl) {
				const { position, rotation } = controlRef.current.object;
				const { position: gpos, rotation: grot } = groupRef.current;
				onControl({
					cp: { x: position.x, y: position.y, z: position.z },
					cr: { x: rotation.x, y: rotation.y, z: rotation.z },
					gp: { x: gpos.x, y: gpos.y, z: gpos.z },
					gr: { x: grot.x, y: grot.y, z: grot.z },
				});
			}
		}, 50),
		[isControl, onControl]
	);

	return (
		<div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
			<Canvas camera={{ far: 4000, fov: 45, near: 1, position: [0, 0, 500] }}>
				<OrbitControls
					onStart={startHandler}
					onEnd={endHandler}
					onChange={changeHandler}
					ref={controlRef}
				/>
				<Global data={data} isPause={isControl} gref={groupRef} />
			</Canvas>
		</div>
	);
}
