import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from 'nanoid';
const ROOT = Symbol();
const EVENTER = Symbol();
const PROPS = Symbol();
const ID = Symbol();
const COMPONENT = Symbol();
const INFO = Symbol();
const UPDATE_PROPS = "__MOJITO_UPDATE_PROPS__";
export function CreatePack(component, componentInfo) {
    var _a, _b, _c, _d, _e, _f, _g;
    const componentId = nanoid();
    return _g = class MojitoPack {
            constructor() {
                this[_a] = component;
                this[_b] = componentInfo;
                this.framework = {
                    name: "react",
                    version: React.version
                };
                this[_c] = null;
                this[_d] = null;
                this[_e] = undefined;
                this[_f] = componentId;
            }
            get component() {
                return this[COMPONENT];
            }
            get componentInfo() {
                return this[INFO];
            }
            mount(container, props, onMount) {
                const eventer = new EventTarget();
                const client = ReactDOM.createRoot(container);
                this[ROOT] = client;
                this[EVENTER] = eventer;
                this[PROPS] = Object.assign(Object.assign({}, this.getDefaultProps()), props);
                client.render(_jsx(App, { component: this.component, props: this[PROPS], evener: this[EVENTER], onMount: onMount }));
            }
            unmount() {
                if (this[ROOT]) {
                    this[ROOT].unmount();
                    this[ROOT] = null;
                    this[EVENTER] = null;
                }
            }
            setProps(newProps) {
                if (this[EVENTER]) {
                    const oldProps = this[PROPS];
                    this[PROPS] = Object.assign(Object.assign({}, oldProps), newProps);
                    this[EVENTER].dispatchEvent(new AppEvent(UPDATE_PROPS, this[PROPS]));
                }
            }
            setEvent(eventName, callback, thisArg) {
                this.setProps({ [eventName]: callback.bind(thisArg) });
            }
            getProps() {
                return this[PROPS];
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
            getComponentId() {
                return this[ID];
            }
        },
        _a = COMPONENT,
        _b = INFO,
        _c = ROOT,
        _d = EVENTER,
        _e = PROPS,
        _f = ID,
        _g;
}
class AppEvent extends Event {
    constructor(type, data) {
        super(type);
        this.data = data;
    }
}
const App = ({ component: Comp, props, evener, onMount, }) => {
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
    return (_jsx(Comp, Object.assign({}, currProps)));
};
