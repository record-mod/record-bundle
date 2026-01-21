import ReCord from "@assets/icons/ReCord.png";
import type { ImageURISource } from "react-native";

import { patchTabsUI } from "./patches/tabs";
import { findAssetId } from "@lib/api/assets";
import ReCordSettings from "./pages/General";
import ReCordDevtools from "./pages/Developer";
import PluginsPage from "./pages/Plugins";
import { TableRow, TableRowIcon } from "@metro/common/components";
import EvaluateJavaScriptScreen from "./pages/Developer/screens/EvaluateJavaScript";
import AssetBrowser from "./pages/Developer/screens/AssetBrowser";
import { CustomPage } from "./patches/shared";
import { debugInfo } from "@/lib/api/debug";
import About from "./pages/General/About";
import { LoaderConfig } from "./pages/Developer/screens/LoaderConfig";
import { getValue } from "@/lib/api/native/modules/store";

export default function initSettings() {
    registerSection({
        name: "ReCord",
        items: [
            {
                key: "GENERAL",
                title: () => "ReCord",
                useTrailing: () => (
                    <TableRow.TrailingText
                        text={`${debugInfo.record.version}-${debugInfo.record.hash}`}
                    />
                ),
                icon: { uri: ReCord },
                render: () => <ReCordSettings />,
            },
            {
                key: "PLUGINS",
                title: () => "Plugins",
                icon: findAssetId("PuzzlePieceIcon"),
                render: () => <PluginsPage />,
            },
            {
                key: "DEVTOOLS",
                title: () => "Developer",
                icon: findAssetId("WrenchIcon"),
                usePredicate() {
                    return getValue("core", "developer", false);
                },
                render: () => <ReCordDevtools />,
            },
        ],
    });
}

export const entries: { [key: string]: SettingsEntry } = {
    BUNNY_CUSTOM_PAGE: {
        type: "route",
        title: "ReCord",
        excludeFromDisplay: true,
        screen: {
            route: "BUNNY_CUSTOM_PAGE",
            getComponent: () => CustomPage,
        },
        key: "RECORD_CUSTOM_PAGE",
    },
    RECORD_CUSTOM_PAGE: {
        type: "route",
        title: "ReCord",
        excludeFromDisplay: true,
        screen: {
            route: "RECORD_CUSTOM_PAGE",
            getComponent: () => CustomPage,
        },
        key: "RECORD_CUSTOM_PAGE",
    },
    EVALJS: {
        type: "route",
        excludeFromDisplay: true,
        get title() {
            return "Evaluate JavaScript";
        },
        section: "ReCord",
        key: "EVALJS",
        screen: {
            route: "EVALJS",
            getComponent: () => EvaluateJavaScriptScreen,
        },
    },
    ASSETBROWSER: {
        type: "route",
        excludeFromDisplay: true,
        get title() {
            return "Asset Browser";
        },
        section: "ReCord",
        key: "ASSETBROWSER",
        screen: {
            route: "ASSETBROWSER",
            getComponent: () => AssetBrowser,
        },
    },
    ABOUT: {
        type: "route",
        excludeFromDisplay: true,
        get title() {
            return "About";
        },
        section: "ReCord",
        key: "ABOUT",
        screen: {
            route: "ABOUT",
            getComponent: () => About,
        },
    },
    LOADERCONFIG: {
        type: "route",
        excludeFromDisplay: true,
        get title() {
            return "Loader Config";
        },
        section: "ReCord",
        key: "LOADERCONFIG",
        screen: {
            route: "LOADERCONFIG",
            getComponent: () => LoaderConfig,
        },
    },
};

export interface RowConfig {
    key: string;
    title: () => string;
    onPress?: () => any;
    render?: () => React.ReactNode;
    icon?: ImageURISource | number;
    IconComponent?: React.ReactNode;
    usePredicate?: () => boolean;
    useTrailing?: () => string | React.ReactNode;
    rawTabsConfig?: Record<string, any>;
}

export function registerSection(section: { name: string; items: RowConfig[] }) {
    for (const item of section.items) {
        addItemToSection(section.name, item);
    }
}

export function registerSettingsEntry(entry: SettingsEntry) {
    entries[entry.key] = entry;
}

export function addItemToSection(section: string, item: RowConfig) {
    registerSettingsEntry({
        key: item.key,
        get title() {
            return item.title();
        },
        ...(item.icon && {
            IconComponent: () => <TableRowIcon source={item.icon} />,
        }),
        usePredicate: item.usePredicate,
        useTrailing: item.useTrailing,
        section: section,
        ...(item.render
            ? {
                  type: "route",
                  screen: {
                      route: item.key,
                      getComponent: () => item.render,
                  },
              }
            : {
                  type: "pressable",
                  onPress: () => {},
              }),
        ...item.rawTabsConfig,
    });
}

export function patchSettings() {
    const unpatches = new Array<() => boolean>();

    patchTabsUI(unpatches);

    return () => unpatches.forEach((u) => u());
}
