<script setup lang="ts">
import {useNotify} from "~/composables/useNotify";
import type {Page} from "~/types/Page";

const { modelValue } = defineProps<{
  modelValue: any
}>()
const emit = defineEmits(['update:modelValue'])
const { notify } = useNotify()
const json = ref('')

onMounted(() => {
  json.value = JSON.stringify(modelValue, undefined, 2);
})

onBeforeUnmount(() => {
  if (json.value === JSON.stringify(modelValue, undefined, 2)) return

  try {
    const jsonData = JSON.parse(json.value)

    const errors = validateJson(jsonData)
    if (!errors) {
      notify('success', 'Success', 'JSON saved')
      emit('update:modelValue', jsonData)
      return
    }

    errors.forEach(error => {
      notify('error', 'JSON is not saved', error)
    })
  } catch (e) {
    notify('error', 'JSON is not saved', 'Invalid JSON')
  }
})

function validateJson(data: any): string[] | null {
  const errors: string[] = [];

  if (typeof data !== 'object' || data === null) {
    errors.push('Data is not a valid object');
    return errors;
  }

  const requiredFields: Record<string, string> = {
    id: 'number',
    parentId: 'number',
    url: 'string',
    content: 'object',
    range: 'number',
    isPublic: 'number',
    type: 'string',
    permission: 'string',
    createdBy: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    seo: 'object',
    mobile: 'object',
    desktop: 'object'
  };

  for (const [field, type] of Object.entries(requiredFields)) {
    if (!(field in data)) {
      errors.push(`Missing field: ${field}`);
    } else if (typeof data[field] !== type) {
      errors.push(`Invalid type for field ${field}: expected ${type}, got ${typeof data[field]}`);
    } else if (field === 'isPublic' && ![0, 1].includes(data[field])) {
      errors.push('Field isPublic must be 0 or 1');
    }
  }

  if (!['file', 'folder'].includes(data.type)) {
    errors.push(`Invalid value for field type: ${data.type}`);
  }

  if (!['public', 'user', 'admin'].includes(data.permission)) {
    errors.push(`Invalid value for field permission: ${data.permission}`);
  }

  if (typeof data.content !== 'object') {
    errors.push('Field content must be an object');
  } else {
    if (!('h1' in data.content) || typeof data.content.h1 !== 'string') {
      errors.push('Invalid or missing content.h1');
    }
    if (!('blocks' in data.content) || !Array.isArray(data.content.blocks)) {
      errors.push('Invalid or missing content.blocks');
    } else {
      for (const [index, block] of data.content.blocks.entries()) {
        if (typeof block !== 'object') {
          errors.push(`Block at index ${index} is not an object`);
          continue;
        }

        const requiredBlockFields: Record<string, string> = {
          type: 'string',
          title: 'string',
          img: 'string',
          p: 'object',
          images: 'object'
        };

        for (const [field, type] of Object.entries(requiredBlockFields)) {
          if (!(field in block)) {
            errors.push(`Missing field ${field} in block at index ${index}`);
          } else if (
            type === 'object' ? !Array.isArray(block[field]) : typeof block[field] !== type
          ) {
            errors.push(`Invalid type for ${field} in block at index ${index}`);
          }
        }

        if (block.type !== 'text') {
          errors.push(`Invalid block.type at index ${index}: must be "text"`);
        }

        if (!Array.isArray(block.p) || !block.p.every((item: any) => typeof item === 'string')) {
          errors.push(`Invalid block.p at index ${index}: must be array of strings`);
        }

        if (!Array.isArray(block.images) || !block.images.every((item: any) => typeof item === 'string')) {
          errors.push(`Invalid block.images at index ${index}: must be array of strings`);
        }
      }
    }
  }

  if (typeof data.seo !== 'object') {
    errors.push('Field seo must be an object');
  } else {
    if (typeof data.seo.title !== 'string') {
      errors.push('Invalid seo.title');
    }
    if (typeof data.seo.description !== 'string') {
      errors.push('Invalid seo.description');
    }
  }

  const requiredMobileFields: Record<string, string> = {
    icon: 'string',
    title: 'string',
    shortTitle: 'string',
    description: 'string',
    contentComponent: 'object',
    showInLauncher: 'number',
    background: 'string',
    loadParentScreens: 'number'
  };

  for (const [field, type] of Object.entries(requiredMobileFields)) {
    const value = data.mobile?.[field];
    if (value === undefined) {
      errors.push(`Missing mobile field: ${field}`);
    } else if (field === 'contentComponent') {
      if (value !== null) {
        errors.push('mobile.contentComponent must be null');
      }
    } else if (typeof value !== type) {
      errors.push(`Invalid type for mobile.${field}`);
    } else if (['showInLauncher', 'loadParentScreens'].includes(field) && ![0, 1].includes(value)) {
      errors.push(`mobile.${field} must be 0 or 1`);
    }
  }

  const requiredDesktopFields: Record<string, string> = {
    icon: 'string',
    title: 'string',
    contentComponent: 'object',
    showInFinder: 'number',
    resetWidth: 'number',
    hideStatusBar: 'number'
  };

  for (const [field, type] of Object.entries(requiredDesktopFields)) {
    const value = data.desktop?.[field];
    if (value === undefined) {
      errors.push(`Missing desktop field: ${field}`);
    } else if (field === 'contentComponent') {
      if (value !== null) {
        errors.push('desktop.contentComponent must be null');
      }
    } else if (typeof value !== type) {
      errors.push(`Invalid type for desktop.${field}`);
    } else if (
      ['showInFinder', 'resetWidth', 'hideStatusBar'].includes(field) &&
      ![0, 1].includes(value)
    ) {
      errors.push(`desktop.${field} must be 0 or 1`);
    }
  }

  return errors.length > 0 ? errors : null;
}
</script>

<template>
  <textarea
    class="json-editor"
    v-model="json"
  />
</template>

<style scoped lang="scss">
.json-editor {
  width: 100%;
  height: 100%;
  padding: 24px;
  background: #f5f5f5;
  font-size: 14px;
}
</style>
