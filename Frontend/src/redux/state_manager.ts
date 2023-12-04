import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CityHistory } from '../types/cityHistory';

interface State {
  city_history: string[];
}

export const stateManager = createSlice({
  name: 'stateManager',
  initialState: {
    city_history: []
  } as State,
  reducers: {
    updateCityHistory: (state, action: PayloadAction<CityHistory[]>) => {
      const newList: string[] = [];
      action.payload.forEach((item: CityHistory) => {
        newList.push(item.city_name)
      })
      state.city_history = newList;
    },
  }
})

export const { updateCityHistory } = stateManager.actions

export default stateManager.reducer