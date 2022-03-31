import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 5,
    name: 'stop',
    description: 'Stop all songs in the queue!',
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: '❌ | No music is being played!'
            });
        }
        queue.destroy();
        return await interaction.editReply({
            content: '🛑 | Stopped the player!'
        });
    }
})