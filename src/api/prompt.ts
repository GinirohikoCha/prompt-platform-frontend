import request from '@/utils/request'

export const list = () => {
  return request({
    url: '/prompt/list',
    method: 'get'
  })
}

export const detail = (id: any) => {
  return request({
    url: `/prompt/${id}`,
    method: 'get'
  })
}

export const create = (data: object) => {
  return request({
    url: '/prompt/create',
    method: 'post',
    data
  })
}