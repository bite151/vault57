<script setup lang="ts">
import {ElUpload, ElDialog, ElIcon, type UploadFile} from 'element-plus';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import {useImages} from "~/composables/useImages";

const config = useRuntimeConfig()
const { images = [] } = defineProps<{
  images: any
}>()
const { checkTypes, imageCompress, toBase64 } = useImages()
const emit = defineEmits(['update:images'])

const fileList = ref<UploadFile[]>([])

onMounted(() => {
  if (images.length > 0) {
    fileList.value = images.map((file: string) => ({
      name: 'image',
      url: !file.includes(';base64') ? config.public.MEDIA_URL + file : file
    }))
  }
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleChange = async (file: UploadFile) => {
  const error = checkTypes(file.raw!)
  if (error) return

  const img = await imageCompress(file.raw!)
  const base64data = await toBase64(img)

  const urls = fileList.value.map(file => file.url?.replace(config.public.MEDIA_URL, ''))
  urls.push(base64data)
  emit('update:images', urls)
}

const handleRemove = (file: UploadFile) => {
  fileList.value = fileList.value.filter(item => item.url !== file.url)
  emit('update:images', fileList.value.map(file => file.url))
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
