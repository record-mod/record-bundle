import {
    ActionSheet,
    Text,
    TableRowGroup,
    TableRow,
} from "@metro/common/components";
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
                <Text variant={"heading-xl/bold"}>
                    {instance.manifest.name}
                </Text>
            </RN.View>
            {instance.flags & PluginFlags.Errored ? (
                <>
                    <RN.View style={{ alignItems: "center", marginBottom: 8 }}>
                        <Text variant={"heading-lg/bold"}>
                            This plugin had error(s):
                        </Text>
                    </RN.View>
                    <TableRowGroup title={"Errors"}>
                        {instance.errors.map((e) => (
                            <TableRow
                                label={e.message}
                                subLabel={e.time}
                                variant={"danger"}
                            />
                        ))}
                    </TableRowGroup>
                </>
            ) : (
                <>
                    <RN.View style={{ alignItems: "center", marginBottom: 8 }}>
                        <Text variant={"heading-lg/bold"}>
                            This plugin is{" "}
                            {instance.flags & PluginFlags.Enabled
                                ? "running normally!"
                                : "currently disabled."}
                        </Text>
                    </RN.View>
                    <TableRowGroup title={"Logs"}>
                        {instance.logs.map((l) => (
                            <TableRow label={l.message} subLabel={l.time} />
                        ))}
                    </TableRowGroup>
                </>
            )}
        </ActionSheet>
    );
}
