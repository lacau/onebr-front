import router from '@/main/router'

router.addRoutes([
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './pages/Home.vue'),
  },
])
