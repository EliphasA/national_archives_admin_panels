import React from 'react';
import { SiHomeadvisor } from 'react-icons/si';
import { MdManageAccounts } from 'react-icons/md';
import { LuSettings } from 'react-icons/lu';
import { ImBook } from 'react-icons/im';

export const SidebarData = [
  {
    title: 'Home',
    icon: <SiHomeadvisor />,
    link: '/collection',
  },
  {
    title: 'Manage Users',
    icon: <MdManageAccounts />,
    link: 'user/create',
  },
  {
    title: 'Settings',
    icon: <LuSettings />,
    link: 'manage-users',
  },
  {
    title: 'View bookings',
    icon: <ImBook />,
    link: '/bookings',
  },
  {
    title: 'Settings',
    icon: <LuSettings />,
    link: 'manage-users',
  },
  {
    title: 'View bookings',
    icon: <ImBook />,
    link: '/bookings',
  },
];
