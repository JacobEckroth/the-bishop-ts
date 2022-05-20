import { Client, Message} from "discord.js";
import { client } from "../Bot";
import { BangCommand } from "../classes/BangCommand";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";


export const Lug: BangCommand = {
    name: "lug",
    usage:"`!lug`",
    aliases:new Map<string,boolean>([
        ["plug",true]
    ]),
    description: "Drops a LUG PLUG",
    type: "CHAT_INPUT",
    run: async(_client: Client, message:Message)=>{
    

        
        try{
            const sendMessage = "https://discord.gg/3Jfq6aXy5B :electric_plug:"
            await sendMessageToChannelMessageWasSentFrom(client,message,sendMessage);
          
            console.log("Yeet Reply Sent");
        }catch(err){
            console.error(`Error in sending reply: ${err}`);
        }

    }
}