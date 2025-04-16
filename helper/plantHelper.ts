import { plantProperty, plantState } from '../types';
import uuid from 'react-native-uuid';
import { Asset } from 'expo-media-library';
import moment from 'moment';

export const defaultPlantState: plantState = {
  title: '',
  startDate: undefined,
  flowerDate: undefined,
  harvestDate: undefined,
  note: '',
  strain: '',
  uuid: '',
  father: '',
  mother: '',
  breeder: '',
  images: [] as Asset[],
  properties: [] as plantProperty[],
  folder: null,
};

export const getDayDifference = (date1: Date, date2: Date) => {


    const start = moment.min(moment(date2), moment(date1)).clone();
    const end = moment.max(moment(date2), moment(date1)).clone();
    const days = end.diff(start, 'days');
    return days
};

export const calculateFlowerTime = (plant:plantState) => {
  if (plant.flowerDate && plant.harvestDate){
    return getDayDifference(plant.flowerDate, plant.harvestDate)
}
return undefined
}

export const createPlantInfoString = (plant: plantState) => {
  const {harvestDate, flowerDate, startDate} = plant
  const isHarvested = moment().isAfter(moment(harvestDate));


  if (isHarvested && harvestDate && flowerDate) {
    return "Harvested BT" + calculateFlowerTime(plant)
  }

  if (isHarvested && harvestDate ){
    return `Harvested ${harvestDate.toLocaleDateString(["de", "en-us"])}`
  }

  if (!isHarvested && harvestDate && flowerDate && startDate){
    return `Harvest in ${getDayDifference(moment().toDate(), harvestDate)} days. Veg: ${getDayDifference(moment().toDate(), startDate)} | Flo: ${getDayDifference(moment().toDate(), flowerDate)}` 
  }

  if (!isHarvested && flowerDate && startDate){
    return `Veg: ${getDayDifference(moment().toDate(), startDate)} | Flo: ${getDayDifference(moment().toDate(), flowerDate)}` 
  }

  if (!isHarvested && harvestDate){
    return `Harvest in ${getDayDifference(moment().toDate(), harvestDate)} days.` 
  }

  if (startDate) {
    return `Veg: ${getDayDifference(moment().toDate(), startDate)}`
  }

  if (flowerDate) {
    return `Flo: ${getDayDifference(moment().toDate(), flowerDate)}`
  }

};

export const createNewPlantData = (): plantState => {
  return { ...defaultPlantState, uuid: uuid.v4().toString() };
};
