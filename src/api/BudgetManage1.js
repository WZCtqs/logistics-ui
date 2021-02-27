import request from '@/router/axios'
 
 //查询车辆利润
  export function commonApi(obj) {
    return request({
      url: '/order/orderProfit/selectTruckOrderProfit',
      method: 'post',
      data: obj
    })
  }

 //导出车辆利润统计
export function commonExpApi(obj) {
  return request({
    url: '/order/orderProfit/exportLast7days',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
  



