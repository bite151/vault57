<script setup lang="ts">
const route = useRoute()
const emit = defineEmits(['onRedirect'])
const menuItems = ref([
  // {
  //   link: [
  //     '┌         ┐',
  //     'Главная',
  //     '└         ┘'
  //   ],
  //   url: '/'
  // },
  {
    link: [
      '┌         ┐',
      'О клубе',
      '└         ┘'
    ],
    url: '/about'
  },
  {
    link: [
      '┌         ┐',
      'Галерея',
      '└         ┘'
    ],
    url: '/gallery'
  },
  {
    link: [
      '┌        ┐',
      'Услуги',
      '└        ┘'
    ],
    url: '/services'
  },
  {
    link: [
      '┌         ┐',
      'События',
      '└         ┘'
    ],
    url: '/events'
  },
  {
    link: [
      '┌          ┐',
      'Контакты',
      '└          ┘'
    ],
    url: '/contacts'
  }
])

function isActive(url: string): boolean {
  return route.path === url
}

</script>

<template>
  <nav>
    <nuxt-link
      v-for="item in menuItems"
      :class="{ active: isActive(item.url) }"
      @click="emit('onRedirect', item.url)"
    >
      <span v-for="str in item.link">{{ str }}</span>
    </nuxt-link>
  </nav>
</template>

<style scoped lang="scss">
nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 14px 28px;
  text-align: center;
  z-index: 1;

  a {
    display: inline-block;
    margin: 0 28px;
    cursor: pointer;

    span {
      display: block;
      font-family: PxPlusIBM;
      font-size: 18px;
      white-space: pre;
      text-align: center;
      color: #A3AD9E;
      transition: .2s ease-in-out;
    }
    &:hover span {
      //color: #339303;
      color: #fff;
      text-shadow: 0 0 15px rgba(255,255,255, 0.4);
    }
  }

  &.dark a span {
    color: #625e5e;
  }

  &.dark a:hover span,
  &.dark a.active span {
    color: #2e840f;
    text-shadow: 0 0 15px rgba(#2e840f, .3);
  }
}
</style>
