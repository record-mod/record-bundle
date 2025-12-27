import { Logger, LoggerClass } from "@/lib/utils/logger";
import { instances } from ".";

export const PluginApiRegistry = new Map<string, PluginApi>();

type PluginApi = {
    logger: Logger;
};

export function makePluginApi(id: string): PluginApi {
    const instance = instances.get(id);

    const logger = new LoggerClass(`ReCord - ${instance?.manifest.name}`);

    const api = {
        logger: {
            ...logger,
            log(...messages: any[]) {
                logger.log(...messages);
                messages.forEach((message) =>
                    instance?.logs.push({
                        message,
                        time: new Date().toISOString(),
                    })
                );
            },
        },
    };

    PluginApiRegistry.set(instance?.manifest.id!, api);

    return api;
}

export function removePluginApi(id: string) {
    PluginApiRegistry.has(id) && PluginApiRegistry.delete(id);
}

export function getPluginApi(id: string): PluginApi {
    return PluginApiRegistry.has(id)
        ? PluginApiRegistry.get(id)!
        : makePluginApi(id);
}
