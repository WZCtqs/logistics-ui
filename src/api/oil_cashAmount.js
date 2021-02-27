import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilCashAmount/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilCashAmount',
    method: 'post',
    data: obj
  })
}

export function getoilCashAmountObj(obj) {
  return request({
    url: '/oilcard/oilCashAmount/oilCashAmount2/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/oilcard/oilApply/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilCashAmount/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilCashAmount/',
    method: 'put',
    data: obj
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/oilCashAmount/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
