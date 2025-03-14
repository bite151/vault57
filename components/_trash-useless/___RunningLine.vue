<script setup lang="ts">
const props = defineProps<{text:string[]}>()

const { text } = props
const string = ref<string>('')
const stringNumber = ref<number>(0)

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const removeString = () => {
  const velocity = getRandomArbitrary(20, 50)
  if (string.value.length > 0) {
    string.value = string.value.slice(0, -1)
    setTimeout(() => removeString(), velocity)
  } else {
    stringNumber.value = stringNumber.value < text.length - 1
      ? ++stringNumber.value
      : 0

    setTimeout(() => startRunningString(text[stringNumber.value]), 1000)
  }
}

const startRunningString = (text: string, letterNumber = 0) => {
  const velocity = getRandomArbitrary(75, 300)
  string.value += text[letterNumber]
  letterNumber++

  if (letterNumber < text.length) {
    setTimeout(() => startRunningString(text, letterNumber), velocity)
  } else {
    // setTimeout(() => removeString(), 2000)
  }
}

onMounted(async () => {
  if(text.length) {
    startRunningString(text[0])
  }
})


</script>

<template>
  <p class="running-string">{{ string }} <span class="cursor"></span></p>
</template>

<style scoped lang="scss">
  .running-string {
    font-family: Play;
    //color: #000000;
    color: #ffffff;
    font-size: 32px;
  }
  .cursor {
    position: relative;
    top: 4px;
    left: -3px;
    width: 10px;
    height: 20px;
    display: inline-block;
    background: #03a865;
    opacity: .3;
    transition: .03s ease-in-out;
    animation: blink-animation 2s steps(5, start) infinite;
  }

  @keyframes blink-animation {
    to {
      visibility: hidden;
      opacity: 0;
    }
  }
</style>
