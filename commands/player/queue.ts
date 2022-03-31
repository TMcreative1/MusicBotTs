import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 9,
    name: 'queue',
    description: 'View the queue of current songs!',
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (queue !== undefined) {
            const trimString = (str: string, max: number) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            return await interaction.editReply({
                embeds: [
                    {
                        title: 'Now playing',
                        description: trimString(`The Current song playing is 🎶 | **${queue.current.title}**! \n 🎶 | **${queue}**! `, 4095)
                    }
                ]
            })
        } else {
            return await interaction.editReply({
                content: 'There is no song in the queue!'
            })
        }
    }
})