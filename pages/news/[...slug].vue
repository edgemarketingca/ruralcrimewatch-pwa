<script lang="ts" setup>
const route = useRoute()

const { news } = await useNews()
const { article } = await useArticle(news.value?.find((item: any) => item.path === route.path)?.id)

function getFile(file: string) {
  return article.value?.files.data.find((item: any) => {
    console.log(item.title, file)
    return file?.includes(item.title)
  })
}
</script>

<template>
  <div class="text-black dark:text-white content-page">
    <div v-for="content, index of article?.areas.data" :key="index">
      <div class="mt-4" v-for="block of content.blocks.data" :key="block.id">
        <div v-html="block.value.content" />
        <img v-if="block.value.fID" class="dark:bg-white rounded-lg" :src="getFile(block.value.fID)?.url" />
      </div>
    </div>
    <!-- add alert -->
  </div>
</template>

<style lang="scss">
a { text-decoration: underline; font-weight: bold; }
</style>
