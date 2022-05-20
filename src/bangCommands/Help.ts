import { Client, Message } from "discord.js";
import { BangCommands } from "../BangCommands";
import { BangCommand } from "../classes/BangCommand";
import { getCommaSeparatedAliases } from "../lib/aliases";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";

export const Help: BangCommand = {
    name: "help",
    description: "Shows a list of all the commands available or displays help for a specific command.",
    type: "CHAT_INPUT",
    usage:"How did you get here... (alternatively, help [command name])",
    aliases:new Map<string,boolean>([
        ["what",true]
    ]),
    run: async(client: Client, message:Message)=>{
       //first we check if there's more than just help
        const found = message.content.match(/^\s*!help ([a-zA-Z0-9]*)\s*$/);    //matching to see if there's a second word.
        if(!found || found.length !==2){    //if this case, then they're just asking for the list of functions that can be called.
            let helpString = "**List of commands:**\n"
            for(var i = 0; i <  BangCommands.length; i++){  //annoying comma formatting stuff
                if(i!=0){
                    helpString += " "
                }
                helpString +=`\`${BangCommands[i].name}\`` 
                if(i !== BangCommands.length-1){
                    helpString += ","
                }
            }
            
            try{
                await sendMessageToChannelMessageWasSentFrom(client,message,helpString);
            }catch(err){
                console.error(`Error in sending reply: ${err}`);
            }
        }else if(found && found.length == 2){   //if they're asking about a specific function
            const functionName = found[1];
            let bangCommand = BangCommands.find(c => c.name === functionName);
            if(!bangCommand){   //if it hasn't been found yet check the aliases. O(n)
                for(const commandIter of BangCommands){ //checking all the alias dictionaries.
                    if (commandIter.aliases.has(functionName)){  //.has is typescript shit
                     
                        bangCommand = commandIter;
                        break;
                    }
                }
            }
            if(!bangCommand){   //the command they want to get help for doesn't exist
                await sendMessageToChannelMessageWasSentFrom(client,message,`The command \`${functionName}\` does not exist!`);
               return;
            }else{
                let helpString = "";
                helpString += `\`${bangCommand.name}\`: ${bangCommand.description}\n`
                helpString += `Usage:\`${bangCommand.usage}\`\n`
                if(bangCommand.aliases.size > 0){
                    helpString += `Aliases: ${getCommaSeparatedAliases(bangCommand.aliases)}`
                }
                await sendMessageToChannelMessageWasSentFrom(client,message,helpString)

            }
        }
       
   
        

    }
}