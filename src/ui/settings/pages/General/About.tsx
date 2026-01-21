import ErrorBoundary from "@/lib/ui/reporter/components/ErrorBoundary";
import { Stack, TableRow, TableRowGroup } from "@/metro/common/components";
import { Linking, ScrollView } from "react-native";
import ReCord from "@assets/icons/ReCord.png";
import { debugInfo } from "@/lib/api/debug";
import { findAssetId } from "@/lib/api/assets";
import { info } from "@/lib/api/native/modules/bridge";
import { NativeClientInfoModule } from "@/lib/api/native/modules";

export default function About() {
    const Constants = NativeClientInfoModule.getConstants();
    const Runtime = (HermesInternal as any).getRuntimeProperties();

    const github = "https://github.com/record-mod/record-bundle";

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
                    <TableRowGroup title={"Versions"}>
                        <TableRow
                            label={"ReCord"}
                            icon={<TableRow.Icon source={{ uri: ReCord }} />}
                            trailing={
                                <TableRow.TrailingText
                                    text={`${debugInfo.record.version}-${debugInfo.record.hash}`}
                                />
                            }
                        />
                        <TableRow
                            label={"Loader"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("DownloadIcon")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    text={`${info.name} (${info.version})`}
                                />
                            }
                        />
                        <TableRow
                            label={"Discord"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("Discord")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    text={`${Constants.Version} (${Constants.Build})`}
                                />
                            }
                        />
                        <TableRow
                            label={"React Native"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("ScienceIcon")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    // Slice off "for RN " at the start
                                    text={`${Runtime[
                                        "OSS Release Version"
                                    ].slice(7)}`}
                                />
                            }
                        />
                    </TableRowGroup>
                    <TableRowGroup title={"Links"}>
                        <TableRow
                            label={"Github"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId(
                                        "img_account_sync_github_white",
                                    )}
                                />
                            }
                            trailing={<TableRow.TrailingText text={github} />}
                            onPress={() => {
                                Linking.openURL(github);
                            }}
                        />
                    </TableRowGroup>
                    <TableRowGroup title={"Platform"}>
                        <TableRow
                            label={"Operating System"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("MobilePhoneIcon")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    text={`Android ${info.android.version}`}
                                />
                            }
                        />
                        <TableRow
                            label={"SDK Version"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("StaffBadgeIcon")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    text={`API ${info.android.api}`}
                                />
                            }
                        />
                        <TableRow
                            label={"Codename"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("TagIcon")}
                                />
                            }
                            trailing={
                                <TableRow.TrailingText
                                    text={`${info.android.codeName}`}
                                />
                            }
                        />
                    </TableRowGroup>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}
