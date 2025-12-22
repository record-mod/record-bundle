import { after } from "@lib/api/patcher";
import { commands } from "@metro/common";
import { ApplicationCommand, ApplicationCommandType } from "./types";
import { CustomCommands } from ".";

export function patchCommands() {
    after(
        "getBuiltInCommands",
        commands,
        ([type], res: ApplicationCommand[]) => {
            if (
                type === ApplicationCommandType.CHAT ||
                (Array.isArray(type) &&
                    type.includes(ApplicationCommandType.CHAT))
            ) {
                for (const command of CustomCommands) {
                    if (!res.find((c) => c.id === command.id)) {
                        res.push(command);
                    }
                }
            }

            return res;
        }
    );
}
