'use client';

import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from 'lucide-react';

import {useAppDispatch, useAppSelector} from '@/app/redux';

import {useMediaQuery} from '@/hooks/useMediaQuery';
import {toggleSidebar} from '@/state';
import {isSidebarCollapsedSelector} from '@/state/selectors';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(isSidebarCollapsedSelector);
  const isMobile = useMediaQuery('(max-width: 768px)', true);
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link
      href={href}
      onClick={() =>
        !isSidebarCollapsed && isMobile && dispatch(toggleSidebar())
      }>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? 'justify-center py-4' : 'justify-start px-8 py-4'
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? 'bg-blue-200 text-white' : ''
        }`}>
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? 'hidden' : 'block'
          } font-medium text-gray-700`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(isSidebarCollapsedSelector);

  const sidebarClassName = `flex fixed flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sidebarClassName}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-4' : 'px-8'
        }`}>
        <div
          className={`${
            isSidebarCollapsed ? '' : 'rounded-full bg-gray-100'
          } w-12 h-12 flex justify-center items-center`}>
          <Image width={45} height={40} alt="logo" src={'/fks.svg'} />
        </div>
        <h1
          className={`font-extrabold text-2xl ${
            isSidebarCollapsed ? 'hidden' : 'block'
          }`}>
          FKSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => dispatch(toggleSidebar())}>
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Links */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Footer */}
      <div
        className={`mb-2 items-center justify-center ${
          isSidebarCollapsed ? 'hidden' : 'flex flex-col'
        }`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 FKSTOCK.
        </p>
        <p className="text-[8px] text-center text-gray-500">
          Made with ❤️ by Farouk
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
