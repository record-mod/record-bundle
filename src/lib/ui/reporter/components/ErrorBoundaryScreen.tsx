import { hasStack, isComponentStack } from "@lib/ui/reporter/utils/isStack";
import { BundleUpdaterManager } from "@lib/api/native/modules";
import Codeblock from "@lib/ui/components/Codeblock";
import { createStyles } from "@lib/ui/styles";
import { tokens } from "@metro/common";
import { Text, Card, Button, SafeAreaView } from "@metro/common/components";
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
                <Text variant={"display-lg"}>Uh oh.</Text>
                <Text variant={"text-md/normal"}>
                    A crash occurred while rendering a component. This could be
                    caused by ReCord, or Discord itself.
                </Text>
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
            <Card style={{ gap: 6 }}>
                <Button
                    text={"Reload Discord"}
                    onPress={() => BundleUpdaterManager.reload()}
                />
                <Button
                    variant={"destructive"}
                    text={"Retry Render"}
                    onPress={() => props.rerender()}
                />
            </Card>
        </SafeAreaView>
    );
}
