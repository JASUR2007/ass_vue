<template>
  <CContainer class="my-4">
    <CRow class="mb-3">
      <CCol class="d-flex justify-content-end">
        <CButton color="primary" @click="openAddModal">Add base</CButton>
      </CCol>
    </CRow>

    <CRow>
      <CCol v-for="article in articles" :key="article.id" sm="6" lg="4" class="mb-4">
        <CCard style="width: 100%">
          <CCardImage v-if="article.img_base" orientation="top" :src="article.img_base" />
          <CCardBody>
            <h5><strong>{{ article.title }}</strong></h5>
            <div><small class="text-muted">{{ article.category }}</small></div>
            <CCardText class="mt-2">
              {{ truncateContent(article.content) }}
            </CCardText>

            <CButton color="primary" variant="outline" size="sm" class="me-2" @click="openModal(article)">
              Read more
            </CButton>
            <CButton color="warning" variant="outline" size="sm" class="me-2" @click="openEditModal(article)">
              Edit
            </CButton>
            <CButton color="danger" variant="outline" size="sm" @click="openDeleteModal(article)">
              Delete
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- Модалка просмотра статьи -->
    <CModal
      alignment="center"
      scrollable
      :visible="isViewModalVisible"
      @close="() => { isViewModalVisible = false }"
      aria-labelledby="ModalArticleTitle"
    >
      <CModalHeader>
        <CModalTitle id="ModalArticleTitle">{{ selectedArticle?.title }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div v-if="selectedArticle?.img_base" class="mb-3">
          <img :src="selectedArticle.img_base" alt="article image" class="img-fluid rounded" />
        </div>
        <p><strong>Категория:</strong> {{ selectedArticle?.category }}</p>
        <p>{{ selectedArticle?.content }}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { isViewModalVisible = false }">Закрыть</CButton>
      </CModalFooter>
    </CModal>

    <!-- Модалка добавления/редактирования -->
    <CModal
      alignment="center"
      scrollable
      :visible="isEditModalVisible"
      @close="closeEditModal"
      aria-labelledby="EditModalTitle"
    >
      <CModalHeader>
        <CModalTitle id="EditModalTitle">{{ isEditing ? 'Редактировать статью' : 'Добавить статью' }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <form @submit.prevent="saveArticle">
          <CFormLabel>Категория</CFormLabel>
          <CFormSelect v-model="form.category" :options="categoryOptions" required />

          <CFormLabel class="mt-3">Заголовок</CFormLabel>
          <CFormInput v-model="form.title" required />

          <CFormLabel class="mt-3">Контент</CFormLabel>
          <CFormTextarea v-model="form.content" rows="4" required />

          <CFormLabel class="mt-3">Изображение (base64)</CFormLabel>
          <input type="file" @change="onFileChange" accept="image/*" />

          <div v-if="form.img_base" class="mt-3">
            <img :src="form.img_base" alt="preview" style="max-width: 100%; max-height: 200px; border-radius: 4px;" />
          </div>

          <CModalFooter class="mt-4">
            <CButton type="submit" color="primary">{{ isEditing ? 'Сохранить' : 'Добавить' }}</CButton>
            <CButton color="secondary" @click="closeEditModal">Отмена</CButton>
          </CModalFooter>
        </form>
      </CModalBody>
    </CModal>

    <!-- Модалка подтверждения удаления -->
    <CModal
      alignment="center"
      :visible="isDeleteModalVisible"
      @close="() => { isDeleteModalVisible = false }"
    >
      <CModalHeader>
        <CModalTitle>Подтверждение удаления</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Вы действительно хотите удалить статью "<strong>{{ selectedArticle?.title }}</strong>"?
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" @click="deleteArticle">Удалить</CButton>
        <CButton color="secondary" @click="() => { isDeleteModalVisible = false }">Отмена</CButton>
      </CModalFooter>
    </CModal>
  </CContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const articles = ref([])
const isViewModalVisible = ref(false)
const isEditModalVisible = ref(false)
const isDeleteModalVisible = ref(false)

const selectedArticle = ref(null)

const isEditing = ref(false)

const form = ref({
  category: '',
  title: '',
  content: '',
  img: '',
  img_base: '',
})

const categoryOptions = [
  { value: 'hardware', label: 'Hardware' },
  { value: 'software', label: 'Software' },
]

const token = localStorage.getItem('token')

const fetchArticles = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL +'/api/knowledge-base', {
      headers: { Authorization: `Bearer ${token}` },
    })
    articles.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке базы знаний:', error)
  }
}

const truncateContent = (text, maxLength = 100) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const openModal = (article) => {
  selectedArticle.value = article
  isViewModalVisible.value = true
}

const openAddModal = () => {
  isEditing.value = false
  form.value = { category: '', title: '', content: '', img: '', img_base: '' }
  isEditModalVisible.value = true
}

const openEditModal = (article) => {
  isEditing.value = true
  selectedArticle.value = article
  form.value = {
    category: article.category,
    title: article.title,
    content: article.content,
    img: article.img || '',
    img_base: article.img_base || '',
  }
  isEditModalVisible.value = true
}

const closeEditModal = () => {
  isEditModalVisible.value = false
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = e => {
    form.value.img_base = e.target.result
    form.value.img = file.name
  }
  reader.readAsDataURL(file)
}

const saveArticle = async () => {
  try {
    if (isEditing.value && selectedArticle.value) {
      // Update
      const response = await axios.put(
        import.meta.env.VITE_API_URL +`/api/knowledge-base/${selectedArticle.value.id}`,
        form.value,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Обновляем статью в локальном массиве
      const idx = articles.value.findIndex(a => a.id === selectedArticle.value.id)
      if (idx !== -1) articles.value[idx] = response.data
    } else {
      // Create
      const response = await axios.post(
        import.meta.env.VITE_API_URL +'/api/knowledge-base',
        form.value,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      articles.value.push(response.data)
    }
    isEditModalVisible.value = false
  } catch (error) {
    console.error('Ошибка при сохранении статьи:', error)
  }
}

const openDeleteModal = (article) => {
  selectedArticle.value = article
  isDeleteModalVisible.value = true
}

const deleteArticle = async () => {
  try {
    if (!selectedArticle.value) return
    await axios.delete(import.meta.env.VITE_API_URL +`/api/knowledge-base/${selectedArticle.value.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    articles.value = articles.value.filter(a => a.id !== selectedArticle.value.id)
    isDeleteModalVisible.value = false
  } catch (error) {
    console.error('Ошибка при удалении статьи:', error)
  }
}

onMounted(fetchArticles)
</script>
