<template>
  <CContainer>
    <CRow class="mb-3">
      <CCol>
        <CForm class="row g-3" @submit.prevent>
          <div class="col-auto">
            <CFormLabel class="visually-hidden" for="filterEmail">Email</CFormLabel>
            <CFormInput
              id="filterEmail"
              v-model="filterEmail"
              placeholder="Filter by email"
              type="text"
            />
          </div>
          <div class="col-auto">
            <CFormLabel class="visually-hidden" for="filterQuote">Quote</CFormLabel>
            <CFormInput
              id="filterQuote"
              v-model.number="filterQuote"
              placeholder="Filter by quote"
              type="number"
              min="0"
              max="5"
            />
          </div>
          <div class="col-auto d-flex align-items-end">
            <CButton type="button" color="secondary" @click="clearFilter">Clear</CButton>
          </div>
        </CForm>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Support Requests</strong>
          </CCardHeader>
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>User ID</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Quote</CTableHeaderCell>
                  <CTableHeaderCell>Created At</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="req in filteredRequests" :key="req.id">
                  <CTableDataCell>{{ req.id }}</CTableDataCell>
                  <CTableDataCell>{{ req.userId }}</CTableDataCell>
                  <CTableDataCell>{{ req.user?.email || '-' }}</CTableDataCell>
                  <CTableDataCell>{{ truncate(req.description, 50) }}</CTableDataCell>
                  <CTableDataCell>
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="fa fa-star"
                      :class="{'text-warning': n <= req.quote, 'text-secondary': n > req.quote}"
                    ></i>
                  </CTableDataCell>
                  <CTableDataCell>{{ formatDate(req.createdAt) }}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const requests = ref([])
const users = ref([])
const filterEmail = ref('')
const filterQuote = ref(null)

async function fetchData() {
  try {
    const [reqRes, userRes] = await Promise.all([
      axios.get(import.meta.env.VITE_API_URL +'/api/support-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }),
      axios.get(import.meta.env.VITE_API_URL +'/api/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    ])
    requests.value = reqRes.data
    users.value = userRes.data
  } catch (e) {
    console.error('Failed to fetch data:', e)
  }
}

onMounted(fetchData)

function formatDate(dt) {
  return dt ? new Date(dt).toLocaleString() : ''
}

function truncate(str, len = 30) {
  return str && str.length > len ? str.slice(0, len) + '…' : str
}

function clearFilter() {
  filterEmail.value = ''
  filterQuote.value = null
}

// enrich requests with user data
const enrichedRequests = computed(() => {
  return requests.value.map(req => {
    const user = users.value.find(u => u.id == req.userId)
    return { ...req, user }
  })
})

const filteredRequests = computed(() => {
  return enrichedRequests.value.filter(req => {
    const emailMatch = filterEmail.value
      ? req.user?.email.toLowerCase().includes(filterEmail.value.toLowerCase())
      : true
    const quoteMatch = filterQuote.value != null
      ? req.quote === filterQuote.value
      : true
    return emailMatch && quoteMatch
  })
})
</script>

<style scoped>
.ms-2 { margin-left: .5rem; }
.me-2 { margin-right: .5rem; }
.star-rating .fa { font-size: 1.2rem; margin-right: 0.2rem; }
</style>
