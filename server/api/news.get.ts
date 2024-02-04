import { parseString } from 'xml2js'

export default defineEventHandler(async () => {
  const data = await $fetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard') as string

  let result

  parseString(data, (err, res) => {
    if (!err) {
      result = res
    }
  })

  return result
})
