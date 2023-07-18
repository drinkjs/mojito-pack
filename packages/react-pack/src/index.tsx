import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from 'nanoid'

const ROOT = Symbol();
const EVENTER = Symbol();
const PROPS = Symbol();
const ID = Symbol();
const UPDATE_PROPS = "__MOJITO_UPDATE_PROPS__";

export interface MojitoComponentProps {
	$syncData?:Record<string, any>,
	$display:"editor"|"viewer",
	$style?:React.CSSProperties,
	$setProps:(props:Record<string, any>)=>void,
	$setStyle:(style:React.CSSProperties)=>void,
}

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
	events?:Record<string, {
		name?:string,
		description?:string
	}>,
	deps?: Record<string, string>,
};

export interface MojitoComponent<T> {
  [ROOT]:null | ReactDOM.Root,
  [EVENTER]:null | EventTarget,
	[PROPS]?:any,
	[ID]:string
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
	getDefaultProps():Record<string, any> | undefined
	getComponentId():string
	setEvent(eventName:string, callback:(...args:any[])=>any):any
}

export function CreatePack<T extends object>(component:T,componentInfo:ComponentInfo): MojitoComponent<T> {
	return {
		component,
		componentInfo,
		framework:{
			name:"react",
			version:React.version
		},
		[ROOT]: null,
		[EVENTER]: null,
		[ID]:nanoid(),
		mount(container: Element | DocumentFragment, props?: any) {
      const eventer = new EventTarget();
			const client = ReactDOM.createRoot(container);
			this[ROOT]= client;
      this[EVENTER] = eventer;
			this[PROPS] = {...this.getDefaultProps(), ...props};
			client.render(
				<App component={this.component} props={this[PROPS]} evener={this[EVENTER]} />
			);
		},
		unmount() {
      if(this[ROOT]){
        this[ROOT].unmount();
				this[ROOT] = null;
        this[EVENTER] = null;
      }
		},
		setProps(newProps: any) {
      if(this[EVENTER]){
				const oldProps = this[PROPS];
				this[PROPS] = {...oldProps, ...newProps};
			  this[EVENTER].dispatchEvent(new AppEvent(UPDATE_PROPS, this[PROPS]));
      }
		},
		setEvent(eventName:string, callback:(...args:any[])=>any, thisArg?:any){
			this.setProps({[eventName]:callback.bind(thisArg)});
		},
		getProps(){
			return this[PROPS];
		},
		getDefaultProps(){
			let defaultProps:any;
			if(this.componentInfo.props){
				for(const key in this.componentInfo.props){
					if(this.componentInfo.props[key].default){
						if(!defaultProps){
							defaultProps = {}
						}
						defaultProps[key] = this.componentInfo.props[key].default
					}
				}
			}
			return defaultProps
		},
		getComponentId(){
			return this[ID]
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
			setCurrProps(data);
		};
		evener.addEventListener(UPDATE_PROPS, callback);
		return () => evener.removeEventListener(UPDATE_PROPS, callback);
	}, [evener]);
	return (
		<Comp {...currProps} />
	);
};
