import router from '@/main/router'

router.addRoutes([
  {
    path: '/admin/experimentos',
    name: 'admin.experiments',
    meta: {
      auth: true,
    },
    component: () => import(/* webpackChunkName: "admin.experiments" */ './pages/Experiment.vue'),
  },
])
