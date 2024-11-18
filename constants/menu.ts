import type { Menu } from "~/types";

export const menu: Menu[] = [
  {
    title: 'Home',
    metatitle: 'Home',
    icon: 'ph:house-duotone',
    target: '_self',
    _path: '/',
  },
  {
    title: 'News & Updates',
    metatitle: 'News & Updates',
    icon: 'ph:newspaper-duotone',
    target: '_self',
    _path: '/updates',
  },
  {
    title: 'Online Crime Reporting',
    metatitle: 'Online Crime Reporting',
    icon: '',
    target: '_blank',
    _path: 'https://ocre-sielc.rcmp-grc.gc.ca/alberta',
  },
  {
    title: 'RCMP Boundary Map',
    metatitle: 'RCMP Boundary Map',
    icon: '',
    target: '_self',
    _path: '/boundary-map',
  },
  {
    title: 'RCMP Crime Map',
    metatitle: 'RCMP Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: '_self',
    _path: '/map',
  },
]

export const mobileMenu: Menu[] = [
  {
    title: '', //home
    metatitle: 'Home',
    icon: 'ph:house-duotone',
    target: '_self',
    _path: '/',
  },
  {
    title: '', //'News',
    metatitle: 'News & Updates',
    icon: 'ph:newspaper-duotone',
    target: '_self',
    _path: '/updates',
  },
  {
    title: '', //'Crime Map',
    metatitle: 'Crime Map',
    icon: 'ph:map-trifold-duotone',
    target: '_self',
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
