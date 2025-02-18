export const useGalleryStore = defineStore('gallery', () => {
  const images = ref<any[]>([
    {
      id: 1,
      title: "Изображение 1",
      alt: "Gallery image",
      src: "/images/gallery/1.jpg"
    },
    {
      id: 2,
      title: "Изображение 2",
      alt: "Gallery image",
      src: "/images/gallery/2.jpg"
    },
    {
      id: 3,
      title: "Изображение 3",
      alt: "Gallery image",
      src: "/images/gallery/3.jpg"
    },
    {
      id: 4,
      title: "Изображение 4",
      alt: "Gallery image",
      src: "/images/gallery/4.jpg"
    },
    {
      id: 5,
      title: "Изображение 5",
      alt: "Gallery image",
      src: "/images/gallery/5.jpg"
    },
    {
      id: 6,
      title: "Изображение 6",
      alt: "Gallery image",
      src: "/images/gallery/6.jpg"
    },
    {
      id: 7,
      title: "Изображение 7",
      alt: "Gallery image",
      src: "/images/gallery/7.jpg"
    },
    {
      id: 8,
      title: "Изображение 8",
      alt: "Gallery image",
      src: "/images/gallery/8.jpg"
    },
    {
      id: 9,
      title: "Изображение 9",
      alt: "Gallery image",
      src: "/images/gallery/9.jpg"
    },
    {
      id: 10,
      title: "Изображение 10",
      alt: "Gallery image",
      src: "/images/gallery/10.jpg"
    },
    {
      id: 11,
      title: "Изображение 11",
      alt: "Gallery image",
      src: "/images/gallery/11.jpg"
    },
    {
      id: 12,
      title: "Изображение 12",
      alt: "Gallery image",
      src: "/images/gallery/12.jpg"
    },
    {
      id: 13,
      title: "Изображение 13",
      alt: "Gallery image",
      src: "/images/gallery/13.jpg"
    },
    {
      id: 14,
      title: "Изображение 14",
      alt: "Gallery image",
      src: "/images/gallery/14.jpg"
    }
  ])

  const isLoaded = ref<boolean>(false)
  const loading = ref<boolean>(false)

  return { images }
})
