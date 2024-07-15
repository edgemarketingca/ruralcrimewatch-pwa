import { getToken } from "~/server/utils/token";

export default defineEventHandler(async (event) => {
  const page = getRouterParam(event, 'page');
  const token  = await getToken();

  const res =  await $fetch(`https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages/${page}?includes=custom_attributes,areas,files`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  return res?.data
})
