import { ActionSheet, Discord } from "@metro/common/components";
import { React } from "@metro/common";
import { logger } from "@lib/utils/logger";

export default function AssetFiltersSheet({
    value,
    onChange,
}: {
    value: string;
    onChange: (type: string) => void;
}) {
    const [current, setCurrent] = React.useState(value);

    React.useEffect(() => {
        setCurrent(value);
    }, [value]);

    logger.log(value);

    return (
        <ActionSheet>
            <Discord.Text variant={"heading-lg/extrabold"}>
                Asset Filters
            </Discord.Text>
            <Discord.TableRowGroup title={"Filters"}>
                <Discord.TableSwitchRow
                    label={"All"}
                    value={current == "all"}
                    onValueChange={(v: boolean) => {
                        if (v) {
                            onChange("all");
                            setCurrent("all");
                        }
                    }}
                />
                <Discord.TableSwitchRow
                    label={"Displayable"}
                    value={current == "displayable"}
                    onValueChange={(v: boolean) => {
                        if (v) {
                            onChange("displayable");
                            setCurrent("displayable");
                        }
                    }}
                />
            </Discord.TableRowGroup>
        </ActionSheet>
    );
}
