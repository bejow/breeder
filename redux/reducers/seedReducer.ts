import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import { plantState, rootState, seedsReducer, seedState } from '../../types';

const initialState: seedsReducer = [
  {
    title: 'Beispiel Seeds #1',
    amount: 10,
    harvestDate: new Date(Date.parse('2021-09-01T08:08:34.674Z')),
    note: '(Beispiel Eintrag kann gelöscht werden)',
    strain: 'Test Sorte',
    uuid: '11edc52b-2918-4d71-9058-f7285e29d844',
    father: '',
    mother: '',
    type: 'regular',
    breeder: 'Rare',
  },
];
const seedSlice = createSlice({
  name: 'seeds',
  initialState: initialState,
  reducers: {
    addSeed(state, action: PayloadAction<seedState>) {
      state.push({ ...action.payload, uuid: uuid.v4().toString() });
    },
    deleteSeed(state, action: PayloadAction<seedState>) {
      return state.filter((seed) => seed.uuid !== action.payload.uuid);
    },
    importOverride(state, action: PayloadAction<rootState>) {
      const newSeeds: seedsReducer = action.payload.seeds.map((seed) => ({
        ...seed,
        harvestDate: typeof seed.harvestDate === 'string' ? new Date(Date.parse(seed.harvestDate)) : undefined,
      }));
      return newSeeds;
    },
    importAppend(state, action: PayloadAction<rootState>) {
      const newSeeds: seedsReducer = action.payload.seeds.map((seed) => ({
        ...seed,
        harvestDate: typeof seed.harvestDate === 'string' ? new Date(Date.parse(seed.harvestDate)) : undefined,
      }));
      state.push(...newSeeds);
    },
  },
});

const selectSeeds = (state: rootState) => state.seeds;

const selectSeedById = createSelector([selectSeeds, (state: rootState, id: string | undefined) => id], (seeds, id) => {
  if (id === '') return undefined;
  const index = seeds.findIndex((seed: seedState) => {
    return seed.uuid === id;
  });
  if (index >= 0) {
    return seeds[index];
  }
});

export { selectSeedById };
export const { addSeed, importAppend, importOverride, deleteSeed } = seedSlice.actions;
export default seedSlice.reducer;
