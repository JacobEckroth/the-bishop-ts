//Role add/remove/list stuff
import { Client, Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import { getConfig } from "../config";
import { addRole, attemptEditClassRoles } from "../lib/classRoles";
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
        addRole(message,config.roles.disciple); //add disciple role if they don't have it already
     
        const messageContent = message.content.toLowerCase();
        const splitMessage = messageContent.split(' '); //First element is command, second is add
        const action = splitMessage[1].match('(add|remove)')    //checking for add or remove

        if(action){
            const actionChoice = action[0]; //either "add" or "remove";
            //removing the first  2 elements of the split message (!role and remove / add)
            splitMessage.shift();   
            splitMessage.shift();

            const classes = splitMessage;  //this is a list of classes that looks like [cs444,cs333,cs321]. It could be empty.
            if(actionChoice === "add"){
                attemptEditClassRoles(client,message,classes,true);
            }else if(actionChoice === "remove"){
                attemptEditClassRoles(client,message,classes,false);
            }
        }else{  //otherwise it's not add or remove. Even if it's list, we list the things anyways.
            listRoles(client,message);
        }

   


        

        //This is where the fun begins


    }
}