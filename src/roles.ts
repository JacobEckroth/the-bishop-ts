import path from "path";
import fs from "fs";
import YAML from "yaml";
const file= fs.readFileSync(path.resolve(__dirname,'../../configs/roles.yml'),{encoding:'utf8', flag:'r'});
const roles = YAML.parse(file);
export default roles