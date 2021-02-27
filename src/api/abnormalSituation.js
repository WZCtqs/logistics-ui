import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/ordExceptionCondition/page',
    method: 'get',
    params: query
  })
}

export function getDetail(query) {
  return request({
    url: '/order/ordExceptionCondition/' + query,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/order/ordExceptionCondition/',
    method: 'post',
    data: obj
  })
}

export function delObj(ids) {
  return request({
    url: '/order/ordExceptionCondition/' + ids,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/order/ordExceptionCondition/',
    method: 'put',
    data: obj
  })
}

export function expObj(str) {
  return request({
    url: '/order/ordExceptionCondition/exportEXCondition/?ids=' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
