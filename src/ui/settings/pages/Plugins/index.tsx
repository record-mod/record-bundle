import { ReactNative } from "@metro/common";
import { instances } from "@plugins";
import { View } from "react-native";
import PluginCard from "./PluginCard";

export default function PluginsPage() {
    const plugins = Array.from(instances);

    return (
        <View>
            <ReactNative.FlatList
                data={plugins}
                renderItem={({ item: [id, _] }) => <PluginCard id={id} />}
            />
        </View>
    );
}
