<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Company List</strong>
          </CCardHeader>
          <CCardBody>
            <CForm class="row g-3">
              <div class="col-auto">
                <CFormLabel for="filterCompany" class="visually-hidden">Company Name</CFormLabel>
                <CFormInput
                  id="filterCompany"
                  v-model="filterCompany"
                  placeholder="Filter by company name"
                  type="text"
                />
              </div>
              <div class="col-auto">
                <CFormLabel for="filterEmail" class="visually-hidden">Email</CFormLabel>
                <CFormInput
                  id="filterEmail"
                  v-model="filterEmail"
                  placeholder="Filter by email"
                  type="text"
                />
              </div>
              <div class="col-auto">
                <CFormLabel for="filterPhone" class="visually-hidden">Phone</CFormLabel>
                <CFormInput
                  id="filterPhone"
                  v-model="filterPhone"
                  placeholder="Filter by phone"
                  type="text"
                />
              </div>
              <div class="col-auto"></div>
              <div class="col-auto">
                <CButton type="button" color="secondary" class="mb-3" @click="clearFilter">Clear</CButton>
              </div>
            </CForm>

            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Company Name</CTableHeaderCell>
                  <CTableHeaderCell>Company Adress</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Price</CTableHeaderCell>
                  <CTableHeaderCell>Phone Number</CTableHeaderCell>
                  <CTableHeaderCell>Account Created</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="(seller, index) in filteredSellers" :key="index">
                  <CTableDataCell>{{ index+1 }}</CTableDataCell>
                  <CTableDataCell>{{ seller.company_name }}</CTableDataCell>
                  <CTableDataCell>{{ seller.company_adress === null ? "no company address" : seller.company_adress }}</CTableDataCell>
                  <CTableDataCell>{{ seller.email }}</CTableDataCell>
                  <CTableDataCell>{{ seller.price }}</CTableDataCell>
                  <CTableDataCell>{{ seller.phone_number }}</CTableDataCell>
                  <CTableDataCell>{{ new Date(seller.createdAt).toLocaleDateString() }}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" size="sm" variant="ghost" @click="openEditModal(seller)">
                      <i class="fas fa-edit"></i>
                    </CButton>
                    <CButton color="danger" size="sm" variant="ghost" class="ms-2" @click="deleteSeller(seller.id)">
                      <i class="fas fa-trash"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            <CModal
              :visible="isEditModalOpen"
              title="Edit Seller"
              @close="closeEditModal"
            >
              <template #default>
                <CForm @submit.prevent="saveSeller">
                  <CFormLabel for="editCompanyName">Company Name</CFormLabel>
                  <CFormInput
                    id="editCompanyName"
                    v-model="editSeller.company_name"
                    required
                  />

                  <CFormLabel for="editEmail" class="mt-3">Email</CFormLabel>
                  <CFormInput
                    id="editEmail"
                    type="email"
                    v-model="editSeller.email"
                    required
                  />
                  <CFormLabel for="editPhone" class="mt-3">Price</CFormLabel>
                  <CFormInput
                    id="editPhone"
                    v-model="editSeller.price"
                    required
                  />
                  <CFormLabel for="editPhone" class="mt-3">Phone Number</CFormLabel>
                  <CFormInput
                    id="editPhone"
                    v-model="editSeller.phone_number"
                    required
                  />

                  <div class="mt-4 d-flex justify-content-end">
                    <CButton type="button" color="secondary" class="me-2" @click="closeEditModal">Cancel</CButton>
                    <CButton type="submit" color="primary">Save</CButton>
                  </div>
                </CForm>
              </template>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import axios from 'axios'
import CModal from '../../components/web/Modal.vue'

const sellers = ref([])

const filterCompany = ref('')
const filterEmail = ref('')
const filterPhone = ref('')

const isEditModalOpen = ref(false)
const editSeller = reactive({
  id: null,
  company_name: '',
  email: '',
  phone_number: '',
  createdAt: '',
  price: ''
})

const filteredSellers = computed(() => {
  return sellers.value.filter(seller => {
    if (seller.account !== 'business') return false

    const matchCompany = seller.company_name.toLowerCase().includes(filterCompany.value.toLowerCase())
    const matchEmail = seller.email.toLowerCase().includes(filterEmail.value.toLowerCase())
    const matchPhone = seller.phone_number.toLowerCase().includes(filterPhone.value.toLowerCase())
    return matchCompany && matchEmail && matchPhone
  })
})

const fetchSellers = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(import.meta.env.VITE_API_URL +'/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    // Фильтруем пользователей с account = 'business'
    sellers.value = response.data.filter(user => user.account === 'business')
    console.log(sellers.value)
  } catch (error) {
    console.error('Ошибка при загрузке продавцов:', error)
  }
}

const deleteSeller = async (id) => {
  if (!confirm('Are you sure you want to delete this seller?')) return
  try {
    const token = localStorage.getItem('token')
    await axios.delete(import.meta.env.VITE_API_URL +`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    sellers.value = sellers.value.filter(seller => seller.id !== id)
  } catch (error) {
    console.error('Ошибка при удалении:', error)
  }
}

const openEditModal = (seller) => {
  Object.assign(editSeller, seller)
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  Object.assign(editSeller, {
    id: null,
    company_name: '',
    price: '',
    email: '',
    phone_number: '',
    createdAt: '',
  })
}

const saveSeller = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(import.meta.env.VITE_API_URL +`/api/users/${editSeller.id}`, {
      company_name: editSeller.company_name,
      email: editSeller.email,
      phone_number: editSeller.phone_number,
      price: editSeller.price
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const index = sellers.value.findIndex(s => s.id === editSeller.id)
    if (index !== -1) {
      sellers.value[index] = { ...editSeller }
    }
    closeEditModal()
  } catch (error) {
    console.error('Ошибка при сохранении:', error)
  }
}

const clearFilter = () => {
  filterCompany.value = ''
  filterEmail.value = ''
  filterPhone.value = ''
}

onMounted(fetchSellers)
</script>
