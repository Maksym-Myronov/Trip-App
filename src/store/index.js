import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from './Weather/weatherSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer
    }
})