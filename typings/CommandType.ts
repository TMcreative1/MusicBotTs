import {
    ButtonInteraction,
    ChatInputApplicationCommandData,
    CommandInteraction,
    CommandInteractionOptionResolver,
    GuildMember
} from "discord.js";
import {BotClient} from "../structure/BotClient";
import {Player} from "discord-player";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: BotClient,
    interaction: ExtendedInteraction | ButtonInteraction,
    args?: CommandInteractionOptionResolver,
    player: Player
}

export type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    position: number,
    run: RunFunction;
} & ChatInputApplicationCommandData;