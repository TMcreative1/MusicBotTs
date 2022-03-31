import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('botDisconnect', (queue) => {
    // @ts-ignore
    queue.metadata.send('❌ | I was manually disconnected from the voice channel, clearing queue!');
});