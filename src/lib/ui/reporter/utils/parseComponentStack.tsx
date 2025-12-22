export function parseComponentStack(
    componentStack: string
): ComponentErrorLine[] {
    return componentStack
        .split(/\n\s*at\s+/)
        .filter(Boolean)
        .map((entry) => {
            const match = entry.match(/^(.+?)\s*\((.+?)\)$/);

            if (!match) {
                return {
                    componentName: entry.trim(),
                    location: null,
                };
            }

            return {
                componentName: match[1].trim(),
                location: match[2].trim(),
            };
        });
}

export type ComponentErrorLine = {
    componentName: string;
    location: string | null;
};
