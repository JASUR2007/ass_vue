<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-6 pt-4" style="min-height: 400px;">
          <div class="position-relative h-100 wow fadeIn" data-wow-delay="0.1s">
            <img class="position-absolute img-fluid w-100 h-100" src="@/assets/img/about.jpg" style="object-fit: cover;" alt="">
            <div class="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5" style="background: rgba(0, 0, 0, .08);">
              <h1 class="display-4 text-white mb-0">15 <span class="fs-4">Years</span></h1>
              <h4 class="text-white">Experience</h4>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <h1 class="mb-4"><span class="text-primary">DernSupport</span> Is The Best Place For Your Laptop Care</h1>
          <p class="mb-4">Your devices are in safe hands. We professionally fix both
            simple and complex laptop issues. Fast turnaround, honest pricing, and service you can trust.</p>
          <div class="row g-4 mb-3 pb-3">
            <div class="col-12 wow fadeIn" data-wow-delay="0.1s">
              <div class="d-flex">
                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style="width: 45px; height: 45px;">
                  <span class="fw-bold text-secondary">01</span>
                </div>
                <div class="ps-3">
                  <h6>Professional & Certified Technicians</h6>
                  <span>Our engineers are certified and have real-world experience working with all major laptop brands.</span>
                </div>
              </div>
            </div>
            <div class="col-12 wow fadeIn" data-wow-delay="0.3s">
              <div class="d-flex">
                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style="width: 45px; height: 45px;">
                  <span class="fw-bold text-secondary">02</span>
                </div>
                <div class="ps-3">
                  <h6>High-Quality Service Center</h6>
                  <span>We use advanced tools and trusted repair methods to ensure your laptop works like new again.</span>
                </div>
              </div>
            </div>
            <div class="col-12 wow fadeIn" data-wow-delay="0.5s">
              <div class="d-flex">
                <div class="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style="width: 45px; height: 45px;">
                  <span class="fw-bold text-secondary">03</span>
                </div>
                <div class="ps-3">
                  <h6>Award-Winning Support Team</h6>
                  <span>Diam dolor diam ipsum sit amet diam et eos</span>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-primary py-3 px-5" @click="showModal = true">
            Read More <i class="fa fa-arrow-right ms-3"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно -->
  <ModalComponent :visible="showModal" title="About DernSupport" @close="showModal = false">
    <template #default>
      <p>
        DernSupport provides high-quality laptop repair and maintenance services. Our team of experts ensures fast and reliable support for all types of technical issues.
      </p>
    </template>
  </ModalComponent>
</template>

<script>
import { ref } from 'vue'
import ModalComponent from '../../components/web/Modal.vue'

export default {
  name: 'CarService',
  components: {
    ModalComponent
  },
  setup() {
    const showModal = ref(false)
    return {
      showModal
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
