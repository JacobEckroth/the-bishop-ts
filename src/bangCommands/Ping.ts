import { Client, Message, MessageEmbed } from "discord.js";
import { client } from "../Bot";
import { BangCommand } from "../classes/BangCommand";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";
import { getMsSince } from "../lib/timer";
import config from "../config";

export const Ping: BangCommand = {
    name: "ping",
    description: "Pings the bot",
    usage:"!ping",
    type: "CHAT_INPUT",
    aliases:new Map<string,boolean>(),
    run: async(_client: Client, message:Message)=>{
        const content = `:watch: ${getMsSince(message.createdAt)}ms`;
        const embed = new MessageEmbed().setDescription(content);
        embed.title="Pong!";
        embed.color = config.colors.success;    //nice happpy green success color
        try{
            await sendMessageToChannelMessageWasSentFrom(client,message,{embeds:[embed]})
          
            console.log("Pong reply sent");
        }catch(err){
            console.error(`Error in sending reply: ${err}`);
        }

    }
}