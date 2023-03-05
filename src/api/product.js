import request2 from '@/utils/request2'

export function fetchList(query) {
  return request2({
    url: '/product/',
    method: 'get',
    params: query
  })
}
