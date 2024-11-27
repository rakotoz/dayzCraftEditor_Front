import { configureStore } from '@reduxjs/toolkit';
import craftReducer from './types/craftSlice';

export default configureStore({
  reducer: {
    craft: craftReducer,
  },
});
