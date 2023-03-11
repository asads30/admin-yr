import request from '@/utils/request'
import request2 from '@/utils/request2'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/vue-element-admin/transaction/list',
    method: 'get',
    params: query
  })
}

export function getPayments() {
  return request2({
    url: '/payment/?page=1&pageSize=100',
    method: 'get'
  })
}

export function getUsers() {
  return request2({
    url: '/user/',
    method: 'get'
  })
}

export function getChannels() {
  return request2({
    url: '/channel/',
    method: 'get'
  })
}

export function getProducts() {
  return request2({
    url: '/product/',
    method: 'get'
  })
}
