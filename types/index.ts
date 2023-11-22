export interface NewsRSS {
  rss: {
    $: {
      version: string
      'xmlns:slash': string
    },
    channel: News[],
  },
}

export interface News {
  title: string[]
  description: string[]
  image: {
    url: string[]
    title: string[]
    link: string[]
  }
  item: {
    title: string[]
    description: string[]
    pubDate: string[]
    link: string[]
    guid: string[]
    'slash:comments': string[]
  }[],
}

export interface Menu {
  name: string
  icon: string
  to: string
}
