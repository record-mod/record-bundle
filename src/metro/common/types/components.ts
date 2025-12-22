import { Nullish } from "@lib/utils/types";
import { Falsey } from "lodash";
import {
    FC,
    JSX,
    MutableRefObject,
    PropsWithoutRef,
    ReactNode,
    RefObject,
} from "react";
import type * as RN from "react-native";
import { ImageSourcePropType, PressableProps } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { LiteralUnion } from "type-fest";

// Abandon all hope, ye who enter here
type Style = RN.ViewStyle & RN.ImageStyle & RN.TextStyle;

type InteractiveSize = "sm" | "md" | "lg";

// Buttons
type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary"
    | "destructive"
    | "active";

interface ButtonProps {
    disabled?: boolean;
    onPress: () => void;
    loading?: boolean;
    variant?: LiteralUnion<ButtonVariant, string>;
    text?: string;
    size?: LiteralUnion<InteractiveSize, string>;
    iconPosition?: "start" | "end";
    scaleAmountInPx?: number;
    icon?: ImageSourcePropType | ReactNode;
    style?: Style;
    grow?: boolean;
}

export type Button = React.ForwardRefExoticComponent<ButtonProps>;

interface TwinButtonsProps {
    children: ReactNode;
}

export type TwinButtons = React.ComponentType<TwinButtonsProps>;

// Segmented Control
interface SegmentedControlItem {
    id: string;
    label: string;
    page?: JSX.Element | null;
}

export interface SegmentedControlStateArgs {
    items: SegmentedControlItem[];
    pageWidth: number;
    defaultIndex?: number;
}

export interface SegmentedControlState {
    activeIndex: SharedValue<number>;
    pagerRef: RefObject<unknown>;
    scrollTarget: SharedValue<number>;
    scrollOverflow: SharedValue<number>;
    scrollOffset: SharedValue<number>;
    items: SegmentedControlItem[];
    itemDimensions: SharedValue<unknown[]>;
    pageWidth: number;
    pressedIndex: SharedValue<number>;
    onPageChangeRef: MutableRefObject<unknown>; // { current: undefined }
    setActiveIndex: (index: number) => void;
    setItemDimensions: (index: number, dimensions: unknown[]) => void;
    useReducedMotion: boolean;
}

interface SegmentedControlProps {
    state: SegmentedControlState;
    variant?: string;
}

export type SegmentedControl = React.FC<SegmentedControlProps>;

interface SegmentedControlPagesProps {
    state: SegmentedControlState;
}

export type SegmentedControlPages = React.FC<SegmentedControlPagesProps>;

interface CompatSegmentedControlProps {
    values: string[];
    selectedSegmentIndex?: number;
    onValueChange?: (index: number) => void;
    onSetActiveIndex?: (index: number) => void;
}

export type CompatSegmentedControl = React.FC<CompatSegmentedControlProps>;

// TODO: Confirm if this is real
interface TextInputProps
    extends Omit<RN.TextInputProps, "onChange" | "onChangeText" | "value"> {
    defaultValue?: string;
    description?: string;
    editable?: boolean;
    errorMessage?: string;
    focusable?: boolean;
    grow?: boolean;
    isCentered?: boolean;
    isClearable?: boolean;
    isDisabled?: boolean;
    isRound?: boolean;
    label?: string;
    leadingIcon?: React.FC<any>;
    leadingPressableProps?: PressableProps;
    leadingText?: string;
    onChange?: (text: string) => void;
    size?: "sm" | "md" | "lg";
    state?: "error" | "default";
    style?: Style;
    trailingIcon?: React.FC<any>;
    trailingPressableProps?: PressableProps;
    trailingText?: string;
    value?: string | Nullish;
}

export type TextInput = React.FC<TextInputProps>;

interface RowButtonProps {
    variant?: LiteralUnion<ButtonVariant, string>;
    style?: Style;
    icon?: ImageSourcePropType | ReactNode;
    label: string | ReactNode;
    subLabel?: string | ReactNode;
    onPress: () => void;
    disabled?: boolean;
}

export type RowButton = React.FC<RowButtonProps>;

interface StackProps {
    /** defaults to vertical */
    direction?: "vertical" | "horizontal";
    /** defaults to 8 */
    spacing?: number;
}

export type Stack = React.FC<
    React.PropsWithChildren<StackProps> & RN.ViewProps
>;

interface FABProps {
    icon: ImageSourcePropType | ReactNode;
    style?: Style;
    onPress: () => void;
    positionBottom?: number;
}

export type FloatingActionButton = React.FC<FABProps>;

interface ActionSheetProps {
    scrollable?: boolean;
}

export type ActionSheet = React.FC<React.PropsWithChildren<ActionSheetProps>>;

type TextColor =
    | "text-default"
    | "text-feedback-critical"
    | "text-feedback-warning"
    | "text-feedback-positive"
    | "text-link"
    | "text-brand";

type TextStyles =
    | "heading-sm/normal"
    | "heading-sm/medium"
    | "heading-sm/semibold"
    | "heading-sm/bold"
    | "heading-sm/extrabold"
    | "heading-md/normal"
    | "heading-md/medium"
    | "heading-md/semibold"
    | "heading-md/bold"
    | "heading-md/extrabold"
    | "heading-lg/normal"
    | "heading-lg/medium"
    | "heading-lg/semibold"
    | "heading-lg/bold"
    | "heading-lg/extrabold"
    | "heading-xl/normal"
    | "heading-xl/medium"
    | "heading-xl/semibold"
    | "heading-xl/bold"
    | "heading-xl/extrabold"
    | "heading-xxl/normal"
    | "heading-xxl/medium"
    | "heading-xxl/semibold"
    | "heading-xxl/bold"
    | "heading-xxl/extrabold"
    | "eyebrow"
    | "heading-deprecated-12/normal"
    | "heading-deprecated-12/medium"
    | "heading-deprecated-12/semibold"
    | "heading-deprecated-12/bold"
    | "heading-deprecated-12/extrabold"
    | "redesign/heading-18/bold"
    | "text-xxs/normal"
    | "text-xxs/medium"
    | "text-xxs/semibold"
    | "text-xxs/bold"
    | "text-xs/normal"
    | "text-xs/medium"
    | "text-xs/semibold"
    | "text-xs/bold"
    | "text-sm/normal"
    | "text-sm/medium"
    | "text-sm/semibold"
    | "text-sm/bold"
    | "text-md/normal"
    | "text-md/medium"
    | "text-md/semibold"
    | "text-md/bold"
    | "text-lg/normal"
    | "text-lg/medium"
    | "text-lg/semibold"
    | "text-lg/bold"
    | "redesign/message-preview/normal"
    | "redesign/message-preview/medium"
    | "redesign/message-preview/semibold"
    | "redesign/message-preview/bold"
    | "redesign/channel-title/normal"
    | "redesign/channel-title/medium"
    | "redesign/channel-title/semibold"
    | "redesign/channel-title/bold"
    | "display-sm"
    | "display-md"
    | "display-lg";

type TextProps = React.ComponentProps<typeof RN.Text> & {
    variant?: TextStyles;
    color?: TextColor;
    lineClamp?: number;
    maxFontSizeMultiplier?: number;
};
export type Text = typeof React.Component<TextProps>;

export type DiscordType = {
    Text: Text;

    [key: PropertyKey]: any;
};

interface IconButtonProps {
    label?: string;
    icon: ImageSourcePropType | ReactNode;
    onPress: () => void;
    disabled?: boolean;
    size?: InteractiveSize;
    variant?: ButtonVariant;
    style?: Style;
}

export type IconButton = React.FC<IconButtonProps>;

export type PressableScale = React.FC<PropsWithoutRef<typeof RN.Pressable>>;

interface TableRowBaseProps {
    arrow?: boolean;
    label: string | ReactNode;
    subLabel?: string | ReactNode;
    variant?: LiteralUnion<"danger", string>;
    icon?: JSX.Element | Falsey;
    disabled?: boolean;
    trailing?: ReactNode | React.ComponentType<any>;
}

interface TableRowProps extends TableRowBaseProps {
    onPress?: () => void;
}

export type TableRow = React.FC<TableRowProps> & {
    Icon: TableRowIcon;
    TrailingText: TableRowTrailingText;
    Arrow: FC<{}>;
};

interface TableRowTrailingTextProps {
    text: string;
}

export type TableRowTrailingText = FC<TableRowTrailingTextProps>;

interface TableRowIconProps {
    style?: RN.ImageStyle;
    variant?: LiteralUnion<"danger", string>;
    source: ImageSourcePropType | undefined;
}

export type TableRowIcon = React.FC<TableRowIconProps>;

interface TableRowGroupProps {
    title: string;
    children: ReactNode;
}

export type TableRowGroup = React.FC<TableRowGroupProps>;

interface TableRadioGroupProps {
    title: string;
    value: string;
    hasIcons?: boolean;
    onChange: <T extends string>(type: T) => void;
    children: ReactNode;
}

export type TableRadioGroup = FC<TableRadioGroupProps>;

interface TableRadioRowProps extends TableRowBaseProps {
    value: string;
}

export type TableRadioRow = FC<TableRadioRowProps>;

interface TableSwitchRowProps extends TableRowBaseProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
}

export type TableSwitchRow = FC<TableSwitchRowProps>;

interface TableCheckboxRowProps extends TableRowBaseProps {
    checked: boolean;
    onPress: () => void;
}

export type TableCheckboxRow = FC<TableCheckboxRowProps>;

interface ContextMenuItem {
    label: string;
    variant?: LiteralUnion<"destructive", string>;
    iconSource?: number;
    action: () => unknown;
}

interface ContextMenuProps {
    triggerOnLongPress?: boolean;
    items: ContextMenuItem[] | ContextMenuItem[][];
    align?: "left" | "right" | "above" | "below" | "auto" | null;
    title?: string;
    children: React.FC<
        Record<
            | "onPress"
            | "onLongPress"
            | "accessibilityActions"
            | "onAccessibilityAction",
            any
        >
    >;
}

export type ContextMenu = FC<ContextMenuProps>;
