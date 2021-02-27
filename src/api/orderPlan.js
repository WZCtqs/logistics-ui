import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/upStream/page',
    method: 'get',
    params: query
  })
}

export function delObj(ids) {
  return request({
    url: '/order/upStream/' + ids,
    method: 'delete'
  })
}
export function exportObj(obj) {
  return request({
    url: '/order/upStream/exportExcel?ids=' + obj,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function getDetailByIdObj(id) {
  return request({
    url: '/order/upStream/selectByOrderId/' + id,
    method: 'get'
  })
}

export function getstatusTdObj(id) {
  return request({
    url: '/admin/dict/type/status_td',
    method: 'get'
  })
}
