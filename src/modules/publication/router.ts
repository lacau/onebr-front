import router from '@/main/router'

router.addRoutes([
  {
    path: '/publicacoes',
    name: 'publications',
    component: () => import(/* webpackChunkName: "publications" */ './pages/Publications.vue'),
  },
])
