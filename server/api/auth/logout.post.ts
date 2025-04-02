import { useAPI } from "~/composables/useAPI";
import {splitCookiesString} from "h3";

export default defineEventHandler(async (event) => {
  const { fetchRaw } = useAPI()
  const url = '/auth/logout'
  const method = 'POST';
  const options = { body: {} }
  
  const res = await fetchRaw(url, method, options);
  
  const cookies = splitCookiesString(res?.headers.get('set-cookie') || '')
  for (const cookie of cookies) {
    appendHeader(event, 'set-cookie', cookie.trim())
  }
});

