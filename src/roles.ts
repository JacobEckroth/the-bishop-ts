import path from "path";
import fs from "fs";
import YAML from "yaml";


const fileName = path.resolve(__dirname,'../../configs/roles.yml')

export function getRoles(){
    const file= fs.readFileSync(fileName,{encoding:'utf8', flag:'r'});
    const roles = YAML.parse(file);
    return roles;
}

export async function setRoles(newRoles:any):Promise<number>{
    await fs.writeFile(fileName,YAML.stringify(newRoles),async function callback(err){
        if(err){
            console.error(err);
            return -1;
        }else{
            return 0;
        }
    });
    return 0;
    
}