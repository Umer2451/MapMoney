import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData : []
};

export const appSlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      pushUserData: (state, action) => {
        state.userData.push(action.payload)
      },
    }
}
)
export const {pushUserData} = appSlice.actions;
export default appSlice.reducer;
