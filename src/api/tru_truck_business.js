import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/truckFee/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/order/truTruckFee/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/order/truTruckFee/',
    method: 'put',
    data: obj
  })
}

export function delObj(str) {
  return request({
    url: '/order/truTruckFee/' + str,
    method: 'delete'
  })
}

export function fetchDeptSelect() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}

export function getTruckGPSObj(str) {
  return request({
    url: '/truck/truTruck/getTruckGPS?plateNumber=' + str,
    method: 'get'
  })
}
