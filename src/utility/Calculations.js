import data from '../data/onboardingSheet.json'
import { fueltable } from '../data/fuelTable';


export const findMEConsLaden = (fuelTable, ladenSpeed) => {
  if (!fuelTable || !ladenSpeed) return null;
  for (let entry of fuelTable) {
    if (entry.Speed === ladenSpeed) {
      return entry['ME Cons (Laden)'];
    }
  }
  return null; // return null if no match is found
};

export const findMEConsBallast = (fuelTable,ballastSpeed) => {
  if(!fuelTable || !ballastSpeed) return null;
  for(let entry of fuelTable) {
    if(entry.Speed === ballastSpeed)
      return entry['ME Cons (Ballast)']
  }
  return null;
}

export const findAEConst = (fuelTable,speed) => {
  if(!fuelTable || !speed) return null;

  for(let entry of fuelTable) {
    if(entry.Speed === speed)

      return entry['AE Cons']
  }

  return null;
}

export const findBoilerConst = (fuelTable,speed) => {
  if(!fuelTable || !speed) return null;

  for(let entry of fuelTable) {
    if(entry.Speed === speed)

      return entry['Boiler Cons']
  }

  return null;
}


 