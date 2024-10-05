'use client';

import React, {useEffect} from 'react';

import Navbar from '@/app/(components)/Navbar';
import Sidebar from '@/app/(components)/Sidebar';
import {
  isDarkModeSelector,
  isSidebarCollapsedSelector,
} from '@/state/selectors';
import StoreProvider, {useAppSelector} from './redux';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({children}: Props) => {
  const isSidebarCollapsed = useAppSelector(isSidebarCollapsedSelector);
  const isDarkMode = useAppSelector(isDarkModeSelector);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  });

  return (
    <div
      className={`${
        isDarkMode ? 'dark' : 'light'
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      <Sidebar />
      <main
        className={`flex flex-col w-full pt-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({children}: Props) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>;
    </StoreProvider>
  );
};

export default DashboardWrapper;
