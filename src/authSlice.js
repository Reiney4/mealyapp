// src/features/auth/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/client'; // Assuming you have a setup to interact with your Flask API

// Thunk for performing asynchronous logic, e.g., API calls
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/auth/login', loginCredentials);
      return response.data; // return user info and token
    } catch (err) {
      // Handle errors with proper error message
      return rejectWithValue(err.response.data);
    }
  }
);

// Slice for authentication-related data
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // save user data
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // save error message
      });
  },
});

export default authSlice.reducer;
