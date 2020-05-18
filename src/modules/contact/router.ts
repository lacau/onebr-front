import router from '@/main/router'

router.addRoutes([
  {
    path: '/contato',
    name: 'contact',
    component: () => import(/* webpackChunkName: "contact" */ './pages/Contact.vue'),
  },
])
