export type ApplicationCommand = {
    name: string;
    displayName?: string;
    untranslatedName?: string;

    description: string;
    displayDescription?: string;
    untranslatedDescription?: string;

    inputType?: ApplicationCommandInputType;
    type?: ApplicationCommandType;
    applicationId?: string;
    __UNBOUND__?: boolean;
    __CALLER__?: string;
    id?: string;

    options?: ApplicationCommandOption[];
    execute: (
        args: any[],
        ctx: CommandContext
    ) => CommandResult | void | Promise<CommandResult> | Promise<void>;
};

export type ApplicationCommandOption = {
    name: string;
    description: string;
    required?: boolean;
    type: ApplicationCommandOptionType;
    displayName: string;
    displayDescription: string;
};

type CommandContext = {
    channel: any;
    guild: any;
};

type CommandResult = {
    content: string;
    tts?: boolean;
};

export enum ApplicationCommandType {
    CHAT = 1,
    USER,
    MESSAGE,
}

export enum ApplicationCommandInputType {
    BUILT_IN,
    BUILT_IN_TEXT,
    BUILT_IN_INTEGRATION,
    BOT,
    PLACEHOLDER,
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP,
    STRING = 3,
    INTEGER,
    BOOLEAN,
    USER,
    CHANNEL,
    ROLE,
    MENTIONABLE,
    NUMBER,
    ATTACHMENT,
}
