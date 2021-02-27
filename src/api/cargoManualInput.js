import request from '@/router/axios'

export function common_type() {
  return request({
    url: '/admin/dict/type/common_type',
    method: 'get'
  })
}
