<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center">Knowledge Base</h2>

    <CRow>
      <CCol v-for="item in kbaseData" :key="item.id" md="4" class="mb-4">
        <CCard @click="openModal(item)" class="h-100 cursor-pointer shadow-sm">
          <CCardImage :src="item.img_base" alt="KBase Image" height="200" />
          <CCardBody>
            <CCardTitle>{{ item.title }}</CCardTitle>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Reusable Modal -->
    <KBaseModal
      :visible="modalVisible"
      :title="selectedItem?.title"
      @close="modalVisible = false"
    >
      <p>{{ selectedItem?.description }}</p>
    </KBaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import KBaseModal from './Modal.vue'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardImage,
  CCardTitle
} from '@coreui/vue'

const kbaseData = ref([])
const modalVisible = ref(false)
const selectedItem = ref(null)

async function fetchKBase() {
  try {
    const res = await axios.get(import.meta.env.VITE_API_URL +'/api/knowledge-base')
    kbaseData.value = res.data
  } catch (err) {
    console.error('Ошибка при загрузке базы знаний:', err)
  }
}

function openModal(item) {
  selectedItem.value = item
  modalVisible.value = true
}

onMounted(() => {
  fetchKBase()
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
