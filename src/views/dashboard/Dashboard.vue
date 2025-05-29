<template>
  <CContainer>
    <!-- Widgets -->
    <CRow :xs="{ gutter: 4 }" class="mb-5">
      <CCol v-for="widget in widgets" :key="widget.title" :sm="6" :xl="4" :xxl="3">
        <CWidgetStatsA :color="widget.color">
          <template #value>{{ widget.value }}</template>
          <template #title>{{ widget.title }}</template>
          <template #action>
            <CDropdown placement="bottom-end">
              <CDropdownToggle color="transparent" class="p-0 text-white" :caret="false">
                <CIcon icon="cil-options" class="text-white" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="refreshAnalytics">Refresh</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </template>
          <template #chart>
            <CChart
              type="line"
              class="mt-3 mx-3"
              style="height: 70px"
              :data="widget.smallChart.data"
              :options="smallChartOptions"
            />
          </template>
        </CWidgetStatsA>
      </CCol>
    </CRow>

    <!-- Period Selector -->
    <div class="mb-4 d-flex gap-3 align-items-center">
      <CFormSelect v-model="period" style="width: 200px">
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </CFormSelect>
      <CButton color="primary" @click="updateBarChart">Apply</CButton>
    </div>

    <!-- Bar Chart -->
    <CCard>
      <CCardHeader><strong>{{ periodLabel }} Overview</strong></CCardHeader>
      <CCardBody class="d-flex"  style="width: 100%;">
        <CChart
          type="bar"
          :data="barChart.data"
          :options="barChart.options"
          style="width: 100%;"
        />
        <div class="ms-4">
          <h5>Insights</h5>
          <p>Use this dashboard to monitor client acquisition, business growth, and ticket volume over time. Adjust the period above to view monthly or yearly trends.</p>
          <p>Clients and businesses are tracked separately for a clearer understanding of user engagement. The Tickets bar shows total support requests processed during each period.</p>
          <p>For deeper analysis, consider exporting this data or drilling down into individual user metrics.</p>
        </div>
      </CCardBody>
    </CCard>
  </CContainer>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/vue-chartjs'

// Common chart options
const smallChartOptions = {
  plugins: { legend: { display: false } },
  maintainAspectRatio: false,
  scales: { x: { display: false }, y: { display: false } },
  elements: { line: { tension: 0.4 }, point: { radius: 3 } },
}

// Reactive state
const analyticsData = ref([])
const period = ref('monthly')
const periodLabel = computed(() => period.value === 'monthly' ? 'Month' : 'Year')

// Widgets config
const widgets = reactive([
  { title: 'Clients', color: 'primary', value: 0, smallChart: { data: {} } },
  { title: 'Business', color: 'info', value: 0, smallChart: { data: {} } },
  { title: 'Tickets', color: 'danger', value: 0, smallChart: { data: {} } },
])

// Bar chart state
const barChart = reactive({
  data: { labels: [], datasets: [] },
  options: {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { title: { display: true, text: periodLabel.value } },
      y: { title: { display: true, text: 'Count' }, beginAtZero: true },
    },
  },
})

// Fetch analytics from backend
async function fetchAnalytics() {
  const res = await axios.get(import.meta.env.VITE_API_URL +'/api/analytics', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  analyticsData.value = res.data.analytics
  applyWidgets()
  setupBarChart()
}

// Populate widgets values and small charts (last 5 points)
function applyWidgets() {
  const data = analyticsData.value

  // Общие значения
  widgets[0].value = data.filter(u => u.account === 'client').length
  widgets[1].value = data.filter(u => u.account === 'business').length
  widgets[2].value = data.reduce((sum, u) => sum + u.totalTickets, 0)

  // Группировка по месяцу
  const grouped = {}
  data.forEach(u => {
    const date = new Date(u.createdAt)
    const key = date.toLocaleDateString('en-US', { month: 'short' }) // "May"
    if (!grouped[key]) {
      grouped[key] = { client: 0, business: 0, tickets: 0 }
    }
    if (u.account === 'client') grouped[key].client++
    if (u.account === 'business') grouped[key].business++
    grouped[key].tickets += u.totalTickets
  })

  // Создание данных для виджетов
  const labels = Object.keys(grouped)
  widgets.forEach((w, idx) => {
    const arr = labels.map(label =>
      idx === 0 ? grouped[label].client :
        idx === 1 ? grouped[label].business :
          grouped[label].tickets
    )
    w.smallChart.data = {
      labels,
      datasets: [{
        label: w.title,
        backgroundColor: getStyle(`--cui-${w.color}`),
        data: arr,
      }]
    }
  })
}
// Prepare bar chart according to period
function setupBarChart() {
  const now = new Date()
  const items = period.value === 'monthly'
    ? Array.from({ length: 12 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - i, 1)).reverse()
    : Array.from({ length: 5 }, (_, i) => new Date(now.getFullYear() - i, 0, 1)).reverse()

  const labels = items.map(d => period.value === 'monthly'
    ? d.toLocaleDateString('en-US', { month: 'short' })
    : d.getFullYear().toString())

  const keyFn = period.value === 'monthly'
    ? d => `${d.getFullYear()}-${d.getMonth()+1}`
    : d => `${d.getFullYear()}`

  const countBy = (arr, fn) => items.map(d => arr.filter(item => fn(item, d)).length)

  const clients = analyticsData.value.filter(u => u.account==='client')
  const business = analyticsData.value.filter(u => u.account==='business')
  const tickets = analyticsData.value

  barChart.data.labels = labels
  barChart.data.datasets = [
    { label: 'Clients', backgroundColor: getStyle('--cui-primary'), data: countBy(clients, (u,d) => keyFn(new Date(u.createdAt))===keyFn(d)) },
    { label: 'Business', backgroundColor: getStyle('--cui-info'), data: countBy(business, (u,d) => keyFn(new Date(u.createdAt))===keyFn(d)) },
    { label: 'Tickets', backgroundColor: getStyle('--cui-danger'), data: countBy(tickets, (u,d) => keyFn(new Date(u.createdAt))===keyFn(d) ? u.totalTickets : 0) },
  ]

  // Update x-axis title
  barChart.options.scales.x.title.text = periodLabel.value
}

function refreshAnalytics() {
  fetchAnalytics()
}

function updateBarChart() {
  setupBarChart()
}

onMounted(fetchAnalytics)
</script>

