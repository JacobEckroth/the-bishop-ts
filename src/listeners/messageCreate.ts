
import { Client, Message } from "discord.js";
import { BangCommands } from "../BangCommands";
import { getLatexUrl } from "../lib/latex";
import { sendMessageToChannelMessageWasSentFrom } from "../lib/sendChannelMessage";


//messageCreate event is emitted when an interaction is created: https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-messageCreate
export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        //check if the first character is a !
        const found = message.content.match(/^\s*!([a-zA-Z0-9]*)/)
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
                console.log(equations[equations.length-1])
                const url = await getLatexUrl(equations[equations.length - 1]); //only do the last one, just like the ruby bot does.
                if (url) {
                    let sendMessage = { files: [url] }
                    await sendMessageToChannelMessageWasSentFrom(client, message, sendMessage);
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
        bangCommand.run(client, message);
    }
}
