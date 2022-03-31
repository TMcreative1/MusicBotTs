import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 13,
    name: 'swap',
    description: 'Swap a song position in the queue!',
    options: [
        {
            name: 'track1',
            type: 4,
            description: 'The track number you want to swap',
            required: true
        },
        {
            name: 'track2',
            type: 4,
            description: 'The track number you want to swap',
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

        const queueNumbers = [interaction.options.get('track1')?.value as number - 1, interaction.options.get('track2')?.value as number - 1];
        queueNumbers.sort(function (a, b) {
            return a - b;
        });
        if (queueNumbers[1] > queue.tracks.length) {
            return await interaction.editReply({
                content: '❌ | Track number greater than queue depth!'
            });
        }

        try {
            const track2 = queue.remove(queueNumbers[1]);
            const track1 = queue.remove(queueNumbers[0]);
            queue.insert(track2, queueNumbers[0]);
            queue.insert(track1, queueNumbers[1]);
            return await interaction.editReply({
                content: `✅ | Swapped **${track1}** & **${track2}**!`
            });
        } catch (e) {
            console.error(e);
            return await interaction.editReply({
                content: '❌ | Something went wrong!'
            });
        }
    }
})