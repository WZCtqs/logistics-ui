import request from '@/router/axios'

/* 查看 */
export function fetchList(query) {
  return request({
    url: '/order/expensespayable/getOrderList',
    method: 'post',
    params: query
  })
}

/* 添加对账单 **/
export function addExpensesPayAbleObj(obj) {
  return request({
    url: '/order/expensespayable/addExpensespayable',
    method: 'post',
    data: obj
  })
}

export function getOrderTypeObj() {
  return request({
    url: '/admin/dict/type/order_type_status',
    method: 'get'
  })
}

export function getPayWayeObj() {
  return request({
    url: '/admin/dict/type/pay_way',
    method: 'get'
  })
}

/* 获取客户信息 **/
export function getCustomerObj() {
  return request({
    url: '/order/ordCommonGoods/getCustomer',
    method: 'post'
  })
}
/* 应付开票 */
export function orderBalanceObj(obj) {
  return request({
    url: '/order/expensespayable/orderBalance/' + obj.orderId + '/' + obj.balanceStatus,
    method: 'get'
  })
}
/** 集装箱订单调账 */
export function updateOrderFeeObj(obj) {
  return request({
    url: '/order/expensespayable/updateOrderFee/',
    method: 'post',
    data: obj
  })
}

/** 普货订单调账 */
export function CommonGoodsOrderFeeObj(obj) {
  return request({
    url: '/order/expensespayable/updateCommonGoodsOrderFee/',
    method: 'post',
    data: obj
  })
}

/* 导出 */
export function expObj(str, obj) {
  return request({
    url: '/order/expensespayable/exportExpensespayableOrder?ids=' + str,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    },
    params: obj
  })
}
export function totalObj(obj) {
  return request({
    url: '/order/expensespayable/total',
    method: 'get',
    params: obj
  })
}

