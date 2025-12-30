export type PluginInstance = {
    start?(): void;
    stop?(): void;
    manifest: PluginManifest;
};

export type PluginManifest = {
    name: string;
    id: string;
    authors: { name: string; id: string }[];
    version: string;
};

export type PluginState = "started" | "stopped" | "error";

export const PluginFlags = {
    Enabled: 1 << 0,

    Errored: 1 << 1,
};

export type InternalPluginInstance = PluginInstance & {
    flags: number;
    errors: { message: string; time: string }[];
    logs: { message: string; time: string }[];
};
