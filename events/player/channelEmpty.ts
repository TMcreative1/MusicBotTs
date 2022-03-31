import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('channelEmpty', (queue) => {
    // @ts-ignore
    queue.metadata.send('❌ | Nobody is in the voice channel, leaving...');
});