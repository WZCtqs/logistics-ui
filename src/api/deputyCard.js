import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/oilcard/oilCardManage/getOilInfoByPage',
    method: 'get',
    params: query
  })
}

export function getmajorNumberObj() {
  return request({
    url: '/oilcard/oilMajor/OilMajorNumber',
    method: 'get'
  })
}

export function importObj(obj) {
  return request({
    url: '/oilcard/oilCardManage/importExcel',
    method: 'post',
    data: obj,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function expObj(str) {
  return request({
    url: '/oilcard/oilCardManage/export/' + str,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}

export function downloadObj() {
  return request({
    url: '/oilcard/oilCardManage/downloadOilCardModel',
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/vnd.ms-excel'
    }
  })
}
