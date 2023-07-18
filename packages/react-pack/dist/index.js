import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from 'nanoid';
const ROOT = Symbol();
const EVENTER = Symbol();
const PROPS = Symbol();
const ID = Symbol();
const UPDATE_PROPS = "__MOJITO_UPDATE_PROPS__";
export function CreatePack(component, componentInfo) {
    return {
        component,
        componentInfo,
        framework: {
            name: "react",
            version: React.version
        },
        [ROOT]: null,
        [EVENTER]: null,
        [ID]: nanoid(),
        mount(container, props) {
            const eventer = new EventTarget();
            const client = ReactDOM.createRoot(container);
            this[ROOT] = client;
            this[EVENTER] = eventer;
            this[PROPS] = props;
            client.render(_jsx(App, { component: this.component, props: Object.assign(Object.assign({}, this.getDefaultProps()), props), evener: this[EVENTER] }));
        },
        unmount() {
            if (this[ROOT]) {
                this[ROOT].unmount();
                this[ROOT] = null;
                this[EVENTER] = null;
            }
        },
        setProps(newProps) {
            if (this[EVENTER]) {
                const oldProps = this[PROPS];
                this[PROPS] = Object.assign(Object.assign({}, oldProps), newProps);
                this[EVENTER].dispatchEvent(new AppEvent(UPDATE_PROPS, this[PROPS]));
            }
        },
        setEvent(eventName, callback, thisArg) {
            this.setProps({ [eventName]: callback.bind(thisArg) });
        },
        getProps() {
            return this[PROPS];
        },
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
        },
        getComponentId() {
            return this[ID];
        }
    };
}
class AppEvent extends Event {
    constructor(type, data) {
        super(type);
        this.data = data;
    }
}
const App = ({ component: Comp, props, evener, }) => {
    const [currProps, setCurrProps] = useState(props);
    useEffect(() => {
        const callback = ({ data }) => {
            setCurrProps(data);
        };
        evener.addEventListener(UPDATE_PROPS, callback);
        return () => evener.removeEventListener(UPDATE_PROPS, callback);
    }, [evener]);
    return (_jsx(Comp, Object.assign({}, currProps)));
};
