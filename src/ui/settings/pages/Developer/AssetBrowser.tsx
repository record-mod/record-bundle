import { iterateAssets } from "@lib/api/assets";
import Search from "@lib/ui/components/Search";
import ErrorBoundary from "@lib/ui/reporter/components/ErrorBoundary";
import { React } from "@metro/common";
import { TableRowGroup } from "@metro/common/components";
import { useMemo } from "react";
import { FlatList, View } from "react-native";
import AssetItem from "./AssetItem";
import { AssetFiltersMenu } from "./AssetFilters";

const displayable = new Set(["png", "jpg", "svg"]);

export default function AssetBrowser() {
    const [filter, setFilter] = React.useState("all");
    const [search, setSearch] = React.useState("");
    const all = useMemo(() => Array.from(iterateAssets()), []);

    return (
        <ErrorBoundary>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                    }}
                >
                    <Search
                        style={{
                            flex: 1,
                            marginRight: 8,
                        }}
                        onChangeText={(s) => setSearch(s.toLowerCase())}
                        isRound={true}
                        placeholder={"Search for assets.."}
                    />
                    <AssetFiltersMenu filter={filter} onChange={setFilter} />
                </View>

                <View
                    style={{
                        flex: 1,
                        borderRadius: 16,
                        paddingHorizontal: 12,
                        overflow: "hidden",
                        backgroundColor: "transparent",
                    }}
                >
                    <TableRowGroup>
                        <FlatList
                            data={all
                                .filter(
                                    (a) =>
                                        a.name.toLowerCase().includes(search) ||
                                        a.id.toString() == search
                                )
                                .filter((a) =>
                                    filter == "displayable"
                                        ? displayable.has(a.type)
                                        : a
                                )}
                            renderItem={({ item }) => (
                                <AssetItem asset={item} />
                            )}
                        />
                    </TableRowGroup>
                </View>
            </View>
        </ErrorBoundary>
    );
}
