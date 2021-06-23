import bug from "../images/type/bug.png";
import dark from "../images/type/dark.png";
import dragon from "../images/type/dragon.png";
import electric from "../images/type/electric.png";
import fairy from "../images/type/fairy.png";
import fighting from "../images/type/fighting.png";
import fire from "../images/type/fire.png";
import flying from "../images/type/flying.png";
import ghost from "../images/type/ghost.png";
import grass from "../images/type/grass.png";
import ground from "../images/type/ground.png";
import ice from "../images/type/ice.png";
import normal from "../images/type/normal.png";
import poison from "../images/type/poison.png";
import psychic from "../images/type/psychic.png";
import rock from "../images/type/rock.png";
import steel from "../images/type/steel.png";
import water from "../images/type/water.png";

export const holaMundo = (type) => {
    switch (type) {
        case "bug":
            return bug;

        case "dark":
            return dark;

        case "dragon":
            return dragon;

        case "electric":
            return electric;

        case "fairy":
            return fairy;

        case "fighting":
            return fighting;

        case "fire":
            return fire;

        case "flying":
            return flying;

        case "ghost":
            return ghost;

        case "grass":
            return grass;

        case "ground":
            return ground;

        case "ice":
            return ice;

        case "normal":
            return normal;

        case "poison":
            return poison;

        case "psychic":
            return psychic;

        case "rock":
            return rock;

        case "steel":
            return steel;

        case "water":
            return water;

        default:
            break;
    }
};
