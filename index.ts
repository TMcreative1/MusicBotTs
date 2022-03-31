import {BotClient} from "./structure/BotClient";
import {config} from "./config/config";
import {buttons} from "./config/buttons";
import {MusicPlayer} from "./structure/MusicPlayer";

export const client = new BotClient(config, buttons);

client.start();

export const player = new MusicPlayer(client);

player.start();