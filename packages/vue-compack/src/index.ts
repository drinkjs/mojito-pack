import * as Vue from "vue";
import { defineComponent, h, Component, ref, onMounted } from "vue";
import type { PropType } from "vue";
import { nanoid } from "nanoid";
export interface MojitoComponentProps {
  $display: "editor" | "viewer";
  $style: Record<string, any>;
  $updateProps: (props:Record<string, any>)=>void
}

export type ComponentPropsExplain = {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  description?: string;
  default?: any;
};

export type ComponentInfo = {
  name: string;
  cover?: string;
  version?: string;
  props?: Record<string, ComponentPropsExplain>;
  events?: Record<
    string,
    {
      name?: string;
      description?: string;
    }
  >;
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
  readonly component: T;
  readonly componentInfo: ComponentInfo;
  readonly componentId: string;
}

const App = defineComponent({
	props: {
		componentProps: {
			type: Object,
			default: () => {},
		},
		component: {
			type: Object as PropType<Component>,
		},
	},
	setup(props, { expose }) {
		const componentProps = ref(props.componentProps);
		const updateProps = (props?: Record<string, any>) =>
			(componentProps.value = { ...componentProps.value, ...props });
		expose({
			updateProps,
		});
		return () => h(props.component as Component, { ...componentProps.value });
	},
});

export function CreatePack<T extends object>(
	component: T,
	componentInfo: ComponentInfo
) {
	const componentId = nanoid();
	return class MojitoPack implements MojitoComponent<T> {
		__component: T = component;
		__info = componentInfo;
		__root: null | Vue.App<Element> = null;
		__props?: Record<string, any> = undefined;
		__id = componentId;
		__ref?: Vue.Ref<{ updateProps: (props: Record<string, any>) => void }>;
		framework = {
			name: "vue",
			version: Vue.version,
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
			container: HTMLElement,
			props?: Record<string, any>,
			onMount?: (props?: Record<string, any>) => void
		) {
			const { createApp, ref } = Vue;
			this.__props = { ...this.getDefaultProps(), ...props };
			const self = this;
			this.__root = createApp({
				setup() {
					const componentRef = ref();
					onMounted(() => {
						self.__ref = componentRef;
						if (onMount) {
							onMount(self.__props);
						}
					});
					return () =>
						h(App, {
							componentProps: self.__props,
							component: self.__component,
							ref: componentRef,
						});
				},
			});
			this.__root.mount(container);
		}

		unmount() {
			if (this.__root) {
				this.__root.unmount();
				this.__root = null;
				this.__ref = undefined;
			}
		}

		setProps(newProps: Record<string, any>) {
			if (this.__ref) {
				const oldProps = this.__props;
				this.__props = { ...oldProps, ...newProps };
				this.__ref.value.updateProps(this.__props);
			}
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
