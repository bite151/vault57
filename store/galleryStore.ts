import type {GalleryImage} from "~/types/Gallery";

export const useGalleryStore = defineStore('gallery', () => {
  const config = useRuntimeConfig()
  const images = ref<GalleryImage[]>([])
  
  const loading = ref<boolean>(false)
  
  async function fetchImages(): Promise<GalleryImage[]> {
    loading.value = true
    const res = await $fetch<GalleryImage[]>('/api/gallery')
    loading.value = false
    if (res) {
      images.value = res
      return res
    }
    return []
  }
  
  return { images, fetchImages }
})
