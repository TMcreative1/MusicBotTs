import {MessageButton, MessageButtonOptions} from "discord.js";
import {APIButtonComponent} from "discord-api-types";

export class ExtendedMessageButton extends MessageButton {
    constructor(data?: MessageButton | MessageButtonOptions | APIButtonComponent) {
        super(data);
    }
}