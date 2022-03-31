import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('trackAdd', (queue, track) => {
    // @ts-ignore
    queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
});