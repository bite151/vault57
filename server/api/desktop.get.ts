export default defineEventHandler((event) => {
  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify([
    {
      key: 1,
      title: 'My computer',
      url: '/my-computer',
      icon: 'Laptop2'
    },
    {
      key: 3,
      title: 'Trash',
      url: '/trash',
      icon: 'Trash2'
    },
    // {
    //   key: 4,
    //   title: 'Settings',
    //   url: '#',
    //   icon: 'Settings'
    // },
    {
      key: 4,
      title: 'Games',
      url: '/games',
      icon: 'Gamepad2'
    },
    {
      key: 6,
      title: 'Отзывы',
      url: '/reviews',
      icon: 'MessageCircleHeart'
    }
  ]))
})
