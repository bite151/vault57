import type {FeedbackFormResType, FeedbackFormType} from "~/types/FeedbackForm";

export const useFeedbackStore = defineStore('feedback', () => {
  const { apiRequest } = useAPI()
  const loading = ref<boolean>(false)
  
  async function sendFeedback(data: FeedbackFormType): Promise<FeedbackFormResType> {
    loading.value = true
    const res = await apiRequest<FeedbackFormResType>('/feedback', 'POST', {
      body: data
    })
    loading.value = false
    return res
  }
  
  return { sendFeedback }
})
