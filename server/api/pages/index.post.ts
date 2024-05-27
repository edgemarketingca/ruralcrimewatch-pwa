import { ACCESS_TOKEN } from "~/server/utils/token"

export default defineEventHandler(async () => {

  const res =  await $fetch('https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages?limit=100&includes=custom_attributes', {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  })

  return res?.data
})
