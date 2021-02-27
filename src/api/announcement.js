import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/announcement/page',
    method: 'get',
    params: query
  })
}
export function announcementObj() {
  return request({
    url: '/admin/dict/type/announcement_type',
    method: 'get'
  })
}
export function addObj(obj) {
  return request({
    url: '/truck/announcement/',
    method: 'post',
    data: obj
  })
}
export function selectAllDriver() {
  return request({
    url: '/truck/truDriver/selectDriverByWhiteList',
    method: 'post'
  })
}
export function delObj(str) {
  return request({
    url: '/truck/announcement/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/truck/announcement/',
    method: 'put',
    data: obj
  })
}
//
// export function getObj(id) {
//   return request({
//     url: '/truck/truCustomer/' + id,
//     method: 'get'
//   })
// }
//

// export function putObj(obj) {
//   return request({
//     url: '/truck/truCustomer/',
//     method: 'put',
//     data: obj
//   })
// }
//
// export function fetchDeptSelect() {
//   return request({
//     url: '/truck/truTruck/selectPlateNumberList',
//     method: 'get'
//   })
// }
//
// export function expObj(str) {
//   return request({
//     url: '/truck/truCustomer/export/' + str,
//     method: 'post',
//     responseType: 'blob',
//     headers: {
//       'Content-Type': 'application/vnd.ms-excel'
//     }
//   })
// }
//

//
// export function customertype() {
//   return request({
//     url: '/admin/dict/type/customer_type',
//     method: 'get'
//   })
// }
//
// export function setTrustByIds(query) {
//   return request({
//     url: '/truck/truCustomer/setTrustByIds',
//     method: 'post',
//     params: query
//   })
// }
