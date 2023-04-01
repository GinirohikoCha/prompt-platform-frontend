import request from '@/utils/request'

export const list = (type: number) => {
  return request({
    url: '/prompt/list',
    method: 'get',
    params: {
      type
    }
  })
}

export const detail = (id: any) => {
  return request({
    url: `/prompt/${id}`,
    method: 'get'
  })
}

export const save = (data: object) => {
  return request({
    url: '/prompt/save',
    method: 'post',
    data
  })
}

export const like = (promptId: number, isLike: boolean) => {
  return request({
    url: '/prompt/like',
    method: 'post',
    data: {
      promptId,
      isLike
    }
  })
}

