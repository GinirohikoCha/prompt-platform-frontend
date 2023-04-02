import request from '@/utils/request'

export const send = (promptId: any, data: object) => {
  return request({
    url: `/chat/send${promptId ? '/' + promptId: ''}`,
    method: 'post',
    data
  })
}

export const createStream = (id: string) => {
  return new EventSource(`http://localhost:5173/${import.meta.env.VITE_APP_BASE_URL}/chat/createStream?sseId=` + id);
}

export const sendStream = (promptId: any, data: object) => {
  return request({
    url: `/chat/sendStream${promptId ? '/' + promptId: ''}`,
    method: 'post',
    data
  })
}
