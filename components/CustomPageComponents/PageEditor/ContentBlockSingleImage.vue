<script setup lang="ts">
import {ElUpload, ElDialog, ElIcon, type UploadUserFile, type UploadFile} from 'element-plus';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import {useImages} from "~/composables/useImages";

const config = useRuntimeConfig()
const { image = '' } = defineProps<{
  image: any
}>()
const { imageCompress, toBase64, checkTypes } = useImages()
const emit = defineEmits(['update:image'])

const fileList = ref<UploadUserFile[]>([])

onMounted(() => {
  if (image) {
    fileList.value = [{
      name: 'image',
      url: !image.includes(';base64') ? config.public.IMAGES_URL + image : image
    }]
  }
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleChange = async (file: UploadFile) => {
  const error = checkTypes(file.raw!)
  if (error) return

  const img = await imageCompress(file.raw!)
  const base64data = await toBase64(img)

  fileList.value = [{
    name: file.name,
    url: base64data
  }]

  emit('update:image', base64data)
}

const handleRemove = (file: UploadFile) => {
  fileList.value = []
  emit('update:image', '')
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
