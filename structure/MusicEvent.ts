import {PlayerEvents} from "discord-player";


export class MusicEvent<Key extends keyof PlayerEvents> {
    constructor(
        public event: Key,
        public run: PlayerEvents[Key]
    ) {
    }
}