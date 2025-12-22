import { debugInfo } from "@lib/api/debug";
import { ApplicationCommand } from "../types";
import { info } from "@lib/api/native/modules/loader";
import { messageUtil } from "@metro/common";
import { NativeClientInfoModule } from "@lib/api/native/modules";

export default {
    name: "debug",
    description: "Provide debug info easily.",

    async execute(_, ctx) {
        const payload = [];
        const Runtime = (HermesInternal as any).getRuntimeProperties();
        const Constants = NativeClientInfoModule.getConstants();

        payload.push("**ReCord Debug Info:**");
        payload.push(
            `> **ReCord Version:** ${debugInfo.record.version}-${debugInfo.record.hash}`
        );
        payload.push(`> **Loader:** ${info.name} (${info.version})`);
        payload.push(`> **Hermes:** ${Runtime["OSS Release Version"]}`);
        payload.push(`> **Bytecode:** ${Runtime["Bytecode Version"]}`);
        payload.push(
            `> **Android:** ${info.android.version} (API ${info.android.api}) - ${info.android.codeName}`
        );
        payload.push(
            `> **Discord:** ${Constants.Version} (${Constants.Build})`
        );

        const content = payload.join("\n");

        messageUtil.sendMessage(ctx.channel.id, { content }, void 0, {});
    },
} satisfies ApplicationCommand;
