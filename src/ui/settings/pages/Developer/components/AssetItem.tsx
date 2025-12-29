import { Asset, findAssetId } from "@lib/api/assets";
import { Discord } from "@/metro/common";
import {
    AlertModal,
    Text,
    TableRowGroup,
    TableRow,
} from "@metro/common/components";
import { Image } from "react-native";

const displayable = new Set(["png", "jpg", "svg"]);
const iconMap = {
    jsona: "PaperIcon",
    lottie: "ImageTextIcon",
    webm: "CirclePlayIcon-primary",
    ttf: "LettersIcon",
    default: "UnknownGameIcon",
};

export default function AssetItem({ asset }: { asset: Asset }) {
    return (
        <TableRow
            label={asset.name}
            subLabel={`ID: ${asset.id} Type: ${asset.type}`}
            icon={
                displayable.has(asset.type) ? (
                    <Image
                        source={asset.id}
                        style={{ width: 32, height: 32 }}
                    />
                ) : (
                    <TableRow.Icon
                        variant={"danger"}
                        source={findAssetId(
                            asset.type in iconMap
                                ? iconMap[asset.type as keyof typeof iconMap]
                                : iconMap.default
                        )}
                    />
                )
            }
            onPress={() => {
                Discord.openAlert(
                    "AssetItemDetails",
                    <AlertModal
                        title={"Asset Preview"}
                        extraContent={
                            <>
                                {displayable.has(asset.type) ? (
                                    <Image
                                        resizeMode={"contain"}
                                        source={asset.id}
                                        style={{
                                            flex: 1,
                                            width: "auto",
                                            height: 192,
                                            resizeMode: "contain",
                                        }}
                                    />
                                ) : (
                                    <Text
                                        variant={"text-sm/medium"}
                                        color={"text-feedback-critical"}
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        Asset type {asset.type.toUpperCase()} is
                                        not supported for preview.
                                    </Text>
                                )}
                                <TableRowGroup>
                                    <TableRow
                                        label={"Name"}
                                        trailing={
                                            <TableRow.TrailingText
                                                text={asset.name}
                                            />
                                        }
                                    />
                                    <TableRow
                                        label={"Asset ID"}
                                        trailing={
                                            <TableRow.TrailingText
                                                text={asset.id}
                                            />
                                        }
                                    />
                                    <TableRow
                                        label={"Type"}
                                        trailing={
                                            <TableRow.TrailingText
                                                text={asset.type}
                                            />
                                        }
                                    />
                                </TableRowGroup>
                                <Text
                                    variant={"text-sm/medium"}
                                    style={{
                                        width: "100%",
                                        textAlign: "center",
                                    }}
                                >
                                    Note that Asset IDs are not always
                                    consistent across app launches and app
                                    versions and therefore they should not be
                                    relied on unless absolutely needed.
                                </Text>
                            </>
                        }
                    ></AlertModal>
                );
            }}
        />
    );
}
