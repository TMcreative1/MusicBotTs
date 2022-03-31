import {Command} from "../../structure/Command";
import {commandUtils} from "../../utils/CommandUtils";
import {MessageActionRow} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 14,
    name: 'radio',
    description: 'Radio on!',
    run: async ({interaction, player, client}) => {
        interaction = interaction as ExtendedInteraction;
        await commandUtils.checkVoiceChannel(interaction);
        const buttons = client.buttonsContent.get('radio');

        if (buttons) {
            const row = new MessageActionRow()
                .addComponents(
                    buttons.messageComponents
                );

            return await interaction.editReply({
                content: 'Choose a station',
                components: [row]
            })
        }

        await interaction.editReply({
            content: 'No one registered button'
        })
    }
})