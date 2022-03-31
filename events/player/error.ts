import {MusicEvent} from "../../structure/MusicEvent";

export default new MusicEvent("error", (queue, error) => {
    console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});