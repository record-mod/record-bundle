import { commands, messageUtil } from "@metro/common";
import {
    ApplicationCommand,
    ApplicationCommandInputType,
    ApplicationCommandType,
} from "./types";
import { instead } from "@lib/api/patcher";
import { logger } from "@lib/utils/logger";

export let CustomCommands: ApplicationCommand[] = [];

export function registerCommand(command: ApplicationCommand) {
    let builtin: ApplicationCommand[];

    try {
        builtin = commands.getBuiltInCommands(
            ApplicationCommandType.CHAT,
            true,
            false
        );
    } catch {
        builtin = commands.getBuiltInCommands(
            Object.values(ApplicationCommandType),
            true,
            false
        );
    }

    builtin.sort((a, b) => parseInt(b.id!) - parseInt(a.id!));

    const last = builtin[builtin.length - 1];

    command.id = (parseInt(last.id!, 10) - 1).toString();

    // Get the command ready for pushing.
    command.applicationId ??= "-1";
    command.type ??= ApplicationCommandType.CHAT;
    command.inputType = ApplicationCommandInputType.BUILT_IN;
    command.displayName ??= command.name;
    command.untranslatedName ??= command.name;
    command.displayDescription ??= command.description;
    command.untranslatedDescription ??= command.description;

    instead("execute", command, (args, orig) => {
        Promise.resolve(orig.apply(command, args))
            .then((ret) => {
                if (ret && typeof ret == "object") {
                    messageUtil.sendMessage(args[1].channel.id, ret);
                }
            })
            .catch((err) => {
                logger.error(`Failed to execute command: ${err}`);
            });
    });

    CustomCommands.push(command);

    return () =>
        (CustomCommands = CustomCommands.filter(({ id }) => id !== command.id));
}
