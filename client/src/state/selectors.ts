import {RootState} from '@/app/redux';

export const isSidebarCollapsedSelector = (state: RootState) =>
  state.global.isSidebarCollapsed;
export const isDarkModeSelector = (state: RootState) => state.global.isDarkMode;
