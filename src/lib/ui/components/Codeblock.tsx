import { constants } from "@metro/common";
import { Discord } from "@metro/common/components";
import { semanticColors } from "@ui/color";
import { createStyles } from "@ui/styles";

export interface CodeblockProps {
    selectable?: boolean;
    style?: import("react-native").TextStyle;
    children?: string;
}

const useStyles = createStyles({
    codeBlock: {
        fontFamily: constants.Fonts.CODE_NORMAL,
        fontSize: 12,
        textAlignVertical: "center",
        backgroundColor: semanticColors.CARD_BACKGROUND_DEFAULT,
        color: semanticColors.TEXT_DEFAULT,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: semanticColors.BORDER_SUBTLE,
        padding: 10,
    },
});

export default function Codeblock({
    selectable,
    style,
    children,
}: CodeblockProps) {
    return (
        <Discord.Text
            selectable={selectable}
            style={[useStyles().codeBlock, style && style]}
        >
            {children}
        </Discord.Text>
    );
}
