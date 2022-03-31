import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('connectionCreate', (queue) => {
    // @ts-ignore
    queue.metadata.send('Connected to voice channel');
});