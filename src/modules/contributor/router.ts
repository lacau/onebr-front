import router from '@/main/router'

router.addRoutes([
  {
    path: '/colaboradores',
    name: 'contributors',
    component: () => import(/* webpackChunkName: "contributors" */ './pages/Contributors.vue'),
  },
])
