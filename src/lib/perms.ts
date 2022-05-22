import { Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";

//returns true if they have the perms, false otherwise.
export function messageSenderHasMatchingPerms(bangCommand:BangCommand,message:Message){
    if(!bangCommand.perms){

        return true;
    }
    if(!message.member){    //member can be null.

        return false;
    }
    
    if (message.member.roles.cache.some(role => bangCommand.perms!.has(role.id))) {   //we know it's not null because we checked above.
        
        return true;
    }else{

        return false;
    }
}