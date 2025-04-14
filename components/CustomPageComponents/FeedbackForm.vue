<script setup lang="ts">
import RunningLine from "~/components/Common/RunningLine.vue";
import {useMousePressed} from "@vueuse/core";
import {useFeedbackStore} from "~/store/feedbackStore";

const config = useRuntimeConfig()
const feedbackStore = useFeedbackStore()

type FormFeedbackType = 'incomplete' | 'invalid' | 'success' | 'error' | null;
type FormDialog = {
  title: string;
  description: string;
}

const clientName = ref<string>('');
const contact = ref<string>('');
const message = ref<string>('');

const isLoading = ref<boolean>(false);
const formFeedback: Ref<FormFeedbackType> = ref(null);

const button = ref<HTMLElement | null>(null)
const { pressed } = useMousePressed({ target: button })

const formDialog = computed<FormDialog | null>(() => {
  if (formFeedback.value === 'error') {
    return {
      title: 'Ошибка отправки!',
      description: 'Попробуйте еще раз позднее'
    }
  }

  if (formFeedback.value === 'success') {
    return {
      title: 'Сообщение отправлено!',
      description: 'Мы свяжемся с Вами в ближайшее время'
    }
  }

  if (formFeedback.value === 'incomplete') {
    return {
      title: 'Внимание!',
      description: 'Заполните все поля формы'
    }
  }

  if (formFeedback.value === 'invalid') {
    return {
      title: 'Внимание!',
      description: 'Указан некорректный email'
    }
  }
  return null
})

watch(
  () => formFeedback.value,
  (feedback) => {
    if (feedback) {
      setTimeout(() => formFeedback.value = null, 4000)
    }
  }
)

async function submitForm() {
  isLoading.value = true;
  formFeedback.value = null;

  if (!clientName.value.trim() || !contact.value.trim() || !message.value.trim()) {
    formFeedback.value = 'incomplete'
    isLoading.value = false
    return
  }

  // const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // if (contact.value && !regexEmail.test(contact.value)) {
  //   formFeedback.value = 'invalid';
  //   isLoading.value = false;
  //   return;
  // }

  try {
    await feedbackStore.sendFeedback({
      clientName: clientName.value,
      contact: contact.value,
      message: message.value,
    });

    formFeedback.value = 'success'
    clientName.value = ''
    contact.value = ''
    message.value = ''
  } catch (e: any) {
    formFeedback.value = 'error'
    return false
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="feedback"
    :style="`background: url(${config.public.MEDIA_URL}/images/backgrounds/306_185.png)`"
  >
    <div class="feedback__logo">
      <RunningLine
        :text="['ConnectuS']"
        :velocity="[100, 300]"
        :cursor="false"
        class="top-line"
      />
      <RunningLine
        :text="['technologies']"
        :velocity="[50, 150]"
        :cursor="false"
        :delay="2"
        class="bottom-line"
      />
    </div>

    <form
      class="feedback__form"
    >
      <fieldset class="form__fieldset">
        <label
          class="form__label"
        >
          Имя
          <input
            type="text"
            v-model="clientName"
            class="form__input"
          />
        </label>
      </fieldset>
      <fieldset class="form__fieldset">
        <label
          class="form__label"
        >
          Контакт
          <input
            type="text"
            v-model="contact"
            class="form__input"
          />
        </label>
      </fieldset>

      <fieldset class="form__fieldset">
        <label
          class="form__label"
        >
          Сообщение
          <textarea
            v-model="message"
            class="form__input form__textarea"
            rows="3"
          ></textarea>
        </label>
      </fieldset>

      <button
        ref="button"
        type="button"
        class="form__button"
        :class="{'form__button_pressed': pressed, 'form__button_disabled': isLoading }"
        :disabled="isLoading"
        @click="submitForm"
      >
        {{ isLoading ? 'ОТПРАВЛЯЕМ...' : 'ОТПРАВИТЬ' }}
      </button>
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
.feedback {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 16px;
  position: relative;
  height: 100%;
  padding: 0 28px 24px 24px;
  overflow: hidden;

  background: #f5f6ef;
  &__logo {
    display: flex;
    flex-direction: column;
    align-items: end;
    height: 90px;
    .top-line {
      width: 376px;
      font-family: Roco-Pixel, 'sans-serif';
      font-size: 43px;
      line-height: 68px;
      font-weight: 600;
      font-style: italic;
      text-shadow: 6px 4px 0 #b4b5b2;
      user-select: none;
    }

    .bottom-line {
      width: 160px;
      margin-right: 6px;
      font-family: Roco-Pixel, 'sans-serif';
      font-size: 15px;
      line-height: 22px;
      font-style: italic;
      text-shadow: none;
      color: #9b9c98;
      user-select: none;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
  }

  .form {
    &__fieldset {
      width: 100%;
      max-width: 580px;
    }

    &__label {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 18px;
      font-weight: 600;
      font-style: italic;
      color: #515250;
      user-select: none;
    }
    &__input {
      padding: 12px;
      border: 3px solid #5a5c56;
      background: #f5f6f5;
      box-shadow: inset 3px 2px 0px rgba(#6b6c66, 0.5);//, 6px 4px 0 0 #6b6c68;

      font-family: IBM, sans-serif;
      font-size: 20px;
      font-style: italic;
      color: #515250;
    }
    &__button {
      width: calc(100% - 12px);
      max-width: 568px;
      padding: 12px;
      //margin-top: 8px;
      background: #5a5c56;

      border: 1px solid #f5f6ef;
      outline: 6px solid #5a5c56;

      font-weight: 600;
      font-size: 20px;
      color: #f5f6ef;
      letter-spacing: 1px;

      //transform: translateY(-3px) translateX(-2px);
      box-shadow: 6px 4px 0 6px rgba(#6b6c68, .6);

      &_pressed {
        box-shadow: none;
        transform: translateY(3px) translateX(2px);
      }

      &_disabled {
        background: #afb0ad;
        outline: 6px solid #afb0ad;
        box-shadow: none;
        transform: translateY(3px) translateX(2px);
      }
    }

    &__dialog {
      position: absolute;
      right: 34px;
      left: 30px;
      top: 16px;
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
