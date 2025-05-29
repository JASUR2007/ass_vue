<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()

onMounted(() => {
    const hasReloaded = sessionStorage.getItem('hasReloadedLogin')
    console.log('hasReloaded:', hasReloaded)
    if (!hasReloaded) {
      sessionStorage.setItem('hasReloadedLogin', 'true')
      window.location.reload()
    } else {
      sessionStorage.removeItem('hasReloadedLogin')
    }
  })
const handleLogin = async () => {

  try {
    const response = await axios.post(import.meta.env.VITE_API_URL +'/api/auth/login', {
      email: email.value,
      password: password.value,
    })
    console.log(response)
    const token = response.data.token
    const username = response.data.user.name
    const user_id = response.data.user.id
    const accountTypeValue = response.data.account
    localStorage.setItem('accountType', accountTypeValue);
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('user_id', user_id)
    router.push('/dashboard')
  } catch (error) {
    alert(error.response?.data?.message || 'Ошибка при входе')
  }
}
const Register = () => {
  router.push('/register')
}
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleLogin">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>

                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="email"
                      placeholder="Email"
                      autocomplete="email"
                      type="email"
                    />
                  </CInputGroup>

                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                    />
                  </CInputGroup>

                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>

            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton color="light" @click="Register" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
