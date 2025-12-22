import { lazyDestructure, proxyLazy } from "@lib/utils/lazy";
import { findByProps, findByPropsLazy } from "@metro/wrappers";
import { isSemanticColor, resolveSemanticColor } from "@ui/color";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { LiteralUnion } from "type-fest";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
type TextStyles = LiteralUnion<
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
    | "display-lg",
    string
>;

const Styles = findByPropsLazy("createStyles");

export const { ThemeContext } = lazyDestructure(
    () => findByProps("ThemeContext"),
    { hint: "object" }
);
export const { TextStyleSheet } = lazyDestructure(() =>
    findByProps("TextStyleSheet")
) as unknown as {
    TextStyleSheet: Record<TextStyles, TextStyle>;
};

/**
 * Get themed styles based on the current theme
 * @returns A hook that returns the themed stylesheet
 * @example
 * const useStyles = createStyles({
 *      container: {
 *          flex: 1,
 *          backgroundColor: tokens.colors.BACKGROUND_PRIMARY,
 *      },
 * });
 *
 * function MyComponent() {
 *      const styles = useStyles();
 *      return <View style={styles.container} />;
 * }
 */
export function createStyles<T extends NamedStyles<T>>(
    sheet: T | ((props: any) => T)
): () => T {
    return proxyLazy(() => Styles.createStyles(sheet));
}

/**
 * Get themed styles based on the current theme for class components
 * @example
 * const getStyles = createStyles({
 *      container: {
 *          flex: 1,
 *          backgroundColor: tokens.colors.BACKGROUND_PRIMARY,
 *      },
 * });
 *
 * class MyComponent extends React.Component {
 *      static contextType = ThemeContext;
 *      render() {
 *          const styles = getStyles(this.context);
 *          return <View style={styles.container} />;
 *      }
 * }
 */
export function createLegacyClassComponentStyles<T extends NamedStyles<T>>(
    sheet: T | ((props: any) => T)
): (ctxt: typeof ThemeContext) => T {
    return proxyLazy(() => Styles.createLegacyClassComponentStyles(sheet));
}

/**
 * Reimplementation of Discord's createThemedStyleSheet, which was removed since 204201
 * Not exactly a 1:1 reimplementation, but sufficient to keep compatibility with existing plugins
 * @deprecated Use createStyles or createLegacyClassComponentStyles instead
 */
export function createThemedStyleSheet<T extends StyleSheet.NamedStyles<T>>(
    sheet: T
) {
    for (const key in sheet) {
        // @ts-ignore
        sheet[key] = new Proxy(StyleSheet.flatten(sheet[key]), {
            get(target, prop, receiver) {
                const res = Reflect.get(target, prop, receiver);
                return isSemanticColor(res) ? resolveSemanticColor(res) : res;
            },
        });
    }

    return sheet;
}
