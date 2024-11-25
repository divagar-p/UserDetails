// features/logins/loginsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface loginState {
  login: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: loginState = {
  login: {},
  status: 'idle',
  error: null,
};

// Async thunk to fetch posts
export const loginUser = createAsyncThunk(
  'login/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response?.data?.error || 'Something went wrong');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        debugger;
        state.login = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default loginSlice.reducer;
