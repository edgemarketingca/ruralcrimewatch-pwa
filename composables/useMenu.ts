import { menu } from '~/constants'

export async function useMenu() {
  const { data: crime } = await useAsyncData('crime', () => queryContent('/crime/').where({ _dir: 'crime' }).find())

  const menus = computed(() => {
    return [
      ...menu,
      ...crime.value
    ]
  })
  return {
    menus
  }
}
