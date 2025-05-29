<template>
  <CContainer>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <strong>Users List</strong>
          </CCardHeader>
          <CCardBody>
            <CForm class="row g-3">
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
              <div class="col-auto">
              </div>
              <div class="col-auto">
                <CButton type="button" color="secondary" class="mb-3" @click="clearFilter">Clear</CButton>
              </div>
            </CForm>

            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone Number</CTableHeaderCell>
                  <CTableHeaderCell>Account Created</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow v-for="user in filteredUsers" :key="user.id">
                  <CTableDataCell>{{ user.id }}</CTableDataCell>
                  <CTableDataCell>{{ user.name }}</CTableDataCell>
                  <CTableDataCell>{{ user.email }}</CTableDataCell>
                  <CTableDataCell>{{ user.phone_number }}</CTableDataCell>
                  <CTableDataCell>{{ new Date(user.createdAt).toLocaleDateString() }}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="primary" size="sm" variant="ghost" @click="openEditModal(user)">
                      <i class="fas fa-edit"></i>
                    </CButton>
                    <CButton color="danger" size="sm" variant="ghost" class="ms-2" @click="deleteUser(user.id)">
                      <i class="fas fa-trash"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>

            <!-- Редактирование через универсальный CModal -->
            <CModal
              :visible="isEditModalOpen"
              title="Edit User"
              @close="closeEditModal"
            >
              <template #default>
                <CForm @submit.prevent="saveUser">
                  <CFormLabel for="editName">Name</CFormLabel>
                  <CFormInput
                    id="editName"
                    v-model="editUser.name"
                    required
                  />

                  <CFormLabel for="editEmail" class="mt-3">Email</CFormLabel>
                  <CFormInput
                    id="editEmail"
                    type="email"
                    v-model="editUser.email"
                    required
                  />

                  <CFormLabel for="editPhone" class="mt-3">Phone Number</CFormLabel>
                  <CFormInput
                    id="editPhone"
                    v-model="editUser.phone_number"
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
import { ref, computed, onMounted, reactive, watch } from 'vue'
import axios from 'axios'
import CModal from '../../components/web/Modal.vue'

const users = ref([])

const filterName = ref('')
const filterEmail = ref('')
const filterPhone = ref('')

const isEditModalOpen = ref(false)
const editUser = reactive({
  id: null,
  name: '',
  email: '',
  phone_number: '',
  createdAt: '',
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    if (user.account !== 'client') return false // дополнительно фильтруем

    const matchName = user.name.toLowerCase().includes(filterName.value.toLowerCase())
    const matchEmail = user.email.toLowerCase().includes(filterEmail.value.toLowerCase())
    const matchPhone = user.phone_number.toLowerCase().includes(filterPhone.value.toLowerCase())
    return matchName && matchEmail && matchPhone
  })
})
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(import.meta.env.VITE_API_URL +'/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    // Фильтруем пользователей с account = 'client'
    users.value = response.data.filter(user => user.account === 'client')
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error)
  }
}

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return
  try {
    const token = localStorage.getItem('token')  // Получаем токен
    await axios.delete(import.meta.env.VITE_API_URL +`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = users.value.filter(user => user.id !== id)
  } catch (error) {
    console.error('Ошибка при удалении:', error)
  }
}

const openEditModal = (user) => {
  Object.assign(editUser, user)
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  // Очистка editUser (если нужно)
  Object.assign(editUser, {
    id: null,
    name: '',
    email: '',
    phone_number: '',
    createdAt: '',
  })
}

const saveUser = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(import.meta.env.VITE_API_URL +`/api/users/${editUser.id}`, {
      name: editUser.name,
      email: editUser.email,
      phone_number: editUser.phone_number,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Обновляем локально
    const index = users.value.findIndex(u => u.id === editUser.id)
    if (index !== -1) {
      users.value[index] = { ...editUser }
    }
    closeEditModal()
  } catch (error) {
    console.error('Ошибка при сохранении:', error)
  }
}



const clearFilter = () => {
  filterName.value = ''
  filterEmail.value = ''
  filterPhone.value = ''
}

onMounted(fetchUsers)
</script>
