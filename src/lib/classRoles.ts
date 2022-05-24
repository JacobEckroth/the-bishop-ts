import { Client, Message, MessageEmbed } from "discord.js";
import { getConfig } from "../config";
import { getRoles } from "../roles";

//if Adding is true, we are adding classes, if it is false, we are removing them.

//adds a role to the user who sent a given message
//newRole is an id or object with id field.
//message is a message.
export async function addRole(message: Message, newRole:any) {
    if(typeof(newRole) == "object"){
        newRole = newRole.id;   //don't ask just let it happen.
    }
   
    if(message.member){
        if(message.member.roles.cache.some(role => role.id === newRole)){   //if they alreayd have the role
            //do nothing if it already exists
        }else{
            try{
                await message.member.roles.add(newRole);

            }catch(err){
                await message.reactions.removeAll();
                message.react('❌');  //x only gets reacted if things go very wrong
                console.error(err);
            }
        }
    }

}

//removes a role from the user who sent a given message. removeRole is either id or object with id field.
export async function removeRole(message: Message, removeRole: any) {
    if(typeof(removeRole) == "object"){
        removeRole = removeRole.id;   //don't ask just let it happen.
    }
    if(message.member){
        if(message.member.roles.cache.some(role => role.id === removeRole)){   //if they alreayd have the role
            try{
                await message.member.roles.remove(removeRole);

            }catch(err){
                await message.reactions.removeAll();
                message.react('❌');    //x only gets reacted if things go very wrong
                console.error(err);
            }
        }
    }
}



export function attemptEditClassRoles(client: Client, message: Message, roles: string[], adding: boolean) {
    const serverRoles = getRoles();
    const generalRoles = new Map(Object.entries(serverRoles.general));  //get the keys from the roles.yml file
    const classRoles = new Map(Object.entries(serverRoles.classes));

    let failureList: string[] = [];
    for (const role of roles) {
        //first we check if it's one of the general roles
     
        if (generalRoles.has(role)) {
            if (adding) {
                addRole(message, generalRoles.get(role))
            } else {
                removeRole(message, generalRoles.get(role));
            }
            //then we add it to the list
        } else if (classRoles.has(role)) {
            if (adding) {
                addRole(message, classRoles.get(role));
            } else {
                removeRole(message, classRoles.get(role));
            }
        } else {
            failureList.push(role);
        }
    }
    //If the failure list is 0, then we can give a nice checkmark!
    //Future bug fix: addRole and removeRole are async and if they fail they remove all reactions
    //This is kinda fucky wucky and should happen. Perhaps await adding role and removing it?
    if(failureList.length == 0){
        message.react('✅');
    }else{
        message.react('❓');
        const embed = new MessageEmbed().setFields(
            [
                {
                    name: 'Role(s) Not Recognized:',
                    value: `\`\`\`${failureList.join(' ')}    \`\`\``
                },
                {
                    name: 'Missing a class?',
                    value: `If we are missing a class, let us know and we will add a channel!`
                },
                {
                    name:'Try using slash commands!',
                    value:'`/role add`\n`/role remove`'
                }
              
            ]
        );
        embed.color = getConfig().colors.error;
        message.reply({embeds:[embed]});

    }

}

