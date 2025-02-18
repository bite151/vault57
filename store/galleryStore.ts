import type {GalleryImage} from "~/types/Gallery";

export const useGalleryStore = defineStore('gallery', () => {
  const config = useRuntimeConfig()
  const images = ref<GalleryImage[]>([])
  
  const loading = ref<boolean>(false)
  
  async function fetchImages(): Promise<GalleryImage[]> {
    loading.value = true
    const { data } = await useFetch<GalleryImage[]>(config.public.API_URL + '/gallery.json')
    loading.value = false
    if (data.value) {
      images.value = data.value
      return data.value
    }
    return []
  }
  
  return { images, fetchImages }
})
