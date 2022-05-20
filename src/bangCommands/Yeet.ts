import { Client, Message} from "discord.js";
import { client } from "../Bot";
import { BangCommand } from "../classes/BangCommand";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";

const possibleYeets = [
    'evan says "yote"',
    'https://tenor.com/view/yeet-rafiki-simba-lion-king-gif-12559094',
    'https://tenor.com/view/big-yeet-spinning-gif-11694855',
    'https://tenor.com/view/dab-dancing-idgaf-gif-5661979',
    'https://giphy.com/gifs/memecandy-J1ABRhlfvQNwIOiAas',
    'https://tenor.com/view/bettywhite-dab-gif-5044603'
]
export const Yeet: BangCommand = {
    name: "yeet",
    aliases:new Map<string,boolean>([
        ["yote",true]
    ]),
    description: "yote",
    usage:"!yeet",
    type: "CHAT_INPUT",
    run: async(_client: Client, message:Message)=>{
    

        
        try{
            const messageChoice = possibleYeets[Math.floor(Math.random()*possibleYeets.length)]  //randomly selects yeet
            await sendMessageToChannelMessageWasSentFrom(client,message,messageChoice);
          
            console.log("Yeet Reply Sent");
        }catch(err){
            console.error(`Error in sending reply: ${err}`);
        }

    }
}