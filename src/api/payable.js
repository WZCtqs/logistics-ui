import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/order/needPayBill/page',
    method: 'get',
    params: query
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

export function getdriverList(obj) {
  return request({
    url: '/order/needPayBill/getDriverList',
    method: 'post',
    data: obj
  })
}

export function distributionFee_function(obj) {
  return request({
    url: '/order/needPayBill/designCash',
    method: 'get',
    params: obj
  })
}

export function sendToDriver(obj) {
  return request({
    url: '/order/needPayBill/sendBillToDriver',
    method: 'get',
    params: obj
  })
}

export function detailObj(obj) {
  return request({
    url: '/order/needPayBill/getBillDetailPc',
    method: 'get',
    params: obj
  })
}

export function ordersExport(obj) {
  return request({
    url: '/order/needPayBill/exportNeedPayBill',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function updateBill(obj) {
  return request({
    url: '/order/needPayBill/updateBill',
    method: 'get',
    params: obj
  })
}

export function createYFDZD(obj) {
  return request({
    url: '/order/needPayBill/createYFDZD',
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

export function selectOrderByBill(query) {
  return request({
    url: '/order/needPayBill/selectOrderByAccountPayId',
    method: 'get',
    params: query
  })
}

export function removeOrder(query) {
  return request({
    url: '/order/needPayBill/removeOrder/' + query.accountPayId + '/' + query.orderId,
    method: 'get'
  })
}
