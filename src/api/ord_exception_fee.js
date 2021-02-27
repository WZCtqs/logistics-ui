import request from '@/router/axios'

export function fetchList(obj) {
  return request({
    url: '/order/ordExceptionFee/page',
    method: 'get',
    params: obj
  })
}

export function exceptionFeeType() {
  return request({
    url: '/admin/dict/type/exception_fee_type',
    method: 'get'
  })
}

export function auditing() {
  return request({
    url: '/admin/dict/type/auditing_type',
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: 'order/ordExceptionFee/' + str,
    method: 'delete'
  })
}

export function getDetail(query) {
  return request({
    url: '/order/ordExceptionFee/' + query,
    method: 'get'
  })
}

export function exObj(obj) {
  return request({
    url: '/order/ordExceptionFee/isPassed',
    method: 'post',
    data: obj
  })
}

export function expObj(str) {
  return request({
    url: '/order/ordExceptionFee/export/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

