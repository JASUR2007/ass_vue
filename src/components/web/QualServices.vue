<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div class="row g-4">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 class="mb-5">Explore Our Services</h1>
        </div>

        <!-- Card 1 -->
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="d-flex py-5 px-4">
            <i class="fa fa-certificate fa-3x text-primary flex-shrink-0"></i>
            <div class="ps-4">
              <h5 class="mb-3">Quality Repairs</h5>
              <p>We offer professional repair of laptops of any complexity...</p>
              <a class="text-secondary border-bottom" href="#" @click.prevent="openModal(1)">Read More</a>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div class="d-flex bg-light py-5 px-4">
            <i class="fa fa-users-cog fa-3x text-primary flex-shrink-0"></i>
            <div class="ps-4">
              <h5 class="mb-3">Expert Technicians</h5>
              <p>Our experts are certified and have extensive experience...</p>
              <a class="text-secondary border-bottom" href="#" @click.prevent="openModal(2)">Read More</a>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div class="d-flex py-5 px-4">
            <i class="fa fa-tools fa-3x text-primary flex-shrink-0"></i>
            <div class="ps-4">
              <h5 class="mb-3">Modern Tools</h5>
              <p>We use modern equipment for accurate diagnosis...</p>
              <a class="text-secondary border-bottom" href="#" @click.prevent="openModal(3)">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reusable Modal -->
    <ModalComponent :visible="showModal" :title="modalTitle" @close="showModal = false">
      <template #default>
        <p>{{ modalContent }}</p>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModalComponent from '../../components/web/Modal.vue'

const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const openModal = (cardId) => {
  showModal.value = true
  if (cardId === 1) {
    modalTitle.value = 'Quality Repairs'
    modalContent.value = 'We offer complete repair services including motherboard repair, screen replacement, and more. Our certified engineers ensure high-quality service for all brands.'
  } else if (cardId === 2) {
    modalTitle.value = 'Expert Technicians'
    modalContent.value = 'Our certified experts are trained in handling the most complex issues. Each technician has more than 5 years of experience in laptop diagnostics and repairs.'
  } else if (cardId === 3) {
    modalTitle.value = 'Modern Tools'
    modalContent.value = 'We use industry-leading diagnostic and repair equipment. This ensures accurate detection of issues and increases the reliability of every repair.'
  }
}
</script>

<style lang="scss" scoped>
// можешь добавить стили, если нужно
</style>
