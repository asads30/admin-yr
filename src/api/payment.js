import request2 from '@/utils/request2'

export function fetchList(query) {
  return request2({
    url: '/payment/',
    method: 'get',
    params: query
  })
}

export function fetchPayouts(query) {
  return request2({
    url: '/paymentQuery/',
    method: 'get',
    params: query
  })
}
