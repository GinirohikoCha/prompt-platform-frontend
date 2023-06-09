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

export const info = () => {
  return request({
    url: '/auth/info',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export const resetPassword = (password: string, code: string) => {
  return request({
    url: '/auth/resetPassword',
    method: 'post',
    data: {
      password,
      code
    }
  })
}
