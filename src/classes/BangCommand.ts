import { Client, Message } from "discord.js";


export interface BangCommand{
    name:string,
    description:string,
    type:string,
    usage:string,
    aliases:Map<string,boolean>,    //other names for the command
    run:(client:Client,message:Message)=>void;
}