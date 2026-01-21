import { useState, useMemo } from "react";
import { instances } from "@plugins";
import { FlatList, View } from "react-native";
import PluginCard from "./PluginCard";
import Search from "@/lib/ui/components/Search";
import { Stack } from "@/metro/common/components";

export default function PluginsPage() {
    const allPlugins = Array.from(instances);
    const [query, setQuery] = useState("");

    const plugins = useMemo(() => {
        const filtered = query
            ? allPlugins.filter(
                  ([id, instance]) =>
                      // Check plugin ID for full match and name for partial match.
                      id.toLowerCase() == query ||
                      instance.manifest.name.toLowerCase().includes(query),
              )
            : allPlugins;

        return filtered;
    }, [query]);

    return (
        <View style={{ padding: 10 }}>
            <Stack spacing={16}>
                <Search
                    onChangeText={setQuery}
                    placeholder={"Search plugins"}
                    isRound={true}
                />
                <FlatList
                    data={plugins}
                    renderItem={({ item: [id, _] }) => <PluginCard id={id} />}
                />
            </Stack>
        </View>
    );
}
