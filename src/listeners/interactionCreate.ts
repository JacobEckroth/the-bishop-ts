
import { BaseCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../SlashCommands";

//interactionCreate event is emitted when an interaction is created: https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-interactionCreate
export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
      
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

//only for slash commands
const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
    // handle slash command here
};