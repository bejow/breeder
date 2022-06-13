import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { plantState, seedState } from "../../types";

const initialState = 
[  
    {
    title: "Beispiel Seeds #1",
    amount: 10,
    harvestDate: "2021-10-29T08:08:34.674Z",
    note: "(Beispiel Eintrag kann gelöscht werden)",
    strain: "Test Sorte",
    uuid: "11edc52b-2918-4d71-9058-f7285e29d844",
    father: "",
    mother: "",
    properties: [""],
  }
]
;


const seedSlice = createSlice({
  name: "seeds",
  initialState: initialState,
  reducers: {
    addSeed(state, action: PayloadAction<seedState>) {
      state.push({...action.payload, uuid: uuid.v4().toString()})
    }
  }
})


export const { addSeed } = seedSlice.actions
export default seedSlice.reducer

