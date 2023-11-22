import { parseString } from 'xml2js'


export default defineEventHandler(async (event) => {
  const data = await $fetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard') as string

  let result

  parseString(data, function(err, res) {
    result = res
  })

  return result
})