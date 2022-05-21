import { Client, Message, MessageEmbed} from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";

import fs from "fs"
import path from "path"
import YAML from "yaml"
import { getConfig } from "../config";

const praiseFileName = path.resolve(__dirname,"../../../configs/praisecount.yml")
const PRAISE_CHANNEL_ID = `695058230472081579`;
export const Praise: BangCommand = {
    name: "praise",
    aliases:new Map<string,boolean>([
    ]),
    usage:"!praise",
    description: "Praise evan! (Only usable in 🙏-the-chapel)",
    type: "CHAT_INPUT",
    run: async(client: Client, message:Message)=>{
        //UNCOMMENT WHEN DONE TESTING
        // if(message.channelId !== PRAISE_CHANNEL_ID){    
        //     return;
        // }
        try{
            const data= fs.readFileSync(praiseFileName,{encoding:'utf8', flag:'r'});
            const count= YAML.parse(data)   ;
        
            count.count += 1;
            //race condition time
            fs.writeFile(praiseFileName,YAML.stringify(count),async function callback(err){
                if(err){
                    console.error(err);

                }else{
                const content = `*Praises x${count.count}*`
                const embed = new MessageEmbed().setDescription(content);
                embed.title = ":pray: Praise be to Evan! :pray:";
                embed.color = getConfig().colors.success;
                embed.thumbnail = {
                    url: 'https://media.discordapp.net/attachments/758182759683457035/758243415459627038/TempDorime.png'
                  }
                    await sendMessageToChannelMessageWasSentFrom(client,message,{embeds:[embed]});
                }
            })

        }catch(err){
            console.error(`Error in sending reply: ${err}`);
        }

    }
}