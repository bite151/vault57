<script setup lang="ts">
import { usePagesStore } from "~/store/pagesStore";
import type {Page} from "~/types/Page";
import ControlPanel from "~/components/CustomPageComponents/PageEditor/ControlPanel.vue";
import FileContent from "~/components/Desktop/Finder/FinderFile/FileContent.vue";
import 'assets/scss/simplebar.css';

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
import TabsPanel from "~/components/CustomPageComponents/PageEditor/TabsPanel.vue";
import PagesTree from "~/components/CustomPageComponents/PageEditor/PagesTree.vue";
import Simplebar from "simplebar-vue";
import ReviewEditor from "~/components/CustomPageComponents/ReviewsEditor/ReviewEditor.client.vue";

const pagesStore = usePagesStore()
const dialogStore = useDialogStore()

const { notify, notifyArray } = useNotify()
const { emptyPage } = usePage()

const form = ref<Page | null>(null)
const showTree = ref<boolean>(true)
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

watch(
  () => pagesStore.editedPage,
  (val) => {
    form.value = cloneObj(val)
  }
)

onMounted(() => {
  const storage = localStorage.getItem('editedPage')
  if (storage) {
    form.value = JSON.parse(storage)
    pagesStore.editedPage = cloneObj(form.value)
    return
  }
  form.value = pagesStore.editedPage
})

onBeforeUnmount(() => {
  closeTab()
})

function openPage(page: Page) {
  const openNewPage = () => {
    pagesStore.editedPage = page
    form.value = cloneObj(pagesStore.editedPage)
    localStorage.setItem('editedPage', JSON.stringify(form.value))
    dialogStore.confirmDialog = null
  }

  if (hasChanges.value) {
    dialogStore.confirmDialog = {
      title: 'Unsaved changes detected',
      dialog: 'Do you want to save your edits before opening a new page?',
      buttons: [
        {
          text: 'Open page',
          action: () => openNewPage()
        },
        {
          text: 'Save',
          action: async () => {
            await savePage()
            openNewPage()
          }
        }
      ]
    }
    return
  }

  openNewPage()
}

function confirmCloseTab() {
  if (!hasChanges.value) {
    closeTab()
    return
  }

  dialogStore.confirmDialog = {
    title: 'Unsaved changes detected',
    dialog: 'Do you want to save your edits before closing the tab?',
    buttons: [
      {
        text: 'Close tab',
        action: () => {
          closeTab()
          dialogStore.confirmDialog = null
        }
      },
      {
        text: 'Save',
        action: async () => {
          const saved = await savePage()
          if (saved) {
            closeTab()
          }
          dialogStore.confirmDialog = null
        }
      }
    ]
  }
}

function closeTab() {
  pagesStore.editedPage = null
  pagesStore.editorHasChanges = false
  form.value = null
  localStorage.removeItem('editedPage')
}

function createPage() {
  if (hasChanges.value) {
    notify('warning', 'Unsaved changes detected', 'Please save your changes before creating a new page')
    return
  }

  pagesStore.editedPage = emptyPage
  form.value = cloneObj(pagesStore.editedPage)
  localStorage.setItem('editedPage', JSON.stringify(form.value))
}

async function savePage(): Promise<boolean> {
  if (!form.value) {
    notify('warning', 'Page not saved', 'Form model is empty')
    return false
  }

  if (!hasChanges.value) {
    notify('info', 'Page not saved', 'No changes detected')
    return false
  }

  try {
    const formClone = cloneObj(form.value)
    const data = await pagesStore.savePage(formClone)

    form.value = cloneObj(data)
    localStorage.setItem('editedPage', JSON.stringify(data))

    notify('success', 'Success', 'Page saved')
    return true
  } catch (e: any) {

    if (e?.data?.error && typeof e?.data?.message !== 'string') {
      notifyArray('error', e.data.error, e.data)
    } else if (e?.data?.error) {
      notify('error', e.data.error, e.message)
    } else {
      notify('error', e.statusCode.toString(), e.statusMessage)
    }
    return false
  }
}

async function confirmDeletePage() {
  if (!form.value) return

  dialogStore.closeAllDialogs()
  dialogStore.confirmDialog = {
    title: 'Delete',
    dialog: 'Are you sure you want to delete this page?',
    buttons: [
      {
        text: 'Cancel',
        action: () => dialogStore.confirmDialog = null,
      },
      {
        text: 'Delete',
        action: async () => {
          if (form.value?.id) {
            await deletePage()
          } else {
            closeTab()
          }

          dialogStore.confirmDialog = null
        }
      }
    ]
  }
}

async function deletePage() {
  if (!form.value) return

  const clearForm = () => {
    form.value = null
    pagesStore.editedPage = null
    localStorage.removeItem('editedPage')
  }

  if (form.value.id && form.value.blank) {
    pagesStore.pages = pagesStore.pages.filter(page => page.id !== form.value!.id)
    clearForm()
    return
  }

  if (!form.value.id && hasChanges.value) {
    clearForm()
    return
  }

  try {
    await pagesStore.deletePage(form.value.id!)

    clearForm()
    localStorage.removeItem('editedPage')

    notify('success', 'Success', 'Page deleted')
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
</script>

<template>
  <ClientOnly>
    <TabsPanel
      v-if="pagesStore.editedPage"
      @on-close="confirmCloseTab"
    />
    <!--  <div style="display: flex; height: 100%; overflow: auto;">-->
    <!--    <pre>{{form}}</pre>-->
    <!--    <pre>{{ pagesStore.editedPage }}</pre>-->
    <!--  </div>-->
    <ControlPanel
      v-model:tree="showTree"
      v-model:tab="tabName"
      @on-create="createPage"
      @on-save="savePage"
      @on-delete="confirmDeletePage"
    />
    <div
      class="content-wrapper"
      :class="{'page-opened': pagesStore.editedPage}"
    >
      <aside
        v-if="showTree"
        class="pages-tree"
      >
        <Simplebar class="scrollbar-pages-tree">
          <PagesTree
            @on-page-click="openPage"
          />
        </Simplebar>
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
          <FileContent
            v-if="form.type !== 'review'"
            :content="form.content"
          />
          <div
            v-if="form.type === 'review'"
            v-html="form.content.review"
            style="padding: 24px;"
          />
        </div>

        <el-form
          v-else
          class="form"
          :class="{'form_p0': tabName === 'content' && form.type === 'review'}"
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
                  :label="item.desktop.title"
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
                :min="0"
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

            <el-form-item
              label="OG Title"
            >
              <el-input
                size="large"
                v-model="form[tabName].ogTitle"
              />
            </el-form-item>

            <el-form-item
              label="OG Description"
            >
              <el-input
                type="textarea"
                size="large"
                autosize
                v-model="form[tabName].ogDescription"
              />
            </el-form-item>

            <el-form-item
              label="OG Image Url"
            >
              <el-input
                size="large"
                v-model="form[tabName].ogImageUrl"
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
              label="Window background"
              prop="desktop.background"
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
              v-if="form.type !== 'review'"
              v-model="form.content"
            />
            <ClientOnly >
              <ReviewEditor
                :key="form.id"
                v-if="form.type === 'review'"
                v-model="form.content.review"
              />
            </ClientOnly>
          </div>
        </el-form>
      </div>
      <div
        v-else
        class="empty-state"
      >
        <p>
          Pick a page to edit<br/>
          or<br/>
          <span
            class="create-page"
            @click="createPage()"
          >
          start a fresh one
      </span>
        </p>
      </div>
    </div>
  </ClientOnly>
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
  border-right: 1px solid #e0dbdb;
  background-color: #f5f6ef;
  font-size: 14px;
  overflow: auto;
}
.content-wrapper {
  position: sticky;
  display: flex;
  height: calc(100% - 46px);
  background: #f5f5f5;
  border-top: 1px solid #e0dbdb;

  .page-opened {
    height: calc(100% - 86px);
  }
}

.main-frame {
  height: 100%;
  width: 100%;
  overflow: auto;
}

.form {
  height: 100%;
  padding: 24px;

  &_p0 {
    padding: 0;
  }

  &-block {
    max-width: 676px;
    height: 100%;

    &_full-width {
      width: 100%;
      max-width: 100%;
    }
  }

  &:deep(.editor) {
    height: 100%;
  }
  &:deep(.el-tiptap-editor__menu-bar),
  &:deep(.el-tiptap-editor__content) {
    border-radius: 0;
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
  text-align: center;
  .create-page {
    text-decoration: underline;
    cursor: pointer;
    transition: .2s ease-in-out;
    &:hover {
      text-decoration: none;
      color: #878886;
    }
  }
}

.scrollbar-pages-tree {
  height: 100%;
  &:deep(div.simplebar-content) {
    height: 100%;
    display: flex;
  }
  &:deep(.simplebar-scrollbar::before) {
    left: 1px;
    right: 0;
  }
  &:deep(.simplebar-track.simplebar-vertical) {
    width: 8px;
    background-color: #e5e5de;
  }
}

.mb-0 {
  margin-bottom: 0;
}
.animate__faster {
  --animate-duration: 0.7s;
}
</style>
