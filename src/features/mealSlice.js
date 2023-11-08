import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api.js';

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async () => {
     const response = await API.get('/meals'); // Use API instance here
     return response.data;
  }
);

export const addMeal = createAsyncThunk(
  'meals/addMeal',
  async (mealData) => {
    const response = await API.post('/meals', mealData);
    return response.data;
  }
);

const mealSlice = createSlice({
  name: 'meals',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addMeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeal.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addMeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mealSlice.reducer;
