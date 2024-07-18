import { parseString } from 'xml2js'
import type { Article, Channel, NewsRSS } from '~/types'

export async function useNews() {

  const { data: news, pending, error } = await useFetch('/api/pages', {
    method: 'POST',
    transform: (data) => data.filter((page: any) => page.path.includes('/news/articles/')).slice(0,10)
  })

  // const { data: news, pending, error } = await useFetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard', {
  //   lazy: true,
  //   transform: (xml: string) => {
  //     let raw: Channel | undefined
  //     const result: Article[] = []

  //     parseString(xml, (err, res: NewsRSS) => raw = res?.rss?.channel?.[0])

  //     raw?.item.forEach((item) => {
  //       result.push({
  //         name: item.title[0],
  //         thumbnail: getImage(item.description[0]),
  //         description: getDescription(item.description[0]),
  //         path: item.link[0].replace('https://www.ruralcrimewatch.ab.ca', ''),
  //         date_added: item.pubDate[0],
  //       })
  //     })

  //     return result
  //   },
  // })

  return {
    news,
    error,
    pending,
  }
}

export async function useNewsList() {

  const { data: news, pending, error } = await useFetch('/api/pages', {
    method: 'POST',
    transform: (data) => data.filter((page: any) => page.path.includes('/news/articles/'))
  }) 

  return {
    news,
    error,
    pending,
  }
}

export async function useArticle(id: number) {
  const { data: article, pending, error } = await useFetch(`/api/pages/${id}`, {
    method: 'POST',
  })

  return {
    article,
    error,
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
