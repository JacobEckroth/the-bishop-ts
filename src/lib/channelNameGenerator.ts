//className is  Operating Systems II, classTitle is CS444
export function generateChannelName(className: string, classTitle: string) {
    if (!className && !classTitle) {
        return "";
    }
    className = className || "";
    classTitle = classTitle || "";
    //First we want to lowercase everything
    className = className.toLowerCase();
    classTitle = classTitle.toLowerCase();
    //then we want to replace the whitespace in the class title with dashes.
    classTitle = classTitle.replace(/\s/g, '-');

    //Then we put a dash in between numbers and letters
    className = className.replace(/([a-z])(\d)/i, '$1-$2')

    const totalString = `${className}-${classTitle}`;
    return totalString;
}