import { hasStack, isComponentStack } from "@lib/ui/reporter/utils/isStack";
import Codeblock from "@lib/ui/components/Codeblock";
import { ActionSheet, Discord } from "@metro/common/components";
import { View } from "react-native";

import ErrorComponentStackCard from "./ErrorComponentStackCard";
import ErrorStackCard from "./ErrorStackCard";

const { Text } = Discord;

export default function ErrorDetailsActionSheet(props: { error: Error }) {
    return (
        <ActionSheet>
            <View style={{ gap: 12, paddingVertical: 12 }}>
                <Text variant={"heading-lg/extrabold"}>Error</Text>
                <Codeblock selectable={true}>{props.error.message}</Codeblock>
                {hasStack(props.error) && (
                    <ErrorStackCard error={props.error} />
                )}
                {isComponentStack(props.error) ? (
                    <ErrorComponentStackCard
                        componentStack={props.error.componentStack}
                    />
                ) : null}
            </View>
        </ActionSheet>
    );
}
