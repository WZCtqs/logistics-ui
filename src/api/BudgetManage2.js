import request from '@/router/axios'

//获取单票货物利润统计
export function commonApi(obj) {
    return request({
      url: '/order/orderProfit/selectLast7daysOrderProfit',
      method: 'post',
      data: obj
    })
}

//导出单票货物利润统计

export function commonExpApi(obj) {
  return request({
    url: '/order/orderProfit/exportLast7daysOrderProfit',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

  



