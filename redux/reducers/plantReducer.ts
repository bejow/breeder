import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GestureResponderEvent } from 'react-native';
import uuid from 'react-native-uuid';
import { plantProperty, plantsReducer, plantState, rootState } from '../../types';

const initialState: [plantState] = [
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
      console.log([...state, { ...action.payload, uuid: uuid.v4().toString() }]);
      state.push({ ...action.payload, uuid: uuid.v4().toString() });
    },
  },
});

type RawProperty = {
  id: string;
  title: string;
};
type RawProperties = RawProperty[];

const getAllPlantProperties = createSelector(
  (state: rootState) => state.plants,
  (_: any, selectedProperties: plantProperty[]) => selectedProperties,

  // selector logic
  (plants: plantsReducer, selectedProperties: plantProperty[]) => {
    var properties: RawProperties = [];
    // iterating through all plants and all properties to make a list of distinct plant properties
    for (var plantIndex in plants) {
      for (var propertyIndex in plants[plantIndex].properties) {
        var currentProperty = plants[plantIndex].properties[propertyIndex];
        console.log();
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

export { getAllPlantProperties };
export const { addPlant } = plantSlice.actions;
export default plantSlice.reducer;
