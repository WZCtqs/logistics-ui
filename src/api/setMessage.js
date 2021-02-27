import request from '@/router/axios'

export function fetchSmsObj() {
  return request({
    url: '/admin/sysSmsTemp/tplList',
    method: 'get'
  })
}
export function putSmsObj(obj) {
  return request({
    url: '/admin/sysSmsTemp',
    method: 'put',
    data: obj
  })
}

export function getTaxRate(obj) {
  return request({
    url: '/truck/taxRate',
    method: 'get'
  })
}

export function postTaxRate(obj) {
  return request({
    url: '/truck/taxRate',
    method: 'post',
    data: obj
  })
}
export function setDefaultRate(id) {
  return request({
    url: '/truck/taxRate/setDefaultRate/' + id,
    method: 'get'
  })
}
export function deleteRate(id) {
  return request({
    url: '/truck/taxRate/' + id,
    method: 'delete'
  })
}
