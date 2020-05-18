import router from '@/main/router'

router.addRoutes([
  {
    path: '/admin/usuarios',
    name: 'admin.users',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "admin.users" */ './pages/User.vue'),
  },
])
