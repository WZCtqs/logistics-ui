import request from '@/router/axios'

export function getListRuleObj(str) {
  return request({
    url: '/order/ordAccountingRules/getList?objType=' + str,
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/order/ordAccountingRules/',
    method: 'put',
    data: obj
  })
}

export function deleteRuleObj(str) {
  return request({
    url: '/order/ordAccountingRules/' + str,
    method: 'delete'
  })
}

export function customerListObj(str) {
  return request({
    url: '/order/ordOrder/customerList/',
    method: 'get'
  })
}

export function customerAddListObj(obj) {
  return request({
    url: '/order/ordAccountingRules/',
    method: 'post',
    data: obj
  })
}

export function deleteRuleDetailObj(id) {
  return request({
    url: '/order/ordAccountingRule/' + id,
    method: 'delete'
  })
}

export function getDetailListByIdObj(id) {
  return request({
    url: '/order/ordAccountingRule/getList/?ruleId=' + id,
    method: 'get'
  })
}

export function truckTeamListObj() {
  return request({
    url: '/order/ordOrder/truckTeamList',
    method: 'get'
  })
}
