import clear from "./images/clear.jpg";
import cloudy from "./images/cloudy.jpg";
import partly from "./images/partly.jpg";
import rainy from "./images/rain.jpg";
import sunny from "./images/sunny.jpg";

const backgroundImages = [clear,cloudy,partly,sunny,rainy]

const setBackground = (currentData) => {
    switch(currentData){
        case "Clear":
            return backgroundImages[0];
        case "Cloudy":
            return backgroundImages[1]
        case "Partly cloudy":
            return backgroundImages[2];
        case "Sunny":
            return backgroundImages[3];
        default :
            return backgroundImages[4];
    }
}

export default setBackground;