import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/sysTanent/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/sysTanent/addTanent',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/sysTanent/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/admin/sysTanent/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/admin/sysTanent/',
    method: 'put',
    data: obj
  })
}

export function isstatus_status() {
  return request({
    url: '/admin/dict/type/tanent_status',
    method: 'get'
  })
}
export function isExpried_status() {
  return request({
    url: '/admin/dict/type/isExpried_status',
    method: 'get'
  })
}
export function forbiddenObj(id) {
  return request({
    url: '/admin/sysTanent/forbidden/' + id,
    method: 'get'
  })
}
export function activeObj(id) {
  return request({
    url: '/admin/sysTanent/active/' + id,
    method: 'get'
  })
}
export function allTreeObj() {
  return request({
    url: '/admin/sysTanent/allTree/',
    method: 'get'
  })
}
export function tanentTreeObj(id) {
  return request({
    url: '/admin/sysTanent/tanentTree/' + id,
    method: 'get'
  })
}
