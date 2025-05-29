<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h1 class="mb-5">Contact For Any Query</h1>
      </div>
      <div class="table-responsive" v-if="tickets.length > 0">
        <table class="table table-bordered table-striped">
          <thead class="table-primary text-center">
          <tr>
            <th>#</th>
            <th>Issue Type</th>
            <th>Description</th>
            <th>Price</th>
            <th>Model</th>
            <th>Scheduled</th>
            <th>Created</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(ticket, index) in tickets" :key="ticket.id" class="text-center">
            <td>{{ index + 1 }}</td>
            <td>{{ ticket.issue_type }}</td>
            <td>{{ ticket.description }}</td>
            <td>{{ ticket.price || 'not priced' }}</td>
            <td>{{ ticket.computer_model }}</td>
            <td>{{ ticket.scheduled_date || 'not scheduled' }}</td>
            <td>{{ formatDate(ticket.createdAt) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center mt-3">
        <p>No tickets submitted yet.</p>
      </div>

      <div class="row g-4 mt-5">
        <!-- Contact info cards -->
        <div class="col-md-4" v-for="info in contactInfos" :key="info.title">
          <div class="bg-light d-flex flex-column justify-content-center p-4 h-100">
            <h5 class="text-uppercase">{{ info.title }}</h5>
            <p class="m-0"><i :class="info.icon + ' text-primary me-2'"></i>{{ info.value }}</p>
          </div>
        </div>
      </div>

      <div class="row g-4 mt-4">
        <div class="col-md-6 wow fadeIn" data-wow-delay="0.1s">
          <iframe
            class="position-relative rounded w-100 h-100"
            src="https://www.google.com/maps/embed?..."
            frameborder="0"
            style="min-height: 350px; border:0;"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
        <div class="col-md-6">
          <div class="wow fadeInUp" data-wow-delay="0.2s">
            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      v-model="form.issue_type"
                      type="text"
                      class="form-control"
                      id="issue_type"
                      placeholder="Issue Type"
                    />
                    <label for="issue_type">Issue Type</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      v-model="form.description"
                      class="form-control"
                      placeholder="Description"
                      id="description"
                      style="height: 100px"
                    ></textarea>
                    <label for="description">Description</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      v-model="form.computer_model"
                      type="text"
                      class="form-control"
                      id="computer_model"
                      placeholder="Computer Model"
                    />
                    <label for="computer_model">Computer Model</label>
                  </div>
                </div>

                <!-- Business-only call button -->
                <div class="col-12" v-if="accountType === 'business'">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100 py-3"
                    @click="callSupport"
                  >
                    Call Support: {{ businessPhone }}
                  </button>
                </div>

                <div class="col-12">
                  <button class="btn btn-primary w-100 py-3" type="submit">
                    Submit Ticket
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
        <ConfirmationModal :visible="showModal" title="Notification" @close="showModal = false">
          <p class="m-0">{{ modalMessage }}</p>
        </ConfirmationModal>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import ConfirmationModal from '../../components/web/Modal.vue'

const router = useRouter()
const form = reactive({ user_id: '', issue_type: '', description: '', computer_model: '' })
const tickets = ref([])
const accountType = ref(localStorage.getItem('accountType'))
const businessPhone = '+1-800-123-4567'
const showModal = ref(false)
const modalMessage = ref('')

const contactInfos = [
  { title: 'Email', icon: 'fa fa-envelope-open', value: 'book@example.com' },
  { title: 'Extra email', icon: 'fa fa-envelope-open', value: 'info@example.com' },
  { title: 'Technical email', icon: 'fa fa-envelope-open', value: 'tech@example.com' },
]

onMounted(async () => {
  const userId = localStorage.getItem('user_id')
  if (userId) form.user_id = userId
  else router.push('/login')

  fetchTickets()
})

const fetchTickets = async () => {
  try {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + `/api/tickets/id?user_id=${form.user_id}`
    )
    tickets.value = res.data
  } catch (e) {
    console.error(e)
  }
}

const handleSubmit = async () => {
  try {
    await axios.post(import.meta.env.VITE_API_URL +'/api/tickets', form)
    modalMessage.value = 'Ticket submitted successfully!'
    showModal.value = true
    Object.assign(form, { issue_type: '', description: '', computer_model: '' })
    fetchTickets()
  } catch (e) {
    console.error(e)
    modalMessage.value = 'Failed to submit ticket.'
    showModal.value = true
  }
}

const callSupport = () => {
  window.location.href = `tel:${businessPhone}`
}

function formatDate(dt) {
  return dt ? new Date(dt).toLocaleString() : ''
}
</script>

<style scoped>
</style>
