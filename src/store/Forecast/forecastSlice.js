import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    forecast: [],
    status: null,
    error: null
}

const API_KEY = import.meta.env.VITE_VISUAL_WEATHER_KEY;

export const fetchDataForecast = createAsyncThunk("forecast/fetchDataForecast", async({location, data1, data2}) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${data1}/${data2}?key=${API_KEY} `)
    const data = await response.json()
    return data
})

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchDataForecast.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchDataForecast.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.forecast = action.payload
        })
        .addCase(fetchDataForecast.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

export default forecastSlice.reducer