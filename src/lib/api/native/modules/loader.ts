import { callBridgeMethodSync } from "./bridge";

export interface LoaderConfig {
    isCustomBundle?: boolean;
    customBundleUrl?: string;
}

// TODO: Add bridge method to get loader constants (e.g. default URL)
export const loaderConfig = {
    get currentConfig() {
        return callBridgeMethodSync<LoaderConfig>(
            "record.loader.getConfig",
            []
        );
    },

    configure(config: LoaderConfig) {
        callBridgeMethodSync("record.loader.configureLoader", [config]);
    },

    reset() {
        callBridgeMethodSync("record.loader.resetConfig", []);
    },
};
