import {
    ActionSheet,
    Text,
    TableRowGroup,
    TableRow,
    AvatarPile,
    Avatar,
} from "@metro/common/components";
import { InternalPluginInstance, PluginFlags } from "@plugins/types";
import { FluxUtils } from "@metro/common";
import { View } from "react-native";
import { UserStore } from "@/metro/common/stores";
import { lazyDestructure } from "@/lib/utils/lazy";
import { findByProps } from "@/metro";

const { getUser: maybeFetchUser } = lazyDestructure(() =>
    findByProps("getUser", "fetchProfile"),
);

export default function PluginSheet({
    instance,
}: {
    instance: InternalPluginInstance;
}) {
    const authorUsers: any[] = FluxUtils.useStateFromStoresArray(
        [UserStore],
        () => {
            instance.manifest.authors.forEach(
                (a) => a.id && maybeFetchUser(a.id),
            );
            return instance.manifest.authors.map((a) =>
                UserStore.getUser(a.id),
            );
        },
    );

    return (
        <ActionSheet>
            <View style={{ padding: 8, gap: 8 }}>
                <Text variant={"heading-xl/bold"}>
                    {instance.manifest.name}
                </Text>
                <Text variant={"text-sm/medium"} color={"text-muted"}>
                    {instance.manifest.version}
                </Text>
                <View
                    style={{
                        alignItems: "center",
                        flexDirection: "row",
                        flexShrink: 1,
                        gap: 8,
                    }}
                >
                    <AvatarPile
                        size={"xsmall"}
                        names={instance.manifest.authors.map((a) => a.name)}
                        totalCount={instance.manifest.authors.length}
                    >
                        {authorUsers.map((user) => (
                            <Avatar size={"xsmall"} user={user} />
                        ))}
                    </AvatarPile>
                    <Text variant={"text-sm/semibold"}>
                        {instance?.manifest.authors
                            .map((a) => a.name)
                            .join(", ")}
                    </Text>
                </View>
                {instance.flags & PluginFlags.Errored ? (
                    <>
                        <View style={{ alignItems: "center", marginBottom: 8 }}>
                            <Text variant={"heading-lg/bold"}>
                                This plugin had error(s):
                            </Text>
                        </View>
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
                        <TableRowGroup title={"Logs"}>
                            {instance.logs.map((l) => (
                                <TableRow label={l.message} subLabel={l.time} />
                            ))}
                        </TableRowGroup>
                    </>
                )}
            </View>
        </ActionSheet>
    );
}
