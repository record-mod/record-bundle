import { Discord, NavigationNative } from "@metro/common";
import { Stack, TableRow, TableRowGroup } from "@metro/common/components";
import { ScrollView } from "react-native";
import { findAssetId } from "@lib/api/assets";
import { findByProps } from "@metro";

const { hideActionSheet } = findByProps("hideActionSheet");

export default function ReCordDevtools() {
    const navigation = NavigationNative.useNavigation();

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 38 }}
        >
            <Stack
                style={{ paddingVertical: 24, paddingHorizontal: 12 }}
                spacing={24}
            >
                <TableRowGroup title={"Tools"}>
                    <TableRow
                        arrow={true}
                        label={"Evaluate JavaScript"}
                        icon={
                            <TableRow.Icon source={findAssetId("FileIcon")} />
                        }
                        subLabel={"Evaluates a JavaScript string."}
                        onPress={() => navigation.push("EVALJS")}
                    />
                    <TableRow
                        arrow={true}
                        label={"Asset Browser"}
                        icon={
                            <TableRow.Icon source={findAssetId("ic_image")} />
                        }
                        subLabel={"Find and preview Discord assets."}
                        onPress={() => navigation.push("ASSETBROWSER")}
                    />
                    <TableRow
                        arrow={true}
                        label={"Loader Config"}
                        icon={
                            <TableRow.Icon
                                source={findAssetId("DownloadIcon")}
                            />
                        }
                        onPress={() => navigation.push("LOADERCONFIG")}
                    />
                    <TableRow
                        label={"Test ErrorBoundary"}
                        icon={
                            <TableRow.Icon
                                source={findAssetId("CircleErrorIcon")}
                            />
                        }
                        onPress={() =>
                            Discord.showSimpleActionSheet({
                                key: "ErrorBoundaryTools",
                                header: {
                                    title: "Which ErrorBoundary do you want to trip?",
                                    icon: (
                                        <TableRow.Icon
                                            style={{ marginRight: 8 }}
                                            source={findAssetId(
                                                "ic_warning_24px"
                                            )}
                                        />
                                    ),
                                    onClose: () => hideActionSheet(),
                                },
                                options: [
                                    {
                                        label: "ReCord",
                                        onPress: () =>
                                            navigation.push(
                                                "RECORD_CUSTOM_PAGE",
                                                //@ts-expect-error
                                                { render: () => <undefined /> }
                                            ),
                                    },
                                    {
                                        label: "Discord",
                                        isDestructive: true,
                                        onPress: () =>
                                            navigation.push(
                                                "RECORD_CUSTOM_PAGE",
                                                {
                                                    title: null,
                                                    // @ts-expect-error
                                                    render: () => <undefined />,
                                                    noErrorBoundary: true,
                                                }
                                            ),
                                    },
                                ],
                            })
                        }
                    />
                </TableRowGroup>
            </Stack>
        </ScrollView>
    );
}
