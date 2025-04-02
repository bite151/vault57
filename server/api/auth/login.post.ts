import { useAPI } from "~/composables/useAPI";
import {splitCookiesString} from "h3";

export default defineEventHandler(async (event) => {
  const { fetchRaw } = useAPI()
  const { login, password } = await readBody(event)
  const url = '/auth/login'
  const method = 'POST';
  const options = { body: { login, password } }
  
  const res = await fetchRaw(url, method, options);
  
  const cookies = splitCookiesString(res?.headers.get('set-cookie') || '')
  for (const cookie of cookies) {
    appendHeader(event, 'set-cookie', cookie.trim())
  }
  
  return res?._data
});

