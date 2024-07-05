import type { Menu } from "~/types";

export const menu: Menu[] = [
  {
    title: 'Home',
    icon: 'ph:house-duotone',
    target: 'self',
    _path: '/',
  },
  {
    title: 'RCMP Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: 'self',
    _path: '/map',
  },
]

export const mobileMenu: Menu[] = [
  {
    title: '', //home
    icon: 'ph:house-duotone',
    target: 'self',
    _path: '/',
  },
  {
    title: 'Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: 'self',
    _path: '/map',
  },
  {
    title: 'Newsletter',
    icon: 'i-ic-outline-mark-email-unread',
    target: '_blank',
    _path: 'https://www.ruralcrimewatch.ab.ca/join-our-newsletter',
  },
]
