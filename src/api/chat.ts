import request from '@/utils/request'

export const send = (promptId: any, data: object) => {
  return request({
    url: `/chat/send/${promptId}`,
    method: 'post',
    data
  })
}