import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 10,
    name: 'playfirst',
    description: 'Play a song before the next in your channel!',
    options: [
        {
            name: 'query',
            type: 3,
            description: 'The song you want to play',
            required: true
        }
    ],
    run: async ({interaction, player}) => {
        try {
            interaction = interaction as ExtendedInteraction;
            await commandUtils.checkVoiceChannel(interaction);

            const query = interaction.options.get('query')?.value;
            const result = await commandUtils.playMusic(query as string, player, interaction);

            if (result) {
                // @ts-ignore
                !result.isSingleTrack ? result.queue.insert(result.searchResult.tracks, 0) : result.queue.insert(result.searchResult.tracks[0], 0);
                // @ts-ignore
                if (!result.queue.playing) {
                    // @ts-ignore
                    await result.queue.play();
                }
            }
        } catch (err) {
            console.log(err);
            return await interaction.editReply({
                content: `There was an error trying to execute that command: ${err}`
            })
        }
    }
});