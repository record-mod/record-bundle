import { NavigationNative } from "@metro/common";
import ErrorBoundary from "@lib/ui/reporter/components/ErrorBoundary";
import { logger } from "@lib/utils/logger";
import { useEffect } from "react";

export const CustomPage = () => {
    const navigation = NavigationNative.useNavigation();
    const route = NavigationNative.useRoute();

    const { render: PageComponent, ...args } = route.params;
    logger.log(JSON.stringify(route.params));

    useEffect(() => void navigation.setOptions({ ...args }), []);

    return !args.noErrorBoundary ? (
        <ErrorBoundary>
            <PageComponent />
        </ErrorBoundary>
    ) : (
        <PageComponent />
    );
};
