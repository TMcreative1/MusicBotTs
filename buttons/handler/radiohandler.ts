import {ButtonHandler} from "../../structure/ButtonHandler";
import {ButtonInteraction, GuildResolvable} from "discord.js";
import {commandUtils} from "../../utils/CommandUtils";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new ButtonHandler({
    group: 'radio',
    run: async ({player, client, interaction}) => {
        const extendInteraction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction as ExtendedInteraction);
        if (interaction instanceof ButtonInteraction) {
            const buttonId = interaction.customId;
            // @ts-ignore
            const radioUrl = client.buttonsContent.get('radio').messageComponents.find(button => button.customId === buttonId).radioUrl;
            const queue = player.getQueue(interaction.guildId as GuildResolvable);
            if (queue && queue.playing) {
                queue.clear();
            }
            const result = await commandUtils.playMusic(radioUrl as string, player, extendInteraction);
            if (result) {
                // @ts-ignore
                !result.isSingleTrack ? result.queue.addTracks(result.searchResult.tracks) : result.queue.addTrack(result.searchResult.tracks[0]);
                // @ts-ignore
                if (!result.queue.playing) {
                    // @ts-ignore
                    await result.queue.play();
                } else {
                    // @ts-ignore
                    result.queue.skip();
                }
            }
        }
    }
});