import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';
import { plantState } from "../../types";

const initialState = 
[  
    {
    title: "Beispiel Pflanze #1",
    startDate: "2021-08-17T08:08:19.750Z",
    flowerDate: "2021-09-01T08:08:34.674Z",
    harvestDate: "2021-10-29T08:08:34.674Z",
    note: "(Beispiel Eintrag kann gelöscht werden)",
    strain: "Test Sorte",
    uuid: "11edc52b-2918-4d71-9058-f7285e29d894"
  }
]
;


const plantSlice = createSlice({
  name: "plants",
  initialState: initialState,
  reducers: {
    addPlant(state, action: PayloadAction<plantState>) {
      state =[...state, {...action.payload, uuid: uuid.v4().toString()}]
    }
  }
})


export const { addPlant } = plantSlice.actions
export default plantSlice.reducer

