//gets the milliseconds since a time
export function getMsSince(time:Date){
    const now = new Date();
    return now.getTime() -time.getTime()
}