import { injectFluxInterceptor } from "@lib/api/flux";
import initSettings, { patchSettings } from "./ui/settings";
import { patchJsx } from "@lib/api/react/jsx";
import patchErrorBoundary from "./ui/error-boundary";
import { before } from "@lib/api/patcher";
import { findByProps } from "@metro";

import * as lib from "@lib";
import { patchCommands } from "./commands/patches";
import { initCommands } from "./commands/builtins";
import { initPlugins } from "./plugins";

export default async () => {
    await Promise.all([
        injectFluxInterceptor(),
        patchSettings(),
        initSettings(),
        patchJsx(),
        patchErrorBoundary(),
        initCommands(),
        patchCommands(),
        initPlugins(),
    ]);

    const util = findByProps("inspect");

    // Prevent expensive operation blocking UI - idk why this happens
    before("inspect", util, (args) => {
        // TODO: add support for recognising other large objects
        if (args[0] == window) {
            args[1] ? (args[1].depth = 0) : args.push({ depth: 0 });
        }

        return args;
    });

    window.record = lib;
};
