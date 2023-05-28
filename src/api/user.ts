import request from '@/utils/request'

export const listMyPrompts = () => {
  return request({
    url: '/user/listMyPrompts',
    method: 'get',
  })
}

export const listLikePrompts = () => {
  return request({
    url: '/user/listLikePrompts',
    method: 'get',
  })
}
