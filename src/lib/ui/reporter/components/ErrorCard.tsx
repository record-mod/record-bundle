import Codeblock from "@lib/ui/components/Codeblock";
import { showSheet } from "@lib/ui/sheets";
import { Discord } from "@metro/common/components";
import { ReactNode } from "react";

import ErrorDetailsActionSheet from "./ErrorDetailsActionSheet";

export const INDEX_BUNDLE_FILE: string =
    window.HermesInternal.getFunctionLocation(window.__r).fileName;

interface ErrorCardProps {
    error: unknown;
    header?: string | ReactNode;
    onRetryRender?: () => void;
}

const { Button, Card, Stack, Text, TwinButtons } = Discord;

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
                <TwinButtons style={{ gap: 6 }}>
                    {props.onRetryRender && (
                        <Button
                            variant={"destructive"}
                            text={"Retry Render"}
                            onPress={props.onRetryRender}
                        />
                    )}
                    {props.error instanceof Error ? (
                        <Button
                            text={"Details"}
                            onPress={() =>
                                showSheet(
                                    "ReCordErrorDetailsActionSheet",
                                    ErrorDetailsActionSheet,
                                    { error: props.error as Error }
                                )
                            }
                        />
                    ) : null}
                </TwinButtons>
            </Stack>
        </Card>
    );
}
