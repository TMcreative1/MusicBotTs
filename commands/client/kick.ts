import {Command} from "../../structure/Command";
import {ExtendedInteraction} from "../../typings/CommandType";

export default new Command({
    position: 3,
    name: "kick",
    description: "Kick a user",
    options: [
        {
            name: 'user',
            type: 6,
            description: 'The user you want to kick',
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

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return await interaction.editReply({
                content: `I can't kick this user.`
            });
        }
        const userInfo = client.users.cache.get(member as string);

        interaction.guild?.members.kick(member as string)
            .then(() => {
                interaction.editReply({
                    content: `Kicked ${userInfo?.username}`
                })
            })
            .catch(error => {
                interaction.editReply({
                    content: `Sorry, can't kick this user`
                });
                console.log(error);
            })
    }
});