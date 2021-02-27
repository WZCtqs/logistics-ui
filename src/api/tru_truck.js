import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/truck/truTruck/selectTruckDriverTeamList',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/truck/truTruck/',
    method: 'post',
    data: obj
  })
}
export function selectTruckDriverTeamListObj() {
  return request({
    url: '/truck/truTruckTeam/selectAllTruct',
    method: 'post'
  })
}
export function getObj(id) {
  return request({
    url: '/truck/truTruck/' + id,
    method: 'get'
  })
}

export function delObj(str) {
  return request({
    url: '/truck/truTruck/delectIds/' + str,
    method: 'delete'
  })
}
export function putObj(obj) {
  return request({
    url: '/truck/truTruck/',
    method: 'put',
    data: obj
  })
}
export function car_type() {
  return request({
    url: '/admin/dict/type/car_type',
    method: 'get'
  })
}

export function common_type() {
  return request({
    url: '/admin/dict/type/common_type',
    method: 'get'
  })
}
export function truck_attribute() {
  return request({
    url: '/admin/dict/type/truck_attribute',
    method: 'get'
  })
}
export function car_attribute() {
  return request({
    url: '/admin/dict/type/car_attribute',
    method: 'get'
  })
}
export function selectDriverByPhoneObj() {
  return request({
    url: '/truck/selectDriverByPhone',
    method: 'get'
  })
}

export function fetchDeptSelect() {
  return request({
    url: '/truck/truTruck/selectPlateNumberList',
    method: 'get'
  })
}

export function allTruckGPSObj() {
  return request({
    url: '/truck/truTruck/allTruckGPS ',
    method: 'get'
  })
}

/*
* 车主
*/
export function fetchTruckOwnList(query) {
  return request({
    url: '/truck/truTruckOwn/selectTruTruckOwnByPage',
    method: 'post',
    data: query
  })
}

export function addTruckOwnObj(obj) {
  return request({
    url: '/truck/truTruckOwn/addTruckOwn',
    method: 'post',
    data: obj
  })
}

export function delTruckOwnObj(str) {
  return request({
    url: '/truck/truTruckOwn/deleteTruTruckOwn?ids=' + str,
    method: 'delete'
  })
}
export function putTruckOwnObj(obj) {
  return request({
    url: '/truck/truTruckOwn/updateTruckOwn/',
    method: 'put',
    data: obj
  })
}

export function allTruTruckOwn() {
  return request({
    url: '/truck/truTruckOwn/allTruTruckOwn/',
    method: 'get'
  })
}
