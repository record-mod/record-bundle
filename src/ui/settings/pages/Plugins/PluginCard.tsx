import { Discord, TableSwitch } from "@metro/common/components";
import { instances, tryStartPluginLate, tryStopPlugin } from "@plugins";
import { PluginFlags } from "@plugins/types";
import { React, ReactNative as RN } from "@metro/common";
import { findAssetId } from "@lib/api/assets";
import { showSheet } from "@lib/ui/sheets";
import PluginSheet from "./PluginSheet";

export default function PluginCard({ id }: { id: string }) {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [, forceUpdate] = React.useReducer(() => ({}), 0);
    const pluginInstance = instances.get(id);

    React.useEffect(() => {
        setIsEnabled(Boolean(pluginInstance?.flags! & PluginFlags.Enabled));
    }, []);

    React.useEffect(() => {
        if (isEnabled) {
            setIsEnabled(tryStartPluginLate(id));
        } else {
            tryStopPlugin(id);
        }
    }, [isEnabled]);

    return (
        <Discord.Card>
            <RN.View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <RN.View>
                    <Discord.Stack spacing={8}>
                        <Discord.Text variant="heading-lg/semibold">
                            {pluginInstance?.manifest.name}
                        </Discord.Text>
                        <Discord.Text variant="heading-sm/semibold">
                            {pluginInstance?.manifest.id} -{" "}
                            {pluginInstance?.manifest.version}
                        </Discord.Text>
                        <Discord.Text variant="heading-md/semibold">
                            Enabled
                        </Discord.Text>
                        {pluginInstance?.flags! & PluginFlags.Errored && (
                            <Discord.Text
                                variant="heading-md/semibold"
                                color="text-feedback-critical"
                            >
                                This plugin has error(s)!
                            </Discord.Text>
                        )}
                    </Discord.Stack>
                </RN.View>
                <RN.View style={{ justifyContent: "space-between" }}>
                    <RN.View style={{ flexDirection: "row", gap: 8 }}>
                        <Discord.IconButton
                            icon={findAssetId("CircleInformationIcon")}
                            variant={"secondary"}
                            size={"sm"}
                            onPress={() => {
                                showSheet("PluginInformation", PluginSheet, {
                                    instance: pluginInstance!,
                                });
                            }}
                        />
                    </RN.View>
                    <RN.View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 16,
                        }}
                    >
                        <TableSwitch
                            label={"Enabled"}
                            value={isEnabled}
                            onValueChange={(v: boolean) => {
                                setIsEnabled(v);
                                forceUpdate();
                            }}
                        />
                    </RN.View>
                </RN.View>
            </RN.View>
        </Discord.Card>
    );
}
