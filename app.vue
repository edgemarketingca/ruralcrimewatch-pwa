<template>
  <Html lang="en">

  <Body class="bg-white dark:bg-black">

    <NuxtLoadingIndicator />

    <AppHeader />
    <AppSidebar />
    <AppBottomBar />

    <div class="relative bg-gray-200 dark:bg-neutral-950 sm:ml-64">
      <div class="p-8 pb-20 sm:mt-0 mt-16 sm:mb-0 mb-16">
        <NuxtPage />
      </div>
      <AppFooter />
    </div>

  </Body>

  </Html>
</template>
