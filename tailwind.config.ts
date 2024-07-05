import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#facc15',
      },
      zIndex: {
        '-1': '-1',
        99: '99',
      },
    },
  },
}
