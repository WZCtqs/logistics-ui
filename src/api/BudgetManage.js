import request from '@/router/axios'

 

  //查询总货物利润
  export function commonApi(obj) {
    return request({
      url: '/order/orderProfit/selectSumProfit',
      method: 'post',
      data: obj
    })
  }

 //导出总货物利润
export function commonExpApi(obj) {
  return request({
    url: '/order/orderProfit/exportSumProfit',
    method: 'get',
    params: obj,
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
  
  



