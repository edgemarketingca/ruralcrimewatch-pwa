import type { Menu } from "~/types";

export const menu: Menu[] = [
  {
    title: 'Home',
    metatitle: 'Home',
    icon: 'ph:house-duotone',
    target: 'self',
    _path: '/',
  },
  {
    title: 'News & Updates',
    metatitle: 'News & Updates',
    icon: 'ph:newspaper-duotone',
    target: 'self',
    _path: '/updates',
  },
  {
    title: 'RCMP Crime Map',
    metatitle: 'RCMP Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: 'self',
    _path: '/map',
  },
]

export const mobileMenu: Menu[] = [
  {
    title: '', //home
    metatitle: 'Home',
    icon: 'ph:house-duotone',
    target: 'self',
    _path: '/',
  },
  {
    title: '', //'News',
    metatitle: 'News & Updates',
    icon: 'ph:newspaper-duotone',
    target: 'self',
    _path: '/updates',
  },
  {
    title: '', //'Crime Map',
    metatitle: 'Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: 'self',
    _path: '/map',
  },
  
  /*
  {
    title: 'Newsletter',
    metatitle: 'Newsletter',
    icon: 'i-ic-outline-mark-email-unread',
    target: '_blank',
    _path: 'https://www.ruralcrimewatch.ab.ca/join-our-newsletter',
  },
  */
]
