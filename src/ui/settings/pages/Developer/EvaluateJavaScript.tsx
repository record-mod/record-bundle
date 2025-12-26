import Codeblock from "@lib/ui/components/Codeblock";
import { findByPropsLazy } from "@metro";
import {
    Stack,
    TableRowGroup,
    TableSwitchRow,
    Button,
} from "@metro/common/components";
import { React } from "@metro/common";
import { ScrollView } from "react-native";
import ErrorBoundary from "@lib/ui/reporter/components/ErrorBoundary";

const util = findByPropsLazy("inspect");

const { TextArea } = findByPropsLazy("Stack", "Button");

export default function EvaluateJavaScriptScreen() {
    const [code, setCode] = React.useState("");
    const [awaitResult, setAwaitResult] = React.useState(true);
    const [showHidden, setShowHidden] = React.useState(true);
    const [result, setResult] = React.useState("undefined");

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
                                const res = (0, eval)(
                                    `${code}//# sourceURL=ReCordEval`
                                );
                                setResult("Loading...");
                                const inspected = util.inspect(
                                    awaitResult ? await res : res,
                                    {
                                        depth: 3,
                                        showHidden,
                                    }
                                );

                                setResult(inspected);
                            } catch (e) {
                                setResult(util.inspect(e));
                            }
                        }}
                        text={"Evaluate"}
                    />
                    <Codeblock>{result}</Codeblock>
                </Stack>
            </ScrollView>
        </ErrorBoundary>
    );
}
