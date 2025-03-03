<script setup lang="ts">
const props = defineProps<{
  text: string[]
  velocity: [number, number]
  cursor?: boolean
  delay?: number
}>()

const emit = defineEmits<{
  (event: 'onCompleted'): void
}>()

const string = ref<string>('')
const completed = ref<boolean>(false)

const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

const startRunningString = (text: string, letterNumber = 0): void => {
  if (letterNumber >= text.length) {
    completed.value = true
    setTimeout(() => {
      emit('onCompleted')
    }, 1000)
    return
  }

  const timeout = getRandomArbitrary(...props.velocity)
  string.value += text[letterNumber]

  setTimeout(() => startRunningString(text, letterNumber + 1), timeout)
}

onMounted(() => {
  if (props.text.length === 0) return
  setTimeout(() => startRunningString(props.text[0]), (props.delay ?? 0) * 1000)
})
</script>

<template>
  <p class="running-string">
    {{ string }}<template v-if="!completed && props.cursor">▁</template>
  </p>
</template>

<style scoped lang="scss">
  .running-string {

  }
</style>
