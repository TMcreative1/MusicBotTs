import {Event} from "../../structure/Event";
import {client} from "../../index";
import {config} from "../../config/config";

export default new Event("messageCreate", async message => {
    if (message.author.bot || !message.guild) return;
    if (!client.application?.owner) await client.application?.fetch();

    if (message.content === `${config.prefix}register` && message.author.id === client.application?.owner?.id) {
        await message.guild.commands.set(client.registerCommands)
            .then(() => {
                message.reply("Register commands!");
            })
            .catch(err => {
                message.reply("Could not register commands!");
                console.log(err);
            })
    }
})