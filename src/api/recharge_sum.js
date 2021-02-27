import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilRecharge/rechargeSum',
    method: 'get',
    params: query
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/oilRecharge/rechargeSumExport/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
