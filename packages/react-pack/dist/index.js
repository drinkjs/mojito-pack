import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from "nanoid";
const UPDATE_PROPS = "__MOJITO_UPDATE_PROPS__";
export function CreatePack(component, componentInfo) {
    const componentId = nanoid();
    return class MojitoPack {
        constructor() {
            this.__component = component;
            this.__info = componentInfo;
            this.__root = null;
            this.__eventer = null;
            this.__props = undefined;
            this.__id = componentId;
            this.framework = {
                name: "react",
                version: React.version,
            };
        }
        get component() {
            return this.__component;
        }
        get componentInfo() {
            return this.__info;
        }
        get componentId() {
            return this.__id;
        }
        mount(container, props, onMount) {
            const eventer = new EventTarget();
            const client = ReactDOM.createRoot(container);
            this.__root = client;
            this.__eventer = eventer;
            this.__props = Object.assign(Object.assign({}, this.getDefaultProps()), props);
            client.render(_jsx(App, { component: this.component, props: this.__props, evener: this.__eventer, onMount: onMount }));
        }
        unmount() {
            if (this.__root) {
                this.__root.unmount();
                this.__root = null;
                this.__eventer = null;
            }
        }
        setProps(newProps) {
            if (this.__eventer) {
                const oldProps = this.__props;
                this.__props = Object.assign(Object.assign({}, oldProps), newProps);
                this.__eventer.dispatchEvent(new AppEvent(UPDATE_PROPS, this.__props));
            }
        }
        setEvent(eventName, callback, thisArg) {
            this.setProps({ [eventName]: callback.bind(thisArg) });
        }
        getProps() {
            return this.__props;
        }
        getDefaultProps() {
            let defaultProps;
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
    constructor(type, data) {
        super(type);
        this.data = data;
    }
}
const App = ({ component: Comp, props, evener, onMount }) => {
    const [currProps, setCurrProps] = useState(props);
    useEffect(() => {
        if (onMount) {
            onMount(props);
        }
    }, []);
    useEffect(() => {
        const callback = ({ data }) => {
            setCurrProps(data);
        };
        evener.addEventListener(UPDATE_PROPS, callback);
        return () => evener.removeEventListener(UPDATE_PROPS, callback);
    }, [evener]);
    return _jsx(Comp, Object.assign({}, currProps));
};
