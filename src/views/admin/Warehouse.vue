<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader class="d-flex justify-content-between align-items-center">
            <strong>Warehouse Items</strong>
            <CButton color="primary"  size="sm" @click="openAddModal">
              <i class="fas fa-plus"></i>
            </CButton>
          </CCardHeader>
          <CCardBody>
            <!-- Filters -->
            <CForm class="row g-3 mb-3" @submit.prevent="applyFilter">
              <div class="col-auto">
                <CFormLabel for="filterCategory" class="visually-hidden">Category</CFormLabel>
                <CFormSelect
                  id="filterCategory"
                  v-model="filterCategory"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                </CFormSelect>
              </div>
              <div class="col-auto">
                <CFormLabel for="filterName" class="visually-hidden">Name</CFormLabel>
                <CFormInput
                  id="filterName"
                  v-model="filterName"
                  placeholder="Filter by name"
                  type="text"
                />
              </div>
              <div class="col-auto">
                <CFormLabel for="filterPrice" class="visually-hidden">Price</CFormLabel>
                <CFormInput
                  id="filterPrice"
                  v-model="filterPrice"
                  placeholder="Filter by price"
                  type="text"
                />
              </div>
              <div class="col-auto d-flex align-items-end">
                <CButton type="button" color="secondary" @click="clearFilter">Clear</CButton>
              </div>
            </CForm>

            <!-- Table -->
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="item in filteredItems" :key="item.id">
                  <CTableDataCell>{{ item.id }}</CTableDataCell>
                  <CTableDataCell>{{ item.category }}</CTableDataCell>
                  <CTableDataCell>{{ item.name }}</CTableDataCell>
                  <CTableDataCell>{{ truncate(item.description, 50) }}</CTableDataCell>
                  <CTableDataCell>{{ item.price }}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" variant="ghost" color="primary" @click="openEditModal(item)">
                      <i class="fas fa-edit"></i>
                    </CButton>
                    <CButton size="sm" variant="ghost" color="danger" class="ms-2" @click="openDeleteModal(item)">
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

    <!-- Add Modal -->
    <CModal :visible="addModal" @close="closeAddModal">
      <CModalHeader>
        <CModalTitle>Add Warehouse Item</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="createItem">
          <CFormLabel class="mt-2">Category</CFormLabel>
          <CFormSelect v-model="newItem.category" required>
            <option disabled value="">Select category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </CFormSelect>

          <CFormLabel class="mt-2">Name</CFormLabel>
          <CFormInput v-model="newItem.name" required />

          <CFormLabel class="mt-2">Description</CFormLabel>
          <CFormTextarea v-model="newItem.description" />

          <CFormLabel class="mt-2">Price</CFormLabel>
          <CFormInput v-model="newItem.price" type="number" step="0.01" required />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeAddModal">Cancel</CButton>
        <CButton color="primary" @click="createItem">Create</CButton>
      </CModalFooter>
    </CModal>

    <!-- Edit Modal -->
    <CModal :visible="editModal" @close="closeEditModal">
      <CModalHeader>
        <CModalTitle>Edit Item #{{ editedItem?.id }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm @submit.prevent="updateItem">
          <CFormLabel class="mt-2">Category</CFormLabel>
          <CFormSelect v-model="editedItem.category" required>
            <option disabled value="">Select category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
          </CFormSelect>

          <CFormLabel class="mt-2">Name</CFormLabel>
          <CFormInput v-model="editedItem.name" required />

          <CFormLabel class="mt-2">Description</CFormLabel>
          <CFormTextarea v-model="editedItem.description" />

          <CFormLabel class="mt-2">Price</CFormLabel>
          <CFormInput v-model="editedItem.price" type="number" step="0.01" required />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeEditModal">Cancel</CButton>
        <CButton color="primary" @click="updateItem">Save</CButton>
      </CModalFooter>
    </CModal>

    <!-- Delete Confirm Modal -->
    <CModal :visible="deleteModal" @close="closeDeleteModal">
      <CModalHeader>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to delete item #{{ itemToDelete?.id }}?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeDeleteModal">Cancel</CButton>
        <CButton color="danger" @click="deleteItem">Delete</CButton>
      </CModalFooter>
    </CModal>
  </CContainer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const items = ref([])

// Filters
const filterCategory = ref('')
const filterName     = ref('')
const filterPrice    = ref('')

// Modals & forms
const addModal     = ref(false)
const editModal    = ref(false)
const deleteModal  = ref(false)

const newItem      = ref({ category: '', name: '', description: '', price: null })
const editedItem   = ref(null)
const itemToDelete = ref(null)

// Fetch
async function fetchItems() {
  try {
    const res = await axios.get(import.meta.env.VITE_API_URL +'/api/warehouse', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    items.value = res.data
  } catch (e) {
    console.error(e)
  }
}

// Filters application
function applyFilter() {}
function clearFilter() {
  filterCategory.value = ''
  filterName.value     = ''
  filterPrice.value    = ''
}

// Computed filtered list
const filteredItems = computed(() => {
  return items.value.filter(i => {
    const catMatch = filterCategory.value ? i.category === filterCategory.value : true
    const nameMatch= i.name.toLowerCase().includes(filterName.value.toLowerCase())
    const priceStr = i.price.toString()
    const priceMatch= priceStr.includes(filterPrice.value)
    return catMatch && nameMatch && priceMatch
  })
})

// Add
function openAddModal() {
  newItem.value = { category: 'Hardware', name: '', description: '', price: null }
  addModal.value = true
}
function closeAddModal() {
  addModal.value = false
}
async function createItem() {
  try {
    const res = await axios.post(import.meta.env.VITE_API_URL +'/api/warehouse', newItem.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    items.value.push(res.data)
    closeAddModal()
  } catch (e) {
    console.error(e)
  }
}

// Edit
function openEditModal(item) {
  editedItem.value = { ...item }
  editModal.value = true
}
function closeEditModal() {
  editModal.value = false
  editedItem.value = null
}
async function updateItem() {
  try {
    const res = await axios.put(
      import.meta.env.VITE_API_URL +`/api/warehouse/${editedItem.value.id}`,
      editedItem.value,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
    const idx = items.value.findIndex(i => i.id === editedItem.value.id)
    items.value[idx] = res.data
    closeEditModal()
  } catch (e) {
    console.error(e)
  }
}

// Delete
function openDeleteModal(item) {
  itemToDelete.value = item
  deleteModal.value = true
}
function closeDeleteModal() {
  deleteModal.value = false
  itemToDelete.value = null
}
async function deleteItem() {
  try {
    await axios.delete(
      import.meta.env.VITE_API_URL +`/api/warehouse/${itemToDelete.value.id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
    items.value = items.value.filter(i => i.id !== itemToDelete.value.id)
    closeDeleteModal()
  } catch (e) {
    console.error(e)
  }
}

// Utility
function truncate(str, len=30) {
  return str && str.length > len ? str.slice(0,len)+'…' : str
}

onMounted(fetchItems)
</script>

<style scoped>
.ms-2 { margin-left: .5rem; }
.me-2 { margin-right: .5rem; }
</style>
