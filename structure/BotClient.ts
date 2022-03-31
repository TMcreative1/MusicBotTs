import {ApplicationCommandDataResolvable, Client, ClientEvents, Collection, Intents} from "discord.js";
import {CommandType} from "../typings/CommandType";
import {glob} from "glob";
import {promisify} from "util";
import {Config} from "../config/config";
import {Buttons} from "../config/buttons"
import {Event} from "./Event";
import {ButtonHandlerType, ButtonType} from "../typings/ButtonType";

const globPromise = promisify(glob);

export class BotClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    registerCommands: ApplicationCommandDataResolvable[] = [];
    buttonsContent: Collection<string, ButtonType> = new Collection();
    buttonHandlers: Collection<string, ButtonHandlerType> = new Collection();
    config: Config;

    constructor(config: Config, buttons?: Buttons) {
        super({intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS]});
        this.config = config;
        if (buttons) {
            this.loadButtonsContent(buttons);
        }
    }

    start() {
        this.registerModules().then(() => console.log('Modules registered'));
        this.login(this.config.token).then(() => console.log('Bot logged'));
        if (this.buttonsContent.size !== 0) {
            this.loadButtonHandlers().then(() => console.log('Button handlers loaded'));
        }
    }

    private async registerModules() {
        await this.loadCommands().then(() => console.log('Commands loaded!'));
        await this.loadEvents().then(() => console.log('Client events loaded!'));
    }

    private async loadCommands() {
        const commandFiles = await globPromise(`${__dirname}/../commands/*/*.js`);
        for (const filePath of commandFiles) {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) continue;
            console.log(command);

            this.commands.set(command.name, command);
            this.registerCommands.push(command);
        }
    }

    private async loadEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/client/*.js`);
        for (const eventPath of eventFiles) {
            const event: Event<keyof ClientEvents> = await this.importFile(eventPath);
            this.on(event.event, event.run);
            console.log(`loaded client event ${event.event}`);
        }
    }

    private loadButtonsContent(buttons: Buttons) {
        buttons.buttons.forEach((buttonsInfo) => {
            this.buttonsContent.set(buttonsInfo.group, buttonsInfo);
        });
    }

    private async loadButtonHandlers() {
        const handlerFiles = await globPromise(`${__dirname}/../buttons/handler/*.js`);
        for (const handlerPath of handlerFiles) {
            const handler: ButtonHandlerType = await this.importFile(handlerPath);
            if (!handler.group) continue;
            console.log(handler);

            this.buttonHandlers.set(handler.group, handler);
        }
    }

    private async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
}