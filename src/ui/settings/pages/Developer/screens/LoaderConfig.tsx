import { findAssetId } from "@/lib/api/assets";
import {
    LoaderConfig as LoaderConfigType,
    loaderConfig,
} from "@/lib/api/native/modules/loader";
import ErrorBoundary from "@/lib/ui/reporter/components/ErrorBoundary";
import { React, toasts } from "@/metro/common";
import {
    Stack,
    TableRow,
    TableRowGroup,
    TableSwitchRow,
    TextInput,
} from "@/metro/common/components";
import { ScrollView } from "react-native";

export function LoaderConfig() {
    const DEFAULT_BUNDLE_URL = "http://192.168.0.227:4040/record.js";
    const bridgeLoaderConfig = loaderConfig.currentConfig;

    const [config, setConfig] = React.useState<
        LoaderConfigType & { currentUrl: string }
    >({
        ...bridgeLoaderConfig,
        currentUrl: bridgeLoaderConfig.customBundleUrl ?? DEFAULT_BUNDLE_URL,
    });

    React.useEffect(() => {
        loaderConfig.configure(config);
    }, [config]);

    return (
        <ErrorBoundary>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 38 }}
            >
                <Stack
                    style={{ paddingVertical: 24, paddingHorizontal: 12 }}
                    spacing={24}
                >
                    <TableRowGroup title={"Loader Config"}>
                        <TableRow
                            label={"Currently loaded bundle URL"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("FileIcon")}
                                />
                            }
                            subLabel={config.currentUrl}
                        />
                        <TableRow
                            label={"Reset Loader Configuration"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("RetryIcon")}
                                />
                            }
                            onPress={() => {
                                loaderConfig.reset();

                                setConfig((prev) => ({
                                    ...prev,
                                    ...loaderConfig.currentConfig,
                                }));

                                toasts.open({
                                    key: "reload-after-reset",
                                    content:
                                        "A reload is required to apply changes.",
                                    icon: findAssetId("RetryIcon"),
                                });
                            }}
                        />
                        <TableSwitchRow
                            label={"Load from Custom URL"}
                            icon={
                                <TableRow.Icon source={findAssetId("copy")} />
                            }
                            value={config.isCustomBundle}
                            onValueChange={(v: boolean) => {
                                setConfig((prev) => ({
                                    ...prev,
                                    isCustomBundle: v,
                                    customBundleUrl: v
                                        ? prev.customBundleUrl ??
                                          DEFAULT_BUNDLE_URL
                                        : prev.customBundleUrl,
                                }));
                            }}
                        />
                        {config.isCustomBundle && (
                            <TableRow
                                label={
                                    <TextInput
                                        defaultValue={config.customBundleUrl}
                                        size={"md"}
                                        onChange={(v) => {
                                            setConfig((prev) => ({
                                                ...prev,
                                                customBundleUrl: v,
                                            }));
                                        }}
                                    />
                                }
                            />
                        )}
                    </TableRowGroup>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}
