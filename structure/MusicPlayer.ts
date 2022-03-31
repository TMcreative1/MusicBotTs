import {Player, PlayerEvents} from "discord-player";
import {BotClient} from "./BotClient";
import {promisify} from "util";
import {glob} from "glob";
import {MusicEvent} from "./MusicEvent";

const globPromise = promisify(glob);

export class MusicPlayer extends Player {
    constructor(client: BotClient) {
        super(client);
    }

    start() {
        this.loadEvents().then(() => {
            console.log('Player events loaded!')
        });
    }

    private async loadEvents() {
        const eventFiles = await globPromise(`${__dirname}/../events/player/*.js`);
        for (const eventPath of eventFiles) {
            const event: MusicEvent<keyof PlayerEvents> = await this.importFile(eventPath);
            this.on(event.event, event.run);
            console.log(`loaded music event: ${event.event}`);
        }
    }

    private async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
}