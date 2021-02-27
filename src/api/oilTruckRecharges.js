import request from '@/router/axios'

export function expObj(str, ids) {
  return request({
    url: '/oilcard/oilTruckRecharges/export/' + ids,
    method: 'post',
    params: str,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function fetchList(obj) {
  return request({
    url: '/oilcard/oilTruckRecharges/getAllTruckRecharges',
    method: 'post',
    data: obj
  })
}

export function fetchDetailList(id) {
  return request({
    url: '/oilcard/oilTruckRecharges/details?truckId=' + id,
    method: 'get'
  })
}
