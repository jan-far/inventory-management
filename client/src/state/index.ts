import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface initalStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initalStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleSidebar: state => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {
  setIsDarkMode,
  setIsSidebarCollapsed,
  toggleSidebar,
  toggleDarkMode,
} = globalSlice.actions;

export default globalSlice.reducer;
