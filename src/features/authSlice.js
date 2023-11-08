import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logout,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
