import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/expensespayable/selectExpensespayableList',
    method: 'post',
    params: query
  })
}

export function delObj(ids) {
  return request({
    url: '/order/expensespayable/' + ids,
    method: 'delete'
  })
}

export function delObj1(obj) {
  return request({
    url: '/order/needPayBill/' + obj,
    method: 'delete'
  })
}

export function selectOrderByBill(query) {
  return request({
    url: '/order/expensespayable/selectOrderByBill',
    method: 'post',
    params: query
  })
}

export function getdriverList(obj) {
  return request({
    url: '/order/needPayBill/getDriverList',
    method: 'post',
    data: obj
  })
}

export function selectAllCustomers() {
  return request({
    url: '/order/expensespayable/selectAllCustomers',
    method: 'post',
    data: {}
  })
}

export function removeOrder(obj) {
  return request({
    url: '/order/expensespayable/removeOrder',
    method: 'get',
    params: obj
  })
}

// export function exportExpensespayable(obj) {
//     return request({
//         url: '/order/expensespayable/exportExpensespayable',
//         method: 'get',
//         params:obj,
//         responseType: 'blob',
//         headers: {
//             'Content-Type': 'application/vnd.ms-excel'
//         }
//     })
// }

export function exportExpensespayable(obj) {
  return request({
    url: '/order/expensespayable/exportExpensespayableByBill',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function excel(obj) {
  return request({
    url: '/order/needPayBill/excel',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function distributionFee_function(obj) {
  return request({
    url: '/order/needPayBill',
    method: 'put',
    data: obj
  })
}

export function send_function(obj) {
  return request({
    url: '/order/needPayBill/send',
    method: 'get',
    params: obj
  })
}
export function send_functionS(obj) {
  debugger
  console.log(obj)
  return request({
    url: '/order/needPayBill/confirmAccountBill',
    method: 'get',
    params: obj
  })
}

export function BillConfirm(obj) {
  return request({
    url: '/order/needPayBill/confirm',
    method: 'get',
    params: obj
  })
}

export function SettlementProcess(obj) {
  return request({
    url: '/order/expensespayable/SettlementProcess',
    method: 'post',
    params: obj
  })
}
