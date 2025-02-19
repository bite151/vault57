<script setup lang="ts">
import type { NuxtError } from '#app'
import AppDesktop from "~/components/AppDesktop/AppDesktop.vue";

const { error = null } = defineProps({
  error: Object as () => NuxtError
})
const restart = () => clearError({ redirect: '/' })
</script>

<template>
  <main>
    <div class="p404">
      <p class="error-code">{{ error?.statusCode }}</p>
      <p class="error-message">{{ error?.message }}</p>
      <p class="message">... Game over ...</p>


      <button
        class="restart-button"
        @click="restart"
      >
        Restart
      </button>
    </div>
<!--    <AppDesktop />-->
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--desctop-bg-color);
}
.p404 {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p.error-code {
    font-size: 200px;
    font-weight: 600;
    font-family: PxPlusIBM;
    line-height: 130px;
    text-align: center;
  }

  .message {
    margin-top: 16px;
    margin-bottom: 32px;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    color: #5a5c56;
  }

  .error-message{
    margin-top: 8px;
    margin-bottom: 16px;
    font-size: 28px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .restart-button {
    width: 300px;
    padding: 12px;
    margin-top: 32px;
    background: #5a5c56;

    border: 1px solid #f5f6ef;
    outline: 6px solid #5a5c56;

    font-weight: 600;
    font-size: 20px;
    color: #f5f6ef;
    letter-spacing: 1px;
    text-align: center;
    text-transform: uppercase;
    box-shadow: 6px 4px 0 6px rgba(#6b6c68, .6);
    &:focus {
      box-shadow: none;
      transform: translateY(6px) translateX(4px);
    }
  }
}
</style>
