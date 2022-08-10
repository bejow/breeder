import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GestureResponderEvent } from 'react-native';
import uuid from 'react-native-uuid';
import { plantProperty, plantsReducer, plantState, rootState, seedsReducer } from '../../types';

const initialState: plantsReducer = [
  {
    title: 'Beispiel Pflanze #2',
    startDate: new Date(Date.parse('2021-08-17T08:08:19.750Z')),
    flowerDate: new Date(Date.parse('2021-09-01T08:08:34.674Z')),
    harvestDate: new Date(Date.parse('2021-10-29T08:08:34.674Z')),
    note: '(Beispiel Eintrag kann gelöscht werden)',
    strain: 'Test Sorte',
    uuid: '11edc52b-2918-4d71-9058-f7285e29d894',
    father: '',
    mother: '',
    images: [],
    properties: [
      {
        title: 'Harz',
        note: 'Anzahl der Harzdrüsen',
        weight: 8,
        inheritance: undefined,
        uuid: '113dc52b-2618-4d71-9058-f7285e29d894',
      },
    ],
  },
];
const plantSlice = createSlice({
  name: 'plants',
  initialState: initialState,
  reducers: {
    addPlant(state, action: PayloadAction<plantState>) {
      state.push({ ...action.payload, uuid: action.payload.uuid ? action.payload.uuid : uuid.v4().toString() });
    },
    setPlant(state, action: PayloadAction<plantState>){
      const plantIndex = state.findIndex(plant => plant.uuid === action.payload.uuid)
      const newState = [...state]
      newState[plantIndex] = action.payload
      return newState
    },
    deletePlant(state, action: PayloadAction<plantState>){
      return state.filter((plant) => (plant.uuid !== action.payload.uuid))

    },
    importOverride(state, action: PayloadAction<rootState>) {
      const newPlants: plantsReducer = action.payload.plants.map((plant) => ({
        ...plant,
        startDate: typeof plant.startDate === 'string' ? new Date(Date.parse(plant.startDate)) : undefined,
        flowerDate: typeof plant.flowerDate === 'string' ? new Date(Date.parse(plant.flowerDate)) : undefined,
        harvestDate: typeof plant.harvestDate === 'string' ? new Date(Date.parse(plant.harvestDate)) : undefined,
      }));
      return newPlants
    },
    importAppendPlants(state, action: PayloadAction<rootState>) {
      const newPlants: plantsReducer = action.payload.plants.map((plant) => ({
        ...plant,
        startDate: typeof plant.startDate === 'string' ? new Date(Date.parse(plant.startDate)) : undefined,
        flowerDate: typeof plant.flowerDate === 'string' ? new Date(Date.parse(plant.flowerDate)) : undefined,
        harvestDate: typeof plant.harvestDate === 'string' ? new Date(Date.parse(plant.harvestDate)) : undefined,
      }));
      state.push(...newPlants);
    },
  },
});

type RawProperty = {
  id: string;
  title: string;
};
type RawProperties = RawProperty[];

type RawPlantTitle = {
  id: string;
  title: string;
};
type RawTitles = RawPlantTitle[];

const selectPlants = (state: rootState) => state.plants;

const selectPlantById = createSelector([selectPlants, (state: rootState, id: string| undefined) => id], (plants, id) => {
  if (id === '') return undefined;
  const index = plants.findIndex((plant: plantState) => {
    return plant.uuid === id;
  });
  if (index >= 0) {
    return plants[index];
  }
});

const getAllPlantTitles = createSelector(selectPlants, (plants: plantsReducer) => {
  var uniquePlantTitles: RawPlantTitle[] = [];
  for (var plantIndex in plants) {
    if (!uniquePlantTitles.some((uniquePlant) => uniquePlant.title === plants[plantIndex].title)) {
      uniquePlantTitles.push({ title: plants[plantIndex].title, id: plants[plantIndex].uuid });
    }
  }
  return uniquePlantTitles;
});

const getAllPlantProperties = createSelector(
  selectPlants,
  // selector logic
  (plants: plantsReducer) => {
    var selectedProperties: plantProperty[] = [];
    var properties: RawProperties = [];
    // iterating through all plants and all properties to make a list of distinct plant properties
    for (var plantIndex in plants) {
      for (var propertyIndex in plants[plantIndex].properties) {
        var currentProperty = plants[plantIndex].properties[propertyIndex];
        if (
          !properties.some((property) => property.id === currentProperty.uuid) &&
          !selectedProperties.some((selectedProperty) => currentProperty.uuid === selectedProperty.uuid)
        ) {
          properties.push({ id: currentProperty.uuid, title: currentProperty.title });
        }
      }
    }
    return properties;
  }
);

export { getAllPlantProperties, getAllPlantTitles, selectPlantById };
export const { addPlant, deletePlant, setPlant, importAppendPlants, importOverride } = plantSlice.actions;
export default plantSlice.reducer;
