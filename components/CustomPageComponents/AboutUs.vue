<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {sleep} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { isMobile } = useDevice();

const text = [
  {
    id: 1,
    block: {
      title: 'Когда прошлое не отпускает — <br><span>перестрой его заново</span>',
      subBlocks: [
        {
          subtitle: 'Есть такая штука, как ностальгия',
          img: null,
          p: [
            'Иногда она находит тебя внезапно — и пробивает в нос как какой-то запах из подъезда, «скрип» подключения dual-up модема или старый добрый Winamp, на котором ты запускал "Linkin Park — In the End" в 2000м.',
            'И вот ты вроде взрослый, у тебя работа, ипотека, аккаунт на «Госуслугах»...',
            '...ты идёшь с кофе в офис, а в голове вдруг всплывает — не отчёт по проекту, а Half-life на карте Crossfire, и друг, который матерится в микрофон с таким эхом, будто говорит из бетонного бункера. Всё. Ты мысленно уже сидишь за тем квадратным монитором, и ловишь кайф.',
            'А когда тебе уже под тридцатку или чуть больше, жизнь становится какой-то... слишком отформатированной. Всё в рамках: тайм-менеджмент, CRM, фитнес-браслеты, графики. И иногда так хочется просто сбежать. Вернуться в ту самую комнату, где пыль на мониторе, наушники в изоленте, на стене постер с Duke Nukem\'ом, а на полках разбросана коллекция mp3 на затертых CD плеером болванках.',
            'Так вот тут и начинается история.'
          ]
        },
        {
          subtitle: '',
          img: '/brand/friends.jpg',
          p: [
            'Стас и Дима — два айтишника, которые видели многое. Они застали те времена, когда в середине 90-х компьютеры только начали появляться в домах, а Windows ставили с дискет, в 2000-х настраивали локальную сеть на районе, потому что интернет был медленный и стоил как крыло от самолета. Эти двое прошли сквозь всё — через лаги, баги, синие экраны и те самые пиратские диски с играми с корявой руссификацией.',
            'Оба в своё время работали администраторами в компьютерных клубах. Видели всё: от забивонов в StarCraft до школьников, которые «просто посмотреть, дядь, у меня денег нет». И знают всю эту кухню изнутри.'
          ]
        },
        {
          subtitle: 'У каждого из них своя суперсила',
          img: '',
          p: [
            'Стас — технарь до мозга плат. Он может оживить мёртвый блок питания одним взглядом, воскресить древний IBM и сделать так, чтобы Windows 98 грузилась быстрее, чем ты успеешь сказать «Counter-Strike». Именно он охотился за ЭЛТ-мониторами по всей стране, торговался с продавцами на Авито и тащил домой системники «на запчасти, вдруг пригодится» — и пригодилось!',
            'В клубе он отвечает за технику, стабильность и ту самую ламповую надёжность. Если что-то не работает — зовите Стаса. А если работает — значит, кто-то уже звал.'
          ]
        },
        {
          subtitle: '',
          img: '',
          p: [
            'Дима — отвечает за душу, стиль и вайб. Он первым встречает гостей, первым предлагает поиграть в что-нибудь классное и последним выключает свет.',
            'Он придумал «ностальгический уголок» с VHS, он таскает старые журналы с барахолок, и он же проводит кинопоказы так,  будто вы в 2002-м пришли к другу на ночь. Его миссия простая — чтобы ты зашёл «на минутку» и остался на весь вечер, потому что понял — это место сделано с любовью. С тем самым чувством, которое нельзя скачать с торрента.'
          ]
        },

        {
          subtitle: '',
          img: '',
          p: [
            'Вместе они как старый добрый дуэт в кооперативной игре: один ковыряется в железе, второй заводит толпу, чтобы всё это зажило и полетело.',
            'Именно так и родился Vault57 — не как бизнес, а как большое приключение двух друзей. Их ретро-компьютерный клуб не просто копирует дух начала 2000-х, а действительно живёт по тем законам. Не ради фана, а потому что по-другому — ну не то.'
          ]
        },
      ]
    }
  },

  {
    id: 2,
    block: {
      title: 'Два чувака, одна идея <br/><span>и куча старого железа</span>',
      subBlocks: [
        {
          subtitle: 'Сначала была мечта (и много отваги)',
          img: null,
          p: [
            'У Димы и Стаса не было инвесторов, грантов и бизнес-плана на 30 страниц. Зато была груда компьютерного железа и огромное желание оживить атмосферу старого доброго компьютерного клуба. ',
            'Началось всё с того, что нашлась аренда — подвал в самом центре города, с трубами на потолке и духом времени, который чувствовался сразу. Место было не гламурное, но с характером. Парни собрали мебель из того, что смогли найти: столы, деревянные стеллажи, заказали кресла. Интерьер немного подкрутили под нужную эстетику — где-то покрасили, где-то обклеили постерами, а Дима установил светодиодные ленты, подсветки, и сразу стало понятно — это уже не просто подвал.'
          ]
        },
        {
          subtitle: 'И понеслась...',
          img: null,
          p: [
            'Когда стены обрели атмосферу, пришло время оживлять сердце клуба — компьютеры. Из старого, но добротного железа собрали 10 системников. Что-то пришлось докупить — корпус тут, видеокарта там, пара кулеров с Авито и немного магии от Стаса. Все машины — на Windows XP: не настолько древняя, чтобы страдать, но достаточно олдовая, чтобы душа радовалась и сводило олдскулы.',
            'Мониторы — это отдельная эпопея. ЭЛТ\'шки искали по всей стране: на Авито, по знакомым, у продавцов на форумах, уговаривали упаковать и отправить транспортной. Кто-то крутил пальцем у виска, кто-то радовался, что «добро не пропадёт». Но ради вайба — оно того стоило.',
            'Дрова накатили, сеть настроили, подняли сервер, чтобы можно было гонять друг против друга по старой доброй локалке, без всяких онлайнов и подписок. Установили золотую классику: Counter-Strike 1.6, Quake III, Warcraft III, NFS, FlatOut, GTA и прочие легенды. Всё как тогда — заходишь, включаешь, и будто не было этих двадцати лет.'
          ]
        },
        {
          subtitle: 'Ретро с душой',
          img: null,
          p: [
            'Чтобы клуб стал не только игровым, но и настоящим местом для тусовки, Дима притаранил старенький, но бодрый кинопроектор, повесил экран на стену и подключил к системе пару колонок Radiotehnika S30 — получилось настоящее ретро-кино с вайбом VHS-вечеров. Принесли несколько игровых приставок: от доброй старушки Dendy до PlayStation 2 — чтобы каждый мог вспомнить, как это было, или открыть для себя классику заново.',
            'Сначала всё шло неспешно: кто-то заглядывал случайно, кто-то из знакомых решил посмотреть, что за странный подвал в центре города. Толп не было — и это даже к лучшему. Зато каждый пришедший оставался надолго: играл, болтал, и, если проникался атмосферой, обещал вернуться. А потом начинались сюрпризы — один принёс старый VHS с мультиками, другой — журнал «Игромания» из 2003-го, третий притащил коробку с CD-дисками.',
            'Всё это оказалось не «хламом», а живым архивом эпохи. Так стены клуба обросли историями, и каждый экспонат здесь не просто для антуража, а с настоящим прошлым и чьей-то личной памятью. Постепенно клуб стал похож на музей.'
          ]
        }
      ]
    }
  },

  {
    id: 3,
    block: {
      title: 'Когда хобби выросло в музей <br/><span>а гости — в сообщество</span>',
      subBlocks: [
        {
          subtitle: 'Каждый компьютер здесь — живая история',
          img: null,
          p: [
            'Когда к нам приходят экскурсии, мы не просто показываем «старые коробки». Мы даём прикоснуться к легендам. Вот наш золотой фонд:',
            'AcerMate 600 с Windows 3.11 — эта машинка помнит времена, когда «окна» были новинкой, а мышка казалась космической технологией. Дети обалдевают, когда понимают, что здесь нет кнопки «Пуск», а интерфейс больше похож на конструктор.',
            'Наш Compaq Presario 433 сейчас на «реанимации» — Стас ковыряется в нём, как хирург. Когда оживим, он снова будет играть ту самую «квадратную» Цивилизацию.',
            'Особая гордость — Intel 486 с оригинальной MS-DOS начала 90-х. Это как капсула времени: система не переустанавливалась с тех пор, когда «железный занавес» только рухнул. Здесь даже есть папка «Games» с тем самым Prince of Persia, где принц бегал как на шарнирах.',
            'Cyrix M2 — редкий зверь из прошлого. В 90-е эти процессоры покупали те, кому Pentium был не по карману. Сейчас он работает медленнее смартфона, но зато как атмосферно гудит при запуске Heroes of Might and Magic II!',
            'Pentium II с Windows 98 — наш рекордсмен. 25 лет без переустановки! Эта система пережила Y2K, все вирусы «нулевых» и до сих пор загружается.',
            'А советский клон ZX Spectrum — вообще артефакт. На нём до сих пор можно запускать те самые игры, которые загружались с кассет по 20 минут. И да, если игра не грузилась — надо было перематывать кассету карандашом. Попробуй объясни это поколению SSD!'
          ]
        },
        {
          subtitle: 'Экскурсии: где дети учат историю руками',
          img: null,
          p: [
            'Наши экскурсии — это не лекции. Это квесты. Мы даём детям задания:',
            '— Найти в Windows 3.11 программу «Калькулятор» (спойлер: это не так просто, как кажется)',
            '— Запустить игру в MS-DOS, введя команды вручную (да, без ярлыков на рабочем столе!)',
            '— Напечатать текст в Word\'е 95 и сохранить его на дискету (а потом понять, почему её нельзя вставить в MacBook)',
            'Особый хит — Atari 2600. Когда показываешь, что в «Тетрис» здесь можно играть только с джойстиком, у детей сначала паника, а потом — азарт. Они кричат «Это же неудобно!», но оторвать их невозможно.'
          ]
        },
        {
          subtitle: '',
          img: null,
          p: [
            'Самое удивительное — как меняются лица. Сначала приходят скептически: «Фу, старьё». Через час уже спорят, кто лучше пройдёт Tiny Toon Adventures на оригинальной Dendy. А уходя, спрашивают: «А можно мы с классом ещё придём?»',
            'Для них это не просто компьютеры и приставки. Это машины времени, которые показывают, каким был мир до смартфонов, когда интернет был роскошью, а игры — настоящим приключением. И знаете что? После таких экскурсий некоторые начинают интересоваться программированием. Потому что понимают — всё великое начиналось с таких вот «коробок».'
          ]
        }
      ]
    }
  },
  {
    id: 4,
    block: {
      title: 'Консольные легенды: <br/><span>от 8 бит до первых 3D</span>',
      subBlocks: [
        {
          subtitle: 'Dendy Junior',
          img: null,
          p: [
            'Это та самая приставка, с которой для многих начался игровой мир. Наш экземпляр до сих пор пахнет тем самым пластиком из 90-х. Здесь есть все хиты: «Черепашки-ниндзя», «Контра», «Марио».',
            'Особый кайф — показывать детям, что значит «играть без сохранений». Когда понимают, что после выключения придётся начинать всё сначала — их лица бесценны.'
          ]
        },
        {
          subtitle: '16-битные монстры: Sega и Nintendo',
          img: null,
          p: [
            'Sega Mega Drive 2 — легенда «войны консолей». На ней можно показать, что такое настоящий «Соник» (не тот убогий 3D, а тот самый, что нёсся как угорелый по пиксельным уровням).',
            'Super Nintendo — вершина 16-битной эры. Наш экземпляр с родными геймпадами, на которых до сих пор отлично работают все кнопки. Здесь хранятся шедевры вроде «Super Mario World» и «Street Fighter II» — игры, которые и сегодня выглядят потрясающе.'
          ]
        },
        {
          subtitle: 'PS1 и PS2 — революция в гостиной',
          img: null,
          p: [
            'PlayStation 1 — это уже серьёзно. Наш экземпляр с оригинальным DualShock (который тогда казался технологическим чудом). Здесь можно запустить «Крэша», «Теккен 3» или «Резидент зомби» (да, именно так его все называли).',
            'А PS2 — это уже целая эпоха. От «ГТА: Вайс-Сити» до «Год оф Вар». Наш экземпляр до сих пор читает оригинальные диски, хотя некоторые уже покрылись царапинами времён. Когда включаешь заставку с летающими ромбами — у многих взрослых наворачиваются слёзы.'
          ]
        },
        {
          subtitle: 'PDO — тёмная лошадка',
          img: null,
          p: [
            'Мало кто помнит эту приставку, но у нас она есть! PDO (или «ПиДиО» как её называли) — наш особый экспонат. Это та самая «серая лошадка» из 90-х, на которой шли странные порты японских игр. Графика мыльная, звук хриплый — но ностальгия бьёт точно в цель.',
            'Особенно смешно наблюдать, как люди пытаются играть в её эксклюзивы вроде «Футбола», где игроки выглядят как спичечные человечки.'
          ]
        },
        {
          subtitle: 'От пикселей к полигонам',
          img: null,
          p: [
            'Когда ставишь рядом Dendy и PS2 — видна вся эволюция игр. От плоских спрайтов к трёхмерным мирам. От «бип-бип» звуков до оркестровых саундтреков.',
            'Но самое крутое — когда человек садится и проходит весь этот путь за один вечер: начинает с «Танчиков» на Dendy, переходит на «Соника» на Sega, а заканчивает «ГТА» на PS2. Это как ускоренный курс истории видеоигр — только с джойстиком в руках.'
          ]
        }
      ]
    }
  },

  {
    id: 5,
    block: {
      title: 'Игры, кино и движ — <br/><span>как в старые добрые</span>',
      subBlocks: [
        {
          subtitle: 'Retro Playground Party',
          img: null,
          p: [
            'Иногда обычной катки мало. Хочется шума, криков, азарта и, по классике, батла за честь района. Именно так и родился наш «Retro Playground Party» — вечер, когда в Vault57 включается режим «на выживание». Всё по канону: винтажные игры, таблица лидеров, сломанные клавиши и призовой банк, который забирает тот, кто остался стоять после всех.',
            'Игры меняются — бывает Танчики, бывает Rock\'n\'Roll Racing, а бывает даже чемпионат по Worms. Но суть всегда одна: весело, олдскульно и до последнего хп.'
          ]
        },
        {
          subtitle: 'Кино по фану',
          img: null,
          p: [
            'Есть такие вечера, когда ни играть, ни говорить не хочется. Хочется залипнуть под фильмец из детства. Мы поняли это быстро — и стали устраивать киносеансы. Врубаем проектор, закидываем в видик старенькую VHS, кидаем на стол чипсы и ставим «Парк Юрского периода», «Матрицу» или «Терминатора».',
            'Рядом сидят люди, которые тоже всё это помнят. Кто-то цитирует, кто-то смеётся, а кто-то просто кайфует в тишине. У нас кино — как домашняя тусовка у одноклассника, только с колонками помощнее.'
          ]
        },
        {
          subtitle: 'Просто заходи',
          img: null,
          p: [
            'Vault57 — это не просто место, это движение. У нас уже появились свои завсегдатаи, мемы, локальные легенды и даже традиция дарить клубу старую технику «на вечное хранение».',
            'Мы не знаем, как у вас, а у нас тусовки начинаются с фразы: «Ну чё, на полчасика заскочим?» — и заканчиваются в час ночи после ожесточённой катки в Контру.',
            'Если ты чувствуешь, что скучаешь по тому времени — просто приходи. Мы всегда рады новым лицам, историям, друзьям. Тут есть место и тебе.'
          ]
        }
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
        :data-about-block-id="id"
        :key="`about-block-${id}`"
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
  padding: 28px 0 24px 0;
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
