import {getToken} from "~/server/utils/token";

export default defineEventHandler(async () => {
  const token = await getToken();
  const res =  await $fetch('https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages?limit=100&includes=custom_attributes', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  return res?.data
})
