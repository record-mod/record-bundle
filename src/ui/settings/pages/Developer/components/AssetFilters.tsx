import { ContextMenu, IconButton } from "@metro/common/components";
import { findAssetId } from "@/lib/api/assets";
import SelectedFilterIcon from "@assets/icons/SelectedFilterIcon.png";
import { useEffect, useState } from "react";

enum Filters {
    All = "All",
    Displayable = "Displayable",
}

export function AssetFiltersMenu({
    filter,
    onChange,
}: {
    filter: string;
    onChange: (type: string) => void;
}) {
    const [current, setCurrent] = useState(filter);

    useEffect(() => {
        setCurrent(filter);
    }, [filter]);

    return (
        <ContextMenu
            title={"Asset Filters"}
            items={Object.values(Filters).map((value) => ({
                label: value,
                variant: "default",
                action: () => {
                    setCurrent(value.toLowerCase());
                    onChange(value.toLowerCase());
                },
                iconSource: value.toLowerCase() === current && {
                    uri: SelectedFilterIcon,
                },
            }))}
        >
            {(props: any) => (
                <IconButton
                    icon={findAssetId("FiltersHorizontalIcon")}
                    variant={"tertiary"}
                    size={"md"}
                    {...props}
                />
            )}
        </ContextMenu>
    );
}
