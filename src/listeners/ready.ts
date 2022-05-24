import { Client } from "discord.js";
import { registerRoleCommands } from "../commands/Role";
import { Commands } from "../SlashCommands";

//sets up a ready listener for the client
//When ready, adds slash commands.
export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        registerRoleCommands();

        await client.application.commands.set(Commands);    //setting up all slash commands.
        console.log(`${client.user.username} is online`);
    });
};