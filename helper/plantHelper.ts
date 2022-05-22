import { plantState } from "../types";

export const getDayDifference = (date1 : number, date2: number) => {
    const diffTime = Math.abs(date2- date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const createPlantInfoString = (plant: plantState) => {

    const vegInfo = plant.startDate ? " | Veg: " + getDayDifference(Date.now() , plant.startDate.getTime()) : ""
    const flowerInfo = plant.flowerDate && plant.startDate ? " | Flo: " + getDayDifference(plant.startDate.getTime() , plant.flowerDate.getTime()) : ""
    const strainInfo = plant.strain + plant.startDate ? " | " : ""
    const infoString = plant.strain + vegInfo + flowerInfo
    return infoString
}

