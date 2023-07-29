import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from "nanoid";
const App = ({ component: Comp, props, appRef, onMount }) => {
    const [currProps, setCurrProps] = useState(props);
    useImperativeHandle(appRef, () => ({
        updateProps: (props) => {
            setCurrProps(props);
        }
    }), [currProps]);
    useEffect(() => {
        if (onMount) {
            onMount(props);
        }
    }, []);
    return _jsx(Comp, Object.assign({}, currProps));
};
export function CreatePack(component, componentInfo) {
    const componentId = nanoid();
    return class MojitoPack {
        constructor() {
            this.__component = component;
            this.__info = componentInfo;
            this.__root = null;
            // __eventer: null | EventTarget = null;
            this.__props = undefined;
            this.__id = componentId;
            this.__ref = { current: undefined };
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
            const client = ReactDOM.createRoot(container);
            this.__root = client;
            this.__props = Object.assign(Object.assign({}, this.getDefaultProps()), props);
            client.render(_jsx(App, { component: this.__component, props: this.__props, onMount: onMount, appRef: this.__ref }));
        }
        unmount() {
            if (this.__root) {
                this.__root.unmount();
                this.__root = null;
                this.__ref.current = undefined;
            }
        }
        setProps(newProps) {
            if (this.__ref.current) {
                const oldProps = this.__props;
                this.__props = Object.assign(Object.assign({}, oldProps), newProps);
                this.__ref.current.updateProps(this.__props);
            }
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
