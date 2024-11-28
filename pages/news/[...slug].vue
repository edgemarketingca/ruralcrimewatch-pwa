<script lang="ts" setup>
const route = useRoute()

const { newslist } = await useNewsList() //useNews / news has a data limit slice. useNewsList / newslist has no limit to data results
const { article } = await useArticle(newslist.value?.find((item: any) => item.path === route.path)?.id) //update news to newslist, for un-sliced results

function getFile(file: string) {
  return article.value?.files.data.find((item: any) => {
    console.log(item.title, file)
    return file?.includes(item.title)
  })
}
</script>

<template>
  <div class="text-black dark:text-white content-page">
    <h1 v-html="article.name" />
    <div v-html="article.htmlContent" />
    <!-- add alert -->
  </div>
</template>

<style lang="scss">
.content-page a { text-decoration: underline; font-weight: bold; }
</style>
