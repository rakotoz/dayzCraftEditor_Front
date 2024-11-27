import { createSlice } from '@reduxjs/toolkit';

export interface CraftState {
  categories: any[];
  activeCategory: string | null;
  items: any;
}

const initialState: CraftState = {
  categories: [],
  activeCategory: null,
  items: [],
};

export const craftSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setCategoriesAction: (state, action) => {
      if (action.payload !== null) {
        state.categories = action.payload;
      }
    },
    setActiveCategoryAction: (state, action) => {
        state.activeCategory = action.payload;
    },
    setItemsAction: (state, action) => {
        if (state.items !== null && state.activeCategory) {
          state.items[state.activeCategory] = action.payload;
        }
    }
  }
});

export const { setCategoriesAction, setActiveCategoryAction, setItemsAction } = craftSlice.actions;

export default craftSlice.reducer;
