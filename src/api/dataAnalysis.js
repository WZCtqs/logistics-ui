import request from '@/router/axios'
export function getSelectLogistics() {
  return request({
    url: '/order/receiveAndDispatch/selectLogistics',
    method: 'get'
  })
}

export function getCountOrders() {
  return request({
    url: '/order/receiveAndDispatch/countOrders',
    method: 'get'
  })
}

export function getCountByGoodsOrderStatus() {
  return request({
    url: '/order/receiveAndDispatch/countByGoodsOrderStatus',
    method: 'get'
  })
}
export function getCountByOrderStatus() {
  return request({
    url: '/order/receiveAndDispatch/countByOrderStatus',
    method: 'get'
  })
}
export function getlistAllNoChecked() {
  return request({
    url: '/truck/announcement/listAllNoChecked',
    method: 'get'
  })
}
export function get2Checked(id) {
  return request({
    url: '/order/ordAnnouncement/2Checked/' + id,
    method: 'get'
  })
}

export function getCountMoneyStatus() {
  return request({
    url: '/order/receiveAndDispatch/countMoney',
    method: 'get'
  })
}

export function getcountOrderNumber() {
  return request({
    url: '/order/receiveAndDispatch/countOrderNumber',
    method: 'get'
  })
}
export function getcountTodayMoney() {
  return request({
    url: '/order/receiveAndDispatch/countTodayMoney',
    method: 'get'
  })
}
