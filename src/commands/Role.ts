import { BaseCommandInteraction, Client, MessageEmbed } from "discord.js";
import { Command } from "../classes/Command";
import { SlashCommandBuilder } from '@discordjs/builders';

export function registerRoleCommands() {
    const data = new SlashCommandBuilder()
        .setName('role')
        .setDescription('Role Commands')
        .addStringOption(option =>
            option.setName('add')
                .setDescription('Select class roles to add')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('remove')
                .setDescription('Select roles to remove from yourself')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('list')
                .setDescription('List all valid class roles')
                .setRequired(true))

}

export const Role: Command = {
    name: "role",
    description: "Pings the bot",
    type: "CHAT_INPUT",
    run: async (_client: Client, interaction: BaseCommandInteraction) => {


        try {
            console.log("Pong reply sent");
        } catch (err) {
            console.error(`Error in sending reply: ${err}`);
        }


    }
};