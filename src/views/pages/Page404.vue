<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-body-secondary float-start">
              The page you are looking for was not found.
            </p>
          </div>
          <div class="container-fluid mt-4">
            <h3>Return to Main</h3>
            <CButton color="primary" @click="goToMain">Go to Main</CButton>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { CButton } from '@coreui/vue'

const router = useRouter()

function goToMain() {
  router.push('/main')
}
</script>
