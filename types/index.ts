export interface NewsRSS {
  rss: {
    $: {
      version: string
      'xmlns:slash': string
    }
    channel: Channel[]
  }
}

export interface Channel {
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
  }[]
}

export interface Article {
  title: string
  thumbnail: string
  description: string
  link: string
  date: string
}

export interface Menu {
  title: string
  _path: string
  icon: string
}
