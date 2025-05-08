<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { isMobile } = useDevice();

const text = [
  {
    id: 3,
    block: {
      title: 'Dendy Junior <span>первая любовь нашего детства</span>',
      lid: 'Утро субботы, хрущевка, запах маминых блинчиков и гудящий телевизор «Рекорд».<br/>Картриджи в коробке из-под обуви, джойстик с заевшей кнопкой, и никакой спешки — только ты и 8-битный мир.',
      img: '/consoles/famicom.jpg',
      subBlocks: [
        {
          subtitle: 'Рождение легенды: от Японии до Тайваня',
          img: [],
          p: [
            'История Dendy началась с японской Nintendo Famicom (1983), но настоящую популярность в России она получила через тайваньские клоны. В 1989 году компания Micro Genius выпустила Dendy Junior — почти точную копию, но в желтом корпусе и с адаптацией под наши телевизоры.',
            'Интересный факт: название «Dendy» придумали русские импортеры — оно звучало «по-западному» и легко запоминалось. Настоящий же производитель называл ее просто «Family Game».'
          ]
        },
        {
          subtitle: 'Как Dendy попала в Россию',
          img: [
            '/consoles/famicom1.jpg',
            '/consoles/famicom2.jpg',
            '/consoles/famicom3.png',
          ],
          p: [
            'Первые партии появились в 1992-93 годах благодаря предпринимателям, которые закупали приставки в Тайване. Цена в $50 была огромной (средняя зарплата — $20-30), но спрос оказался бешеным.',
            'К 1994 году началось массовое производство пиратских картриджей в России. Фирма «Стереозвук» даже открыла официальное представительство Dendy, хотя сама не имела отношения к оригинальному производителю.'
          ]
        },
        {
          subtitle: 'Социальный феномен 90-х',
          img: [],
          p: [
            'Настоящая магия происходила на рынках и в переходах. В ларьках с надписью «Dendy» продавали картриджи по 10-20 рублей (пиратские, конечно). Самые ходовые — 999-in-1 (где на самом деле было 10 игр, повторяющихся 100 раз).',
            'Особо ценились «золотые» картриджи с 100 играми — они стоили дороже, но часто содержали редкие хиты вроде «Snow Brothers» или «Battletoads».'
          ]
        },
      ]
    }
  }
]

const blockRefs = ref<Record<number, HTMLDivElement>>({})

const currentBlockId = ref<number | null>(null)
const currentTitle = ref<string | null>(null)
const pageNumber = ref<string | null>('01')

const observeBlocks = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
  }

  const callback = async (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('data-about-block-id')
        if (id) {
          currentBlockId.value = +id
          animate()
        }
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  const blockElements = document.querySelectorAll('[data-about-block-id]')
  blockElements.forEach(el => observer.observe(el))

  return () => observer.disconnect()
}

let cleanup: (() => void) | null = null

const setBlockRef = (el: HTMLDivElement | null, id: number) => {
  if (el) {
    blockRefs.value[id] = el
  }
}

async function animate() {
  currentTitle.value = null
  pageNumber.value = null
  await sleep(200)

  currentTitle.value = text.find(item => item.id === currentBlockId.value)?.block.title!
  pageNumber.value = '0' + currentBlockId.value
}

function scrollPage(n: number) {
  if (n < 0 && currentBlockId?.value && currentBlockId.value <= 1) {
    return
  }

  const block = blockRefs.value[currentBlockId.value + n]
  if (block) {
    block.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }
}

onMounted(() => {
  if (!isMobile.value) {
    scrollPage(1)
  }

  currentTitle.value = text[0].block.title
  cleanup = observeBlocks()
})

onBeforeUnmount(() => {
  if (cleanup) cleanup()
})
</script>

<template>
  <div
    class="about-us"
    :class="{'about-us_mobile': isMobile}"
  >
    <div class="left-column">
      <div class="logo">
        <p class="vault">Vault</p>
        <p class="v-57">57</p>
      </div>

      <div class="controls">
        <button @click="scrollPage(-1)">
          <AsyncIcon name="CircleArrowLeft" :stroke-width="1.6" :size="28" color="#61615d"/>
        </button>

        <button @click="scrollPage(+1)">
          <AsyncIcon name="CircleArrowRight" :stroke-width="1.6" :size="28" color="#61615d"/>
        </button>
      </div>
    </div>

    <div
      class="content-wrapper"
    >
      <div
        v-for="({ block, id }, index) in text"
        :data-about-block-id="id"
        :key="`about-block-${id}`"
        :id="`block-${id}`"
        :ref="el => setBlockRef(el, id)"
        class="block"
      >
        <div class="header">
          <div class="img-wrapper">
            <nuxt-img
              v-if="block.img"
              :src="`${config.public.IMAGES_URL}${block.img}`"
              class="main-img"
            />
          </div>

          <div class="title-wrapper">
            <p v-html="block.lid" class="lid"/>
            <h2 v-html="block.title" class="title"/>
          </div>
        </div>

        <div
          v-for="item in block.subBlocks"
          class="text-block"
        >
          <div
            v-if="item.img?.length"
            class="block-images"
          >
            <div
              v-for="img in item.img"
              :key="img"
              class="img-wrapper"
            >
              <nuxt-img
                :src="`${config.public.IMAGES_URL}${img}`"
                class="img"
              />
            </div>

          </div>

          <h3
            v-if="item.subtitle"
            class="sub-title"
          >
            {{ item.subtitle }}
          </h3>

          <p v-for="txt in item.p">
            {{ txt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-us {
  display: flex;
  position: relative;
  height: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 24px 24px;
  background-color: #31322d;
}

.logo {
  display: flex;
  align-items: baseline;
  user-select: none;
}

.vault {
  font-size: 40px;
  letter-spacing: -2px;
  color: #61615d;
  z-index: 1;
  font-family: Play-Bold;
}

.v-57 {
  margin-left: -20px;
  font-size: 68px;
  font-weight: 600;
  letter-spacing: -12px;
  color: #c7c7c3;
  font-family: Play;
}

.controls {
  display: flex;
  justify-content: space-evenly;
}

.content-wrapper {
  overflow: auto;
  z-index: 1;
}

.header {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  .img-wrapper {
    flex-shrink: 0;
    position: relative;
    width: 50%;
    padding: 24px 24px 50%;
    background-color: #e8e7e3;
    border-radius: 24px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      border-radius: 24px;
    }
  }
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  position: relative;
  display: block;
  //padding: 0 24px;

  font-size: 36px;
  color: #61615c;
  font-family: Play-Bold;
  user-select: none;
  z-index: 1;

  &:deep(span) {
    display: inline-block;
    margin-top: 4px;
    font-size: 24px;
    line-height: 1.2;
    font-weight: 600;
    color: #acaca6;
    font-family: Play-Bold;
  }
}

.lid {
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 24px;
  background: #eeeeec;
  color: #71716c;
  font-style: italic;
  &:deep(br) {
    margin-bottom: 8px;
  }
}
.block {
  padding: 36px 24px 36px 40px;
  min-height: 100%;
  &:nth-child(even) {
    background-color: rgba(#61615d, 0.1);
  }
}

.block-images {
  display: flex;
  flex-direction: row;

  gap: 24px;
  margin-bottom: 36px;

  .img-wrapper {
    position: relative;
    flex: 1;
    //width: 31%;
    padding-bottom: 25%;
    &:deep(.img) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      border-radius: 24px;
    }
  }
}

.sub-title {
  margin-bottom: 20px;
  font-family: Play;
  font-size: 24px;
}

.text-block {
  margin-bottom: 48px;

  &:last-of-type {
    margin-bottom: 0;
  }
  p {
    margin-bottom: 12px;
    line-height: 1.4;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}


.about-us_mobile {
  overflow: hidden;
  .header {
    flex-direction: column;
    .img-wrapper {
      width: 100%;
      padding-bottom: 66%;
    }

    .lid {
      padding: 0;
      background-color: transparent;
    }
  }

  .block-images {
    flex-direction: column;

    .img-wrapper {
      padding-bottom: 50%;
    }
  }

  .title {
    margin-bottom: 0;
  }

  .content-wrapper {
    //padding: 24px;
    .block  {
      padding: 36px 24px;
    }

    .block:first-of-type {
      padding-top: 0;
    }
  }
  .text-block {
    margin-bottom: 32px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  .left-column {
    display: none;
  }
  .title {
    display: block;
    //margin-bottom: 24px;
    //white-space: nowrap;

    font-size: 24px;
    color: #3e403b;
    line-height: 1.2;
    font-family: Play-Bold;
    user-select: none;

    &:deep(span) {
      font-weight: 600;
      color: #61615d;
      font-family: Play-Bold;
    }
  }

  .sub-title {
    font-size: 20px;
    margin-bottom: 16px;
    font-family: Play-Bold;
  }
}

</style>
