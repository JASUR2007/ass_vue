<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Tickets List</strong>
          </CCardHeader>
          <CCardBody>
            <!-- Filters -->
            <CForm class="row g-3 mb-3" @submit.prevent="applyFilter">
              <div class="col-auto">
                <CFormLabel for="filterClient" class="visually-hidden">Client</CFormLabel>
                <CFormInput
                  id="filterClient"
                  v-model="filterClient"
                  placeholder="Filter by client"
                  type="text"
                />
              </div>
              <div class="col-auto">
                <CFormLabel for="filterStatus" class="visually-hidden">Status</CFormLabel>
                <CFormSelect id="filterStatus" v-model="filterStatus" aria-label="Select status">
                  <option value="">All statuses</option>
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </CFormSelect>
              </div>
              <div class="col-auto">
                <CFormLabel for="filterDate" class="visually-hidden">Date</CFormLabel>
                <CFormInput
                  id="filterDate"
                  v-model="filterDate"
                  type="date"
                />
              </div>
              <div class="col-auto d-flex align-items-end">
                <CButton type="submit" color="primary" class="me-2">Apply Filter</CButton>
                <CButton type="button" color="secondary" @click="clearFilter">Clear</CButton>
              </div>
            </CForm>

            <!-- Tickets Table -->
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Client</CTableHeaderCell>
                  <CTableHeaderCell>Model</CTableHeaderCell>
                  <CTableHeaderCell>Issue Type</CTableHeaderCell>
                  <CTableHeaderCell>Scheduled Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Ticket Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow
                  v-for="ticket in orderedFilteredTickets"
                  :key="ticket.id"
                  :class="{ 'text-muted': ticket.status === 'completed' }"
                >
                  <CTableDataCell>{{ ticket.id }}</CTableDataCell>
                  <CTableDataCell>{{ ticket.user.name }}</CTableDataCell>
                  <CTableDataCell>{{ ticket.computer_model }}</CTableDataCell>
                  <CTableDataCell>{{ ticket.issue_type }}</CTableDataCell>
                  <CTableDataCell>{{ formatDate(ticket.scheduled_date) }}</CTableDataCell>
                  <CTableDataCell>{{ ticket.status }}</CTableDataCell>
                  <CTableDataCell>{{ ticket.user.phone_number }}</CTableDataCell>
                  <CTableDataCell style="color:red" v-if="!ticket.total_estimate_price">Not priced</CTableDataCell>
                  <CTableDataCell v-else>{{ ticket.total_estimate_price }}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" size="sm" variant="ghost" @click="editTicket(ticket)" :disabled="ticket.status==='completed'">
                      <i class="fas fa-edit"></i>
                    </CButton>
                    <CButton color="danger" size="sm" variant="ghost" class="ms-2" @click="deleteTicket(ticket)" :disabled="ticket.status==='completed'">
                      <i class="fas fa-trash"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Edit Modal -->
    <CModal :visible="editModalVisible" @close="closeEditModal">
      <CModalHeader>
        <CModalTitle>Edit Ticket #{{ editedTicket?.id }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="saveEditedTicket">
          <CFormLabel>Scheduled Date</CFormLabel>
          <CFormInput v-model="editedTicket.scheduled_date" type="date" required />

          <CFormLabel class="mt-2">Ticket Price</CFormLabel>
          <CFormInput v-model="editedTicket.estimate_price" type="number" />

          <CFormLabel class="mt-2">Status</CFormLabel>
          <CFormSelect v-model="editedTicket.status">
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </CFormSelect>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeEditModal">Cancel</CButton>
        <CButton color="primary" @click="saveEditedTicket">Save</CButton>
      </CModalFooter>
    </CModal>

    <!-- Delete Confirm Modal -->
    <CModal :visible="deleteModalVisible" @close="closeDeleteModal">
      <CModalHeader>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete ticket #{{ ticketToDelete?.id }}?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">Cancel</CButton>
        <CButton color="danger" @click="confirmDeleteTicket">Delete</CButton>
      </CModalFooter>
    </CModal>
  </CContainer>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'

// data refs
const tickets = ref([])
const spareParts = ref([])

// filters
const filterClient = ref('')
const filterStatus = ref('')
const filterDate = ref('')

// modals
const editModalVisible = ref(false)
const deleteModalVisible = ref(false)

const editedTicket = ref(null)
const ticketToDelete = ref(null)

// fetch tickets and parts
onMounted(async () => {
  const token = localStorage.getItem('token')
  const [tRes, pRes] = await Promise.all([
    axios.get(import.meta.env.VITE_API_URL +'/api/tickets', { headers:{Authorization:`Bearer ${token}`}}),
    axios.get(import.meta.env.VITE_API_URL +'/api/warehouse', { headers:{Authorization:`Bearer ${token}`}})
  ])
  tickets.value = tRes.data
  spareParts.value = pRes.data
})

// filtering
function applyFilter() {}
function clearFilter() {
  filterClient.value = ''
  filterStatus.value = ''
  filterDate.value = ''
}

const filteredTickets = computed(() => {
  return ticketsWithAdditionalPrice.value.filter(t => {
    const nameMatch = t.user.name.toLowerCase().includes(filterClient.value.toLowerCase())
    const statusMatch = filterStatus.value ? t.status===filterStatus.value : true
    const dateMatch = filterDate.value ? t.scheduled_date===filterDate.value : true
    return nameMatch && statusMatch && dateMatch
  })
})

// order: by scheduled_date asc, completed go last
const orderedFilteredTickets = computed(() => {
  const sorted = [...filteredTickets.value].sort((a,b) => {
    if(a.status==='completed' && b.status!=='completed') return 1
    if(b.status==='completed' && a.status!=='completed') return -1
    return new Date(a.scheduled_date) - new Date(b.scheduled_date)
  })
  return sorted
})

// format date
function formatDate(dt){ return dt? dt.slice(0,10): '' }

// edit
function editTicket(ticket){
  editedTicket.value = JSON.parse(JSON.stringify(ticket))
  editModalVisible.value = true
}
function closeEditModal(){ editModalVisible.value=false; editedTicket.value=null }

// sync estimate_price when part changes
watch(() => editedTicket.value?.additional_issue_id, (newId) => {
  if (newId) {
    const part = spareParts.value.find(p => p.id === newId)
    if (part) {
      editedTicket.value.estimate_price = part.price
    }
  }
})
const ticketsWithAdditionalPrice = computed(() => {
  return tickets.value.map(ticket => {
    let additionalPart = spareParts.value.find(p => p.id === ticket.additional_issue_id)
    let additionalPrice = additionalPart ? additionalPart.price : 0

    // Если у estimate_price есть значение — добавляем дополнительную цену, иначе 0
    let totalPrice = (ticket.estimate_price || 0) + additionalPrice

    return {
      ...ticket,
      additional_issue: additionalPart || null,
      total_estimate_price: totalPrice,
    }
  })
})
async function saveEditedTicket(){
  const token = localStorage.getItem('token')

  if (editedTicket.value.additional_issue_id) {
    const part = spareParts.value.find(p => p.id === editedTicket.value.additional_issue_id)
    editedTicket.value.estimate_price = part?.price || editedTicket.value.estimate_price
  }
  await axios.put(import.meta.env.VITE_API_URL +`/api/tickets/${editedTicket.value.id}`, editedTicket.value, { headers:{Authorization:`Bearer ${token}`}})
  const idx = tickets.value.findIndex(t=>t.id===editedTicket.value.id)
  tickets.value[idx] = {...editedTicket.value}
  closeEditModal()
}

// delete
function deleteTicket(ticket){ ticketToDelete.value=ticket; deleteModalVisible.value=true }
function closeDeleteModal(){ deleteModalVisible.value=false; ticketToDelete.value=null }
async function confirmDeleteTicket(){
  const token = localStorage.getItem('token')
  await axios.delete(import.meta.env.VITE_API_URL +`/api/tickets/${ticketToDelete.value.id}`, { headers:{Authorization:`Bearer ${token}`}})
  tickets.value = tickets.value.filter(t=>t.id!==ticketToDelete.value.id)
  closeDeleteModal()
}
</script>

<style scoped>
.text-muted { opacity: 0.6; }
.ms-2 { margin-left: .5rem; }
.me-2 { margin-right: .5rem; }
</style>
