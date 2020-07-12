import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Roles/Permissions',
    icon: 'lock-outline',
    link: '/roles',
  },
  {
    title: 'Users',
    icon: 'people-outline',
    link: '/users',
  },
];
