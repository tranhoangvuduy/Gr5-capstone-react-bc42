import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetTheater, apiGetTheaterDetail, apiCreateMovieSchedule } from '../APIs/theaterAPI';

const initialState = {
    theaterList: [],
    theaterDetail: [],
    loading: false,
    error: null,
    createMovieSchedule: [],
}

export const getTheater = createAsyncThunk(
    'theater/getTheater',
    async () => {
        try {
            const res = await apiGetTheater();
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getTheaterDetail = createAsyncThunk(
    'theater/getTheaterDetail',
    async (maHeThongRap) => {
        try {
            const res = await apiGetTheaterDetail(maHeThongRap);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const createMovieSchedule = createAsyncThunk(
    'theater/createMovieSchedule',
    async (data) => {
        try {
            const res = await apiCreateMovieSchedule(data);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

const theaterSlice = createSlice({
    name: 'theater',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTheater.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTheater.fulfilled, (state, action) => {
                state.loading = false;
                state.theaterList = action.payload;
            })
            .addCase(getTheater.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getTheaterDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTheaterDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.theaterDetail = action.payload;
            })
            .addCase(getTheaterDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(createMovieSchedule.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMovieSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.createMovieSchedule = action.payload;
            })
            .addCase(createMovieSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export default theaterSlice.reducer;
