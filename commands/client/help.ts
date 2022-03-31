import {Command} from "../../structure/Command";

export default new Command({
    position: 15,
    name: "help",
    description: "Show advanced usage of a command",
    run: async ({interaction, client}) => {
        let descriptions: string[] = [];
        client.commands.forEach((value) => {
            descriptions[value.position] = `${value.name} - ${value.description}`;
        })

        await interaction.editReply(descriptions.filter(desc => desc).join('\n'));
    }
});