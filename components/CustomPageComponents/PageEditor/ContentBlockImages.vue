<script setup lang="ts">
import {ElUpload, ElDialog, ElIcon, type UploadFile} from 'element-plus';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import {useImages} from "~/composables/useImages";
import {cloneObj} from "~/helpers/app.helpers";

const config = useRuntimeConfig()
const { images = [] } = defineProps<{
  images: any
}>()
const { checkTypes, imageCompress, toBase64 } = useImages()
const emit = defineEmits(['add:image', 'remove:image'])

const fileList = ref<UploadFile[]>([])

onMounted(() => {
  if (images.length > 0) {
    const list = images.map((file: string) => {
      return {
        name: randomKey(),
        url: !file.includes(';base64') ? config.public.IMAGES_URL + file : file
      }
    })

    fileList.value = cloneObj(list)
  }
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

function randomKey() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString + '-' + new Date().getTime()
}

const handleChange = async (file: UploadFile) => {
  const error = checkTypes(file.raw!)
  if (error) return

  const img = await imageCompress(file.raw!)
  const base64data = await toBase64(img)
  emit('add:image', base64data)

  fileList.value.push(file)
}

const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex(item => item.name === file.name)

  if (index > -1) {
    fileList.value = [
      ...fileList.value.slice(0, index),
      ...fileList.value .slice(index + 1)
    ]
    emit('remove:image', index)
  }
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
</script>

<template>
  <div class="content-block-images">
    <el-upload
      :file-list="fileList"
      list-type="picture-card"
      :multiple="true"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.content-block-images {
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
  &:deep(.el-upload-list--picture-card) {
    .el-upload-list__item-thumbnail {
      object-fit: cover;
    }
  }
}
</style>
