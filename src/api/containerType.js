import request from '@/router/axios'

//获取箱型列表
export function containerTypeGet() {
  return request({
    url: '/order/container/list',
    method: 'get'
  })
}

//新增箱型
export function containerTypeAdd(obj) {
  return request({
    url: '/order/container',
    method: 'post',
    data:obj
  })
}

//修改箱型列表
export function containerTypeEdit(obj) {
    return request({
      url: '/order/container',
      method: 'put',
      
      data:obj
    })
  }

  //删除箱型列表
export function containerTypedelete(obj) {
    return request({
      url: '/order/container',
      method: 'delete',
      params:obj
    })
  }
