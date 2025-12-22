import { constants } from "@metro/common";
import { findByProps, findByStoreNameLazy } from "@metro/wrappers";

const color = findByProps("SemanticColor");

export const semanticColors = (color?.default?.colors ??
    constants?.ThemeColorMap) as Record<string, any>;

export const rawColors = (color?.default?.unsafe_rawColors ??
    constants?.Colors) as Record<string, string>;

const ThemeStore = findByStoreNameLazy("ThemeStore");
const colorResolver = (color.default.meta ??= color.default.internal);

export function isSemanticColor(sym: any): boolean {
    return colorResolver.isSemanticColor(sym);
}

export function resolveSemanticColor(
    sym: any,
    theme = ThemeStore.theme
): string {
    return colorResolver.resolveSemanticColor(theme, sym);
}
