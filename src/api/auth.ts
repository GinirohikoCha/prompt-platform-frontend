import request from '@/utils/request'

export const login = (data: object) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const register = (data: object) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

export const requestCode = (phoneNumber: string) => {
  return request({
    url: '/auth/requestCode',
    method: 'post',
    data: {
      phoneNumber
    }
  })
}