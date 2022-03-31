import {Command} from "../../structure/Command";
import {User} from "discord.js";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 1,
    name: "userinfo",
    description: "Get information about a user",
    options: [
        {
            name: 'user',
            type: 6,
            description: 'The user that you want to get info',
            required: true
        }
    ],
    run: async ({interaction, client}) => {
        interaction = interaction as ExtendedInteraction;
        const member = interaction.options.get('user')?.value;

        if (!member) {
            return await interaction.editReply({
                content: 'You need to mention the member you want to ban him'
            });
        }

        const user = client.users.cache.get(member as string) as User;

        await interaction.editReply({
            content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`
        })
    }
});