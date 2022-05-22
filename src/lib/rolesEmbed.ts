import { Client, Message, MessageEmbed } from "discord.js";
import { getConfig } from "../config";
import { getRoles } from "../roles";
import { sendMessageToChannelMessageWasSentFrom } from "./sendChannelMessage";

//List all roles in the channel a user sent a message in.
export function listRoles(client: Client, message: Message) {
    const config = getConfig();
    const roles = getRoles();
    const embed = new MessageEmbed().setFields(
        [
            {
                name: 'Missing a class?',
                value: 'If we are missing a class, let us know and we will add a channel!'
            },
            { name: 'General roles:', value: `\`${Object.keys(roles.general).join('` `')}\`` },
            { name: 'Class roles', value: `\`${Object.keys(roles.classes).sort().map(k => k.padEnd(7)).join(`\` \``)}\`` },
            {
                name: "Slash commands:",
                value: `\`!role list\`\n`
                    + `\`!role add\`\n`
                    + `\`!role remove\`\n`,
                inline: true
            },
            {
                name: "Classic commands:",
                value: `\`!role list\`\n`
                    + `\`!role add foo [bar baz ...]\`\n`
                    + `\`!role remove foo [bar baz ...]\`\n`,
                inline: true
            }
        ]
    );
    embed.color = config.colors.error;
    sendMessageToChannelMessageWasSentFrom(client, message, { embeds: [embed] });
}