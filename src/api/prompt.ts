import request from '@/utils/request'

export const list = () => {
  return request({
    url: '/prompt/list',
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