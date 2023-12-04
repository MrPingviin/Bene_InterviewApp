import { configureStore } from '@reduxjs/toolkit'
import stateManager from './state_manager'

export const store =  configureStore({
  reducer: {
    stateManager: stateManager
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch