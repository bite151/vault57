export const usePagesStore = defineStore('pages', () => {
  const pages = ref<any[]>([
    {
      id: 1,
      parentId: 0,
      url: '/',
      title: 'Home',
      h1: 'Home',
      metaDescription: '',
      content: []
    },
    {
      id: 2,
      parentId: 1,
      url: '/about',
      title: 'About',
      h1: 'О клубе',
      metaDescription: '',
      content: []
    },
    {
      id: 7,
      parentId: 1,
      url: '/services',
      title: 'Услуги',
      h1: 'Услуги',
      metaDescription: '',
      content: []
    },
    {
      id: 3,
      parentId: 1,
      url: '/events',
      title: 'Эвенты',
      h1: 'События',
      metaDescription: '',
      content: []
    },
    {
      id: 9,
      parentId: 1,
      url: '/gallery',
      title: 'Фотки',
      h1: 'Фотографии',
      metaDescription: '',
      content: [],
      icon: 'Camera'
    },
    {
      id: 4,
      parentId: 1,
      url: '/games',
      title: 'Игры',
      h1: 'Игры',
      metaDescription: '',
      content: [],
      icon: 'Computer'
    },
    {
      id: 5,
      parentId: 1,
      url: '/consoles',
      title: 'Консоли',
      h1: 'Приставки',
      metaDescription: '',
      content: [],
      icon: 'Gamepad2'
    },
    {
      id: 6,
      parentId: 1,
      url: '/movies',
      title: 'Кинцо',
      h1: 'Кинозал и VHS',
      metaDescription: '',
      content: [],
      icon: 'Film'
    },
    {
      id: 8,
      parentId: 1,
      url: '/contacts',
      title: 'Контакты',
      h1: 'Контакты',
      metaDescription: '',
      content: []
    },
    {
      id: 10,
      parentId: 3,
      url: '/retro-playground-party-1',
      title: 'Retro Playground Party vol.1',
      h1: 'Retro Playground Party vol.1',
      metaDescription: '',
      content: [],
      icon: 'Swords'
    },
    {
      id: 11,
      parentId: 3,
      url: '/retro-playground-party-2',
      title: 'Retro Playground Party vol.2',
      h1: 'Retro Playground Party vol.2',
      metaDescription: '',
      content: [],
      icon: 'Joystick'
    },
    {
      id: 12,
      parentId: 2,
      url: '/history',
      title: 'История создания',
      h1: 'История',
      metaDescription: '',
      content: [],
      icon: 'FileType2'
    },
    {
      id: 13,
      parentId: 2,
      url: '/rules',
      title: 'Наши правила',
      h1: 'Правила',
      metaDescription: '',
      content: [],
      icon: 'FileText'
    },
    {
      id: 14,
      parentId: 3,
      url: '/retro-playground-party-3',
      title: 'Retro Playground Party vol.3',
      h1: 'Retro Playground Party vol.3',
      metaDescription: '',
      content: [],
      icon: 'FileHeart'
    },
    {
      id: 15,
      parentId: 3,
      url: '/retro-playground-party-4',
      title: 'Retro Playground Party vol.4',
      h1: 'Retro Playground Party vol.4',
      metaDescription: '',
      content: [],
      icon: 'Atom'
    },
    {
      id: 16,
      parentId: 3,
      url: '/retro-playground-party-5',
      title: 'Retro Playground Party vol.5',
      h1: 'Retro Playground Party vol.5',
      metaDescription: '',
      content: [],
      icon: 'PartyPopper'
    },
    {
      id: 17,
      parentId: 3,
      url: '/retro-playground-party-6',
      title: 'Retro Playground Party vol.6',
      h1: 'Retro Playground Party vol.6',
      metaDescription: '',
      content: [],
      icon: 'Gamepad'
    },
    {
      id: 18,
      parentId: 3,
      url: '/retro-playground-party-7',
      title: 'Retro Playground Party vol.7',
      h1: 'Retro Playground Party vol.7',
      metaDescription: '',
      content: [],
      icon: 'Dices'
    },
    {
      id: 19,
      parentId: 3,
      url: '/retro-playground-party-8',
      title: 'Retro Playground Party vol.8',
      h1: 'Retro Playground Party vol.8',
      metaDescription: '',
      content: [],
      icon: 'Gamepad2'
    },
    {
      id: 20,
      parentId: 8,
      url: '/location',
      title: 'Мы на карте',
      h1: 'Карта',
      metaDescription: '',
      icon: 'MapPinned',
      content: [],
      contentComponent: 'MapComponent',
      hideStatusBar: true,
    },
    {
      id: 21,
      parentId: 8,
      url: '/feedback-form',
      title: 'Обратная связь',
      h1: 'Написать нам',
      metaDescription: '',
      icon: 'Mail',
      content: [],
      contentComponent: 'FeedbackForm',
      hideStatusBar: true
    },
    {
      id: 22,
      parentId: 4,
      url: '/rpg',
      title: 'RPG',
      h1: 'RPG',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 23,
      parentId: 4,
      url: '/action',
      title: 'Action',
      h1: 'Action',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 27,
      parentId: 4,
      url: '/arcade',
      title: 'Arcade',
      h1: 'Arcade',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 28,
      parentId: 4,
      url: '/fps',
      title: 'FPS',
      h1: 'FPS',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 29,
      parentId: 4,
      url: '/quest',
      title: 'Quest',
      h1: 'Quest',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 33,
      parentId: 4,
      url: '/file/readme.txt',
      title: 'readme.txt',
      h1: 'readme.txt',
      metaDescription: '',
      content: [],
      icon: 'FileText'
    },
    {
      id: 30,
      parentId: 4,
      url: '/racing',
      title: 'Racing',
      h1: 'Racing',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 31,
      parentId: 4,
      url: '/simulator',
      title: 'Simulator',
      h1: 'Simulator',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },
    {
      id: 32,
      parentId: 4,
      url: '/strategy',
      title: 'Strategy',
      h1: 'Strategy',
      metaDescription: '',
      content: [],
      icon: 'Folder'
    },

    {
      id: 34,
      parentId: 22,
      url: '/fallout',
      title: 'Fallout',
      h1: 'Fallout',
      metaDescription: '',
      content: [],
      icon: 'AppWindow'
    },
    {
      id: 35,
      parentId: 22,
      url: '/fallout2',
      title: 'Fallout 2',
      h1: 'Fallout 2',
      metaDescription: '',
      content: [],
      icon: 'AppWindow'
    },
  ])

  const isLoaded = ref<boolean>(false)
  const loading = ref<boolean>(false)

  return { pages }
})
