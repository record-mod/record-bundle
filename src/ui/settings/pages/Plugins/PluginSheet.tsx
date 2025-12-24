import { ActionSheet, Discord } from "@metro/common/components";
import { InternalPluginInstance, PluginFlags } from "@plugins/types";
import { ReactNative as RN } from "@metro/common";

export default function PluginSheet({
    instance,
}: {
    instance: InternalPluginInstance;
}) {
    return (
        <ActionSheet>
            <RN.View style={{ alignItems: "center" }}>
                <Discord.Text variant={"heading-xl/bold"}>
                    {instance.manifest.name}
                </Discord.Text>
            </RN.View>
            {instance.flags & PluginFlags.Errored ? (
                <>
                    <RN.View style={{ alignItems: "center", marginBottom: 8 }}>
                        <Discord.Text variant={"heading-lg/bold"}>
                            This plugin had error(s):
                        </Discord.Text>
                    </RN.View>
                    <Discord.TableRowGroup label={"Errors"}>
                        {instance.errors.map((e) => (
                            <Discord.TableRow
                                label={e.message}
                                subLabel={e.time}
                                variant={"danger"}
                            />
                        ))}
                    </Discord.TableRowGroup>
                </>
            ) : (
                <>
                    <RN.View style={{ alignItems: "center", marginBottom: 8 }}>
                        <Discord.Text variant={"heading-lg/bold"}>
                            This plugin is{" "}
                            {instance.flags & PluginFlags.Enabled
                                ? "running normally!"
                                : "currently disabled."}
                        </Discord.Text>
                    </RN.View>
                </>
            )}
        </ActionSheet>
    );
}
