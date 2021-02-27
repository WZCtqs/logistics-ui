import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/truTruckFee/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/truTruckFee/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/truck/truTruckFee/',
    method: 'put',
    data: obj
  })
}

export function delObj(str) {
  return request({
    url: '/truck/truTruckFee/' + str,
    method: 'delete'
  })
}
// truTruck/selectPlateNumberList
export function fetchDeptSelect() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}
