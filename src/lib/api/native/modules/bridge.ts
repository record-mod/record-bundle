import { getNativeModule } from ".";
import { NativeBridge, NativeBridgePromise } from "./types";

// Native hook intercepts calls to these native modules for the bridge.
const Bridge = getNativeModule<NativeBridge>("RNSVGRenderableModule");
const BridgePromise = getNativeModule<NativeBridgePromise>("FileReaderModule");

function makePayload(name: string, args: any[]) {
    return {
        // For now since were using RevengeXposed
        record: {
            method: name,
            args,
        },
    };
}

/**
 * Calls an asynchronous bridge method and returns a promise.
 * @param name The name of the bridge method.
 * @param args An array of arguments for the bridge method.
 * @returns A promise that resolves with the result of the method.
 */
export async function callBridgeMethod<R>(
    name: string,
    args: any[]
): Promise<R> {
    try {
        const result = await BridgePromise?.readAsDataURL(
            makePayload(name, args)
        );

        if ("error" in result) throw result.error;
        if ("result" in result) return result.result as R;

        throw "The method did not return a valid result, the native hook must have failed.";
    } catch (err) {
        throw new Error(`Bridge call failed: ${err}`);
    }
}

/**
 * Calls a synchronous bridge method and returns the result.
 *
 * Only use synchronous methods when absolutely necessary, as they block JS execution until the bridge method returns.
 *
 * @param name The name of the bridge method to call.
 * @param args The arguments to pass to the bridge method.
 * @returns The result of the bridge method call.
 */
export function callBridgeMethodSync<R>(name: string, args: any[]) {
    try {
        const result = Bridge?.getBBox(0, makePayload(name, args));

        if (result) {
            if ("error" in result) throw result.error;
            if ("result" in result) return result.result as R;
        }

        throw "The method did not return a valid result, the native hook must have failed.";
    } catch (err) {
        throw new Error(`Bridge call failed: ${err}`);
    }
}

export const info = callBridgeMethodSync<BridgeInfo>("record.info", []);

interface BridgeInfo {
    name: string;
    version: number;
    android: {
        version: number;
        api: number;
        codeName: string;
    };
}
