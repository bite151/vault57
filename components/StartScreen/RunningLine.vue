<script setup lang="ts">

const props = defineProps<{ text:string[], velocity: number[], cursor: boolean }>()
const emit = defineEmits(['onCompleted'])

const { text, velocity, cursor = true } = props
const string = ref<string>('')
const completed = ref<boolean>(false)

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const startRunningString = (text, letterNumber = 0) => {
  const timeout = getRandomArbitrary(...velocity)
  string.value += text[letterNumber]
  letterNumber++

  if (letterNumber < text.length) {
    setTimeout(() => startRunningString(text, letterNumber), timeout)
  } else {
    completed.value = true
    setTimeout(() => {

      emit('onCompleted')
    }, 1000)
  }
}

onMounted(async () => {
  if(text.length) {
    startRunningString(text[0])
  }
})


</script>

<template>
  <p class="running-string">{{ string }}<template v-if="!completed && cursor">▁</template></p>
</template>

<style scoped lang="scss">
  .running-string {

  }
</style>
