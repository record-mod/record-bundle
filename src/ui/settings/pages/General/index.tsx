import { findAssetId } from "@lib/api/assets";
import { debugInfo } from "@lib/api/debug";
import {
    BundleUpdaterManager,
    NativeClientInfoModule,
} from "@lib/api/native/modules";
import {
    Stack,
    TableRow,
    TableSwitchRow,
    TableRowGroup,
} from "@metro/common/components";
import ReCord from "@assets/icons/ReCord.png";
import { ScrollView } from "react-native";
import { getValue, setValue } from "@lib/api/native/modules/store";
import { Discord, React } from "@metro/common";
import ErrorBoundary from "@lib/ui/reporter/components/ErrorBoundary";

export default function ReCordSettings() {
    const Constants = NativeClientInfoModule.getConstants();
    const navigation = Discord.useNavigation();

    const [isDevMode, setIsDevMode] = React.useState(false);

    React.useEffect(() => {
        const isDev = getValue("core", "experiments", false);

        setIsDevMode(isDev);
    }, []);

    React.useEffect(() => {
        setValue("core", "experiments", isDevMode);
    }, [isDevMode]);

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
                    <TableRowGroup title={"Info"}>
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
                            label={"About"}
                            arrow
                            icon={
                                <TableRow.Icon
                                    source={findAssetId(
                                        "CircleInformationIcon"
                                    )}
                                />
                            }
                            onPress={() => navigation.push("ABOUT")}
                        />
                    </TableRowGroup>
                    <TableRowGroup title={"Actions"}>
                        <TableRow
                            label={"Reload Discord"}
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("RetryIcon")!}
                                />
                            }
                            onPress={() => BundleUpdaterManager.reload()}
                        />
                    </TableRowGroup>
                    <TableRowGroup title={"Misc"}>
                        <TableSwitchRow
                            label={"Activate Discord Experiments"}
                            subLabel={
                                "Enable to be able to use Discord's Experiments."
                            }
                            icon={
                                <TableRow.Icon
                                    source={findAssetId("WrenchIcon")!}
                                />
                            }
                            value={isDevMode}
                            onValueChange={setIsDevMode}
                        />
                    </TableRowGroup>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}
