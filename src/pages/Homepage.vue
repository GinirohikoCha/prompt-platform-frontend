<template>
  <div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-700 text-center">
        <div class="text-blue-600 font-bold mb-3">
          <SvgIcon style="position:relative; top:2px;" name="openai" color="#326fd1"/>
          &nbsp;POWERED BY CHAT-GPT
        </div>
        <div class="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
        <div class="text-700 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam
          eligendi quos.
        </div>

        <div style="margin-top: 20px">
          <span class="p-input-icon-left p-float-label">
            <i class="pi pi-search"/>
            <InputText class="font-bold shadow-5" v-model="searchTextRef" style="width: 50vw"/>
            <label for="value">Search</label>
            <Button class="ml-1 shadow-5" label="NEW" icon="pi pi-plus"/>
          </span>
        </div>

        <div style="display: inline-block; margin-top: 50px; width: 60vw">
          <div class="text-left">
            <SelectButton v-model="selectCategoryRef" :options="['全部', '热门']" aria-labelledby="basic" />
          </div>

          <div class="grid" style="margin-top: 0.8rem">
            <div class="col-12 md:col-6 lg:col-3 p-1">
              <Card class="text-left shadow-2">
                <template #title>🧙‍ 扮演一名法师 </template>
                <template #subtitle> 欢迎来到霍格沃兹 </template>
                <template #content>
                  <Rating v-model="value" :cancel="false" readonly />
                  <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">创作者：-</div>
                  <div class="flex flex-wrap gap-1" style="margin-top: 0.5rem">
                    <Tag value="官方" />
                    <Tag severity="success" value="开源" />
                  </div>
                </template>
                <template #footer>
                  <Button icon="pi pi-pencil" label="试一试" size="small"/>
                </template>
              </Card>
            </div>

            <div class="col-12 md:col-6 lg:col-3 p-1">
              <Card class="text-left shadow-2">
                <template #title>💻 ‍扮演 Linux 终端 </template>
                <template #subtitle> 你的下一台 Linux 又何必是 Linux</template>
                <template #content>
                  <Rating v-model="value" :cancel="false" readonly />
                  <div style="font-size: 0.8rem; margin-top: 0.5rem; font-weight: bold">创作者：-</div>
                  <div class="flex flex-wrap gap-1" style="margin-top: 0.5rem">
                    <Tag value="官方" />
                    <Tag severity="warning" value="收费" />
                  </div>
                </template>
                <template #footer>
                  <Button icon="pi pi-pencil" label="试一试" size="small"/>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'

const searchTextRef = ref(null)
const selectCategoryRef = ref('全部')
</script>

<style scoped>
/deep/.p-rating .p-rating-item .p-rating-icon {
  font-size: 1rem;
}

/deep/.p-card .p-card-content {
  padding: 0.5rem 0;
}

/deep/.p-card .p-card-footer {
  padding: 1rem 0 0 0;
}
</style>