declare global {
    type React = typeof import("react");
    var SkiaApi: typeof import("@shopify/react-native-skia").Skia;

    // ReactNative/Hermes globals
    var globalEvalWithSourceUrl: (script: string, sourceURL: string) => any;
    var nativePerformanceNow: typeof performance.now;
    var nativeModuleProxy: Record<string, any>;
    var __turboModuleProxy: (name: string) => any;

    interface SettingsEntry {
        type?: string;
        title: string;
        key: string;
        parent?: string;
        section?: string;
        excludeFromDisplay?: boolean;
        icon?: ImageSourcePropType;
        IconComponent?: ComponentType;
        screen?: {
            route: string;
            getComponent: () => ComponentType;
        };
        // whatever
        [key: string]: any;
    }

    interface Window {
        [key: string]: any;
        record: typeof import("@lib");
    }
}

export {};
