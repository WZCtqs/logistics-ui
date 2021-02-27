import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/majorMonthRecharge/cashAmount',
    method: 'get',
    params: query
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
    url: '/oilcard/majorMonthRecharge/cashAmountExport/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
