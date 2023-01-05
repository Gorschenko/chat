import { useHttp } from '@/common/http.middleware'

const signIn = async formData => {
  return await useHttp(
    '/auth/sign-in',
    'POST',
    formData,
  )
}

const signUp = async formData => {
  return await useHttp(
    '/auth/sign-up',
    'POST',
    formData,
  )
}

export {
  signIn,
  signUp,
}