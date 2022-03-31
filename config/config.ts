// @ts-ignore
import configFile from "./config.json";

export interface Config {
    token: string;
    prefix: string;
}

export const config = configFile as Config;