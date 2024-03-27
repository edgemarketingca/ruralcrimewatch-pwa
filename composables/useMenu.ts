import { menu } from '~/constants'

export async function useMenu() {
  const { data } = await useAsyncData('navigation', () => queryContent('/').where({ nav: true }).find())

  const menus = computed(() => {
    return [
      ...menu,
      ...data.value ?? [],
    ]
  })
  return {
    menus
  }
}
