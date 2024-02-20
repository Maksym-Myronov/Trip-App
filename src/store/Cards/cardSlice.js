import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const API_KEY = import.meta.env.VITE_VISUAL_WEATHER_KEY;

const initialState = {
    cards: [],
    status: null,
    error: null
}

export const fetchCards = createAsyncThunk("card/fetchCards", async ({lat, lon}) => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${API_KEY}`)
    const data = await response.json()
    return {cards: data}
})

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addImageAndCity: (state, action) => {
            const { image, cityName, startDate, endDate } = action.payload;
            if (!Array.isArray(state.cards)) {
                state.cards = [];
            }
            state.cards.push({ image, cityName, startDate, endDate });
        },
        addApiData: (state, action) => {
            state.apiData = action.payload.cards;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCards.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.apiData = action.payload.cards;
        })
        .addCase(fetchCards.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

export default cardSlice.reducer
export const { addImageAndCity, addApiData } = cardSlice.actions;