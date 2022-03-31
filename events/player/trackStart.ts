import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('trackStart', (queue, track) => {
    // @ts-ignore
    queue.metadata.send(`▶ | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`);
});