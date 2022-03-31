import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 8,
    name: 'nowplaying',
    description: 'Get the song that is currently playing.',
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: '❌ | No music is being played!'
            });
        }

        const progress = queue.createProgressBar();
        const playerTmp = queue.getPlayerTimestamp();

        return await interaction.editReply({
            embeds: [
                {
                    title: 'Now playing',
                    description: `🎶 | **${queue.current.title}**! (\`${playerTmp.progress}%\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress
                        }
                    ],
                    color: 0xffffff
                }
            ]
        })
    }
})