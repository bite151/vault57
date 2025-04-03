import { useAPI } from "~/composables/useAPI";
import {Page} from "~/types/Page";


export default defineEventHandler(async (event) => {
  const { fetch } = useAPI()
  const url = '/pages'
  const method = 'GET';
  
  const res = await fetch<Page[]>(url, method, {});
  
  return res.map(page => ({
    ...page,
    content: typeof page.content === 'string'
      ? JSON.parse(page.content)
      : page.content,
  }))
});

