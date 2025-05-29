<template>
  <div class="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
    <div class="container">
      <div class="row gx-5">
        <div class="col-lg-6 py-5">
          <div class="py-5">
            <h1 class="text-white mb-4">Certified and awarded laptop repair service</h1>
            <p class="text-white mb-0">
              We help private and corporate customers with repair and technical support...
            </p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
            <h1 class="text-white mb-4">Book For A Service</h1>
            <form @submit.prevent="handleSubmit">
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <input v-model="form.issue_type" type="text" class="form-control border-0" placeholder="Issue Type" style="height: 55px;" required>
                </div>
                <div class="col-12 col-sm-6">
                  <input v-model="form.computer_model" type="text" class="form-control border-0" placeholder="Model" style="height: 55px;" required>
                </div>
                <div class="col-12">
                  <textarea v-model="form.description" class="form-control border-0" placeholder="Description" required></textarea>
                </div>
                <div class="col-12">
                  <button class="btn btn-secondary w-100 py-3" type="submit">Send Request</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  user_id: '',
  issue_type: '',
  description: '',
  computer_model: '',
})

const handleSubmit = async () => {
  const userId = localStorage.getItem('user_id')

  if (!userId) {
    alert('Please login first!')
    router.push('/login')
    return
  }

  form.user_id = userId

  try {
    await axios.post(import.meta.env.VITE_API_URL +'/api/tickets', form)
    alert('Request submitted!')

    // Очистка
    form.issue_type = ''
    form.description = ''
    form.computer_model = ''

    // Переход или прокрутка к секции #request
    const el = document.querySelector('#request')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Failed to submit:', error)
    alert('Submission failed!')
  }
}
</script>
