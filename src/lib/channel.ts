import {Message } from "discord.js";
import { BangCommand } from "../classes/BangCommand";
import { getClassCategories } from "./classCategories";

//checks if a message matches channel avaialable by command.
export function messageSenderInRightChannel(bangCommand: BangCommand, message: Message):boolean{
    if (bangCommand.channels) {
        if (message.channel) {
            if (bangCommand.channels.has(message.channelId)) {    //if the message was sent in an appropriate channel.
                return true;
            } else {
                return false;
            }
        } else {  //If the bang command has channels but the message was not sent in one, return false.
            return false;
        }
    } else {
        return true;
    }
}

//returns true if a message is in a class channel, false otherwise
export function messageIsInClassChannel(message: Message):boolean {
    if (message.member) {
        const channel = message.guild?.channels.cache.get(message.channelId);
        if (channel) {
            if (channel.parentId) {

                //you find a better way of doing it if this is so bad then
                //PRs welcome

                const classCategories = getClassCategories();
                if (classCategories.has(channel.parentId)) {
                    return true;

                } else {
                    return false;
                }


            } else {
                return true;    //if there's no parent it's not possible it's in a class channel
            }

        } else {

            return false;
        }

    } else {
        return false;
    }

}