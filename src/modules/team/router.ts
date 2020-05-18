import router from '@/main/router'

router.addRoutes([
  {
    path: '/equipe',
    name: 'team',
    component: () => import(/* webpackChunkName: "team" */ './pages/Team.vue'),
  },
])
