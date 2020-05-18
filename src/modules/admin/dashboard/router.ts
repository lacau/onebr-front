import router from '@/main/router'

router.addRoutes([
  {
    path: '/admin',
    name: 'admin.dashboard',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "admin.dashboard" */ './pages/Dashboard.vue'),
  },
])
