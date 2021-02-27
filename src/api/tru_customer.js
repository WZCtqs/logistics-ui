import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/truCustomer/pageSearch',
    method: 'post',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/truCustomer/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/truck/truCustomer/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/truCustomer/delectIds/' + str,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/truck/truCustomer/',
    method: 'put',
    data: obj
  })
}

export function fetchDeptSelect() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/truck/truCustomer/export/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function setTrustByIds(query) {
  return request({
    url: '/truck/truCustomer/setTrustByIds',
    method: 'post',
    params: query
  })
}

export function payWayObj() {
  return request({
    url: '/admin/dict/type/pay_way',
    method: 'get'
  })
}

export function customerTypeObj() {
  return request({
    url: '/admin/dict/type/customer_type',
    method: 'get'
  })
}

export function getselectTrustCustomerObj() {
  return request({
    url: '/truck/truCustomer/selectTrustCustomer',
    method: 'get'
  })
}
export function getselectTrustCustomerBlackObj() {
  return request({
    url: '/truck/truCustomer/selectTrustCustomerBlack',
    method: 'get'
  })
}
