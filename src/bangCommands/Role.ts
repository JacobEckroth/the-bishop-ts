//Role add/remove/list stuff
import { Client, Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import config from "../config";



export const Role: BangCommand = {
    name: "role",
    description: "Allows you to add or remove a class.",
    type: "CHAT_INPUT",
    usage: "Adds or removes a role",
    
    aliases: new Map<string, boolean>(),
    run: async (client: Client, message: Message) => {
        //if a user runs this command, they should get the role of disciple if they don't have it.
        if (message.member) {
            if (message.member.roles.cache.some(role => Number(role.id) === config.roles.disciple)) {
                console.log("Disciple role found");
            } else {
                console.log("Disciple role not found we should add it on.");
            }
        }

    }
}