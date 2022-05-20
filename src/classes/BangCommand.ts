import { Client, Message } from "discord.js";


export interface BangCommand{
    name:string,
    description:string,
    type:string,
    usage:string,
    aliases:Map<string,boolean>,    //other names for the command
    perms?:Map<number,boolean>,
    channels?:number[], //the channels that these messages can be sent in.
    run:(client:Client,message:Message)=>void;
}