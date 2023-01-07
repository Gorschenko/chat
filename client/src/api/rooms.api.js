import { useHttp } from '@/common/http.middleware'

const getRooms = async () => {
  return await useHttp(
    '/rooms',
  )
}

const createRoom = async (userId, formData) => {
  return await useHttp(
    '/rooms/create',
    'POST',
    {
      ownerId: userId,
      ...formData,
    }
  )
}

const deleteRoomById = async roomId => {
  return await useHttp(
    `/rooms/by-id/${roomId}`,
    'DELETE',
  )
}


export {
  getRooms,
  createRoom,
  deleteRoomById,
}