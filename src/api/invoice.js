import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/invoice/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/invoice/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/truck/invoice/',
    method: 'put',
    data: obj
  })
}

export function delObj(str) {
  return request({
    url: '/truck/invoice/' + str,
    method: 'delete'
  })
}
//
// export function fetchDeptSelect() {
//   return request({
//     url: '/truck/truTruck/selectPlateNumberList',
//     method: 'get'
//   })
// }
