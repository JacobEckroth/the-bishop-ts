import axios from "axios";

//uses this API: https://latex2png.com/
const baseURL = 'https://latex2png.com'
export async function getLatexUrl(latexString:string):Promise<string | null>{
  
  
    let payload = {
        "auth": {
            "user": "guest",
            "password": "guest"
        },
        "latex": latexString,
        "resolution": 600,
        "color": "FFFFFF"
    }   
    try{
        let res = await axios.post(`${baseURL}/api/convert`,payload)
        let data = res.data;
        if(data['result-code'] === 0){
            return `${baseURL}${res.data.url}`;
        }else{
            throw res.data;
           
        }
    }catch(err){
        console.error(`Error getting latex: ${err}`)
        return null;
    }
  
}