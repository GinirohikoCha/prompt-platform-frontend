import request from '@/utils/request'

export const login = (data: object) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}