import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'Admin',
    icon: 'shield-outline',
    children: [
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
      {
        title: 'Offices',
        icon: 'briefcase-outline',
        link: '/offices',
      },
      {
        title: 'Products',
        icon: 'shopping-bag-outline',
        children: [
          {
            title: 'Deposit Products',
            icon: 'archive-outline',
            link: '/deposits',
          },
        ],
      },
    ],
  },
  {
    title: 'Customers',
    icon: 'smiling-face-outline',
    link: '/customers',
  },
];
