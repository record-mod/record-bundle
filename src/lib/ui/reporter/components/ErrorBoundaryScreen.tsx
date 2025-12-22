import { hasStack, isComponentStack } from "@lib/ui/reporter/utils/isStack";
import { BundleUpdaterManager } from "@lib/api/native/modules";
import Codeblock from "@lib/ui/components/Codeblock";
import { createStyles } from "@lib/ui/styles";
import { tokens } from "@metro/common";
import { Discord, SafeAreaView } from "@metro/common/components";
import { ScrollView, View } from "react-native";

import ErrorComponentStackCard from "./ErrorComponentStackCard";
import ErrorStackCard from "./ErrorStackCard";

const useStyles = createStyles({
    container: {
        flex: 1,
        backgroundColor: tokens.colors.BG_BASE_SECONDARY,
        paddingHorizontal: 16,
        height: "100%",
        gap: 12,
    },
});

export default function ErrorBoundaryScreen(props: {
    error: Error;
    rerender: () => void;
}) {
    const styles = useStyles();

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ gap: 4 }}>
                <Discord.Text variant="display-lg">Uh oh.</Discord.Text>
                <Discord.Text variant="text-md/normal">
                    A crash occurred while rendering a component. This could be
                    caused by ReCord, or Discord itself.
                </Discord.Text>
            </View>
            <ScrollView contentContainerStyle={{ gap: 12 }}>
                <Codeblock selectable={true}>{props.error.message}</Codeblock>
                {hasStack(props.error) && (
                    <ErrorStackCard error={props.error} />
                )}
                {isComponentStack(props.error) ? (
                    <ErrorComponentStackCard
                        componentStack={props.error.componentStack}
                    />
                ) : null}
            </ScrollView>
            <Discord.Card style={{ gap: 6 }}>
                <Discord.Button
                    text="Reload Discord"
                    onPress={() => BundleUpdaterManager.reload()}
                />
                <Discord.Button
                    variant="destructive"
                    text="Retry Render"
                    onPress={() => props.rerender()}
                />
            </Discord.Card>
        </SafeAreaView>
    );
}
