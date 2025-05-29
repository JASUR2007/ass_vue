<template>
  <div class="container-xxl service py-5">
    <div class="container">
      <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h1 class="mb-5">Explore Our Services</h1>
      </div>
      <div class="row g-4 wow fadeInUp" data-wow-delay="0.3s">
        <div class="col-lg-4">
          <div class="nav w-100 nav-pills me-4">
            <button
              class="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
              :class="{ active: activeTab === 'Diagnostic' }"
              @click="Change('Diagnostic')"
              type="button"
            >
              <i class="bi bi-laptop-fill fa-2x me-3"></i>
              <h4 class="m-0">Diagnostic Testing</h4>
            </button>

            <button
              class="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
              :class="{ active: activeTab === 'SystemMain' }"
              @click="Change('SystemMain')"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-pc-display-horizontal fa-2x me-3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5M12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25"
                />
              </svg>
              <h4 class="m-0">System Maintenance</h4>
            </button>

            <button
              class="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
              :class="{ active: activeTab === 'Component' }"
              @click="Change('Component')"
              type="button"
            >
              <i class="fa fa-cog fa-2x me-3"></i>
              <h4 class="m-0">Component Replacement</h4>
            </button>

            <button
              class="nav-link w-100 d-flex align-items-center text-start p-4 mb-0"
              :class="{ active: activeTab === 'Software' }"
              @click="Change('Software')"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-pci-card-sound fa-2x me-3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.562 7.39 8 7.04v1.92l-.438-.35a.5.5 0 0 0-.312-.11H6.5v-1h.75a.5.5 0 0 0 .312-.11"
                />
                <path
                  d="M.5 1a.5.5 0 0 0 0 1H1v12.5a.5.5 0 0 0 1 0V12h13.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H2V1.5a.5.5 0 0 0-.5-.5zm11.619 3.881q.15.173.28.367c.484.726.768 1.7.768 2.752s-.284 2.026-.768 2.752q-.13.195-.28.367l-.71-.71q.082-.096.158-.212c.36-.54.6-1.315.6-2.197s-.24-1.657-.6-2.198a3 3 0 0 0-.157-.212zm-1.375 4.863L10 9c.057 0 .17-.035.291-.217.12-.178.209-.454.209-.783 0-.33-.09-.605-.209-.783C10.17 7.035 10.057 7 10 7l.744-.744c.15.113.278.254.38.406.242.364.376.839.376 1.338s-.134.974-.377 1.338a1.7 1.7 0 0 1-.379.406M9 6v4a.5.5 0 0 1-.812.39L7.075 9.5H6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h1.075l1.113-.89A.5.5 0 0 1 9 6"
                />
                <path
                  d="M6.5 12.5H3v1a.5.5 0 0 0 .5.5H6a.5.5 0 0 0 .5-.5zm.5 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <h4 class="m-0">Software Solutions</h4>
            </button>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="tab-content w-100">
            <div v-show="activeTab === 'Diagnostic'" class="tab-pane fade show active">
              <!-- Контент Diagnostic -->
              <div class="row g-4">
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100">
                    <img
                      class="position-absolute img-fluid w-100 h-100"
                      src="@/assets/img/service-1.jpg"
                      style="object-fit: cover"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <h3 class="mb-3">15 Years Of Experience In Laptop Repair</h3>
                  <p class="mb-4">
                    We’ve been helping customers solve laptop problems for over a decade. From simple fixes to complex hardware
                    failures — we’ve seen and repaired it all.
                  </p>
                  <p><i class="fa fa-check text-success me-3"></i>Quality Servicing</p>
                  <p><i class="fa fa-check text-success me-3"></i>Expert Workers</p>
                  <p><i class="fa fa-check text-success me-3"></i>Modern Equipment</p>
                  <button class="btn btn-primary py-3 px-5 mt-3" @click="openModal">
                    Read More<i class="fa fa-arrow-right ms-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'SystemMain'" class="tab-pane fade show active">
              <!-- Контент System Maintenance -->
              <div class="row g-4">
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100">
                    <img
                      class="position-absolute img-fluid w-100 h-100"
                      src="@/assets/img/service-2.jpg"
                      style="object-fit: cover"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <h3 class="mb-3">15 Years Of Experience In Auto Servicing</h3>
                  <p class="mb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                    lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                  </p>
                  <p><i class="fa fa-check text-success me-3"></i>Quality Servicing</p>
                  <p><i class="fa fa-check text-success me-3"></i>Expert Workers</p>
                  <p><i class="fa fa-check text-success me-3"></i>Modern Equipment</p>
                  <button class="btn btn-primary py-3 px-5 mt-3" @click="openModal">
                    Read More<i class="fa fa-arrow-right ms-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'Component'" class="tab-pane fade show active">
              <!-- Контент Component Replacement -->
              <div class="row g-4">
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100">
                    <img
                      class="position-absolute img-fluid w-100 h-100"
                      src="@/assets/img/service-3.jpg"
                      style="object-fit: cover"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <h3 class="mb-3">15 Years Of Experience In Car Repair</h3>
                  <p class="mb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                    lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                  </p>
                  <p><i class="fa fa-check text-success me-3"></i>Quality Servicing</p>
                  <p><i class="fa fa-check text-success me-3"></i>Expert Workers</p>
                  <p><i class="fa fa-check text-success me-3"></i>Modern Equipment</p>
                  <button class="btn btn-primary py-3 px-5 mt-3" @click="openModal">
                    Read More<i class="fa fa-arrow-right ms-3"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-show="activeTab === 'Software'" class="tab-pane fade show active">
              <!-- Контент Software Solutions -->
              <div class="row g-4">
                <div class="col-md-6" style="min-height: 350px;">
                  <div class="position-relative h-100">
                    <img
                      class="position-absolute img-fluid w-100 h-100"
                      src="@/assets/img/service-4.jpg"
                      style="object-fit: cover"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <h3 class="mb-3">15 Years Of Experience In Software Engineering</h3>
                  <p class="mb-4">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                    lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                  </p>
                  <p><i class="fa fa-check text-success me-3"></i>Quality Servicing</p>
                  <p><i class="fa fa-check text-success me-3"></i>Expert Workers</p>
                  <p><i class="fa fa-check text-success me-3"></i>Modern Equipment</p>
                  <button class="btn btn-primary py-3 px-5 mt-3" @click="openModal">
                    Read More<i class="fa fa-arrow-right ms-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :visible="modalVisible" title="More about our services" @close="closeModal">
      <template #default>
        <p>
          Here you can add detailed information about the selected service or show a form,
          video, or image gallery.
        </p>
      </template>
      <template #footer>
        <button class="btn btn-danger" @click="closeModal">Close</button>
      </template>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import Modal from '../../components/web/Modal.vue'

const activeTab = ref('Diagnostic')
const modalVisible = ref(false)

function Change(tab) {
  activeTab.value = tab
}

function openModal() {
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
}
</script>
<script>
export default {
  data() {
    return {
      activeTab: "Diagnostic",
    };
  },
  methods: {
    Change(tabName) {
      this.activeTab = tabName;
    },
  },
};
</script>

<style scoped>
.nav-link.active {
  color: white;
}
</style>
