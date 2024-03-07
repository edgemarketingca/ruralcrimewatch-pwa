import type { Menu } from "~/types";

export const menu: Menu[] = [
  {
    title: 'Home',
    icon: 'ph:house-duotone',
    _path: '/',
  },
  {
    title: 'RCMP Crime Map',
    icon: 'ph:map-trifold-duotone',
    _path: '/map',
  },
  {
    title: 'Associations',
    icon: 'ph:users-duotone',
    _path: '/associations',
  },
  {
    title: 'Resources',
    icon: 'ph:globe-hemisphere-west-duotone',
    _path: '/resources',
  },
]
