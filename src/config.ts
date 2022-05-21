import path from "path";
import fs from "fs";
import YAML from 'yaml'


export function getConfig(){
    const file= fs.readFileSync(path.resolve(__dirname,'../../configs/config.yml'),{encoding:'utf8', flag:'r'});
    const config= YAML.parse(file);
    return config;
}
