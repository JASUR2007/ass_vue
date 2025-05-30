import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode';

import DefaultLayout from '../layouts/DefaultLayout'
import Weblayout from '../layouts/Weblayout'
const routes = [
    {
    path: '/',
    name: 'Web',
    component: Weblayout,
    redirect: '/main',
    children: [
      {
        path: '/service',
        name: 'Service',
        component: () =>
          import(
             '../views/web/Service.vue'
          ),
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () =>
          import(
             '../views/web/Contact.vue'
          ),
      },
      {
        path: '/kbase',
        name: 'Kbase',
        component: () =>
          import(
            '../views/web/KBase.vue'
            ),
      },
            {
        path: '/main',
        name: 'Main',
        component: () =>
          import(
             '../views/web/Main.vue'
          ),
      },
            {
        path: '/about',
        name: 'About',
        component: () =>
          import(
             '../views/web/About.vue'
          ),
      },
    ]
  },
  {
    path: '/admin',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '../views/dashboard/Dashboard.vue'
          ),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/clients',
        name: 'Clients',
        component: () => import('../views/admin/Clients.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/sellers',
        name: 'Business clients',
        component: () => import('../views/admin/Sellers.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/requests',
        name: 'Ticket',
        component: () => import('../views/admin/Ticket.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/base',
        name: 'Base',
        component: () => import('../views/admin/Base.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/warehouse',
        name: 'Warehouse',
        component: () => import('../views/admin/Warehouse.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
      {
        path: '/support',
        name: 'support',
        component: () => import('../views/admin/Support.vue'),
        meta: { requiresAuth: true, roles: ['admin'] },
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/Register'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/pages/Page404.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth) {
    if (!token) {
      return next('/main')
    }

    try {
      const decoded = jwtDecode(token)

      if (to.meta.roles && !to.meta.roles.includes(decoded.role)) {
        return next('/main')
      }

      return next()
    } catch (error) {
      console.error('Ошибка декодирования токена:', error)
      localStorage.removeItem('token')
      return next('/login')
    }
  }

  return next()
})

export default router
