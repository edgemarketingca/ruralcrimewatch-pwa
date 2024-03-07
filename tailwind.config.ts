import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#F7CD46',
      },
      zIndex: {
        '-1': '-1',
        99: '99',
      },
    },
  },
}
