import { InternalPluginInstance, PluginFlags, PluginInstance } from "./types";

export const corePlugins = new Map<string, PluginInstance>();
export const instances = new Map<string, InternalPluginInstance>();

export function defineCorePlugin(plugin: PluginInstance) {
    if (!corePlugins.has(plugin.manifest.id)) {
        corePlugins.set(plugin.manifest.id, plugin);
    }
}

export function initPlugins() {
    require("./badges");
    const plugins = Array.from(corePlugins.values());

    for (const plugin of plugins) {
        tryStartPlugin(plugin);
    }
}

export function tryStartPlugin(plugin: PluginInstance) {
    try {
        plugin.start && plugin.start();
        instances.set(plugin.manifest.id, {
            ...plugin,
            flags: PluginFlags.Enabled,
            errors: [],
        });
    } catch (e) {
        const errorString =
            e instanceof Error
                ? `${e.name}: ${e.message}`
                : typeof e == "string"
                ? e
                : "unknown error";

        instances.set(plugin.manifest.id, {
            ...plugin,
            flags: PluginFlags.Errored,
            errors: [{ message: errorString, time: new Date().toISOString() }],
        });
    }
}

export function tryStartPluginLate(id: string): boolean {
    const instance = instances.get(id);

    if (!instance) return false;

    try {
        instance.flags! |= PluginFlags.Enabled;
        instance.start?.();
        return true;
    } catch (e) {
        instance.flags! |= PluginFlags.Errored;
        instance.errors!.push({
            message:
                e instanceof Error
                    ? `${e.name}: ${e.message}`
                    : typeof e == "string"
                    ? e
                    : "Unknown error",
            time: new Date().toISOString(),
        });
        return false;
    }
}

export function tryStopPlugin(id: string): boolean {
    const instance = instances.get(id);

    if (!instance) return false;

    try {
        instance.flags &= ~PluginFlags.Enabled;
        instance.stop?.();
        return true;
    } catch {
        // What do i even do in this situation 💔
        return false;
    }
}
