import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from './reducers/AuthReducer'

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
})

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
