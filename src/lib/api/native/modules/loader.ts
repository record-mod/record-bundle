import { callBridgeMethodSync } from "./bridge";

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

interface LoaderConfig {
    isCustomBundle?: boolean;
    customBundleUrl?: string;
}

export const loaderConfig = callBridgeMethodSync<LoaderConfig>(
    "record.loader.getConfig",
    []
);
