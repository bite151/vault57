import type {SEO} from "~/types/Page";

export function useMetaTags() {
  const config = useRuntimeConfig()
  
  const setMetaTags = (seo: SEO, pageUrl: string) => {
    useSeoMeta({
      title: seo.title,
      description: seo.description,
      ogTitle: seo.ogTitle || seo.title,
      ogDescription: seo.ogDescription || seo.ogDescription,
      ogImageUrl: seo.ogImageUrl || config.public.IMAGES_URL + '/brand/og-main-image.png',
      ogImageWidth: '1200',
      ogImageHeight: '630',
      ogImageAlt: seo.title,
      
      ogUrl: config.public.SITE_URL + pageUrl,
      ogType: 'website',
      ogLocale: 'ru',
      ogSiteName: config.public.SITE_NAME as string,
    }, { tagPriority: 0 })
  }
  
  return { setMetaTags }
}
