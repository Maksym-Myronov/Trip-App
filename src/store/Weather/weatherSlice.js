import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    forecast: [],
    status: null,
    error: null,
}

const API_KEY = import.meta.env.VITE_VISUAL_WEATHER_KEY;

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Berlin?unitGroup=metric&key=${API_KEY}&contentType=json`);
    const data = await response.json()
    return data
})

const weatherSlice= createSlice({
    name: "weather",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeather.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.forecast = action.payload
        })
        .addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

export default weatherSlice.reducer