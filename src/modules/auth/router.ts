import router from '@/main/router'
import store from '@/main/store'

router.addRoutes([
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ './pages/Login.vue'),
  },
])

router.beforeEach((to, _, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth)
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requiresAuth && !isAuthenticated) {
    next({
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    })
  } else {
    next()
  }
})
