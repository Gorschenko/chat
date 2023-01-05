import { useHttp } from '@/common/http.middleware'

const getUser = async () => {
  return await useHttp(
    '/user',
  )
}

export {
  getUser,
}