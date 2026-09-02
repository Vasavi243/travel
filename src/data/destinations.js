import { europeDestinations } from "./destinationsData/europe.js";
import { asiaDestinations } from "./destinationsData/asia.js";
import { northAmericaDestinations } from "./destinationsData/northAmerica.js";
import { southAmericaDestinations } from "./destinationsData/southAmerica.js";
import { oceaniaDestinations } from "./destinationsData/oceania.js";
import { africaDestinations } from "./destinationsData/africa.js";
import { middleEastDestinations } from "./destinationsData/middleEast.js";

export const destinations = [
  ...europeDestinations,
  ...asiaDestinations,
  ...northAmericaDestinations,
  ...southAmericaDestinations,
  ...oceaniaDestinations,
  ...africaDestinations,
  ...middleEastDestinations
];

export const categories = [
  "All",
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Oceania",
  "Middle East"
];

export default destinations;