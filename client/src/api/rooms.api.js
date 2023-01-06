import { useHttp } from '@/common/http.middleware'

const getRooms = async () => {
  return await useHttp(
    '/rooms',
  )
}

export {
  getRooms,
}