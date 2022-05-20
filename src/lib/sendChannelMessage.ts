import { Client, Message } from "discord.js";

//yes it's a long function name.
export async function sendMessageToChannelMessageWasSentFrom(client:Client, message:Message,newMessage:any){
    let channel:any = client.channels.cache.get(message.channelId);
    if(channel){
        try{
            await channel.send(newMessage);
        }catch(err){
            console.log(`Error sending message: ${err}`);
        }
       
    }
}