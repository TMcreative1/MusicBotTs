import {RunFunction} from "./CommandType";
import {MessageButton} from "discord.js";

type BaseButtonType = {
    group: string;
}

export type ButtonHandlerType = {
    run: RunFunction;
} & BaseButtonType;

type ExtendedMessageActionRowComponent = {
    radioUrl?: string;
} & MessageButton;

export type ButtonType = {
    messageComponents: ExtendedMessageActionRowComponent[]
} & BaseButtonType;