import axios from "axios";

const baseURL = 'https://classes.oregonstate.edu';
export async function attemptGetClassName(classCode:string){
    let payload = {
        "other": {
            "srcdb": "999999"
        },
        "criteria": [
            {
                "field": "alias",
                "value": classCode
            }
        ]
    }
    try{
        let res = await axios.post(`${baseURL}/api/?page=fose&route=search`,payload);   //posts to osu classes "api"
        let data = res.data;
        let classTitle = data.results[0].title;
        classTitle = classTitle.toLowerCase();
        let words = classTitle.split(" ");

        classTitle = words.map((word:string) => { //this one is nice, maybe just stop reading this function here.
            return word[0].toUpperCase() + word.substring(1); 
        }).join(" ");

        //REALLY JANK WAY OF DOING THIS, but Software Engineering II becomes Software Engineering Ii if we don't do this
        //PRs welcome.
         words = classTitle.split(" ");
         let allEyes:boolean = true;    //if it's all i's.
         for(let i = 0; i < words[words.length-1].length; i++){
             let currLetter = words[words.length-1][i];
            if(currLetter != 'i' && currLetter != 'I' && currLetter != '\n' ){
                allEyes = false;
                break;
            }
         }
         if(allEyes){
             words[words.length-1] = words[words.length-1].toUpperCase();   //Updates Ii to be II. Very weird edge case
             //I think this is more readable than regex though.
         }
         classTitle = words.join(" ");
        return classTitle;

    }catch(err){
        console.error(`Error in getting class name: ${err}`);
        return "";
    }
  
}