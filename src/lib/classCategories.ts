import { getConfig } from "../config"


//Hardcoded retrieving of class categories from config.
//Feel free to make it better, I used YAML and I have no idea
//How to create an iterable object from it :(
export function getClassCategories(): Map<string, boolean> {
    const config = getConfig();
    const classCategories = config.class_categories;
    return new Map<string, boolean>(
        [
            [
                classCategories[100], true
            ],
            [
                classCategories[200], true
            ],
            [
                classCategories[300], true
            ],
            [
                classCategories[400], true
            ],
            [
                classCategories[500], true
            ]
        ]
    );


}