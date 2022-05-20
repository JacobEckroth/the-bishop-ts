
//defines what slash commands look like.
import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";

//defines type Command which is subtype of type of command sent. Runs this command when executed.
export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
}