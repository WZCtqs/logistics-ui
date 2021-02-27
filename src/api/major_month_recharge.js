import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/majorMonthRecharge/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/oilcard/oilMajor',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/oilcard/oilMajor',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/oilcard/oilMajor/' + id,
    method: 'delete'
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/majorMonthRecharge/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function getmajorNumberObj(str) {
  return request({
    url: '/oilcard/oilMajor/majorNumber2/' + str,
    method: 'get'
  })
}

export function rechargeBingObj(obj) {
  return request({
    url: '/oilcard/oilMajorRecharge',
    method: 'post',
    data: obj
  })
}

export function getMajorListObj(query1) {
  return request({
    url: '/oilcard/oilMajorRecharge/page',
    method: 'get',
    params: query1
  })
}

export function majorMonthRecharge(query) {
  return request({
    url: '/oilcard/majorMonthRecharge/oilTotalPage',
    method: 'get',
    params: query
  })
}
