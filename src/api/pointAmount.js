import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/pointAmount/page',
    method: 'get',
    params: query
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/pointAmount/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function delObj(str) {
  return request({
    url: '/oilcard/pointAmount/' + str,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/pointAmount/',
    method: 'put',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/pointAmount/',
    method: 'post',
    data: obj
  })
}
export function validatorObj(obj) {
  return request({
    url: '/oilcard/pointAmount/pointAmount2',
    method: 'post',
    data: obj
  })
}
