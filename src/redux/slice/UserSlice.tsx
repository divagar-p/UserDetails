// features/userList/userListSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface userListState {
  userList: any;
  userListStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  userEdit: any;
  userEditStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  userDelete: any;
  userDeleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: userListState = {
  userList: {},
  userListStatus: 'idle',
  userEdit: {},
  userEditStatus: 'idle',
  userDelete: {},
  userDeleteStatus: 'idle',
  error: null,
};

// Async thunk to fetch posts
export const userList = createAsyncThunk(
  'user/userList',
  async ({ page, per_page }: { page: number; per_page: number }, thunkAPI) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response?.data?.error || 'Something went wrong');
    }
  }
);

// Async thunk to fetch Edit
export const userEdit = createAsyncThunk(
  'user/userEdit',
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response?.data?.error || 'Something went wrong');
    }
  }
);
// Async thunk to fetch delete
export const userDelete = createAsyncThunk(
  'user/userDelete',
  async ({ id }: { id: number; }, thunkAPI) => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response?.data?.error || 'Something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list
    builder
      .addCase(userList.pending, (state) => {
        state.userListStatus = 'loading';
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.userListStatus = 'succeeded';
        state.userList = action.payload;
      })
      .addCase(userList.rejected, (state, action) => {
        state.userListStatus = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
    //Edit
    builder
      .addCase(userEdit.pending, (state) => {
        state.userEditStatus = 'loading';
      })
      .addCase(userEdit.fulfilled, (state, action) => {
        state.userEditStatus = 'succeeded';
        state.userEdit = action.payload;
      })
      .addCase(userEdit.rejected, (state, action) => {
        state.userEditStatus = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
    //delete
    builder
      .addCase(userDelete.pending, (state) => {
        state.userDeleteStatus = 'loading';
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.userDeleteStatus = 'succeeded';
        state.userDelete = action.payload;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.userDeleteStatus = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
