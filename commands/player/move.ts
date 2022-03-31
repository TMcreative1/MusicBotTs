import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 12,
    name: 'move',
    description: 'Move a song position in the queue!',
    options: [
        {
            name: 'track',
            type: 4,
            description: 'The track number you want to move',
            required: true
        },
        {
            name: 'position',
            type: 4,
            description: 'The position to move it to',
            required: true
        }
    ],
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: '❌ | No music is being played!'
            });
        }

        const queueNumbers = [interaction.options.get('track')?.value as number - 1, interaction.options.get('position')?.value as number - 1];
        if (queueNumbers[0] > queue.tracks.length || queueNumbers[1] > queue.tracks.length) {
            return await interaction.editReply({
               content: '❌ | Track number greater than queue depth!'
            });
        }

        try {
            const track = queue.remove(queueNumbers[0]);
            queue.insert(track, queueNumbers[1]);
            return await interaction.editReply({
               content: '✅ | Moved **${track}**!'
            });
        } catch (e) {
            console.error(e);
            return await interaction.editReply({
                content: '❌ | Something went wrong!'
            });
        }
    }
})