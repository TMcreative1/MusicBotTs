import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 11,
    name: 'remove',
    description: 'Remove a song from the queue!',
    options: [
        {
            name: 'number',
            type: 4,
            description: 'The queue number you want to remove',
            required: true
        }
    ],
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: '❌ | No music is being played!'
            });
        }

        const number = interaction.options.get('number')?.value as number - 1;
        if (number > queue.tracks.length) {
            return await interaction.editReply({
                content: '❌ | Track number greater than queue depth!'
            });
        }

        const removedTrack = queue.remove(number);
        return await interaction.editReply({
            content: removedTrack ? `✅ | Removed **${removedTrack}**!` : '❌ | Something went wrong!'
        });
    }
})