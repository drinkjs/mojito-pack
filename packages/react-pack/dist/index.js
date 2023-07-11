import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from 'nanoid';
const rootSym = Symbol();
const evenerSym = Symbol();
const propsSym = Symbol();
const idSym = Symbol();
const UPDATE_PROPS = "__UPDATE_PROPS__";
export function CreatePack(component, componentInfo) {
    return {
        component,
        componentInfo,
        framework: {
            name: "react",
            version: React.version
        },
        [rootSym]: null,
        [evenerSym]: null,
        [idSym]: nanoid(),
        mount(container, props) {
            const eventer = new EventTarget();
            const client = ReactDOM.createRoot(container);
            this[rootSym] = client;
            this[evenerSym] = eventer;
            this[propsSym] = props;
            client.render(_jsx(App, { component: this.component, props: props, evener: this[evenerSym] }));
        },
        unmount() {
            if (this[rootSym]) {
                this[rootSym].unmount();
                this[rootSym] = null;
                this[evenerSym] = null;
            }
        },
        setProps(newProps) {
            if (this[evenerSym]) {
                this[propsSym] = newProps;
                this[evenerSym].dispatchEvent(new AppEvent(UPDATE_PROPS, newProps));
            }
        },
        getProps() {
            return this[propsSym];
        },
        getId() {
            return this[idSym];
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
            setCurrProps(Object.assign({}, data));
        };
        evener.addEventListener(UPDATE_PROPS, callback);
        return () => evener.removeEventListener(UPDATE_PROPS, callback);
    }, [evener]);
    return (_jsx(Comp, Object.assign({}, currProps)));
};
