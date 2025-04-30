import type {GalleryImage} from "~/types/Gallery";

export const useGalleryStore = defineStore('gallery', () => {
  const { apiRequest } = useAPI()
  const images = ref<GalleryImage[]>([])
  
  const loading = ref<boolean>(false)
  
  async function fetchImages(): Promise<GalleryImage[]> {
    loading.value = true
    const data = await apiRequest<GalleryImage[]>('/gallery', 'GET')
    loading.value = false
    if (data) {
      images.value = data
      return data
    }
    return []
  }
  
  return { images, fetchImages }
})
