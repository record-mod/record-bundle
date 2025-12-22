import { findByPropsLazy } from "../src/metro";

const jsxRuntime = findByPropsLazy("jsx", "jsxs", "Fragment");

function unproxyFirstArg<T>(args: T[]) {
    return args;
}

export const Fragment = Symbol.for("react.fragment");
export const jsx = (...args: any[]) => jsxRuntime.jsx(...unproxyFirstArg(args));
export const jsxs = (...args: any[]) =>
    jsxRuntime.jsxs(...unproxyFirstArg(args));
