import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('queueEnd', (queue) => {
    // @ts-ignore
    queue.metadata.send('✅ | Queue finished!');
});