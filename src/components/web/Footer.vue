<template>
  <div class="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Address</h4>
          <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
          <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
          <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@example.com</p>
          <div class="d-flex pt-2">
            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-twitter"></i></a>
            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-youtube"></i></a>
            <a class="btn btn-outline-light btn-social" href=""><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Opening Hours</h4>
          <h6 class="text-light">Monday - Friday:</h6>
          <p class="mb-4">09.00 AM - 09.00 PM</p>
          <h6 class="text-light">Saturday - Sunday:</h6>
          <p class="mb-0">09.00 AM - 12.00 PM</p>
        </div>
        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Services</h4>
          <a class="btn btn-link" href="">Diagnostic Test</a>
          <a class="btn btn-link" href="">Engine Servicing</a>
          <a class="btn btn-link" href="">Tires Replacement</a>
          <a class="btn btn-link" href="">Oil Changing</a>
          <a class="btn btn-link" href="">Vacuam Cleaning</a>
        </div>

        <div class="col-lg-3 col-md-6">
          <h4 class="text-light mb-4">Support Request</h4>
          <p>Describe your issue and rate our service (optional).</p>
          <div class="position-relative mx-auto mb-2" style="max-width: 400px;">
            <input
              v-model="supportDescription"
              class="form-control border-0 w-100 py-3 ps-4 pe-5"
              type="text"
              placeholder="Describe your issue"
            />
            <button
              type="button"
              class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
              @click="submitSupportRequest"
              :disabled="!supportDescription"
            >
              Submit
            </button>
          </div>
          <div class="star-rating mb-2">
            <i
              v-for="n in 5"
              :key="n"
              class="fa fa-star"
              :class="{'text-warning': n <= rating, 'text-secondary': n > rating}"
              @click="setRating(n)"
              style="cursor: pointer;"
            ></i>
          </div>
          <div v-if="feedbackMessage" class="mt-2">
            <small class="text-light">{{ feedbackMessage }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data() {
    return {
      supportDescription: '',
      rating: 0,
      feedbackMessage: '',
      userId: ''
    }
  },
  methods: {
    setRating(stars) {
      this.rating = stars
    },
    async submitSupportRequest() {
      try {
        const token = localStorage.getItem('token')
        this.userId = localStorage.getItem('user_id')
        await axios.post(
          import.meta.env.VITE_API_URL +'/api/support-requests',
          {  userId: this.userId, description: this.supportDescription, quote: this.rating },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        this.feedbackMessage = 'Request submitted successfully.'
        this.supportDescription = ''
        this.rating = 0
      } catch (err) {
        console.error('Support request failed:', err)
        this.feedbackMessage = 'Failed to submit request.'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.star-rating .fa {
  font-size: 1.5rem;
  margin-right: 0.25rem;
}
</style>

