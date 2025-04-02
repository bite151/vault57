import { useAPI } from "~/composables/useAPI";


export default defineEventHandler(async (event) => {
  const { fetchRaw } = useAPI()
  const headers = getRequestHeaders(event)
  const url = '/users/profile'
  const method = 'GET';
  const options = {
    headers,
  }

  const res = await fetchRaw(url, method, options);
  return res?._data
});

