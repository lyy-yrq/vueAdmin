import request from '@/utils/request'


export function timeToTimestamp(data) {
  return request({
    url: '/api/tools/timeToTimestamp',
    method: 'post',
    data
  })
}

export function timestampToTime(data) {
  return request({
    url: '/api/tools/timestampToTime',
    method: 'post',
    data
  })
}


export function submitAccountBook(data) {
  return request({
    url: '/api/tools/submitAccountBook',
    method: 'post',
    data
  })
}

export function getTotalData(data) {
  return request({
    url: '/api/tools/getTotalData',
    method: 'post',
    data
  })
}

export function getAccountBook(data) {
  return request({
    url: '/api/tools/getAccountBook',
    method: 'post',
    data
  })
}

