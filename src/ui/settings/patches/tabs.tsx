import { after } from "@lib/api/patcher";
import { findByNameLazy, findByPropsLazy } from "@metro/wrappers";
import { React } from "@metro/common";
import { Emitter } from "@lib/api/emitter";
import { logger } from "@lib/utils/logger";
import { entries } from "..";

const settingConstants = findByPropsLazy("SETTING_RENDERER_CONFIG");
const SettingsOverviewScreen = findByNameLazy("SettingsOverviewScreen", false);

export const Events = new Emitter();

function useIsFirstRender() {
    let firstRender = false;
    React.useEffect(() => void (firstRender = true), []);
    return firstRender;
}

export function patchTabsUI(unpatches: (() => void | boolean)[]) {
    const origRendererConfig = settingConstants.SETTING_RENDERER_CONFIG;
    let rendererConfigValue = settingConstants.SETTING_RENDERER_CONFIG;

    Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
        enumerable: true,
        configurable: true,
        get: () => ({
            ...rendererConfigValue,
            ...entries,
        }),
        set: (v) => (rendererConfigValue = v),
    });

    unpatches.push(() => {
        Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
            value: origRendererConfig,
            writable: true,
            get: undefined,
            set: undefined,
        });
    });

    unpatches.push(
        after("default", SettingsOverviewScreen, (_, res) => {
            const [, forceUpdate] = React.useState({});

            React.useEffect(() => {
                function handler() {
                    forceUpdate({});
                }

                Events.on("updated-sections", handler);
            }, []);

            if (useIsFirstRender()) return;

            if (
                (res.props.node.sections as any[]).some(
                    (section) => section.label === "ReCord"
                )
            )
                return;

            logger.log(JSON.stringify(res));

            const sectionsMap = new Map();

            for (const entry of Object.values(entries)) {
                if (entry.excludeFromDisplay) continue;

                if (entry.section) {
                    if (!sectionsMap.has(entry.section)) {
                        sectionsMap.set(entry.section, {
                            label: entry.section,
                            settings: [],
                        });
                    }

                    const section = sectionsMap.get(entry.section);

                    if (!section.settings.includes(entry.key)) {
                        section.settings.push(entry.key);
                    }
                }
            }

            res.props.node.sections.unshift(...sectionsMap.values());

            return res;
        })
    );
}
