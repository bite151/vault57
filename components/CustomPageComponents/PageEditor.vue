<script setup lang="ts">
import { usePagesStore } from "~/store/pagesStore";
import type {Page} from "~/types/Page";
import ControlPanel from "~/components/CustomPageComponents/PageEditor/ControlPanel.vue";
import FileContent from "~/components/Desktop/Finder/FinderFile/FileContent.vue";

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElSwitch,
  ElCheckbox,
  ElSelect,
  ElOption,
} from 'element-plus'
import JsonEditor from "~/components/CustomPageComponents/PageEditor/JsonEditor.vue";
import ContentEditor from "~/components/CustomPageComponents/PageEditor/ContentEditor.vue";
import {cloneObj, deepEqual} from "~/helpers/app.helpers";
import {useNotify} from "~/composables/useNotify";
import {useDialogStore} from "~/store/dialogStore";

const pagesStore = usePagesStore()
const dialogStore = useDialogStore()

const { notify, notifyArray } = useNotify()

const form = ref<Page | null>(null)
const showTree = ref<boolean>(false)
const tabName = ref<string>('general')

const types = [
  {
    label: 'Folder',
    value: 'folder'
  },
  {
    label: 'File',
    value: 'file'
  }
]
const permissions = [
  {
    label: 'Public',
    value: 'public'
  },
  {
    label: 'User',
    value: 'user'
  },
  {
    label: 'Admin',
    value: 'admin'
  }
]
const hasChanges = computed<boolean>(() => !deepEqual(form.value, pagesStore.editedPage))

watch(
  () => hasChanges.value,
  (val) => {
    pagesStore.editorHasChanges = val;
  }
)

onMounted(() => {
  const storage = localStorage.getItem('editedPage')
  if (storage) {
    form.value = JSON.parse(storage)
    return
  }
  form.value = pagesStore.editedPage
})

onBeforeUnmount(() => {
  pagesStore.editedPage = null
  pagesStore.editorHasChanges = false
  form.value = null
  localStorage.removeItem('editedPage')
})

function createPage() {
  if (hasChanges.value) {
    notify('warning', 'Unsaved changes detected', 'Please save your changes before creating a new page')
    return
  }

  pagesStore.editedPage = {
    parentId: 1,
    url: '/',
    content: {
      h1: '',
      blocks: [
        {
          type: 'text',
          title: '',
          img: '',
          p: [],
          images: []
        }
      ]
    },
    range: 1,
    isPublic: 1,
    type: 'file',
    permission: 'public',
    seo: {
      title: '',
      description: ''
    },
    mobile: {
      icon: '',
      title: '',
      shortTitle: '',
      description: '',
      contentComponent: null,
      showInLauncher: 0,
      background: '#dededc',
      loadParentScreens: 1
    },
    desktop: {
      icon: '',
      title: '',
      contentComponent: null,
      showInFinder: 1,
      resetWidth: 0,
      hideStatusBar: 0
    }
  }
  form.value = cloneObj(pagesStore.editedPage)
  localStorage.setItem('editedPage', JSON.stringify(form.value))
}

async function savePage() {
  if (!form.value) {
    notify('warning', 'Page not saved', 'Form model is empty')
    return
  }

  if (!hasChanges.value) {
    notify('info', 'Page not saved', 'No changes detected')
    return
  }

  try {
    const formClone = cloneObj(form.value)
    const data = await pagesStore.savePage(formClone)

    form.value = cloneObj(data)
    localStorage.setItem('editedPage', JSON.stringify(data))

    notify('success', 'Success', 'Page saved')
  } catch (e: any) {

    if (e?.data?.error && typeof e?.data?.message !== 'string') {
      notifyArray('error', e.data.error, e.data)
    } else if (e?.data?.error) {
      notify('error', e.data.error, e.message)
    } else {
      notify('error', e.statusCode.toString(), e.statusMessage)
    }
  }
}

async function deletePage() {
  dialogStore.closeAllDialogs()
  // dialogStore.alertDialog = {
  //   title: 'Delete',
  //   message: 'Are you sure you want to delete this page?',
  // }
}

</script>

<template>
  <ControlPanel
    v-model:tree="showTree"
    v-model:tab="tabName"
    @on-create="createPage"
    @on-save="savePage"
    @on-delete="deletePage"
  />
  <div class="content-wrapper">
    <aside
      v-if="showTree"
      class="pages-tree"
    >
      Pages tree
    </aside>
    <div
      v-if="form"
      class="main-frame"
    >
      <div
        v-if="tabName === 'json'"
        class="form-block form-block_full-width"
      >
        <JsonEditor v-model="form" />
      </div>

      <div v-if="tabName === 'preview'">
        <FileContent :content="form.content" />
      </div>

      <el-form
        v-else
        class="form"
        label-position="top"
      >
        <div
          v-if="tabName === 'general'"
          class="form-block"
        >
          <el-form-item
            label="Parent page"
            prop="parentId"
          >
            <el-select
              v-model="form.parentId"
              filterable
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in pagesStore.pages"
                :key="item.id"
                :label="item.seo.title"
                :value="item.id!"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Url"
            prop="url"
          >
            <el-input
              size="large"
              v-model="form.url"
            />
          </el-form-item>

          <el-form-item
            label="Page type"
            prop="type"
          >
            <el-select
              v-model="form.type"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Permission"
            prop="permission"
          >
            <el-select
              v-model="form.permission"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in permissions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Range"
            prop="range"
          >
            <el-input-number
              v-model="form.range"
              class="mx-4"
              :min="1"
              size="large"
              controls-position="right"
            />
          </el-form-item>

          <el-form-item>
            <el-switch
              v-model="form.isPublic"
              size="large"
              class="ml-2"
              width="100"
              inline-prompt
              :active-value="1"
              :inactive-value="0"
              active-text="public"
              inactive-text="not public"
            />
          </el-form-item>
        </div>

        <div
          v-if="tabName === 'seo'"
          class="form-block"
        >
          <el-form-item
            label="Title"
            prop="seo.title"
          >
            <el-input
              size="large"
              v-model="form[tabName].title"
            />
          </el-form-item>

          <el-form-item
            label="Description"
            prop="seo.description"
          >
            <el-input
              type="textarea"
              size="large"
              autosize
              v-model="form[tabName].description"
            />
          </el-form-item>
        </div>

        <div
          v-if="tabName === 'desktop'"
          class="form-block"
        >
          <el-form-item
            label="Icon"
            prop="desktop.icon"
          >
            <el-input
              size="large"
              v-model="form[tabName].icon"
            />
          </el-form-item>

          <el-form-item
            label="Title"
            prop="desktop.title"
          >
            <el-input
              size="large"
              v-model="form[tabName].title"
            />
          </el-form-item>

          <el-form-item
            label="Custom component (optional)"
            prop="desktop.contentComponent"
          >
            <el-input
              size="large"
              v-model="form[tabName].contentComponent"
            />
          </el-form-item>

          <el-form-item
            class="mb-0"
          >
            <el-checkbox
              v-model="form[tabName].showInFinder"
              :true-value="1"
              :false-value="0"
              label="Show in Finder"
              size="large"
            />
          </el-form-item>

          <el-form-item
            class="mb-0"
          >
            <el-checkbox
              v-model="form[tabName].resetWidth"
              :true-value="1"
              :false-value="0"
              label="Reset window width"
              size="large"
            />
          </el-form-item>

          <el-form-item
            class="mb-0"
          >
            <el-checkbox
              v-model="form[tabName].hideStatusBar"
              :true-value="1"
              :false-value="0"
              label="Hide window's Status bar"
              size="large"
            />
          </el-form-item>
        </div>

        <div
          v-if="tabName === 'mobile'"
          class="form-block"
        >
          <el-form-item
            label="Icon"
            prop="mobile.icon"
          >
            <el-input
              size="large"
              v-model="form[tabName].icon"
            />
          </el-form-item>

          <el-form-item
            label="Title"
            prop="mobile.title"
          >
            <el-input
              size="large"
              v-model="form[tabName].title"
            />
          </el-form-item>

          <el-form-item
            label="Launcher's icon title"
            prop="mobile.shortTitle"
          >
            <el-input
              size="large"
              v-model="form[tabName].shortTitle"
            />
          </el-form-item>

          <el-form-item
            label="Description"
            prop="mobile.description"
          >
            <el-input
              v-model="form[tabName].description"
              type="textarea"
              size="large"
              autosize
            />
          </el-form-item>

          <el-form-item
            label="Custom component (optional)"
            prop="mobile.contentComponent"
          >
            <el-input
              size="large"
              v-model="form[tabName].contentComponent"
            />
          </el-form-item>

          <el-form-item
            label="App background color"
            prop="mobile.background"
          >
            <el-input
              size="large"
              v-model="form[tabName].background"
            />
          </el-form-item>


          <el-form-item
            class="mb-0"
          >
            <el-checkbox
              v-model="form[tabName].showInLauncher"
              :true-value="1"
              :false-value="0"
              label="Show in Launcher"
              size="large"
            />
          </el-form-item>

          <el-form-item
            class="mb-0"
          >
            <el-checkbox
              v-model="form[tabName].loadParentScreens"
              :true-value="1"
              :false-value="0"
              label="Load Parent's Screens"
              size="large"
            />
          </el-form-item>
        </div>

        <div
          v-if="tabName === 'content'"
          class="form-block form-block_full-width"
        >
          <ContentEditor
            v-model="form.content"
          />
        </div>
      </el-form>
    </div>
    <div
      v-else
      class="empty-state"
    >
      выберите страницу
    </div>

  </div>
</template>

<style lang="scss">
  @use "/assets/scss/element-plus.scss";
  input, textarea, select, button {
    font-family: inherit;
  }

  .el-textarea__inner {
    min-height: 38px !important;
    padding-top: 8px;
  }
</style>

<style lang="scss" scoped>
.pages-tree {
  position: sticky;
  top: 0;
  width: 250px;
  height: 100%;
  flex-shrink: 0;
  padding: 24px;
  border-right: 2px solid #31322d;
  background-color: #f5f6ef;
  font-size: 14px;
}
.content-wrapper {
  position: sticky;
  display: flex;
  height: calc(100% - 48px);
  background: #f5f5f5;
}

.main-frame {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.form {
  height: 100%;
  padding: 24px;

  &-block {
    max-width: 676px;
    height: 100%;

    &_full-width {
      width: 100%;
      max-width: 100%;
    }
  }

  .el-input-number {
    width: 100%;
    &:deep(.el-input__inner) {
      text-align: left;
    }
  }
}
.empty-state {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 100;
}
.mb-0 {
  margin-bottom: 0;
}
.animate__faster {
  --animate-duration: 0.7s;
}
</style>
