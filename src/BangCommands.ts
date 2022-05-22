//Commands that begin with a bang (!)
//Make sure to add any new commands to this BangCommands list, otherwise they won't be found or listed with !help.
import { Help } from "./bangCommands/Help";
import { Latex } from "./bangCommands/Latex";
import { Lug } from "./bangCommands/Lug";
import { Newclass } from "./bangCommands/Newclass";
import { Ping } from "./bangCommands/Ping";
import { Praise } from "./bangCommands/Praise";
import { Role } from "./bangCommands/Role";
import { Yeet } from "./bangCommands/Yeet";
import { BangCommand } from "./classes/BangCommand";


//order matters here, don't change it without understanding ramifications
//Mainly what happens when you run !help.
export const BangCommands: BangCommand[] = [Help,Newclass,Ping,Latex,Praise,Yeet,Lug,Role]