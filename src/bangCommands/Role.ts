//Role add/remove/list stuff
import { Client, Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import { getConfig } from "../config";
import { listRoles } from "../lib/rolesEmbed";



export const Role: BangCommand = {
    name: "role",
    description: "Allows you to add or remove a class.",
    type: "CHAT_INPUT",
    usage: "Adds or removes a role",
    channels: new Map<string,boolean>([[
        getConfig().bot_commands_channel_id,true
    ]]),    //allow only to be sent in bot commands channel.
    aliases: new Map<string, boolean>([
        [
            "roles",true
        ]
    ]),
    run: async (client: Client, message: Message) => {
        //if a user runs this command, they should get the role of disciple if they don't have it.
        const config = getConfig();
        if (message.member) {
            if (message.member.roles.cache.some(role => role.id == config.roles.disciple)) {
            } else {
                //User does not have the disciple role, we should add it on.
                message.member.roles.add(config.roles.disciple);

            }
        }
        const messageContent = message.content.toLowerCase();
        const action = messageContent.match('(add|remove)')    //checking for add or remove
        console.log(action);
        if(action){
            const actionChoice = action[0]; //either "add" or "remove";
        }else{  //otherwise it's not add or remove
            listRoles(client,message);
        }

        //This is where the fun begins


    }
}