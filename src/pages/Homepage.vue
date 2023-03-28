<template>
  <div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-700 text-center">
        <div class="text-blue-600 font-bold mb-3">
          <SvgIcon style="position:relative; top:2px;" name="openai" color="#326fd1" />
          &nbsp;POWERED BY CHAT-GPT
        </div>
        <div class="text-900 font-bold text-5xl mb-3">Join Our Design Community</div>
        <div class="text-700 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>

        <div style="margin-top: 20px">
          <span class="p-input-icon-left p-float-label">
              <i class="pi pi-search" />
              <InputText class="font-bold" v-model="searchText" style="width: 50vw"/>
              <label for="value">Search</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'

const searchText = ref(null)
</script>

<style scoped>

</style>