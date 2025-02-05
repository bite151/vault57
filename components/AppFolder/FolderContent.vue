<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import EmptyFolder from "~/components/AppFolder/EmptyFolder.vue";
import AsyncIcon from "~/components/common/AsyncIcon.vue";

const { $bus } = useNuxtApp()
const route = useRoute()
const pagesStore = usePagesStore()

const { currentPage } = defineProps(['currentPage']);
const child = computed(() => pagesStore.pages
  .filter(page => page.parentId === currentPage.id)
  .sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
)

function generateUrl(currentPage: any, url: string[] = []): string {
  const child = pagesStore.pages.find(page => page.id === currentPage.parentId)
  url.unshift(currentPage.url)
  if (child) {
    return generateUrl(child, url)
  }
  return url.filter(url => url !== '/').join('')
}

function resetFrontPosition() {
  setTimeout(() =>
    $bus.$emit('resetFront', false)
  , 1)
}

function isActive(url: string) {
  return url === route.path
}

</script>

<template>
  <EmptyFolder v-if="!child?.length">
    Папка пуста
  </EmptyFolder>

  <div class="files" v-else>
    <div class="file"
       v-for="item in child"
       :key="item.id"
    >
      <nuxt-link
        :to="generateUrl(item)"
        active-class="file_active"
        @click="resetFrontPosition()"
      >
        <AsyncIcon
          :name="item.icon"
          :size="52"
          :strokeWidth="1"
        />
        <p>{{ item.title }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

.file {
  display: flex;
  justify-content: center;
  width: calc((100% - 80px) / 5);
  min-width: 166px;
  margin-bottom: 12px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    line-height: 1.1;
    color: #31322d;

    cursor: pointer;
  }

  svg {
    padding: 3px;
    border-radius: 8px;
    flex-shrink: 0;
    transition: background-color .2s ease-in-out;
  }

  p {
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    text-align: center;
    line-height: 1.3;
    transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
  }
  &:hover, &_active {
    p {
      //color: #0164c6;
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }

    svg {
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }
  }

  &_active {
    p, svg {
      border: 1px dotted #aaa !important;
    }
  }
}
</style>
