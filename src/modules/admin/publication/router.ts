import router from '@/main/router'

router.addRoutes([
  {
    path: '/admin/publicacoes',
    name: 'admin.publications',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "admin.publications" */ './pages/Publications.vue'),
  },
])
