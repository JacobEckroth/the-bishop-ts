import { Client, ClientUser, Message, MessageEmbed } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import { getConfig } from "../config";
import { generateChannelName } from "../lib/channelNameGenerator";

import { attemptGetClassName } from "../lib/classesApi";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";
import { getRoles, setRoles } from "../roles";



export const Newclass: BangCommand = {
    name: "newclass",
    description: "Shows a list of all commands available or displays help for a specific command.",
    type: "CHAT_INPUT",
    usage: "Create a new class role and channel. [admin only]",
    perms: new Map<string, boolean>([   //this command is only accessible to admins or botadmins.
        [
            getConfig().roles.admin, true
        ],
        [
            getConfig().roles.botadmin, true
        ]
    ])
    ,
    aliases: new Map<string, boolean>(),
    run: async (client: Client, message: Message) => {
        const config = getConfig();
        const roles = getRoles();
        const regexString = `^\s*${config.prefix}${Newclass.name}\\s+([a-zA-Z0-9]+)\\s*$`

        const found = message.content.match(regexString)

        if (!found) {

            message.react('❓');
            return;
        }
        let className = found[1].toLowerCase();

        if (className in roles.classes) { //if we already have the class no need to add a new one.
            message.react('❗');
            const response = 'That role already exists!'
            sendMessageToChannelMessageWasSentFrom(client, message, response)
            return;
        }
        let classTitle = await attemptGetClassName(className);
        className = className || className.toUpperCase(); //Default name to class Slug.
        if (message.channel.type === "DM") {  //if message is a DM it isn't in a guild, so we can't really do anything with creating new roles.
            return;
        }
        const guild = message.channel.guild;

        const newRole = await guild.roles.create({
            name: className,
            mentionable: true,

        })

        //once the role is created on the server, we add it to our config.
        roles['classes'][className] = {
            id: newRole.id,
            title: classTitle
        }
        await setRoles(roles);

        //then we make the new channel.
        const channelName = generateChannelName(className, classTitle) || "No Name Generated";
        let numberMatch = className.match(/(\d+)/);
        let numberFromName: number;
        if (numberMatch) {
            numberFromName = Math.floor(Number(numberMatch[0]) / 100) * 100 // by the way divide by 100 then * by one hunderd to remove last 2 digits of class code.
        } else {
            numberFromName = 0;
        }

        let categoryParentChannel:any = client.channels.cache.get(config.class_categories[numberFromName]);
        categoryParentChannel = categoryParentChannel || undefined;
        if(categoryParentChannel){
            categoryParentChannel = categoryParentChannel.type === "GUILD_CATEGORY" ? categoryParentChannel : undefined;
        }
       
        try{
            let newChannel = await guild.channels.create(channelName, {
                parent: categoryParentChannel,
                permissionOverwrites: [
                    {  //class specific role ID
                        id: newRole.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                    },
                     {
                         id: String(roles.general.allclasses.id), //all classes
                         allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                     },
                    {   //everyone else can't see it.
                        id: guild.roles.everyone,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
                ]
            })
    
            const embed = new MessageEmbed().setDescription(`Channel <#${newChannel.id}> and role <@&${newRole.id}> created.`);
            embed.color = config.colors.success;
    
            await sendMessageToChannelMessageWasSentFrom(client, message, { embeds: [embed] });
            message.react('✅');
    
        }catch(err){
            console.error(err);
            message.react('❌');
        }


    }
}