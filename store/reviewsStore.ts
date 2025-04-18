import type {Review} from "~/types/reviews";
import {useAuthStore} from "~/store/authStore";
import {usePagesStore} from "~/store/pagesStore";
import type {Page} from "~/types/Page";

export const useReviewsStore = defineStore('reviews', () => {
  const { apiRequest } = useAPI()
  const authStore = useAuthStore()
  const pagesStore = usePagesStore()
  const reviews = ref<Review[]>([])
  
  const loading = ref<boolean>(false)
  
  async function fetchReviews() {
    loading.value = true
    const res = await apiRequest<Review[]>('/reviews', 'GET')
    loading.value = false
    if (res) {
      reviews.value = res
      return res
    }
    return []
  }
  
  async function sendReview(review: string) {
    loading.value = true
    const res = await apiRequest<Page>('/reviews', 'POST', { body: { review }})
    loading.value = false
    
    if (res && authStore.isAuth && authStore.profile.role === 'admin') {
      pagesStore.pages.push(res)
    }
  }
  
  return { reviews, fetchReviews, sendReview }
})
