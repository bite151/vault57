<script setup lang="ts">

import {useAuthStore} from "~/store/authStore";

type FormFeedbackType = 'incomplete' | 'invalid' | 'success' | 'error' | null;
interface FormDialog {
  title: string;
  description: string;
  errorData?: any;
  status?: FormFeedbackType;
}

const config = useRuntimeConfig()
const authStore = useAuthStore();
const { login, logout } = authStore
const { isAuth, profile } = storeToRefs(authStore)

const log = ref<string>('');
const password = ref<string>('');

const isLoading = ref<boolean>(false);
const formFeedback: Ref<FormFeedbackType> = ref(null);
const formError = ref<any>(null);

const formDialog = computed<FormDialog | null>(() => {
  const feedback = formFeedback.value;

  if (feedback === 'error') {
    return {
      title: 'Ошибка!',
      description: formError.value,
      status: 'error'
    }
  }

  if (feedback === 'success') {
    // return {
    //   title: 'Сообщение отправлено!',
    //   description: 'Мы свяжемся с Вами в ближайшее время',
    //   status: 'success'
    // }
  }

  if (feedback === 'incomplete') {
    return {
      title: 'Внимание!',
      description: 'Заполните все поля формы',
      status: 'incomplete'
    }
  }

  if (feedback === 'invalid') {
    return {
      title: 'Внимание!',
      description: formError.value,
      status: 'invalid'
    }
  }

  return null;
})
watch(
  () => formFeedback.value,
  (feedback) => {
    if (feedback) {
      setTimeout(() => formFeedback.value = null, 4000)
    }
  }
)

async function handleLogIn() {
  isLoading.value = true;
  formFeedback.value = null;

  if (!log.value.trim() || !password.value.trim()) {
    formFeedback.value = 'incomplete'
    isLoading.value = false
    return
  }

  try {
    await login({login: log.value, password: password.value})
  } catch (e: any) {
    formError.value = e.message
    formFeedback.value = 'invalid';
  } finally {
    isLoading.value = false
  }
}

async function handleLogOut() {
  isLoading.value = true;

  try {
    await logout()
  } catch (e: any) {
    formError.value = e.message
    formFeedback.value = 'error';
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div
    class="auth"
  >
    <div class="img-container">
      <nuxt-img :src="`${config.public.MEDIA_URL}/images/desktop/network-3-min.png`" alt="" loading="lazy"/>
    </div>

    <form
      class="auth__form"
      @submit.prevent="handleLogIn"
    >
      <section
        v-if="!isAuth"
        class="form__fields"
      >
        <fieldset class="form__fieldset">
          <label
            class="form__label"
          >
            Login
            <input
              type="text"
              v-model="log"
              class="form__input"
            />
          </label>
        </fieldset>
        <fieldset class="form__fieldset">
          <label
            class="form__label"
          >
            Password
            <input
              type="password"
              v-model="password"
              class="form__input"
            />
          </label>
        </fieldset>
      </section>

      <pre v-else class="form__user-info">{{ profile }}</pre>

      <footer class="form__footer">
        <button
          v-if="isAuth"
          class="form__button"
          :class="{'form__button_disabled': isLoading }"
          :disabled="isLoading"
          @click.prevent="handleLogOut"
        >
          Logout
        </button>

        <button
          v-else
          ref="button"
          type="submit"
          class="form__button"
          :class="{'form__button_disabled': isLoading }"
          :disabled="isLoading"
        >
          {{ isLoading ? 'connecting...' : 'Log In' }}
        </button>

      </footer>
    </form>


    <div
      class="form__dialog"
      :class="formFeedback"
    >
      <p class="title">{{ formDialog?.title }}</p>
      <p class="description">{{ formDialog?.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth {
  width: 100%;
  display: flex;
  gap: 24px;
  position: relative;
  height: 100%;
  padding: 24px;
  overflow: hidden;

  background: #f5f5f5;
  .img-container {
    width: 200px;
    height: 100%;
    border: 2px solid #737372;
    border-radius: 4px;
    background-color: #beb8b3;
    overflow: hidden;
    flex-shrink: 0;

    img {
      width: calc(100% + 4px);
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-left: 12px;
    margin-right: 12px;
    width: 100%;

    overflow: auto;
    padding: 4px;
  }

  .form {
    &__fields,
    &__user-info {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex-grow: 1;
      gap: 24px;
    }
    &__user-info {
      min-width: 400px;
    }
    &__fieldset {
      width: 100%;
      min-width: 400px;
    }
    &__label {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 18px;
      //font-weight: 600;
      color: #515250;
      user-select: none;
    }
    &__input {
      padding: 10px 12px;
      border: 3px solid #737372;
      border-radius: 4px;
      background: #f5f6f5;
      box-shadow: inset 2px 2px 0 rgba(#6b6c66, 0.5);//, 6px 4px 0 0 #6b6c68;

      font-family: IBM, sans-serif;
      font-size: 18px;
      color: #515250;
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 24px;
    }
    &__button {
      padding: 6px 24px;
      background: #d7d7d7;

      border: 1px dotted #5a5c56;
      border-radius: 1px;
      outline: 3px solid #d7d7d7;

      font-size: 18px;
      color: #5a5c56;
      letter-spacing: 1px;

      &_pressed {
        //transform: translateY(0px) translateX(0px);
      }

      &_disabled {
        background: #afb0ad;
        outline: 3px solid #afb0ad;
      }
    }

    &__dialog {
      position: absolute;
      right: 42px;
      left: 266px;
      top: 30px;
      margin: 0 auto;
      max-width: 568px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 18px 24px;
      border: 1px solid #f5f6ef;
      color: #f5f5f5;
      box-shadow: 6px 4px 0 6px rgba(#6b6c68, .6);
      z-index: 9;
      transform: translateY(-120px);
      opacity: 0;
      visibility: hidden;
      transition: transform .3s ease-in-out;

      &.error {
        opacity: 1;
        visibility: visible;
        background: #802929;
        outline: 6px solid #802929;
        transform: translateX(0);
      }

      &.invalid,
      &.incomplete {
        opacity: 1;
        visibility: visible;
        background: #c8841d;
        outline: 6px solid #c8841d;
        transform: translateX(0);
      }

      &.success {
        opacity: 1;
        visibility: visible;
        background: #3C8029;
        outline: 6px solid #3C8029;
        transform: translateX(0);
      }

      .title {
        text-transform: uppercase;
        font-weight: 600;
      }
    }
  }
}
</style>
