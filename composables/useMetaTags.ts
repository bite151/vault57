import type {SEO} from "~/types/Page";

export function useMetaTags() {
  const config = useRuntimeConfig()
  
  const setMetaTags = (seo: SEO) => {
    useSeoMeta({
      title: seo.title,
      description: seo.description,
      
      // ogTitle: seo.ogTitle,
      // ogDescription: seo.ogDescription,
      // ogImage: seo.ogImage,
      ogUrl: config.public.SITE_URL + '',
      // ogType: seo.ogType
      
      ogLocale: 'ru',
      ogSiteName: config.public.SITE_NAME as string,
    })
  }
  
  return { setMetaTags }
}
