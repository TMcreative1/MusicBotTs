import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent('connectionError', (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});