import { Client, Message } from "discord.js";


export interface BangCommand{
    name:string,
    description:string,
    type:string,
    usage:string,
    aliases:Map<string,boolean>,    //other names for the command
    perms?:Map<string,boolean>, //role IDs required to run command.
    channels?:Map<string,boolean>,  //valid channel IDs

    run:(client:Client,message:Message)=>void;
}