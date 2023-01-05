import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/users',
  )
}

export {
  getUser,
}