<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import img from '../../src/assets/images/avatars/2.jpg'
import axios from 'axios'

const router = useRouter()

// Новые счетчики
const newSupportCount = ref(0)
const newTicketCount  = ref(0)

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  localStorage.removeItem('username')
  localStorage.removeItem('accountType')
  router.push('/login')
}

// Навигация по меню
const goToTickets = () => {
  router.push('/requests')
}

const goToSupport = () => {
  router.push('/support')
}

async function fetchNewCounts() {
  const token = localStorage.getItem('token')
  try {
    // Берём все support-requests и tickets
    const [sRes, tRes] = await Promise.all([
      axios.get(import.meta.env.VITE_API_URL +'/api/support-requests', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get(import.meta.env.VITE_API_URL +'/api/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])
    // Считаем только новые
    newSupportCount.value = sRes.data.filter(r => r).length
    newTicketCount.value  = tRes.data.filter(t => t.status === 'new').length
  } catch (err) {
    console.error('Failed to load new counts', err)
  }
}

onMounted(fetchNewCounts)
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar
        :src="img"
        size="md"
        alt="User Avatar"
        v-bind="$attrs"
      />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>

      <CDropdownItem @click="goToTickets" style="cursor: pointer;">
        <CIcon icon="cil-task" /> New Tickets
        <CBadge color="danger" class="ms-auto">{{ newTicketCount }}</CBadge>
      </CDropdownItem>

      <CDropdownItem @click="goToSupport" style="cursor: pointer;">
        <CIcon icon="cil-comment-square" /> New Support
        <CBadge color="info" class="ms-auto">{{ newSupportCount }}</CBadge>
      </CDropdownItem>

      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Settings
      </CDropdownHeader>

      <CDropdownItem @click="logout" style="cursor:pointer">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
