import {
    ComponentErrorLine,
    parseComponentStack,
} from "@lib/ui/reporter/utils/parseComponentStack";
import { findAssetId } from "@lib/api/assets";
import { clipboard } from "@metro/common";
import { Discord } from "@metro/common/components";
import { useState } from "react";
import { View } from "react-native";

export default function ErrorComponentStackCard(props: {
    componentStack: string;
}) {
    const [collapsed, setCollapsed] = useState(true);

    let stack: ComponentErrorLine[];
    try {
        stack = parseComponentStack(props.componentStack);
        stack = collapsed ? stack.slice(0, 4) : stack;
    } catch {
        return;
    }

    return (
        <Discord.Card>
            <View style={{ gap: 8 }}>
                <Discord.Text variant="heading-lg/bold">
                    Component Stack
                </Discord.Text>
                <View style={{ gap: 4 }}>
                    {stack.map((component) => (
                        <View style={{ flexDirection: "row" }}>
                            <Discord.Text
                                variant="text-md/bold"
                                color="text-default"
                            >
                                {"<"}
                            </Discord.Text>
                            <Discord.Text variant="text-md/bold">
                                {component.componentName}
                            </Discord.Text>
                            <Discord.Text
                                variant="text-md/bold"
                                color="text-default"
                            >
                                {"/>"}
                            </Discord.Text>
                        </View>
                    ))}
                </View>
                {collapsed && <Discord.Text>...</Discord.Text>}
                <View
                    style={{
                        gap: 8,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Discord.Button
                        variant="secondary"
                        text={`Show ${collapsed ? "more" : "less"}`}
                        icon={findAssetId(
                            collapsed
                                ? "ChevronSmallUpIcon"
                                : "ChevronSmallDownIcon"
                        )}
                        onPress={() => setCollapsed((v) => !v)}
                    />
                    <Discord.Button
                        variant="secondary"
                        text="Copy"
                        icon={findAssetId("CopyIcon")}
                        onPress={() =>
                            clipboard.setString(props.componentStack)
                        }
                    />
                </View>
            </View>
        </Discord.Card>
    );
}
