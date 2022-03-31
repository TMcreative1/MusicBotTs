import {Event} from "../../structure/Event";
import {client, player} from "../../index";
import {ExtendedInteraction} from "../../typings/CommandType";
import {ButtonInteraction, CommandInteractionOptionResolver} from "discord.js";
import {Player} from "discord-player";
import {ButtonHandlerType} from "../../typings/ButtonType";

export default new Event("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ephemeral: true});
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            return interaction.reply("You have used a non existing command");
        }

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
            player: player as Player
        })
    }

    if (interaction.isButton()) {
        await interaction.deferReply({ephemeral: true});
        // @ts-ignore
        const handlerGroup = interaction.message.interaction?.commandName;
        if (handlerGroup) {
            const handler = client.buttonHandlers.get(handlerGroup as string) as ButtonHandlerType;
            return handler.run({
                client,
                interaction: interaction as ButtonInteraction,
                player: player as Player
            });
        }
        await interaction.editReply({content: `Handler is not loaded for ${handlerGroup} group`});
    }

})