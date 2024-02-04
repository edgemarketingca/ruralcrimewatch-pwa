import { parseString } from 'xml2js'
import type { Article, Channel, NewsRSS } from '~/types'

export async function useNews() {
  const { data: news, pending } = await useFetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard', {
    lazy: true,
    transform: (xml: string) => {
      let raw: Channel | undefined
      const result: Article[] = []

      parseString(xml, (err, res: NewsRSS) => raw = res?.rss?.channel?.[0])

      raw?.item.forEach((item) => {
        result.push({
          title: item.title[0],
          thumbnail: getImage(item.description[0]),
          description: getDescription(item.description[0]),
          link: item.link[0],
          date: item.pubDate[0],
        })
      })

      return result
    },
  })

  return {
    news,
    pending,
  }
}

function getImage(text: string) {
  const regex = /<img src="(.*?)"/
  const match = text.match(regex)

  if (match && match[1])
    return match[1]
  else
    return 'Image source not found'
}

function getDescription(text: string) {
  return text.replace(/<p><img src=".*?" \/><\/p>/g, '')
}
