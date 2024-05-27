import { ACCESS_TOKEN } from "~/server/utils/token"

export default defineEventHandler(async (event) => {

  const page = getRouterParam(event, 'page')

  const res =  await $fetch(`https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages/${page}?includes=custom_attributes,areas,files`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
    },
  })

  return res?.data
})
