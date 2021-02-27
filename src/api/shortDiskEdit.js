import request from '@/router/axios'

// 司机信息
export function fetchdriverSelect() {
  return request({
    url: '/order/ordOrder/driverList',
    method: 'get'
  })
}

export function driverSelect(id) {
  return request({
    url: '/order/ordOrder/driver/' + id,
    method: 'get'
  })
}

export function getObj(id) {
  return request({
    url: '/order/ordShortOrder/' + id,
    method: 'get'
  })
}

export function customerSelect(id) {
  return request({
    url: '/order/ordOrder/customer/' + id,
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/order/ordShortOrder/',
    method: 'put',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/order/ordShortOrder/',
    method: 'post',
    data: obj
  })
}


