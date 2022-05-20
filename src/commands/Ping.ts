import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../classes/Command";
import { getMsSince } from "../lib/timer";
const config = require("../../config.json");

export const Ping: Command = {
    name: "ping",
    description: "Pings the bot",
    type: "CHAT_INPUT",
    run: async (_client: Client, interaction: BaseCommandInteraction) => {
        
        const content = `:watch: ${getMsSince(interaction.createdAt)*2}ms`; //guessing that the RTT will be the 1 way times 2 lol
        const embed = new MessageEmbed().setDescription(content);
        embed.title="Pong!";
        embed.color = config.colors.success;    //nice happpy green success color
        try{
            await interaction.followUp({embeds:[embed],ephemeral:true})
            console.log("Pong reply sent");
        }catch(err){
            console.error(`Error in sending reply: ${err}`);
        }
      

    }
};