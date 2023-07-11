import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from 'nanoid'

const rootSym = Symbol();
const evenerSym = Symbol();
const propsSym = Symbol();
const idSym = Symbol();
const UPDATE_PROPS = "__UPDATE_PROPS__";

export type ComponentProps = {
	name: string;
	type: "string" | "number" | "boolean" | "object" | "array";
	description?: string;
	default?: any;
};

export type ComponentInfo = {
	name: string,
	cover?:string,
	version?: string;
	props?: Record<string, ComponentProps>
	deps?: Record<string, string>,
};

export interface MojitoComponent<T> {
  [rootSym]:null | ReactDOM.Root,
  [evenerSym]:null | EventTarget,
	[propsSym]?:any,
	[idSym]:string
	framework?:{
		name:"react"|"vue",
		version:string
	}
  component:T,
  componentInfo:ComponentInfo,
  mount(container: Element | DocumentFragment, props?: any):void,
  unmount():void
  setProps(newProps:any):void
	getProps():Record<string, any>
	getId():string
}

export function CreatePack<T extends object>(component:T,componentInfo:ComponentInfo): MojitoComponent<T> {
	return {
		component,
		componentInfo,
		framework:{
			name:"react",
			version:React.version
		},
		[rootSym]: null,
		[evenerSym]: null,
		[idSym]:nanoid(),
		mount(container: Element | DocumentFragment, props?: any) {
      const eventer = new EventTarget();
			const client = ReactDOM.createRoot(container);
			this[rootSym]= client;
      this[evenerSym] = eventer;
			this[propsSym] = props;
			client.render(
				<App component={this.component} props={props} evener={this[evenerSym]} />
			);
		},
		unmount() {
      if(this[rootSym]){
        this[rootSym].unmount();
				this[rootSym] = null;
        this[evenerSym] = null;
      }
		},
		setProps(newProps: any) {
      if(this[evenerSym]){
				this[propsSym] = newProps;
			  this[evenerSym].dispatchEvent(new AppEvent(UPDATE_PROPS, newProps));
      }
		},
		getProps(){
			return this[propsSym];
		},
		getId(){
			return this[idSym]
		}
	};
}

class AppEvent extends Event {
	data?: any;
	constructor(type:string, data?: any) {
		super(type);
		this.data = data;
	}
}

const App: React.FC<{ component: any; props?: any; evener: EventTarget }> = ({
	component: Comp,
	props,
	evener,
}) => {
	const [currProps, setCurrProps] = useState(props);
	useEffect(() => {
		const callback = ({ data }: AppEvent) => {
			setCurrProps({ ...data });
		};
		evener.addEventListener(UPDATE_PROPS, callback);
		return () => evener.removeEventListener(UPDATE_PROPS, callback);
	}, [evener]);
	return (
		<Comp {...currProps} />
	);
};
