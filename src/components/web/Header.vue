<template>
  <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
    <router-link to="/main" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
      <h2 class="m-0 text-primary"><i class="bi bi-laptop-fill me-3"></i>DernSupport</h2>
    </router-link>
    <button
      type="button"
      class="navbar-toggler me-4"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav ms-auto p-4 p-lg-0">
        <RouterLink to="/" class="nav-item nav-link" :class="{ active: $route.path === '/' }">Home</RouterLink>
        <RouterLink to="/about" class="nav-item nav-link" :class="{ active: $route.path === '/about' }">About</RouterLink>
        <RouterLink to="/service" class="nav-item nav-link" :class="{ active: $route.path === '/service' }">Services</RouterLink>
        <RouterLink v-if="username" to="/contact" class="nav-item nav-link">Book</RouterLink>
        <RouterLink to="/kbase" class="nav-item nav-link">K-base</RouterLink>
        <span
          v-if="username"
          class="text-danger nav-item nav-link"
          style="cursor: pointer;"
          @click="logout"
        >
          Logout
        </span>
      </div>
      <div class="d-flex align-items-center px-4">
        <span v-if="username" class="fw-bold me-3">👋 {{ username }}</span>
        <RouterLink
          v-if="!username"
          to="/login"
          class="btn btn-primary py-4 px-lg-5 d-none d-lg-block"
        >
          Login<i class="fa fa-arrow-right ms-3"></i>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router'

export default {
  name: "Header",
  components: { RouterLink },
  setup() {
    const router = useRouter()
    const username = localStorage.getItem('username') || ''

    function logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href  = '/main'
    }

    return { username, logout }
  }
}
</script>
