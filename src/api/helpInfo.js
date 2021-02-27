import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/helpInformation/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/helpInformation',
    method: 'post',
    data: obj
  })
}
export function delObj(str) {
  return request({
    url: '/admin/helpInformation/deleteIds/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/admin/helpInformation',
    method: 'put',
    data: obj
  })
}
export function getDetail(id) {
  return request({
    url: '/admin/helpInformation/' + id,
    method: 'get'
  })
}
