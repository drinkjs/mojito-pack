import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from "nanoid";

const UPDATE_PROPS = "__MOJITO_UPDATE_PROPS__";

export interface MojitoComponentProps {
	$syncData?: Record<string, any>;
	$display: "editor" | "viewer";
	$style?: React.CSSProperties;
	$setProps: (props: Record<string, any>) => void;
	$setStyle: (style: React.CSSProperties) => void;
}

export type ComponentProps = {
	name: string;
	type: "string" | "number" | "boolean" | "object" | "array";
	description?: string;
	default?: any;
};

export type ComponentInfo = {
	name: string;
	cover?: string;
	version?: string;
	props?: Record<string, ComponentProps>;
	events?: Record<
		string,
		{
			name?: string;
			description?: string;
		}
	>;
	deps?: Record<string, string>;
};

export interface MojitoComponent<T> {
	framework?: {
		name: string;
		version: string;
	};
	mount(container: Element | DocumentFragment, props?: any): void;
	unmount(): void;
	setProps(newProps: any): void;
	getProps(): Record<string, any> | undefined;
	getDefaultProps(): Record<string, any> | undefined;
	setEvent(eventName: string, callback: (...args: any[]) => any): any;
	readonly component: T;
	readonly componentInfo: ComponentInfo;
	readonly componentId: string;
}

export function CreatePack<T extends object>(
	component: T,
	componentInfo: ComponentInfo
) {
	const componentId = nanoid();
	return class MojitoPack implements MojitoComponent<T> {
		__component: T = component;
		__info = componentInfo;
		__root: null | ReactDOM.Root = null;
		__eventer: null | EventTarget = null;
		__props?: Record<string, any> = undefined;
		__id = componentId;
		framework = {
			name: "react",
			version: React.version,
		};

		get component() {
			return this.__component;
		}

		get componentInfo() {
			return this.__info;
		}

		get componentId() {
			return this.__id;
		}

		mount(
			container: Element | DocumentFragment,
			props?: Record<string, any>,
			onMount?: (props?: Record<string, any>) => void
		) {
			const eventer = new EventTarget();
			const client = ReactDOM.createRoot(container);
			this.__root = client;
			this.__eventer = eventer;
			this.__props = { ...this.getDefaultProps(), ...props };
			client.render(
				<App
					component={this.component}
					props={this.__props}
					evener={this.__eventer}
					onMount={onMount}
				/>
			);
		}
		unmount() {
			if (this.__root) {
				this.__root.unmount();
				this.__root = null;
				this.__eventer = null;
			}
		}
		setProps(newProps: any) {
			if (this.__eventer) {
				const oldProps = this.__props;
				this.__props = { ...oldProps, ...newProps };
				this.__eventer.dispatchEvent(new AppEvent(UPDATE_PROPS, this.__props));
			}
		}
		setEvent(
			eventName: string,
			callback: (...args: any[]) => any,
			thisArg?: any
		) {
			this.setProps({ [eventName]: callback.bind(thisArg) });
		}

		getProps() {
			return this.__props;
		}
		getDefaultProps() {
			let defaultProps: any;
			if (this.componentInfo.props) {
				for (const key in this.componentInfo.props) {
					if (this.componentInfo.props[key].default) {
						if (!defaultProps) {
							defaultProps = {};
						}
						defaultProps[key] = this.componentInfo.props[key].default;
					}
				}
			}
			return defaultProps;
		}
	};
}

class AppEvent extends Event {
	data?: any;
	constructor(type: string, data?: any) {
		super(type);
		this.data = data;
	}
}

const App: React.FC<{
	component: any;
	props?: any;
	evener: EventTarget;
	onMount?: (props?: Record<string, any>) => void;
}> = ({ component: Comp, props, evener, onMount }) => {
	const [currProps, setCurrProps] = useState(props);
	useEffect(() => {
		if (onMount) {
			onMount(props);
		}
	}, []);
	useEffect(() => {
		const callback = ({ data }: AppEvent) => {
			setCurrProps(data);
		};
		evener.addEventListener(UPDATE_PROPS, callback);
		return () => evener.removeEventListener(UPDATE_PROPS, callback);
	}, [evener]);
	return <Comp {...currProps} />;
};
