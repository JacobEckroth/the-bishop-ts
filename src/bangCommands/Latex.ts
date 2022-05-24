import { Client, Message, MessageEmbed} from "discord.js";
import { client } from "../Bot";
import { BangCommand } from "../classes/BangCommand";
import { getLatexUrl } from "../lib/latex";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";


export const Latex: BangCommand = {
    name: "latex",
    aliases:new Map<string,boolean>(
        [
            ["eqn",true],
            ["equation",true]
        ]
    ),
    usage:"!latex y = \\sum_{x=0}^{10} x^2",
    description: "Render a LaTeX math equation into an image",
    type: "CHAT_INPUT",
    run: async(_client: Client, message:Message)=>{

        try{
            const found = message.content.match(/^\s*!([a-zA-Z0-9]*)\s*(.*)$/)  //matching the latex regex
            let sendMessage:any;
            if(!found){
                sendMessage = null;
            }else{
                sendMessage = await getLatexUrl(found[2].replace(/(`|```(tex)?)/, ''));    //gets an image url from an api
            }
          
            if(!sendMessage){   //if request failed, getLatexUrl returns null.
                message.react('❌'); 
                return;
              
            }else{
             
                sendMessage = {files: [sendMessage]}
            }
            await sendMessageToChannelMessageWasSentFrom(client,message,sendMessage);
            message.delete();   //delete this if you don't want the bot to delete the latex creating messages.
     
        }catch(err){
            console.error(`Error in sending reply in getLatex: ${err}`);
        }

    }
}