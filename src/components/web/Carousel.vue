<style lang="scss" scoped>

</style>

<template>
  <div class="container-fluid p-0 mb-5">
    <CCarousel controls indicators>
      <CCarouselItem>
        <img class="w-100" src="@/assets/img/carousel-bg-1.jpg" alt="Image" />
        <CCarouselCaption class="d-flex align-items-center">
          <div class="container">
            <div class="row align-items-center justify-content-center justify-content-lg-start">
              <div class="col-10 col-lg-7 text-center text-lg-start">
                <h1 class="text-white text-uppercase mb-3">Laptop Repair</h1>
                <h3 class="display-3 text-white mb-4 pb-3">
                  Qualified Laptop Repair & Support Center
                </h3>
                <a
                  href="#"
                  class="btn btn-primary py-3 px-5"
                  @click.prevent="openModal({
                    title: 'Car Wash Service',
                    content: 'We provide professional car washing and detailing services with qualified staff and the latest equipment.'
                  })"
                >
                  Learn More <i class="fa fa-arrow-right ms-3"></i>
                </a>
              </div>
              <div class="col-lg-5 d-none d-lg-flex">
                <img class="img-fluid" src="@/assets/img/carousel-1.png" alt="Laptop" />
              </div>
            </div>
          </div>
        </CCarouselCaption>
      </CCarouselItem>

      <CCarouselItem>
        <img class="w-100" src="@/assets/img/carousel-bg-2.jpg" alt="Image" />
        <CCarouselCaption class="d-flex align-items-center">
          <div class="container">
            <div class="row align-items-center justify-content-center justify-content-lg-start">
              <div class="col-10 col-lg-7 text-center text-lg-start">
                <h6 class="text-white text-uppercase mb-3">Car Servicing</h6>
                <h1 class="display-3 text-white mb-4 pb-3">
                  Qualified Car Wash Service Center
                </h1>
                <a
                  href="#"
                  class="btn btn-primary py-3 px-5"
                  @click.prevent="openModal({
                    title: 'Car Wash Service',
                    content: 'We provide professional car washing and detailing services with qualified staff and the latest equipment.'
                  })"
                >
                  Learn More <i class="fa fa-arrow-right ms-3"></i>
                </a>
              </div>
              <div class="col-lg-5 d-none d-lg-flex">
                <img class="img-fluid" src="@/assets/img/carousel-2.png" alt="Car" />
              </div>
            </div>
          </div>
        </CCarouselCaption>
      </CCarouselItem>
    </CCarousel>

    <Modal :visible="isModalVisible" title="Добро пожаловать" @close="isModalVisible = false">
      <template #default>
        <p>Это тело модалки с произвольным содержимым.</p>
        <p>Ты можешь вставлять сюда любой HTML или компоненты.</p>
      </template>

      <template #footer>
        <CButton color="secondary" @click="isModalVisible = false">Закрыть</CButton>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { CModal } from '@coreui/vue'
import Modal from "./Modal.vue";

const isModalVisible = ref(false)
const selectedArticle = ref(null)

const openModal = (article) => {
  selectedArticle.value = article
  isModalVisible.value = true
}
</script>
<style scoped>
.carousel-item>img {
  height: 700px;
  object-fit: cover;
  width: 100%;
}

.carousel-caption {
  padding: 1rem;
}

.carousel-caption h1 {
  font-size: 1.8rem;
}

.carousel-caption h3,
.carousel-caption h6 {
  font-size: 1.2rem;
}
.img-fluid {
  width: 100%;
  height: 100%;
}
.btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}
</style>
