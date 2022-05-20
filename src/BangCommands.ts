//Commands that begin with a bang (!)
//Make sure to add any new commands to this BangCommands list, otherwise they won't be found or listed with !help.
import { Help } from "./bangCommands/Help";
import { Latex } from "./bangCommands/Latex";
import { Lug } from "./bangCommands/Lug";
import { Newclass } from "./bangCommands/Newclass";
import { Ping } from "./bangCommands/Ping";
import { Praise } from "./bangCommands/Praise";
import { Yeet } from "./bangCommands/Yeet";
import { BangCommand } from "./classes/BangCommand";


export const BangCommands: BangCommand[] = [Help,Ping,Latex,Yeet,Lug,Praise,Newclass]