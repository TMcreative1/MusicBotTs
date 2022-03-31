import {Command} from "../../structure/Command";
import {Collection, Message, Snowflake, TextChannel} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 2,
    name: "purge",
    description: "Delete the last messages in all chats.",
    options: [
        {
            name: 'count',
            type: 4,
            description: 'The number of messages you want to delete. (max 100)',
            required: true
        }
    ],
    run: async ({interaction}) => {
        interaction = interaction as ExtendedInteraction;
        const deleteCount = interaction.options.get('count')?.value;

        if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
            return await interaction.editReply({
                content: 'Please provide a number between 2 and 100 for the number of messages to delete'
            })
        }

        const fetched = await interaction.channel?.messages.fetch({
            limit: deleteCount as number,
        }) as Collection<Snowflake, Message>;

        const channel = interaction.channel as TextChannel;
        channel.bulkDelete(fetched)
            .then(messages => {
                interaction.editReply({
                    content: `Successfully deleted ${messages.size} messages`
                })
            })
            .catch(error => {
                interaction.editReply({
                    content: `Couldn't delete messages`
                });
                console.error(error);
            })

    }
});