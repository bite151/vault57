<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { isMobile } = useDevice();

const text = [
  {
    id: 1,
    block: {
      title: 'Игровые клубные сессии — <br><span>баталии за титул чемпиона</span>',
      subBlocks: [
        {
          subtitle: 'Почасовая аренда ретро-компьютеров и консолей',
          img: null,
          p: [
            'Выбирай любимую платформу — от ZX Spectrum до первой PlayStation — и играй в своё удовольствие. Оплата почасовая, но воспоминания — навсегда.'
          ]
        },
        {
          subtitle: 'Групповые игровые сессии\r\n(до 10 игроков)',
          img: null,
          p: [
            'Собирай команду и устраивай локальную зарубу: Half-Life, Counter-Strike, Quake, Warcraft III или даже Worms или Heroes of Might and Magic III. Битва всех против всех или кооператив — решать вам.'
          ]
        },
        {
          subtitle: 'Ретро-турниры с призами и мерчем',
          img: null,
          p: [
            'Участвуй в настоящих соревнованиях по любимым старым играм. Победителей ждут призы, уважение зала и уникальный клубный мерч.'
          ]
        },
        {
          subtitle: 'Тематические вечера: DOS night, Sega vs Nintendo',
          img: null,
          p: [
            'Погружаемся в эпоху. Один вечер — одна тема: ностальгия, игры, музыка, одежда, даже запахи! Кто кого — Сега или Нинтендо?'
          ]
        },
      ]
    }
  },
  {
    id: 2,
    block: {
      title: 'Ивенты и тусовки<br><span>ночные кинопросмотры, <br/>живая музыка</span>',
      subBlocks: [
        {
          subtitle: 'Киноночи в стиле 90-х',
          img: null,
          p: [
            'Смотрим классику VHS-эпохи на большом экране: пледы, попкорн и культовые блокбастеры в переводе Гаврилова и Володарского. Всё по-старому, только без зажевывания пленки.'
          ]
        },
        // {
        //   subtitle: 'Ламповая музыка вживую: чиптюн, 8-бит, synthwave',
        //   img: null,
        //   p: [
        //     'Настоящие живые сеты и диджеи, создающие звук, как из дендевской картриджи. Отпаиваем ушные ностальгические рецепторы.'
        //   ]
        // },
        {
          subtitle: 'Retro Playground Party',
          img: null,
          p: [
            'Свободный формат тусовки с приставками, музыкой, конкурсами и угаром. С возможностью забрать призовой банк. Взрослые дети отрываются, как в 2001-м.'
          ]
        },
        {
          subtitle: 'Просмотр спортивных матчей',
          img: null,
          p: [
            'Футбол, хоккей или старые рестлинг-записи — собираемся компанией, кричим у экрана, болеем, обсуждаем. Всё как в детстве, только на большом экране и с холодным пивком.'
          ]
        },
        {
          subtitle: 'День открытых дверей / ностальгические лекции',
          img: null,
          p: [
            'Можно зайти бесплатно, всё пощупать и послушать, как это было. Истории, байки, ответы на вопрос “А это точно работало?”'
          ]
        },
      ]
    }
  },
  {
    id: 3,
    block: {
      title: 'Дни рождения и вечеринки — <br/><span>празднуем, как на хате <br/>у лучшего друга</span>',
      subBlocks: [
        {
          subtitle: 'Аренда зоны под празднование — это как у друга, но с техникой',
          img: null,
          p: [
            'Пространство с диванами, телеками, и всей этой магией — под твой день. Игры, музыка, своя атмосфера.'
          ]
        },
        {
          subtitle: 'Настраиваем игры под вкусы гостей — от Battle City до Unreal Tournament',
          img: null,
          p: [
            'Подберём сетап под каждого: ретро-платформеры, стрелялки, файтинги. Главное — чтобы всем было весело.'
          ]
        },
        {
          subtitle: 'Можем выдать медаль «За скуфость» или грамоту «Герой Dendy»',
          img: null,
          p: [
            'Праздник должен оставлять след. Мы выдаём клубные награды тем, кто особенно душевно залипал.'
          ]
        },
      ]
    }
  },
  {
    id: 4,
    block: {
      title: 'Корпоративы и ретро-тимбилдинг — <br><span>работа с вайбом LAN-party</span>',
      subBlocks: [
        {
          subtitle: 'Олдскульные турниры для коллег: «Разнеси босса в Quake»',
          img: null,
          p: [
            'Никаких скучных тренингов — только заруба в Quake, Worms или StarCraft. Проигравший проставляется или делает кофе.'
          ]
        },
        {
          subtitle: 'Настоящие LAN-party — все в одной сети, как в 2003-м',
          img: null,
          p: [
            'Соединяем машины, включаем Diablo, и вперёд. Без интернета, зато с криками и драйвом.'
          ]
        },
        {
          subtitle: 'Битва отделов: маркетинг vs разработка, геймпады на стол!',
          img: null,
          p: [
            'Сплочение коллектива через пиксели. Кто лучше играет — тот и прав.'
          ]
        },
      ]
    }
  },
  {
    id: 5,
    block: {
      title: 'Винтажный коворкинг — <br><span>пиши код под музон из Winamp\'a</span>',
      subBlocks: [
        {
          subtitle: 'Уютное место «поработать в стиле 2003-го»',
          img: null,
          p: [
            'Садишься за древний IBM, включаешь Windows 95 и пишешь план захвата мира. Шутка... Просто делаешь свои задачи, но с вайбом.'
          ]
        },
        {
          subtitle: 'Полка с комиксами и журналами (можно читать на месте)',
          img: null,
          p: [
            'Хочешь перерыв — бери «Игроманию» или «Dendy — новая реальность», читай, кайфуй, вспоминай времена до лайков.'
          ]
        },
        {
          subtitle: 'Чай, энергетики, печенюшки',
          img: null,
          p: [
            'Простой человеческий набор для вдохновения и продуктивности. Всё включено.'
          ]
        },
      ]
    }
  },
  {
    id: 6,
    block: {
      title: 'Экскурсии и спецмероприятия — <br><span>прошлое оживает в байтах<br/>и пикселях</span>',
      subBlocks: [
        {
          subtitle: 'Экскурсии по клубу: рассказываем про каждую машину, легенды, байки из 90-х',
          img: null,
          p: [
            'Каждый комп — герой. Мы покажем, где запускался Doom, где залипали в «Космических рейнджеров», и как появилась надпись «не трогай — сломается».'
          ]
        },
        {
          subtitle: 'Школьные группы и студенты: интерактивный формат «как играли до интернета»',
          img: null,
          p: [
            'Погружаем в эпоху до TikTok. Включаем «Танчики», объясняем, что такое дискета, и почему Alt+F4 — это не лайфхак.'
          ]
        },
        {
          subtitle: 'Исторический стендап от админа: всё как было, но с угаром',
          img: null,
          p: [
            'Наш главный гик расскажет, как в 1994-м грузили драйвера с журналов, и зачем вообще нужен был Norton Commander.'
          ]
        },
      ]
    }
  },
  {
    id: 7,
    block: {
      title: 'Мастерская — <br/><span>ремонт, настройка<br/> и ковыряние с душой</span>',
      subBlocks: [
        {
          subtitle: 'Настройка и обслуживание ретро-техники',
          img: null,
          p: [
            'Приносишь своего старичка — мы его чистим, настраиваем, оживляем. Прям как в 90-х, только с антистатиком.'
          ]
        },
        {
          subtitle: 'Мелкий ремонт старых компов и геймпадов',
          img: null,
          p: [
            'Не работает кнопка? Шнур перебит? Приноси — проверим, припаяем, оживим. Почти как дед в гараже, но с флюсом.'
          ]
        },
        {
          subtitle: 'Помощь в восстановлении старых ПК \r\n (приносишь — вместе ковыряемся)',
          img: null,
          p: [
            'Совместный ремонт — это как LAN-party, только с отвёртками. Учимся, вспоминаем, собираем легенду заново.'
          ]
        },
        {
          subtitle: 'Консультации по сборке олдскульных конфигураций',
          img: null,
          p: [
            'Хочешь собрать себе ретро-ПК, но не знаешь с чего начать? Мы подскажем, подберём, расскажем, где что найти и как не купить кирпич.'
          ]
        },
      ]
    }
  },
  {
    id: 8,
    block: {
      title: 'Все это и многое другое — <br><span>в ретро-клубе Vault57</span>',
      subBlocks: [
        {
          subtitle: 'Мы открыты к любым, даже самым безумным, предложениям',
          img: null,
          p: [
            'Хотите отметить годовщину выхода Windows 95? Провести свадьбу под музыку из Doom? Устроить вечер в стиле Worms Armageddon? Мы за!',
            'Можно прийти в костюме процессора, арендовать зал под конкурс «самый быстрый Alt+Tab», или сыграть в «Угадай игру по звуку загрузки».',
            'Если у вас есть идея, от которой у других дергается глаз — мы жмём вам руку и вы по адресу. Пишите, звоните, договоримся.'
          ]
        },
      ]
    }
  }
];

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
        const id = entry.target.getAttribute('data-services-block-id')
        if (id) {
          currentBlockId.value = +id
          animate()
        }
      }
    })
  }

  const observer = new IntersectionObserver(callback, options)

  const blockElements = document.querySelectorAll('[data-services-block-id]')
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
        :data-services-block-id="id"
        :key="`services-block-${id}`"
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
  min-height: calc(80vh - 48px);
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
