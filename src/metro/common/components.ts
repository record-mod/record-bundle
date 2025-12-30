/* eslint-disable prefer-destructuring */
import { lazyDestructure, proxyLazy } from "@lib/utils/lazy";
import { createFilterDefinition } from "@metro/factories";
import { findExports } from "@metro/finders";
import {
    findByDisplayNameLazy,
    findByNameLazy,
    findByProps,
    findByPropsLazy,
} from "@metro/wrappers";

import * as t from "./types/components";

const bySingularProp = createFilterDefinition<[string]>(
    ([prop], m) => m[prop] && Object.keys(m).length === 1,
    (prop) => `record.metro.common.components.bySingularProp(${prop})`
);

const getRenderable = (obj: any, prop: string) =>
    obj?.[prop]?.render ?? obj?.[prop];

const findSingular = (prop: string) =>
    proxyLazy(() => getRenderable(findExports(bySingularProp(prop)), prop));

const findProp = (prop: string) =>
    proxyLazy(() => getRenderable(findByProps(prop), prop));

// Discord
export const LegacyAlert = findByDisplayNameLazy("FluxContainer(Alert)");
export const CompatButton = findByPropsLazy("Looks", "Colors", "Sizes");
export const HelpMessage = findByNameLazy("HelpMessage");

// React Native's included SafeAreaView only adds padding on iOS.
export const { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } =
    findByProps("useSafeAreaInsets");

// ActionSheet
export const ActionSheetRow = findProp("ActionSheetRow");

// Buttons
export const Button = findProp("Button") as t.Button;
export const TwinButtons = findByProps("TwinButtons").TwinButtons;
export const IconButton = findSingular("IconButton") as t.IconButton;
export const RowButton = findProp("RowButton") as t.RowButton;

export const PressableScale = findProp("PressableScale");

// Tables
export const TableRow = findProp("TableRow");
export const TableRowIcon = findProp("TableRowIcon");
export const TableRowTrailingText = findProp("TableRowTrailingText");
export const TableRowGroup = findProp("TableRowGroup");
export const TableSwitchRow = findProp("TableSwitchRow");
export const TableSwitch = findSingular("FormSwitch");
export const TableRadioGroup = findProp("TableRadioGroup") as t.TableRadioGroup;
export const TableRadioRow = findProp("TableRadioRow") as t.TableRadioRow;
export const TableCheckbox = findSingular("FormCheckbox");

export const FormSwitch = findSingular("FormSwitch");
export const FormRadio = findSingular("FormRadio");
export const FormCheckbox = findSingular("FormCheckbox");

// Card
export const Card = findProp("Card");
export const RedesignCompat = proxyLazy(
    () => findByProps("RedesignCompat").RedesignCompat
);

// Misc.
export const Stack = findProp("Stack") as t.Stack;
export const ContextMenu = findProp("ContextMenu");
export const AlertModal = findProp("AlertModal");

// Inputs
export const TextInput = findSingular("TextInput") as t.TextInput;

// SegmentedControl
export const SegmentedControl = findProp(
    "SegmentedControl"
) as t.SegmentedControl;
export const SegmentedControlPages = findProp(
    "SegmentedControlPages"
) as t.SegmentedControlPages;
export const useSegmentedControlState = findSingular(
    "useSegmentedControlState"
) as (arg: t.SegmentedControlStateArgs) => t.SegmentedControlState;
export const CompatSegmentedControl = findProp(
    "CompatSegmentedControl"
) as t.CompatSegmentedControl;

export const FloatingActionButton = findProp(
    "FloatingActionButton"
) as t.FloatingActionButton;
export const ActionSheet = findByProps("ActionSheet").ActionSheet;
export const BottomSheetTitleHeader = findProp("BottomSheetTitleHeader");

const textsModule = findByPropsLazy("Text", "LegacyText");
export const Text = proxyLazy(() =>
    getRenderable(textsModule, "Text")
) as t.Text;

export const AvatarPile = findSingular("AvatarPile");

export const Avatar = findByProps("AvatarSizes", "getStatusSize").default;

export const Forms = findByPropsLazy("Form", "FormSection");

export const {
    Form: LegacyForm,
    FormArrow: LegacyFormArrow,
    FormCTA: LegacyFormCTA,
    FormCTAButton: LegacyFormCTAButton,
    FormCardSection: LegacyFormCardSection,
    FormCheckbox: LegacyFormCheckbox,
    FormCheckboxRow: LegacyFormCheckboxRow,
    FormCheckmark: LegacyFormCheckmark,
    FormDivider: LegacyFormDivider,
    FormHint: LegacyFormHint,
    FormIcon: LegacyFormIcon,
    FormInput: LegacyFormInput,
    FormLabel: LegacyFormLabel,
    FormRadio: LegacyFormRadio,
    FormRadioGroup: LegacyFormRadioGroup,
    FormRadioRow: LegacyFormRadioRow,
    FormRow: LegacyFormRow,
    FormSection: LegacyFormSection,
    FormSelect: LegacyFormSelect,
    FormSliderRow: LegacyFormSliderRow,
    FormSubLabel: LegacyFormSubLabel,
    FormSwitch: LegacyFormSwitch,
    FormSwitchRow: LegacyFormSwitchRow,
    FormTernaryCheckBox: LegacyFormTernaryCheckBox,
    FormText: LegacyFormText,
    FormTitle: LegacyFormTitle,
} = lazyDestructure(() => Forms);

export const FlashList = findProp("FlashList");
