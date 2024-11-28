import { getToken } from "~/server/utils/token";
import { parse } from "node-html-parser";

export default defineEventHandler(async (event) => {
  const page = getRouterParam(event, 'page');
  const token  = await getToken();

  const res =  await $fetch(`https://www.ruralcrimewatch.ab.ca/ccm/api/1.0/pages/${page}?includes=custom_attributes,areas,files,content`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  const rawContent = res?.data?.content?.data?.raw;
  if (rawContent) {
    const htmlDoc = parse(rawContent);
    const htmlContent = htmlDoc.querySelector('#cntwrap').toString();
    res.data.htmlContent = htmlContent;
  }

  console.log(res.data.htmlContent);

  return res?.data
})
