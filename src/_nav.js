import {jwtDecode} from 'jwt-decode'

function Nav() {
  const token = localStorage.getItem('token')
  let userRole = null

  if (token) {
    try {
      const decoded = jwtDecode(token)
      userRole = decoded?.role
      console.log(userRole)
    } catch (error) {
      console.error('Ошибка декодирования токена в _nav.js:', error)
    }
  }

  const nav = [
    {
      component: 'CNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: 'cil-speedometer',
    },
    {
      component: 'CNavTitle',
      name: 'Components',
    },
  ]

  if (userRole === 'admin') {
    nav.push(
      {
        component: 'CNavItem',
        name: 'Clients',
        to: '/clients',
        icon: 'cil-people',
      },
      {
        component: 'CNavItem',
        name: 'Business clients',
        to: '/sellers',
        icon: 'cil-user',
      },
      {
        component: 'CNavItem',
        name: 'Requests',
        to: '/requests',
        icon: 'cil-pencil',
      },
      {
        component: 'CNavItem',
        name: 'Warehouse',
        to: '/warehouse',
        icon: 'cil-list',
      },
      {
        component: 'CNavItem',
        name: 'Base',
        to: '/base',
        icon: 'cil-star',
      },
      {
        component: 'CNavItem',
        name: 'Support',
        to: '/support',
        icon: 'cil-pencil',
      },
    )
  }

  return nav
}

export default Nav
