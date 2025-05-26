<script setup lang="ts">

import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";
import type {GalleryImage} from "~/types/Gallery";
import GalleryFile from "~/components/CustomPageComponents/Gallery/GalleryFile.vue";


const config = useRuntimeConfig()
const { isMobile } = useDevice()
const props = defineProps<{
  id: string,
}>()

const events = [
  {
    id: 1,
    color: '#CDB624',
    blocks: [
      {
        title: 'Ретро-тур',
        title2: 'для юных умов',
        subtitle: 'Погружаем детей в мир технологий',
        description: null,
        text: 'Что было до интернета, зачем нужны дискеты, <br/>' +
        'как выглядели первые игры и многое другое. <br/>' +
        'Весело, познавательно и с вау-эффектом!'
      },
      {
        title: 'Артефакты',
        title2: 'эпохи DOS',
        subtitle: 'Чувствуем себя настоящими сисадминами',
        description: 'Знакомимся с тем, с чего все началось',
        text: 'Ковыряемся в железе, разбираемся, запускаем, <br/>' +
        'что-нибудь ломаем, и обязательно чиним. <br/>' +
        'Всё по-настоящему.'
      },
      {
        title: 'От винтика до игры:',
        title2: 'Собираем комп',
        subtitle: 'Секреты компьютерных мастеров 90-х',
        description: null,
        text: 'Покажем, из чего состоит ПК:<br/>' +
        'где у него процессор, как вставляется оперативка, <br/>' +
        'зачем нужна видеокарта и что такое жесткий диск.<br/>' +
        'Объясняем, собираем, подключаем и запускаем вместе.<br/>' +
        'Без занудства и с практикой — каждый может попробовать сам.'
      },
      {
        title: 'игры, которых нет',
        title2: 'в Appstore',
        subtitle: 'Только приставки и картриджи, <br/>DOS, дискеты и твоя смекалка!',
        chips: ['Prince of Persia', 'Mario', 'Battle City', 'Pac-Man', 'Tetris', 'Flashback', 'Neverhood', 'Another World'],
        description: null,
        text: null
      },
      // {
      //   title: 'Магнитная плёнка',
      //   title2: 'магия vhs',
      //   subtitle: 'Знакомим с доцифровой эпохой',
      //   description: null,
      //   text: 'Запускаем VHS и погружаемся в ту самую атмосферу. <br/>' +
      //   'Здесь всё как раньше: <br/>' +
      //   'плёнка, перемотка и любимые герои. <br/>' +
      //   'Только без рекламы и подписки.'
      // },
    ],
    images: [
      {
        id: 1,
        src: '/events/events-1.jpg',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null,
        cover: true
      },
      {
        id: 2,
        src: '/events/events-2.jpg',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null
      },
      {
        id: 3,
        src: '/events/events-6.jpg',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null,
        style: 'margin-top: -36px; padding-bottom: 26px',
        cover: true
      },
      {
        id: 4,
        src: '/events/events-3.jpg',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null
      },
      {
        id: 5,
        src: '/events/events-8.jpg',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null,
        cover: true
      },
      {
        id: 6,
        src: '/events/events-7.png',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: null,
      },
      {
        id: 7,
        src: '/events/events-8.png',
        alt: '',
        title: 'Ретро-тур vol.2',
        date: '',
        width: 224,
        style: 'margin-top: -44px; height: 294px;',
        // cover: true
      },
    ],
  }
]

const currentEvent = computed(() => events.find(event => event.id === +props.id)!)
const color = computed(() => currentEvent.value.color)
const currentEventBlock = computed(() => currentEvent.value.blocks[blockNumber.value])

const blockNumber = ref<number>(0)
const blockEl = ref<HTMLDivElement | null>(null)
const animation = ref({
  top: false,
})

const previewer = ref<string | null>(null)

async function scrollToBlock(n: number) {
  if (!blockEl.value || animation.value.top) {
    return
  }

  animation.value.top = true
  await sleep(500)

  blockNumber.value = n
  blockEl.value.style.transform = `translateX(-${blockEl.value.clientWidth * blockNumber.value}px)`

  animation.value.top = false
}

function openPreviewer(image: GalleryImage) {
  previewer.value = image.src
}
</script>

<template>
  <div class="event-wrapper">
    <div
      v-if="currentEventBlock"
      :class="{'event_mobile': isMobile }"
      class="event"
    >
      <div class="main-controls">
        <button
          :disabled="blockNumber === 0"
          @click="scrollToBlock(blockNumber - 1)"
        >
          <AsyncIcon
            name="ChevronUp"
            :stroke-width="1.6"
            :size="28"
            color="#61615d"
          />
        </button>

        <button
          v-for="(_, n) in currentEvent.blocks"
          :disabled="blockNumber === n"
          class="to-block"
          @click="scrollToBlock(n)"
        >
          <AsyncIcon
            name="Dot"
            :stroke-width="1.6"
            :size="42"
            :color="`${n === blockNumber ? '#CDB624' : '#61615d' }`"
          />
        </button>

        <button
          :disabled="blockNumber === currentEvent.blocks.length - 1"
          @click="scrollToBlock(blockNumber + 1)"
        >
          <AsyncIcon
            name="ChevronDown"
            :stroke-width="1.6"
            :size="28"
            color="#61615d"
          />
        </button>
      </div>

      <div
        class="event-content"
        :class="{'event-content__animated': animation.top}"
      >
        <h2 class="title">
          {{ currentEventBlock.title }}
          <span :style="`color: ${currentEvent.color}`">{{ currentEventBlock.title2 }}</span>
        </h2>
        <p
          class="subtitle"
          v-html="currentEventBlock.subtitle"
        />
        <p
          v-if="currentEventBlock.description"
          class="description"
        >
          {{ currentEventBlock.description }}
        </p>

        <div
          v-if="currentEventBlock?.chips"
          class="chips"
        >
        <span v-for="chip in currentEventBlock.chips">
          {{ chip }}
        </span>
        </div>

        <p
          v-html="currentEventBlock.text"
          class="text"
        />
      </div>

      <div
        ref="blockEl"
        class="images-wrapper"
      >
        <div
          class="image"
          v-for="image in currentEvent.images"
          :key="image.src"
          :style="image.style"
        >
          <NuxtImg
            :width="`${image.width}px` || '100%'"
            :src="config.public.IMAGES_URL + image.src"
            :class="{'cover' : image?.cover}"
            format="webp"
            :placeholder="[50, 25, 75, 5]"
            loading="lazy"

            @click="openPreviewer(image)"
          />
        </div>
      </div>
    </div>

    <template v-if="!isMobile">
      <ClientOnly>
        <Teleport to="#main-content-teleport">
          <GalleryFile
            v-if="previewer"
            v-model="previewer"
            :images="currentEvent.images"
            @handle-close="() => previewer = null"
          />
        </Teleport>
      </ClientOnly>
    </template>
  </div>
</template>

<style scoped lang="scss">
.event-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: #222222;
}
.event {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 580px;
  height: 100%;
  background-color: #222222;
  overflow: hidden;

  &-content {
    padding: 32px 48px 0;
    transition: transform .5s ease-in-out, opacity .6s ease-in-out;

    &__animated {
      transform: translateY(-50%);
      opacity: 0;
    }
  }
}

.main-controls {
  position: absolute;
  top: 72px;
  right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .to-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;

    svg {
      flex-shrink: 0;
    }
  }
  button:disabled {
    cursor: default;
  }
  button:not(:disabled) {
    svg {
      transition: .3s ease-in-out;
    }
    &:hover svg {
      stroke: v-bind(color);
    }
  }
}

.title {
  margin-bottom: 32px;
  font-size: 40px;
  font-family: 'Pixy', sans-serif;
  line-height: 0.9;
  color: #f5f5f5;

  span {
    display: block;
    font-size: 52px;
    font-family: 'Pixy', sans-serif;
  }
}

.subtitle {
  margin-bottom: 4px;
  font-size: 19px;
  font-weight: 600;
  color: #f5f5f5;
}

.description {
  margin-bottom: 16px;
  color: #696A67;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 24px;

  span {
    padding: 6px 12px;
    border: 1px solid #BEBFB8;
    border-radius: 20px;
    color: #BEBFB8;
    font-size: 14px;
  }
}
.text {
  line-height: 1.5;
  color: #939C8E;
}

.images-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 16px;
  padding: 36px 48px;
  margin-bottom: -52px;
  transition: transform 1s ease-in-out;
}

.image {
  flex-shrink: 0;
  max-width: 332px;
  height: 250px;
  overflow: hidden;
  img {
    border-radius: 16px;
    &.cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}


.event_mobile {
  .main-controls {
    right: 11px;
  }
  .event-content {
    padding: 12px 52px 12px 24px;
  }
  .title {
    font-size: 32px;
    span {
      font-size: 38px;
    }
  }

  .images-wrapper {
    padding: 16px 24px;
  }

  .subtitle {
    font-size: 16px;
  }

  .text {
    font-size: 14px;
  }
}

</style>
