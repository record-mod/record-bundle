import { callBridgeMethodSync } from "./bridge";

export function setValue<T = unknown>(
    namespace: string,
    key: string,
    value?: T
) {
    callBridgeMethodSync("record.kvStore.set", [namespace, key, value]);
}

export function removeKey(namespace: string, key: string) {
    callBridgeMethodSync("record.kvStore.set", [namespace, key, null]);
}

export function getValue<T = unknown>(
    namespace: string,
    key: string,
    def: T
): T {
    const rawReturn = callBridgeMethodSync("record.kvStore.get", [
        namespace,
        key,
        def,
    ]);

    if (typeof rawReturn == "string") {
        try {
            // JSON values are returned as a string
            return JSON.parse(rawReturn);
        } catch {
            return rawReturn as T;
        }
    }

    return rawReturn as T;
}

export function withNamespace(namespace: string) {
    return {
        setValue: <T = unknown>(key: string, value: T) =>
            setValue<T>(namespace, key, value),
        removeKey: (key: string) => removeKey(namespace, key),
        getValue: <T = unknown>(key: string, def: T) =>
            setValue<T>(namespace, key, def),
    };
}
