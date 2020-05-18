import router from '@/main/router'

router.addRoutes([
  {
    path: '/bacteria/:name',
    name: 'bacteria',
    component: () => import(/* webpackChunkName: "bacteria" */ './pages/Bacteria.vue'),
  },
])
