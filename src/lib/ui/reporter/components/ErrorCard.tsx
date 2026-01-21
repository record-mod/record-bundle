import Codeblock from "@lib/ui/components/Codeblock";
import { showSheet } from "@lib/ui/sheets";
import { Button, Card, Stack, Text } from "@metro/common/components";
import { ReactNode } from "react";

import ErrorDetailsActionSheet from "./ErrorDetailsActionSheet";

export const INDEX_BUNDLE_FILE: string =
    window.HermesInternal.getFunctionLocation(window.__r).fileName;

interface ErrorCardProps {
    error: unknown;
    header?: string | ReactNode;
    onRetryRender?: () => void;
}

export default function ErrorCard(props: ErrorCardProps) {
    return (
        <Card>
            <Stack>
                {props.header && typeof props.header !== "string" ? (
                    props.header
                ) : (
                    <Text variant={"heading-lg/bold"}>
                        {props.header ?? "Uh Oh"}
                    </Text>
                )}
                <Codeblock selectable={true}>{String(props.error)}</Codeblock>

                <Button
                    variant={"destructive"}
                    text={"Retry Render"}
                    onPress={props.onRetryRender!}
                />

                <Button
                    text={"Details"}
                    onPress={() =>
                        showSheet(
                            "ReCordErrorDetailsActionSheet",
                            ErrorDetailsActionSheet,
                            { error: props.error as Error },
                        )
                    }
                />
            </Stack>
        </Card>
    );
}
