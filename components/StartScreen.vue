<script setup lang="ts">
import { useAppStatesStore } from "~/store/appStatesStore";
import { useWindowsStore } from "~/store/windowsStore";

import RunningLine from "~/components/Common/RunningLine.vue";
import {sleep} from "~/helpers/app.helpers";
import {useThemeColor} from "~/composables/useThemeColor";

const { isMobile } = useDevice()
const appStatesStore = useAppStatesStore();
const windowsStore = useWindowsStore();
const router = useRouter();
const { changeThemeColor } = useThemeColor()

const isLoading = computed<boolean>(() => appStatesStore.startLoading);
const isLoaded  = computed<boolean>(() => appStatesStore.isLoaded);

const text: string[] = ([
  '╔═════════════╗',
  '║             ║',
  '║   Vault57   ║',
  '║             ║',
  '╚═════════════╝',
]) as const
const loader: string[] = ([
  '┌                             ┐',
  '  ███████████████████████████',
  '└                             ┘'
]) as const

const string = ref<string[]>([]);
const show = ref<boolean>(false);
const showLoader = ref<boolean>(false);
const changeScreenColor = ref<boolean>(false);
const hasOldSession = ref<boolean>(false)

onMounted(() => {
  animate(text)
  hasOldSession.value = checkOldSession()
  changeThemeColor('#121212')
})

function checkOldSession(): boolean {
  const str = localStorage.getItem('openedWindows')
  if (!str) return false

  const storage = JSON.parse(str);
  return storage.data?.length;
}

const animate = async (text: string[], letterNumber = 0) => {
  string.value.push(text[letterNumber])
  letterNumber++

  if (letterNumber < text.length) {
    await sleep(200)
    await animate(text, letterNumber)
  } else {
    await sleep(1000)
    show.value = true
  }
}

async function redirect(url: string): Promise<void> {
  if (isLoaded.value) {
    await router.push(url)
  } else {
    windowsStore.setWindow(url)
    showLoader.value = true
    await sleep(1500)
    changeScreenColor.value = true
    await sleep(300)
    await router.push(url)
    await sleep(300)
    appStatesStore.isLoaded = true
  }
}

function loadingCompleted(): void {
  appStatesStore.setLoading(true);
  showLoader.value = true;

  if(isMobile.value){
    redirect('/desktop')
    return
  }
  const path = hasOldSession.value ? '/desktop' : '/my-computer'
  redirect(path)
}
</script>

<template>
  <div
    v-if="!isLoading"
    class="container"
  >
    <div class="wrapper">
      <div class="start-block">
        <div class="noise">
          <div class="noise-line" v-for="i in 100"></div>
        </div>
        <p v-for="str in string" class="glow">
          {{ str }}
        </p>
        <RunningLine
          v-if="show"
          :text="['retro computer club']"
          :velocity="[20, 70]"
          :cursor="true"
          class="title glow"
          @onCompleted="loadingCompleted()"
        />
      </div>
    </div>
  </div>

  <div
    v-else
    class="container"
  >
    <div class="wrapper">
      <div
        v-if="!changeScreenColor"
        class="start-block"
        :class="{'pt': isLoaded}"
      >
        <div class="noise">
          <div class="noise-line" v-for="i in 100"></div>
        </div>
        <p v-for="str in text" class="glow">{{ str }}</p>
        <p class="title glow">ретро компьютерный клуб</p>

        <p class="select glow" v-if="isLoaded">г. Орёл, ул. Московская, 17</p>

        <div v-if="showLoader" class="loader-wrapper">
          <p class="loader" style="text-align: center">идёт загрузка...</p>
          <p class="loader">{{ loader[0] }}</p>
          <RunningLine
            :text="[loader[1]]"
            :velocity="[40, 40]"
            :cursor="false"
            class="loader"
          />
          <p class="loader">{{ loader[2] }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="!isMobile"
      class="white-stripe"
      :class="{'show': changeScreenColor}"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: #121212;
  transition: background-color .7s ease-in-out;
  &.loaded {
    background-color: #c0c2be;
  }
}
.wrapper {
  position: relative;
  max-width: 834px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1;
}

.start-block {
  position: relative;
  text-align: center;
  &.pt {
    padding-top: 6vw;
  }
  .noise {
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .noise-line {
    width: 100%;
    height: 3px;
    margin-bottom: 6px;
    background: rgba(18, 18, 18, .09);
  }
  .loader-wrapper {
    width: min-content;
    margin: 2.3vw auto 0;
    padding-bottom: 1.5vw;
  }
  .glow {
    text-shadow: 0 0 15px rgba(255,255,255, 0.2);
  }
  p {
    font-family: PxPlusIBM;
    font-size: 7vw;
    white-space: pre;
    line-height: 6vw;
    text-align: center;
    color: #A3AD9E;
    user-select: none;
    &.title {
      font-size: 2.1vw;
      margin-top: -12vw;
      padding-bottom: 6vw;
    }
    &.select {
      font-size: 1.6vw;
      //margin-top: 2vw;
      //padding-bottom: 2vw;
    }
    &.loader {
      text-align: left;
      font-size: 1.6vw;
      white-space: pre;
      line-height: 1;
    }
  }
}

.white-stripe {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  margin: auto;
  background-color: #c0c2be;
  opacity: 0;
  //box-shadow: 0 0 15px rgba(255,255,255, 0.2);
  z-index: 0;

  transition: height .5s ease-in-out, opacity .7s ease-in-out;
  &.show {
    opacity: 1;
    height: 100%;
  }
}


@media screen and (max-width: 576px) {
  .start-block {
    .noise-line {
      height: 2px;
      margin-bottom: 3px;
    }
    p {
      font-size: 10vw;
      line-height: 8vw;
      &.title {
        font-size: 3vw;
        margin-top: -15.5vw;
      }
      &.select {
        font-size: 3.2vw;
      }
      &.loader {
        font-size: 3.2vw;
      }
    }
  }
}

@media screen and (min-width: 1560px) {
  .start-block {
    .noise-line {
      height: 2px;
      margin-bottom: 6px;
    }
    p {
      font-size: 110px;
      line-height: 94px;
      &.title {
        font-size: 33px;
        margin-top: -187px;
      }
      &.select {
        font-size: 25px;
      }
      &.loader {
        font-size: 25px;
      }
    }
  }
}
</style>
