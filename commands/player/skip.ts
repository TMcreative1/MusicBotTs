import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {GuildResolvable} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 4,
    name: 'skip',
    description: 'Skip a song!',
    run: async ({interaction, player}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);

        const queue = player.getQueue(interaction.guildId as GuildResolvable);
        if (!queue || !queue.playing) {
            return await interaction.editReply({
                content: '❌ | No music is being played!'
            });
        }
        const currentTrack = queue.current;
        const success = queue.skip();
        return await interaction.editReply({
            content: success ? `✅ | Skipped **${currentTrack}**!` : `❌ | Something went wrong!`
        });
    }
})