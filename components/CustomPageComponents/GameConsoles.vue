<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { isMobile } = useDevice();
const props = defineProps<{
  id: string
}>()

const text = [
  {
    id: 1,
    txt: [
      {
        id: 1,
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
  },
  {
    id: 2,
    txt: [
      {
        id: 1,
        block: {
          title: 'SNES / Famicom <span>16-битный король из Японии</span>',
          lid: 'Если Dendy была приставкой детства, то Super Nintendo — мечтой из журналов и рассказов знакомых.<br/>Японская красотка с 16 битами мощности, плавной графикой и музыкой, от которой крышу сносило — у нас её мало кто видел, но все точно знали, что она «гораздо круче».',
          img: '/consoles/snes.jpg',
          subBlocks: [
            {
              subtitle: 'История создания и первые шаги',
              img: null,
              p: [
                'Super Nintendo Entertainment System (SNES), в Японии известная как Super Famicom, была выпущена компанией Nintendo в 1990 году. Эта приставка стала продолжением успешной NES (Nintendo Entertainment System) и обозначила новый этап в истории видеоигр, предоставив игрокам более сложные и графически насыщенные игры. SNES была оснащена 16-битным процессором, который позволил значительно улучшить визуальную составляющую игр, а также добавить более сложные и разнообразные звуковые эффекты.',
                'Приставка была быстро принята в Японии, США и других странах. В Европе и России SNES появилась несколько позже, в середине 90-х, и завоевала популярность благодаря невероятным играм и качеству исполнения. В отличие от первой приставки Nintendo, которая занимала нишу более массового сегмента, SNES сразу стала продуктом премиум-класса, доступным только в специализированных магазинах или через рынки и частных торговцев.'
              ]
            },
            {
              subtitle: 'SNES в России: начало эпохи',
              img: [
                '/consoles/snes-1.jpg',
                '/consoles/snes-3.jpg',
                '/consoles/snes-2.jpg',
              ],
              p: [
                'В России Super Nintendo пришла в начале 90-х, в самое разгаре расцвета пиратского игрового контента. Завозили её в основном через серые каналы, и найти SNES было настоящим вызовом. Стоила она немало — её цена могла доходить до 500-600 долларов, что для того времени было почти непомерной суммой. Но спрос был огромный, особенно в крупных городах, где начали появляться клубы, специализирующиеся на играх, и игры в стиле "поиграл-платил".',
                'Сетевые ларьки и рынки, а также обмен картриджами на диких барахолках стали неотъемлемой частью игровой культуры. Игры для SNES продавались в пластиковых коробках или просто на картриджах, которые покупались и менялись с огромной скоростью. Каждый картридж был настоящей находкой, а обмен играми стал привычной практикой среди геймеров.'
              ]
            },
            {
              subtitle: 'Культовые игры и эксклюзивы',
              img: null,
              p: [
                'Одной из главных причин, почему SNES стала такой культовой, были её игры. Среди самых известных и любимых тайтлов стоит выделить Super Mario World, The Legend of Zelda: A Link to the Past, Super Metroid, Donkey Kong Country и Street Fighter II. Эти игры не просто задавали стандарты качества, они были инновационными для своего времени, вводили новые механики и ставили новые требования к графике и музыке.',
                'Особенно стоит отметить эксклюзивы, такие как EarthBound, Secret of Mana и Chrono Trigger. Эти игры не только стали культовыми, но и до сих пор считаются одними из лучших ролевых игр в истории. В России эти проекты были не так широко доступны, но настоящие ценители смогли найти их и оценить по достоинству.',
                'Кроме того, SNES подарила миру легендарную серию Mario Kart, которая стала эталоном гоночных игр на консоли. В неё можно было играть как с друзьями, так и против компьютера, а фанаты до сих пор с ностальгией вспоминают первые гонки на своих 16-битных приставках.'
              ]
            },
            {
              subtitle: 'Значение SNES в игровой культуре',
              img: null,
              p: [
                'SNES не просто перевернула индустрию видеоигр, она сделала игровой процесс более глубоким и разнообразным. Это была первая приставка, которая предложила такие мощные игры, что игроки могли буквально забыть о времени, погружаясь в её миры. Кроме того, она сыграла ключевую роль в развитии японской видеоигровой культуры и стала символом целой эпохи.',
                'Для России SNES стала чем-то вроде таинственного острова: многие помнят её как продукт, доступный немногим, но оставивший неизгладимый след в памяти. Это была не просто приставка, а символ того времени, когда игрушки дарили настоящие приключения и когда каждый запуск игры превращался в маленькое событие.'
              ]
            },
            {
              subtitle: '«Новая реальность» и голос поколения',
              img: null,
              p: [
                'В 90-х годах игровая культура в России начала развиваться стремительно, и одним из главных катализаторов этого процесса стала передача «Dendy: Новая реальность». Ведущий программы — Сергей Супонев — стал настоящим героем для целого поколения. Он не просто рассказывал про игры: он жил ими, вдохновлял, давал почувствовать, что игры — это не просто развлечение, а целый мир, куда можно убежать от серых будней.',
                'Хотя шоу носило имя Dendy (клон NES), сам Супонев не раз подчёркивал, что считает Super Nintendo одной из лучших консолей своего времени. Именно её он называл технологическим прорывом, консолью, на которой «игры становятся искусством». Благодаря его харизме и искренней любви к играм, многие дети впервые узнали о SNES и стали охотиться за ней, несмотря на её редкость и высокую цену.',
                '«Новая реальность» стала не просто шоу, а входом в магический мир 16-битных приключений. И именно благодаря таким энтузиастам, как Супонев, приставки вроде SNES врезались в память надолго — не как просто техника, а как часть детства.'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    txt: [
      {
        id: 2,
        block: {
          title: 'Sega Mega Drive 2 <span>Гремел на весь подъезд</span>',
          lid: 'Когда в руках оказывался джойстик от Sega Mega Drive 2, мир вокруг исчезал. Яркие пиксели, зажигательные мелодии и игры, которые заставляли забыть обо всём, стали неотъемлемой частью детства.<br/>В России Mega Drive 2 стала настоящим культом, и каждый картридж с любимыми играми был как сокровище.',
          img: '/consoles/sega.jpg',
          subBlocks: [
            {
              subtitle: 'История создания и появление в России',
              img: null,
              p: [
                'Если у тебя в детстве не было Dendy, то наверняка была Sega. А если и её не было — ты точно знал кого-то, у кого она стояла в комнате как святыня. Sega Mega Drive 2 — это уже не просто «поиграть в Марио», это уровень посерьёзнее: Mortal Kombat с кровищей, Sonic, который быстрее ветра, и музыка, которую ты узнаешь с первых двух нот.',
                'Созданная японской корпорацией SEGA, Mega Drive (в США известная как Genesis) вышла в 1988 году, но в Россию массово попала уже во второй половине 90-х — с серыми поставками, китайскими ревизиями и надписями на коробках «16 битов». Mega Drive 2 — это обновлённая, чуть более компактная версия оригинальной консоли, выпущенная в 1993 году.'
              ]
            },
            {
              subtitle: 'Как появилась в России и сколько стоила',
              img: [
                '/consoles/sega-1.jpg',
                '/consoles/sega-2.jpg',
                '/consoles/sega-3.jpg',
              ],
              p: [
                'В России Mega Drive 2 стала настоящей легендой 90-х. В отличие от других игровых систем того времени, консоль не была таким уж дорогим удовольствием — в момент своего появления она стоила порядка 250–300 долларов, что позволяло ей занять нишу для среднего класса. Купить её можно было в магазинах и на рынках, а также у частных продавцов, которые привозили товары из-за рубежа.',
                'Иногда консоль приходила в комплекте с дисками на русском языке, но чаще всего к ней шли "пиратские" картриджи, наполненные хитами, для которых в домашних условиях можно было выбрать язык или даже перевести субтитры.'
              ]
            },
            {
              subtitle: 'Основные игры и эксклюзивы',
              img: null,
              p: [
                'Как и с любым культовым устройством, на Sega Mega Drive 2 были свои незабвенные хиты, которые навсегда врезались в память геймеров. Среди самых популярных — Sonic the Hedgehog, который стал иконой 16-битной эпохи. Но не менее известными были такие тайтлы как Street Fighter II, Mortal Kombat, Altered Beast, и, конечно, Phantasy Star — культовая RPG, не имеющая аналогов.',
                'Но Sega не останавливалась только на перекладке успешных игр с аркадных автоматов. Консоль славилась своими эксклюзивами, которые становились эталоном игр для 16-битных систем: Gunstar Heroes, Shining Force, ToeJam & Earl и другие. Эти игры полюбились по всему миру, и именно они превратили Sega в компанию, которая сделала шаг в сторону инноваций и творческих решений, создавая уникальные продукты для своих пользователей.'
              ]
            }
          ]
        }
      }
    ]
  }
]

const currentText = computed(() => text.find(block => block.id === +props.id)?.txt)

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
  if (!currentText.value) {
    return
  }

  currentTitle.value = null
  pageNumber.value = null

  await sleep(200)

  currentTitle.value = currentText.value.find(item => item.id === currentBlockId.value)?.block.title!
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
  if (!currentText.value) {
    return
  }

  if (!isMobile.value) {
    scrollPage(1)
  }

  currentTitle.value = currentText.value[0].block.title
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
        v-for="({ block, id }, index) in currentText"
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
            <p v-html="block.lid" v-if="block.lid" class="lid"/>
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
    margin-bottom: 16px;
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
      padding-bottom: 73%;
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
    margin-bottom: 12px;
    font-family: Play-Bold;
  }
}

</style>
