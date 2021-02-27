import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/loan/selectLoanTruckList',
    method: 'post',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/loan/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/truck/loan/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/loan/delectIds/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/truck/loan/',
    method: 'put',
    data: obj
  })
}
export function fetchDeptSelect() {
  return request({
    url: '/truck/truDriver/selectPlateNumberList',
    method: 'get'
  })
}

export function repaymentRateSelect() {
  return request({
    url: '/truck/loan/repaymentRate',
    method: 'post'
  })
}

export function selectDriverPlateNumberSelect() {
  return request({
    url: '/truck/truDriver/selectDriverPlateNumber',
    method: 'get'
  })
}

