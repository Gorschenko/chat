import SignInView from '@/views/auth/SignInView'
import SignUpView from '@/views/auth/SignUpView'

export default [
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInView,
    meta: {
      layout: 'default',
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView,
    meta: {
      layout: 'default',
    }
  }
]