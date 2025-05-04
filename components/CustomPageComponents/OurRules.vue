<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { isMobile } = useDevice();

const text = [
  {
    id: 1,
    block: {
      title: 'Правила клуба Vault57 — <br><span>не как у мамки, но с порядком</span>',
      subBlocks: [
        {
          subtitle: 'Помни главное',
          img: null,
          p: [
            'Это не вписка у троюродного кореша твоего одноклассника, где обувь в пакете, а Dendy на полу.',
            'Здесь уютно, лампово и по-доброму, как у лучшего другана, к которому заскакиваешь «на пару часов» — а уходишь под утро.',
            'Так что веди себя соответственно: не понтуйся, не шали, и не забывай, что дискета — штука хрупкая.'
          ]
        },
        {
          subtitle: 'Уважай технику — это артефакты',
          img: null,
          p: [
            'Эти компьютеры и консоли старше, чем Instagram и TikTok . Не бей по клавишам, не пинай корпус и не ставь пивко на системник.',
            'Если что-то не работает — не чини сам, зови Стаса. Он в этом шарит.',
            'Если Стаса нет — зови Диму. Он тоже шарит ;)',
            'Не выдёргивай шнуры. Даже если «мне просто зарядиться».'
          ]
        },
        {
          subtitle: 'Играй честно, играй душой',
          img: null,
          p: [
            'Читы, крики и ломание джойстиков — мимо. Здесь не киберспорт, здесь ламповость.',
            'Если очередь — не жульничай. Сыграл раунд — уступи.',
            'Не сохраняйся поверх чужих сейвов. Это как затереть чью-то детскую фотку.'
          ]
        },
        {
          subtitle: 'Будь как братуха с района',
          img: null,
          p: [
            'Не токсичь. Мат через слово и споры «Сега круче» — только если по-доброму.',
            'Помогай новичкам. Помни, ты тоже когда-то не знал, как выйти из NC, а может и сейчас не знаешь.',
            'Делись ностальгией, но не учи жизни. Каждый приходит за своим вайбом.'
          ]
        },
        {
          subtitle: 'Еда и напитки — аккуратно',
          img: null,
          p: [
            'Кола и чипсы ок — но не над клавой. Пролил — вытер. Захрустел — не мешай другим.',
            'Алкоголь — строго в рамках. Это клуб, а не подвал с разборками.',
            'Если принес вкусняшку — делись, как в старые добрые.'
          ]
        },
        {
          subtitle: 'Ностальгия — с уважением',
          img: null,
          p: [
            'Постеры, журналы, диски — трогай аккуратно. Это не декор, это живая память.',
            'Хочешь принести что-то в коллекцию? Мы только за. Расскажи, что это, и откуда.',
            'Не выноси экспонаты за порог. Даже если «тебе очень надо показать другу».'
          ]
        },
        {
          subtitle: 'Ивенты, кино, тусовки — всем по кайфу',
          img: null,
          p: [
            'Пришёл на мероприятие — уважай формат. Не мешай другим кайфовать.',
            'Во время кино — тишина. Шутки после титров.',
            'Турниры — не повод разносить всё вокруг. Даже если ты проиграл в «Контру».'
          ]
        },
        {
          subtitle: 'Ты дома, но не один',
          img: null,
          p: [
            'Мы за уют, но помни: это общее пространство. Веди себя по-людски.',
            'Найдено — отдай. Потерял — обратись к админу.',
            'Уважай границы других. Не лезь в чужие сохранения, рюкзаки и личное пространство.'
          ]
        }
      ]
    }
  },
  {
    id: 2,
    block: {
      title: 'Система штрафов:<br><span>«Влепили бан по-братски»</span>',
      subBlocks: [
        {
          subtitle: 'Система штрафов',
          img: null,
          p: [
            'Админ — не злой босс, а типа старший брат. Но если кто-то ведёт себя как вражина в Mortal Kombat — может и прилететь «Game Over» на время.',
            'А если совсем уж лютый — бан навсегда.'
          ]
        },
        {
          subtitle: 'Устное предупреждение',
          img: null,
          p: [
            'Выдаётся за лёгкие нарушения — пролил, похрустел, потоксил, но не специально.',
            'Если админ сделал замечание — это ещё не бан, но звоночек.',
            'Повторишь — пойдём в «настройки поведения».'
          ]
        },
        {
          subtitle: 'Временный блок',
          img: null,
          p: [
            'Даётся на 1–2 недели за регулярные косяки.',
            'Например: жульничество в очереди, сейв-граб, ор во время ивента.',
            'Если нарушаешь вайб клуба — получаешь тайм-аут, как в старые добрые.'
          ]
        },
        {
          subtitle: 'Бан — «Game Over, дружище»',
          img: null,
          p: [
            'Ты серьёзно накосячил: сломал технику, украл, вёл себя как финальный босс.',
            'Алкогольные угары, агрессия и прочие «приключения» — сразу в бан.',
            'Вернуться можно только по решению администрации и с чистого листа.'
          ]
        },
        {
          subtitle: 'Как это работает',
          img: null,
          p: [
            'Все решения принимает админ. Он не тиран, но за клуб в ответе.',
            'Хочешь что-то оспорить — поговори, объясни.',
            '«Game Over» — это не всегда навсегда. Но второй шанс — это привилегия, а не право.'
          ]
        }
      ]
    }
  },
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
        const id = entry.target.getAttribute('data-rules-block-id')
        if (id) {
          currentBlockId.value = +id
          animate()
        }
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  const blockElements = document.querySelectorAll('[data-rules-block-id]')
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

    <div class="title-wrapper">
      <Transition
        enter-active-class="animate__animated animate__fadeInLeft animate__faster"
        leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
      >
        <h2
          v-if="currentTitle"
          class="title"
          v-html="currentTitle"
        />
      </Transition>
    </div>


    <Transition
      enter-active-class="animate__animated animate__fadeInUp animate__faster"
      leave-active-class="animate__animated animate__fadeOutDown animate__faster"
    >
      <div v-if="pageNumber" class="page-number">
        {{ pageNumber }}
      </div>
    </Transition>

    <div
      class="content-wrapper"
    >
      <div
        v-for="({ block, id }, index) in text"
        :data-rules-block-id="id"
        :key="`rules-block-${id}`"
        :id="`block-${id}`"
        :ref="el => setBlockRef(el, id)"
        class="block"
      >
        <h2 v-html="block.title" class="mobile-title"/>

        <div
          v-for="item in block.subBlocks"
          class="text-block"
        >
          <nuxt-img
            v-if="item.img"
            :src="`${config.public.IMAGES_URL}${item.img}`"
            class="main-img"
          />

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
  padding: 28px 0 0 0;
  //padding: 28px 24px 24px 40px;
  overflow: auto;
  z-index: 1;
}

.title-wrapper {
  flex-shrink: 0;
  width: 184px;
  height: 100%;
  padding: 24px 24px 24px 16px;
  display: flex;
  align-items: center;
  position: sticky;
  //background-color: #31322d;
  background-color: #3b3b38;
  overflow: hidden;
  z-index: 2;

  &:deep(.title) {
    writing-mode: sideways-lr;
    text-orientation: mixed;
    height: 100%;
    margin: 0;
    white-space: nowrap;

    font-size: 32px;
    color: #acaca6;
    line-height: 1.2;
    font-family: Play;
    user-select: none;

    span {
      font-weight: 600;
      color: #61615d;
      font-family: Play-Bold;
    }
  }
}

.mobile-title {
  display: block;
  margin-bottom: 36px;
  //white-space: nowrap;

  font-size: 28px;
  color: #61615c;
  line-height: 1.2;
  font-family: Play-Bold;
  user-select: none;

  &:deep(span) {
    font-size: 24px;
    font-weight: 600;
    color: #acaca6;
    font-family: Play-Bold;
  }
}


.block {
  padding: 36px 24px 36px 40px;
  min-height: 100%;
  &:nth-child(even) {
    background-color: rgba(#61615d, 0.1);
  }
}
.sub-title {
  margin-bottom: 20px;
  font-family: Play;
  font-size: 24px;
}

.page-number {
  position: absolute;
  bottom: -48px;
  right: -24px;
  font-family: Play-Bold;
  font-size: 256px;
  color: #e8e7e3;
  line-height: 1;

  user-select: none;
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

.main-img {
  width: 100%;
  //border-radius: 16px;
  margin-bottom: 24px;
}


.about-us_mobile {
  overflow: hidden;

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
  .title-wrapper {
    display: none;
  }
  .mobile-title {
    display: block;
    margin-bottom: 24px;
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

  .page-number {
    color: #d5d3ce;
  }
}

</style>
