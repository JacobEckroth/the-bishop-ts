
import { Client, Message } from "discord.js";
import { BangCommands } from "../BangCommands";
import { getConfig } from "../config";
import { messageIsInClassChannel, messageSenderInRightChannel } from "../lib/channel";
import { getLatexUrl } from "../lib/latex";
import { messageSenderHasMatchingPerms } from "../lib/perms";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";


//messageCreate event is emitted when an interaction is created: https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-messageCreate
export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        //check if the first character is a !
        const found = message.content.match(`^\s*${getConfig().prefix}([a-zA-Z0-9]*)`)
        if (found) {

            await handleBangCommand(client, message, found[1]);
        } else {  //check for equations in the form of $$
            // render any latex math equations in message
            // equations need whitespace before and after, and no whitespace adjacent within the $s
            // e.g. "this $ is not valid$"
            //      "$this_is$"
            //      "so is $this one$ too"
            //      "but$ not $this"

            let equations = message.content.match(/(?:^|\s)\$([^ $].*)\$(?:$|\s)/)
            if (equations) {
                const url = await getLatexUrl(equations[equations.length - 1]); //only do the last one, just like the ruby bot does.
                if (url) {
                    let sendMessage = { files: [url] }
                    await sendMessageToChannelMessageWasSentFrom(client, message, sendMessage);
                }

            }


            if (message.member) {
                //We check for Evan messages - All evan messages get reacted to with the 🙏
                //(praise be btw)
                if (message.member.roles.cache.some(role => role.id == getConfig().roles.god)) {
                    message.react('🙏');
                }
                if(message.member.id == "337713063606353923" && !messageIsInClassChannel(message)){
                    try{
                        await message.react(':zachL:797961331101794344');   //awaits because we don't want right eye first.
                        await message.react(':zachR:797961330929303583');
                    }catch(err){
                        console.error(`Error adding zach eyes :( ${err}`);
                    }
                 
                }
             


            }



        }

    })
};

//only for bang commands
const handleBangCommand = async (client: Client, message: Message, command: string): Promise<void> => {
    let bangCommand = BangCommands.find(c => c.name === command);
    if (!bangCommand) {   //if it hasn't been found yet check the aliases. O(n)
        for (const commandIter of BangCommands) { //checking all the alias dictionaries.
            if (commandIter.aliases.has(command)) {  //.has is typescript shit

                bangCommand = commandIter;
                break;
            }
        }
    }


    if (!bangCommand) {

        return;
    } else {
        //check perms
        if (messageSenderHasMatchingPerms(bangCommand, message) && messageSenderInRightChannel(bangCommand, message)) {
            //check channel - Refactor into a differetn fucntion soon.

            bangCommand.run(client, message);
            return;



        } else {
            console.error(`User: ${message.member!.user.username} requested command ${bangCommand.name} which they do not have permissions to use, or they're in the wrong channel.`)
            return; //we want to return if we can't find a role that matches the perms.
            //Note that this only gets called if  the bangCommand has perms and the message is sent by a member.
        }

    }
}
