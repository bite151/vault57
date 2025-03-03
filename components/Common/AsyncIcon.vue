<script setup lang="ts">
interface Props {
  name: string | null
  size?: number
  color?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'File',
  size: 48,
  color: '#31322d',
  strokeWidth: 1
})

const IconAsyncComponent = defineAsyncComponent({
  loader: async () => {
    const module = await import('lucide-vue-next')
    return new Promise((res) => {
      res(module[<keyof typeof module>props.name] as never)
    })
  }
})
</script>

<template>
  <IconAsyncComponent
    v-bind="props"
  />
</template>

<style scoped lang="scss">

</style>
