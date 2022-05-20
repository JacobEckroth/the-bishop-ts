
export function getCommaSeparatedAliases(aliases:Map<string,boolean>){
    let string = "";
    for(const key of aliases.keys()){
        
        string += ` \`${key}\`,`
    }
    let noFinalCommaString = "";
    for(var i = 0; i < string.length - 1; i++){ //I'm so tired don't talk to me about it.
        noFinalCommaString += string[i];
    }
    
    return noFinalCommaString;
}