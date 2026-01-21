import {
    TableSwitch,
    Card,
    Stack,
    Text,
    IconButton,
} from "@metro/common/components";
import { instances, tryStartPluginLate, tryStopPlugin } from "@plugins";
import { PluginFlags } from "@plugins/types";
import { useState } from "react";
import { View } from "react-native";
import { findAssetId } from "@lib/api/assets";
import { showSheet } from "@lib/ui/sheets";
import PluginSheet from "./PluginSheet";

export default function PluginCard({ id }: { id: string }) {
    const pluginInstance = instances.get(id);
    const [isEnabled, setIsEnabled] = useState(
        Boolean(pluginInstance?.flags! & PluginFlags.Enabled),
    );

    return (
        <Card>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View>
                    <Stack spacing={4}>
                        <Text variant={"heading-lg/semibold"}>
                            {pluginInstance?.manifest.name}
                        </Text>
                        <Text variant={"text-sm/semibold"} color={"text-muted"}>
                            by{" "}
                            {pluginInstance?.manifest.authors
                                .map((a) => a.name)
                                .join(", ")}
                        </Text>
                        <Text variant={"heading-sm/semibold"}>
                            {pluginInstance?.manifest.id} -{" "}
                            {pluginInstance?.manifest.version}
                        </Text>
                        {pluginInstance?.flags! & PluginFlags.Errored && (
                            <Text
                                variant={"heading-md/semibold"}
                                color={"text-feedback-critical"}
                            >
                                This plugin has error(s)!
                            </Text>
                        )}
                    </Stack>
                </View>
                <View style={{ justifyContent: "space-between" }}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 8,
                        }}
                    >
                        <IconButton
                            icon={findAssetId("CircleInformationIcon")}
                            variant={"secondary"}
                            size={"sm"}
                            onPress={() => {
                                showSheet("PluginInformation", PluginSheet, {
                                    instance: pluginInstance!,
                                });
                            }}
                        />
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 8,
                        }}
                    >
                        <TableSwitch
                            value={isEnabled}
                            onValueChange={(v: boolean) => {
                                if (v) {
                                    const started = tryStartPluginLate(id);
                                    setIsEnabled(started);
                                } else {
                                    tryStopPlugin(id);
                                    setIsEnabled(false);
                                }
                            }}
                        />
                    </View>
                </View>
            </View>
        </Card>
    );
}
