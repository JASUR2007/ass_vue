<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone_number = ref('')
const accountType = ref('client')
const companyName = ref('')
const companyAdress = ref('')

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!")
    return
  }

  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('email', email.value)
  formData.append('password', password.value)
  formData.append('phone_number', phone_number.value)
  formData.append('account', accountType.value)
  formData.append('role', 'client')

  if (accountType.value === 'business') {
    if (!companyName.value.trim() || !companyAdress.value.trim()) {
      alert('Please enter company name or adress for business account')
      return
    }
    formData.append('company_adress', companyAdress.value)
    formData.append('company_name', companyName.value)
  }
  try {
    const res = await axios.post(import.meta.env.VITE_API_URL + '/api/auth/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log('3')
    const user_id = res.data.id
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', name.value)
    localStorage.setItem('user_id', user_id)
    localStorage.setItem('accountType', accountType.value);
    await router.push('/main')
  } catch (err) {
    alert(err.response?.data?.message)
  }
}
</script>

<template>
  <div class="bwrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm @submit.prevent="register">
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>

                <CInputGroup class="mb-3">
                  <CInputGroupText><CIcon icon="cil-user" /></CInputGroupText>
                  <CFormInput v-model="name" placeholder="Username" autocomplete="username" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput v-model="email" placeholder="Email" autocomplete="email" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CInputGroupText>📞</CInputGroupText>
                  <CFormInput v-model="phone_number" placeholder="Phone Number" autocomplete="tel" />
                </CInputGroup>

                <CInputGroup class="mb-3">
                  <CInputGroupText><CIcon icon="cil-lock-locked" /></CInputGroupText>
                  <CFormInput v-model="password" type="password" placeholder="Password" autocomplete="new-password" />
                </CInputGroup>

                <CInputGroup class="mb-4">
                  <CInputGroupText><CIcon icon="cil-lock-locked" /></CInputGroupText>
                  <CFormInput v-model="confirmPassword" type="password" placeholder="Repeat password" autocomplete="new-password" />
                </CInputGroup>

                  <CInputGroup class="mb-4">
                    <CInputGroupText><CIcon icon="cil-user" /></CInputGroupText>
                    <CFormSelect v-model="accountType" aria-label="Select account type">
                      <option value="client">Client</option>
                      <option value="business">Business</option>
                    </CFormSelect>
                  </CInputGroup>
                  <div v-if="accountType === 'business'">
                    <CInputGroup class="mb-3">
                      <CInputGroupText><CIcon icon="cil-building" /></CInputGroupText>
                      <CFormInput v-model="companyName" placeholder="Company Name" autocomplete="organization" />
                    </CInputGroup>
                  </div>
                <div v-if="accountType === 'business'">
                  <CInputGroup class="mb-3">
                    <CInputGroupText><CIcon icon="cil-building" /></CInputGroupText>
                    <CFormInput v-model="companyAdress" placeholder="Company Adress" autocomplete="organization" />
                  </CInputGroup>
                </div>
                <div class="d-grid">
                  <CButton color="success" type="submit">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
