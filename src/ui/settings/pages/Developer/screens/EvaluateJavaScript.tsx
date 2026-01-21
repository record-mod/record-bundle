import Codeblock from "@lib/ui/components/Codeblock";
import { findByPropsLazy } from "@metro";
import {
    Stack,
    TableRowGroup,
    TableSwitchRow,
    Button,
} from "@metro/common/components";
import { ScrollView } from "react-native";
import ErrorBoundary from "@lib/ui/reporter/components/ErrorBoundary";
import { useState } from "react";

const util = findByPropsLazy("inspect");

const { TextArea } = findByPropsLazy("Stack", "Button");

export default function EvaluateJavaScriptScreen() {
    const [code, setCode] = useState("");
    const [awaitResult, setAwaitResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showHidden, setShowHidden] = useState(true);
    const [result, setResult] = useState("undefined");

    return (
        <ErrorBoundary>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Stack spacing={16}>
                    <TextArea
                        onChange={(v: string) => setCode(v)}
                        placeholder={"record.metro.findByProps"}
                    />
                    <TableRowGroup title={"Options"}>
                        <TableSwitchRow
                            label={"Await result"}
                            subLabel={"Should the result be awaited."}
                            value={awaitResult}
                            onValueChange={setAwaitResult}
                        />
                        <TableSwitchRow
                            label={"Show hidden"}
                            subLabel={
                                "Should the result contain hidden properties."
                            }
                            value={showHidden}
                            onValueChange={setShowHidden}
                        />
                    </TableRowGroup>
                    <Button
                        onPress={async function onPress() {
                            try {
                                setIsLoading(true);
                                const res = (0, eval)(
                                    `${code}//# sourceURL=ReCordEval`,
                                );

                                const inspected = util.inspect(
                                    awaitResult ? await res : res,
                                    {
                                        depth: 3,
                                        showHidden,
                                    },
                                );

                                setResult(inspected);
                                setIsLoading(false);
                            } catch (e) {
                                setResult(util.inspect(e));
                                setIsLoading(false);
                            }
                        }}
                        loading={isLoading}
                        text={"Evaluate"}
                    />
                    <Codeblock>{result}</Codeblock>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}
