import request from '@/router/axios'

// export function fetchList(query) {
//   return request({
//     url: '/truck/truDriver/selectDriverTruck',
//     method: 'post',
//     params: query
//   })
// }
export function fetchList(query) {
  return request({
    url: '/truck/truDriver/selectDriverDetailList/',
    method: 'post',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/truDriver/addDriver/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/truck/truDriver/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/truDriver/delectIds/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/truck/truDriver/',
    method: 'put',
    data: obj
  })
}
export function fetchDeptSelectObj() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}

export function expObj(str) {
  return request({
    url: '/truck/truDriver/export/' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function selectDriverPhoneObj(obj) {
  return request({
    url: '/truck/truDriver/selectDriverPhone',
    method: 'post',
    data: obj
  })
}

export function fetchDeptSelect() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}
