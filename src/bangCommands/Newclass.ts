import { Client, Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import config from "../config";



export const Newclass: BangCommand = {
    name: "newclass",
    description: "Shows a list of all commands available or displays help for a specific command.",
    type: "CHAT_INPUT",
    usage: "Create a new class role and channel. [admin only]",
    perms: new Map<number, boolean>([   //this command is only accessible to admins or botadmins.
        [
            config.roles.admin, true
        ],
        [
            config.roles.botadmin, true
        ]
    ])
    ,
    aliases: new Map<string, boolean>(),
    run: async (client: Client, message: Message) => {
        const regexString = `^\s*${config.prefix}${Newclass.name}\\s+([a-zA-Z0-9]+)\\s*$`
       
        const found = message.content.match(regexString)
 
        if(!found){
           
            message.react('❓');
            return;
        }
        let className = found[1];
        console.log(className);
        //if a user runs this command, they should get the role of disciple if they don't have it.
        console.log("About to create a new class");

    }
}