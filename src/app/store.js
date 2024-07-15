import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import appSlicer from '../features/MoneyMapFeatures/appSlicer';
export const store = configureStore({
  reducer: {
    appData: appSlicer,
  },
});
