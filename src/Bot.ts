import { Client} from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import ready from "./listeners/ready";


//Discord client
export const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"]
});



//called only once on start to initialize bot and connect it to discord API.
async function initializeBot() {
    
    try{
        const tokenFile = require('../../token.json');   //attempts to get token, throws Error if fails.
        const token = tokenFile.token;
        console.log("The Bishop is warming up...");

        //attaching listeners
        ready(client);  //attaches ready listener that registers slash commands.
        messageCreate(client);  //listening for all messages
        interactionCreate(client); //listening for slash commands.
       

        //attempting to login to API.
        await client.login(token);
        console.log("The Bishop is logged in");
    }catch(err){
        console.error(`Error on Bishop Initializing: ${err}`);
    }

}
initializeBot();